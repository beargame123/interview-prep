/* 실전 풀이(모의 면접): 질문 제시 → 내 답변 작성 → 모범답안 대조 → 자가채점 */
(function () {
  const store = window.IP.store;
  const CAT_LABEL = { DB: "데이터베이스", ALGO: "알고리즘", CS: "CS 기초", ARCH: "아키텍처", PY: "Python/Django" };
  const RATING_W = { dunno: 0, meh: 1, unseen: 2, know: 3 }; // 약점 우선 정렬용(낮을수록 먼저)

  let queue = [];
  let idx = 0;
  let revealed = false;
  let timerId = null;
  let seconds = 0;
  let convo = []; // 현재 질문의 AI 면접 대화 기록

  const $ = (id) => document.getElementById(id);
  const esc = (s) =>
    String(s == null ? "" : s).replace(
      /[&<>"]/g,
      (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;" }[c])
    );

  function shuffle(arr) {
    for (let i = arr.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [arr[i], arr[j]] = [arr[j], arr[i]];
    }
    return arr;
  }

  function buildQueue() {
    const cat = $("iv-cat").value;
    const level = $("iv-level").value;
    const mode = $("iv-mode").value;

    let list = window.QUESTIONS.filter(
      (q) => (cat === "ALL" || q.cat === cat) && (level === "ALL" || q.level === level)
    );

    if (mode === "random") {
      list = shuffle([...list]);
    } else if (mode === "weak") {
      list = [...list].sort((a, b) => {
        const wa = RATING_W[(store.getStatus(a.id) || {}).rating || "unseen"];
        const wb = RATING_W[(store.getStatus(b.id) || {}).rating || "unseen"];
        return wa - wb || Math.random() - 0.5;
      });
    }
    // "order"는 데이터 순서 그대로
    return list;
  }

  function stopTimer() {
    if (timerId) clearInterval(timerId);
    timerId = null;
  }
  function startTimer() {
    stopTimer();
    seconds = 0;
    const el = $("iv-timer");
    timerId = setInterval(() => {
      seconds += 1;
      const m = String(Math.floor(seconds / 60)).padStart(2, "0");
      const s = String(seconds % 60).padStart(2, "0");
      if (el) el.textContent = `${m}:${s}`;
    }, 1000);
  }

  function updateStats() {
    const all = window.QUESTIONS;
    let answered = 0;
    let know = 0;
    let meh = 0;
    let dunno = 0;
    for (const q of all) {
      const st = store.getStatus(q.id);
      if (!st) continue;
      answered += 1;
      if (st.rating === "know") know += 1;
      else if (st.rating === "meh") meh += 1;
      else if (st.rating === "dunno") dunno += 1;
    }
    $("iv-stats").innerHTML =
      `학습한 질문 <b>${answered}/${all.length}</b> · ✅ 알았음 ${know} · 🤔 애매 ${meh} · ❌ 몰랐음 ${dunno}`;
  }

  // ===== AI 면접관 =====
  function runAI() {
    const panel = $("iv-ai-panel");
    panel.hidden = false;
    panel.innerHTML = `<div class="ai-loading">AI 면접관이 채점 중… 🤔</div>`;
    window.IP.ai
      .callMessages(convo)
      .then((text) => {
        convo.push({ role: "assistant", content: text });
        renderAIPanel();
      })
      .catch((e) => {
        panel.innerHTML =
          `<div class="ai-error">오류: ${esc(e && e.message ? e.message : e)}<br/>` +
          `API 키와 네트워크를 확인하세요. (file://에서 막히면 로컬 서버나 GitHub Pages로 여세요.)</div>`;
      });
  }

  function renderAIPanel() {
    const panel = $("iv-ai-panel");
    panel.innerHTML = "";
    convo.forEach((m, i) => {
      if (i === 0) return; // 최초 프롬프트(질문+모범답안)는 화면에 숨김
      const div = document.createElement("div");
      div.className = "ai-msg " + (m.role === "assistant" ? "ai-assistant" : "ai-user");
      div.innerHTML = (m.role === "assistant" ? "🤖 " : "🙋 ") + esc(m.content).replace(/\n/g, "<br/>");
      panel.appendChild(div);
    });
    const wrap = document.createElement("div");
    wrap.className = "ai-followup";
    wrap.innerHTML =
      `<input type="text" id="ai-reply" placeholder="꼬리질문에 답하거나 더 물어보세요" />` +
      `<button id="ai-send" class="primary">보내기</button>`;
    panel.appendChild(wrap);
    $("ai-send").addEventListener("click", sendFollowup);
    $("ai-reply").addEventListener("keydown", (e) => {
      if (e.key === "Enter") sendFollowup();
    });
    $("ai-reply").focus();
  }

  function sendFollowup() {
    const val = $("ai-reply").value.trim();
    if (!val) return;
    convo.push({ role: "user", content: val });
    runAI();
  }

  function showCard() {
    const card = $("iv-card");
    revealed = false;

    if (queue.length === 0) {
      card.innerHTML = `<div class="iv-empty">선택한 조건에 맞는 질문이 없어요. 필터를 바꿔보세요.</div>`;
      stopTimer();
      return;
    }
    if (idx >= queue.length) {
      card.innerHTML = `<div class="iv-empty">🎉 이 세트의 질문을 모두 풀었어요!<br/>모드를 '약점 우선'으로 바꿔 복습해 보세요.</div>`;
      stopTimer();
      return;
    }

    const q = queue[idx];
    const st = store.getStatus(q.id);
    const prevNote = st && st.note ? st.note : "";
    const prevRating = st ? st.rating : null;
    const ratingLabel = { know: "✅ 알았음", meh: "🤔 애매", dunno: "❌ 몰랐음" }[prevRating] || "";

    card.innerHTML = `
      <div class="iv-card-head">
        <div class="iv-badges">
          <span class="badge cat-${q.cat}">${CAT_LABEL[q.cat]}</span>
          <span class="badge level">${q.level}</span>
          ${prevRating ? `<span class="badge prev">이전: ${ratingLabel}</span>` : ""}
        </div>
        <div class="iv-progress">${idx + 1} / ${queue.length} <span class="iv-timer" id="iv-timer">00:00</span></div>
      </div>

      <div class="iv-q">Q. ${esc(q.q)}</div>

      <textarea id="iv-answer" class="iv-answer" placeholder="여기에 내 답변을 직접 적어보세요 (말로 설명하듯). 다 적으면 아래 '모범답안 보기'로 대조하세요.">${esc(prevNote)}</textarea>

      <div class="iv-actions">
        <button id="iv-reveal" class="primary">모범답안 보기</button>
        <button id="iv-ai" class="ai-btn">🤖 AI 채점</button>
        <button id="iv-skip" class="ghost">건너뛰기 →</button>
      </div>

      <div id="iv-ai-panel" class="iv-ai-panel" hidden></div>

      <div id="iv-model" class="iv-model" hidden>
        <div class="iv-model-title">모범답안</div>
        <div class="iv-model-body">${esc(q.a)}</div>
        <div class="iv-rate">
          <span>스스로 평가:</span>
          <button class="rate know" data-r="know">✅ 알았음</button>
          <button class="rate meh" data-r="meh">🤔 애매</button>
          <button class="rate dunno" data-r="dunno">❌ 몰랐음</button>
        </div>
      </div>`;

    startTimer();
    convo = [];

    $("iv-ai").addEventListener("click", () => {
      if (!window.IP.ai.hasKey()) {
        if (window.IP.app) window.IP.app.openAISettings();
        return;
      }
      convo = [{ role: "user", content: window.IP.ai.buildFirstMessage(q.q, q.a, $("iv-answer").value) }];
      runAI();
    });

    $("iv-reveal").addEventListener("click", () => {
      $("iv-model").hidden = false;
      $("iv-reveal").disabled = true;
      revealed = true;
      stopTimer();
    });
    $("iv-skip").addEventListener("click", next);
    card.querySelectorAll(".rate").forEach((btn) => {
      btn.addEventListener("click", () => {
        const note = $("iv-answer").value.trim();
        store.setRating(q.id, btn.dataset.r, note);
        updateStats();
        next();
      });
    });
  }

  function next() {
    idx += 1;
    showCard();
  }

  function start() {
    queue = buildQueue();
    idx = 0;
    showCard();
    updateStats();
  }

  function render() {
    updateStats();
    // 컨트롤 이벤트(한 번만 바인딩)
    if (!render._bound) {
      $("iv-start").addEventListener("click", start);
      render._bound = true;
    }
    // 첫 진입 안내
    if (!queue.length) {
      $("iv-card").innerHTML = `<div class="iv-empty">위에서 범위를 고르고 <b>시작</b>을 눌러 모의 면접을 시작하세요.</div>`;
    }
  }

  window.IP = window.IP || {};
  window.IP.interview = { render };
})();
