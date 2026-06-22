/* 학습 통계 탭: 타이머가 chrome.storage에 기록한 풀이 세션을 시각화 + 설정/백업 */
(function () {
  const { store, stats } = globalThis.Algo;
  const $ = (id) => document.getElementById(id);

  const SITE_NAME = { baekjoon: "백준", programmers: "프로그래머스", leetcode: "LeetCode" };
  const SITE_COLOR = { baekjoon: "#0076c0", programmers: "#21a35e", leetcode: "#ffa116" };

  function heatLevel(count, max) {
    if (count <= 0) return 0;
    const ratio = count / Math.max(1, max);
    if (ratio > 0.75) return 4;
    if (ratio > 0.5) return 3;
    if (ratio > 0.25) return 2;
    return 1;
  }

  function renderHeatmap(sessions) {
    const buckets = stats.dailyBuckets(sessions, 84);
    const max = buckets.reduce((m, b) => Math.max(m, b.count), 0);
    const wrap = $("heatmap");
    wrap.innerHTML = "";
    const firstDow = new Date(buckets[0].date).getDay();
    for (let i = 0; i < firstDow; i++) wrap.appendChild(document.createElement("div"));
    for (const b of buckets) {
      const cell = document.createElement("div");
      cell.className = `cell l${heatLevel(b.count, max)}`;
      cell.title = `${b.date} · ${b.count}회 (해결 ${b.solved}) · ${stats.formatDuration(b.seconds)}`;
      wrap.appendChild(cell);
    }
  }

  function renderBars(elId, rows, labelFn) {
    const el = $(elId);
    el.innerHTML = "";
    if (rows.length === 0) {
      const p = document.createElement("div");
      p.className = "muted-empty";
      p.textContent = "데이터가 쌓이면 여기에 표시돼요.";
      el.appendChild(p);
      return;
    }
    const max = rows.reduce((m, r) => Math.max(m, r.count), 0);
    for (const r of rows.slice(0, 10)) {
      const row = document.createElement("div");
      row.className = "bar-row";
      const key = document.createElement("div");
      key.className = "bar-key";
      key.textContent = labelFn ? labelFn(r.key) : r.key;
      key.title = key.textContent;
      const track = document.createElement("div");
      track.className = "bar-track";
      const fill = document.createElement("div");
      fill.className = "bar-fill";
      fill.style.width = `${Math.round((r.count / max) * 100)}%`;
      track.appendChild(fill);
      const val = document.createElement("div");
      val.className = "bar-val";
      val.textContent = r.count;
      row.append(key, track, val);
      el.appendChild(row);
    }
  }

  function badge(site) {
    const b = document.createElement("span");
    b.className = "badge";
    b.style.background = SITE_COLOR[site] || "#6366f1";
    b.textContent = SITE_NAME[site] || site;
    return b;
  }

  function renderTable(sessions) {
    const body = $("recent-body");
    body.innerHTML = "";
    const recent = [...sessions].reverse().slice(0, 25);
    for (const s of recent) {
      const tr = document.createElement("tr");
      const date = document.createElement("td");
      date.textContent = new Date(s.endedAt || s.startedAt).toLocaleString("ko-KR", {
        month: "2-digit",
        day: "2-digit",
        hour: "2-digit",
        minute: "2-digit",
      });
      const site = document.createElement("td");
      site.appendChild(badge(s.site));
      const prob = document.createElement("td");
      const a = document.createElement("a");
      a.href = s.url || "#";
      a.target = "_blank";
      a.rel = "noopener";
      a.textContent = `${s.problemId} · ${s.title}`;
      a.style.color = "#c7cbd6";
      prob.appendChild(a);
      const diff = document.createElement("td");
      diff.textContent = s.difficulty || "-";
      const time = document.createElement("td");
      time.textContent = stats.formatDuration(s.seconds);
      const st = document.createElement("td");
      st.textContent = s.status === "solved" ? "✅ 해결" : "🔁 시도";
      tr.append(date, site, prob, diff, time, st);
      body.appendChild(tr);
    }
    if (recent.length === 0) {
      const tr = document.createElement("tr");
      const td = document.createElement("td");
      td.colSpan = 6;
      td.className = "muted-empty";
      td.textContent = "아직 기록이 없어요. 문제 페이지에서 타이머를 켜보세요!";
      tr.appendChild(td);
      body.appendChild(tr);
    }
  }

  function flash(text) {
    const m = $("msg");
    m.textContent = text;
    setTimeout(() => (m.textContent = ""), 2500);
  }

  async function renderStats() {
    const sessions = await store.getSessions();
    const total = stats.summarize(sessions);
    const today = stats.todayStats(sessions);
    $("total-solved").textContent = total.solved;
    $("total-time").textContent = stats.formatDuration(total.seconds);
    $("streak").textContent = stats.streak(sessions);
    $("today-solved").textContent = today.solved;
    renderHeatmap(sessions);
    renderBars("by-tag", stats.byTag(sessions));
    renderBars("by-site", stats.bySite(sessions), (k) => SITE_NAME[k] || k);
    renderTable(sessions);
  }

  // ---- 설정/백업 (페이지 로드 시 1회 바인딩) ----
  store.getSettings().then((s) => {
    $("pomo").value = s.pomodoroMinutes;
    $("autostart").checked = !!s.autoStart;
  });

  $("save-settings").addEventListener("click", async () => {
    const minutes = Math.min(120, Math.max(1, parseInt($("pomo").value, 10) || 25));
    await store.updateSettings({ pomodoroMinutes: minutes, autoStart: $("autostart").checked });
    $("pomo").value = minutes;
    flash("저장했어요 ✓");
  });

  $("export").addEventListener("click", async () => {
    const blob = new Blob([await store.exportJson()], { type: "application/json" });
    const a = document.createElement("a");
    a.href = URL.createObjectURL(blob);
    a.download = `codeprep-stats-${stats.dayKey(Date.now())}.json`;
    a.click();
    URL.revokeObjectURL(a.href);
  });

  $("import").addEventListener("click", () => $("import-file").click());
  $("import-file").addEventListener("change", async (e) => {
    const file = e.target.files[0];
    if (!file) return;
    try {
      await store.importJson(await file.text());
      await renderStats();
      flash("가져오기 완료 ✓");
    } catch (_) {
      flash("올바른 JSON 파일이 아니에요.");
    }
    e.target.value = "";
  });

  $("clear").addEventListener("click", async () => {
    if (!confirm("모든 풀이 기록을 삭제할까요? (설정은 유지됩니다)")) return;
    await store.clearSessions();
    await renderStats();
    flash("기록을 삭제했어요.");
  });

  globalThis.AlgoDash = { renderStats };
})();
