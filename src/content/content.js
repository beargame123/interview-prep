/**
 * content script: 문제 페이지에 떠 있는 학습 타이머 위젯.
 * - 현재 문제를 자동 인식
 * - 타이머(탭이 보일 때만 카운트) + 뽀모도로 알림
 * - "해결 / 시도"를 누르면 세션을 저장
 *
 * 함께 주입된 sites.js, store.js의 globalThis.Algo를 사용한다.
 */
(function () {
  const Algo = globalThis.Algo;
  if (!Algo || !Algo.sites || !Algo.store) return;

  let problem = Algo.sites.detect();
  if (!problem || !problem.problemId) return;

  const SITE = Algo.sites.SITES[problem.site] || { name: problem.site, color: "#6366f1" };

  let seconds = 0;
  let running = false;
  let saved = false;
  let pomodoroFired = false;
  let pomodoroMinutes = 25;
  let timerId = null;
  let badgeTick = 0;

  // ---------- UI 구성 ----------
  const root = document.createElement("div");
  root.id = "algo-tracker-widget";
  root.innerHTML = `
    <div class="at-head" style="--at-accent:${SITE.color}">
      <span class="at-dot"></span>
      <span class="at-site">${SITE.name}</span>
      <span class="at-spacer"></span>
      <button class="at-x" title="닫기" aria-label="닫기">×</button>
    </div>
    <div class="at-title" title=""></div>
    <div class="at-time">00:00</div>
    <div class="at-row">
      <button class="at-btn at-toggle">⏸ 일시정지</button>
    </div>
    <div class="at-row">
      <button class="at-btn at-solve">✅ 해결</button>
      <button class="at-btn at-attempt">🔁 시도</button>
    </div>
    <div class="at-toast"></div>
  `;
  document.documentElement.appendChild(root);

  const $ = (sel) => root.querySelector(sel);
  const elTitle = $(".at-title");
  const elTime = $(".at-time");
  const elToggle = $(".at-toggle");
  const elToast = $(".at-toast");

  elTitle.textContent = problem.title;
  elTitle.title = problem.title;

  function render() {
    elTime.textContent = Algo.stats ? Algo.stats.clock(seconds) : fallbackClock(seconds);
    elToggle.textContent = running ? "⏸ 일시정지" : "▶ 시작";
    root.classList.toggle("at-running", running);
  }

  function fallbackClock(sec) {
    const m = String(Math.floor(sec / 60)).padStart(2, "0");
    const s = String(sec % 60).padStart(2, "0");
    return `${m}:${s}`;
  }

  function toast(msg) {
    elToast.textContent = msg;
    elToast.classList.add("show");
    setTimeout(() => elToast.classList.remove("show"), 1800);
  }

  // ---------- 타이머 ----------
  function tick() {
    if (!running) return;
    seconds += 1;
    saved = false;
    render();

    // 뽀모도로 알림(세션당 1회)
    if (!pomodoroFired && seconds >= pomodoroMinutes * 60) {
      pomodoroFired = true;
      send({ type: "pomodoro", title: problem.title, minutes: pomodoroMinutes });
    }
    // 배지 갱신(5초마다 분 표시)
    if (++badgeTick % 5 === 0) send({ type: "tick", minutes: Math.floor(seconds / 60) });
  }

  function start() {
    if (running) return;
    running = true;
    if (!timerId) timerId = setInterval(tick, 1000);
    render();
  }

  function pause() {
    running = false;
    render();
  }

  function send(msg) {
    try {
      chrome.runtime.sendMessage(msg);
    } catch (_) {
      /* service worker가 잠들었을 수 있음 — 무시 */
    }
  }

  // ---------- 세션 저장 ----------
  async function saveSession(status) {
    if (seconds < 1) {
      toast("아직 기록할 시간이 없어요");
      return;
    }
    const now = Date.now();
    const session = {
      id: `${problem.site}:${problem.problemId}:${now}`,
      site: problem.site,
      problemId: problem.problemId,
      title: problem.title,
      url: problem.url,
      difficulty: problem.difficulty || null,
      tags: problem.tags || [],
      seconds,
      status, // "solved" | "attempted"
      startedAt: now - seconds * 1000,
      endedAt: now,
    };
    await Algo.store.addSession(session);
    saved = true;
    toast(status === "solved" ? "✅ 해결로 기록됨!" : "🔁 시도로 기록됨");
    // 다음 풀이를 위해 타이머 리셋
    seconds = 0;
    pomodoroFired = false;
    pause();
    send({ type: "reset" });
    render();
  }

  // ---------- 이벤트 ----------
  elToggle.addEventListener("click", () => (running ? pause() : start()));
  $(".at-solve").addEventListener("click", () => saveSession("solved"));
  $(".at-attempt").addEventListener("click", () => saveSession("attempted"));
  $(".at-x").addEventListener("click", () => {
    pause();
    root.remove();
    if (timerId) clearInterval(timerId);
    send({ type: "reset" });
  });

  // 탭이 가려지면 멈추고, 다시 보이면 이어서(백그라운드 시간 미집계)
  let wasRunning = false;
  document.addEventListener("visibilitychange", () => {
    if (document.hidden) {
      wasRunning = running;
      if (running) pause();
    } else if (wasRunning) {
      start();
    }
  });

  // 페이지를 떠날 때 1분 이상 측정했고 저장 안 했으면 '시도'로 자동 보존
  window.addEventListener("pagehide", () => {
    if (!saved && seconds >= 60) {
      const now = Date.now();
      Algo.store.addSession({
        id: `${problem.site}:${problem.problemId}:${now}`,
        site: problem.site,
        problemId: problem.problemId,
        title: problem.title,
        url: problem.url,
        difficulty: problem.difficulty || null,
        tags: problem.tags || [],
        seconds,
        status: "attempted",
        startedAt: now - seconds * 1000,
        endedAt: now,
      });
    }
  });

  // SPA(프로그래머스/LeetCode)는 제목·난이도가 늦게 로드됨 → 잠깐 재파싱
  let retries = 0;
  const reparse = setInterval(() => {
    const fresh = Algo.sites.detect();
    if (fresh && fresh.problemId === problem.problemId) {
      problem = { ...problem, ...fresh };
      elTitle.textContent = problem.title;
      elTitle.title = problem.title;
    }
    if (++retries >= 6) clearInterval(reparse); // 약 6초간 시도
  }, 1000);

  // ---------- 시작 ----------
  Algo.store.getSettings().then((s) => {
    pomodoroMinutes = s.pomodoroMinutes || 25;
    if (s.autoStart) start();
    else render();
  });
  render();
})();
