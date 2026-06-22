/* 팝업: 오늘/연속/주간 요약 + 최근 기록 */
(function () {
  const { store, stats } = globalThis.Algo;

  const $ = (id) => document.getElementById(id);

  function siteBadge(site) {
    const meta = { baekjoon: "백준", programmers: "프로그래머스", leetcode: "LeetCode" };
    const color = { baekjoon: "#0076c0", programmers: "#21a35e", leetcode: "#ffa116" };
    const span = document.createElement("span");
    span.className = "badge";
    span.style.background = color[site] || "#6366f1";
    span.textContent = meta[site] || site;
    return span;
  }

  function renderRecent(sessions) {
    const list = $("recent-list");
    list.innerHTML = "";
    const recent = [...sessions].reverse().slice(0, 6);
    if (recent.length === 0) {
      const li = document.createElement("li");
      li.className = "empty";
      li.textContent = "아직 기록이 없어요. 문제 페이지를 열면 타이머가 떠요!";
      list.appendChild(li);
      return;
    }
    for (const s of recent) {
      const li = document.createElement("li");
      li.appendChild(siteBadge(s.site));

      const title = document.createElement("span");
      title.className = "r-title";
      title.textContent = `${s.problemId} · ${s.title}`;
      title.title = s.title;
      li.appendChild(title);

      const meta = document.createElement("span");
      meta.className = "r-meta";
      meta.textContent = stats.formatDuration(s.seconds);
      li.appendChild(meta);

      const st = document.createElement("span");
      st.className = "r-status";
      st.textContent = s.status === "solved" ? "✅" : "🔁";
      st.title = s.status === "solved" ? "해결" : "시도";
      li.appendChild(st);

      list.appendChild(li);
    }
  }

  async function init() {
    const sessions = await store.getSessions();
    const today = stats.todayStats(sessions);
    const week = stats.weekStats(sessions);

    $("today-solved").textContent = today.solved;
    $("today-time").textContent = stats.formatDuration(today.seconds);
    $("streak").textContent = stats.streak(sessions);
    $("week-solved").textContent = `이번 주 ${week.solved}문제`;

    renderRecent(sessions);
  }

  $("open-dashboard").addEventListener("click", () => chrome.runtime.openOptionsPage());
  init();
})();
