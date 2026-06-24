/* 로드맵 탭(인덱스형): 페이즈 → 스테이지 목록. 스테이지를 누르면 learn.html이 별도 창(팝업)으로 열린다.
 * 상세 학습/체크는 learn.html에서, 여기서는 진행률 인덱스만.
 * 데이터: window.ROADMAP, window.ROADMAP_PLAN / 진도: window.IP.store (learn.html과 키 공유)
 */
(function () {
  const store = window.IP.store;
  const PRIO_LABEL = { 1: "최우선", 2: "중요", 3: "후순위" };
  let counters = [];

  const topicKey = (st, i) => `${st.id}/t${i}`;
  const handsKey = (st, i) => `${st.id}/h${i}`;
  const gateKey = (ph, i) => `${ph.id}/gate${i}`;

  function stageKeys(st) {
    const k = [];
    (st.topics || []).forEach((_, i) => k.push(topicKey(st, i)));
    (st.handsOn || []).forEach((_, i) => k.push(handsKey(st, i)));
    return k;
  }
  function phaseKeys(ph) {
    const k = [];
    (ph.stages || []).forEach((st) => k.push(...stageKeys(st)));
    (ph.gate || []).forEach((_, i) => k.push(gateKey(ph, i)));
    return k;
  }
  const countDone = (keys) => keys.filter((k) => store.isDone(k)).length;

  function el(tag, cls, text) {
    const n = document.createElement(tag);
    if (cls) n.className = cls;
    if (text != null) n.textContent = text;
    return n;
  }
  const refresh = () => counters.forEach((fn) => fn());

  function progressBar() {
    const wrap = el("div", "bar");
    const fill = el("div", "bar-fill");
    wrap.appendChild(fill);
    return { wrap, fill };
  }

  function checkRow(key, mainText, extraClass) {
    const row = el("label", "rm-item" + (extraClass ? " " + extraClass : "") + (store.isDone(key) ? " done" : ""));
    const cb = el("input");
    cb.type = "checkbox";
    cb.checked = store.isDone(key);
    cb.addEventListener("change", () => {
      store.setDone(key, cb.checked);
      row.classList.toggle("done", cb.checked);
      refresh();
    });
    const body = el("div", "rm-item-body");
    body.appendChild(el("span", "rm-item-t", mainText));
    row.append(cb, body);
    return row;
  }

  // 스테이지 = learn.html로 가는 링크 행
  function buildStageRow(ph, st) {
    const a = el("a", "rm-srow" + (st.star ? " star" : ""));
    a.href = `learn.html?phase=${encodeURIComponent(ph.id)}&stage=${encodeURIComponent(st.id)}`;
    a.target = "_blank";
    a.rel = "noopener";

    // 일반 클릭 → 별도 학습 '창'(팝업 윈도우)으로 띄움. Ctrl/⌘/Shift/가운데 클릭은 기본(새 탭) 허용.
    a.addEventListener("click", (e) => {
      if (e.metaKey || e.ctrlKey || e.shiftKey || e.button === 1) return;
      e.preventDefault();
      const features = "popup=yes,width=1040,height=940,left=140,top=60";
      const w = window.open(a.href, "codeprep-learn", features);
      if (w) {
        try { w.opener = null; } catch (_) {}
        w.focus();
      } else {
        window.open(a.href, "_blank"); // 팝업 차단 시 새 탭 폴백
      }
    });

    a.appendChild(el("span", "rm-srow-num", `S${st.num}`));
    const mid = el("span", "rm-srow-mid");
    mid.appendChild(el("span", "rm-srow-name", st.title + (st.star ? " ⭐" : "")));
    if (st.estimate) mid.appendChild(el("span", "rm-srow-est", "⏱ " + st.estimate));
    a.appendChild(mid);

    const cnt = el("span", "rm-srow-count");
    a.appendChild(cnt);
    a.appendChild(el("span", "rm-srow-open", "열기 ↗"));

    const keys = stageKeys(st);
    counters.push(() => {
      const done = countDone(keys);
      cnt.textContent = `${done}/${keys.length}`;
      a.classList.toggle("done", keys.length > 0 && done === keys.length);
    });
    return a;
  }

  function buildGate(ph) {
    if (!ph.gate || !ph.gate.length) return null;
    const box = el("section", "rm-gate");
    box.appendChild(el("div", "rm-gate-title", "🚩 통과 기준 — 다 체크되면 다음 페이즈로"));
    ph.gate.forEach((g, i) => box.appendChild(checkRow(gateKey(ph, i), g, "gate")));
    return box;
  }

  function buildPhase(ph) {
    const section = el("section", "rm-phase prio-bd-" + ph.priority);
    const head = el("div", "rm-phase-head");
    head.appendChild(el("span", "rm-phase-emoji", ph.emoji || "📌"));
    head.appendChild(el("h2", null, ph.title));
    if (ph.track) head.appendChild(el("span", "rm-track", ph.track));
    head.appendChild(el("span", `prio prio-${ph.priority}`, PRIO_LABEL[ph.priority] || ""));
    if (ph.estimate) head.appendChild(el("span", "rm-phase-est", ph.estimate));
    const pcnt = el("span", "rm-phase-count");
    head.appendChild(pcnt);
    section.appendChild(head);

    if (ph.summary) section.appendChild(el("p", "rm-phase-summary", ph.summary));
    const { wrap, fill } = progressBar();
    section.appendChild(wrap);

    const list = el("div", "rm-srow-list");
    (ph.stages || []).forEach((st) => list.appendChild(buildStageRow(ph, st)));
    section.appendChild(list);

    const gate = buildGate(ph);
    if (gate) section.appendChild(gate);

    const keys = phaseKeys(ph);
    counters.push(() => {
      const done = countDone(keys);
      pcnt.textContent = `${done}/${keys.length}`;
      fill.style.width = (keys.length ? (done / keys.length) * 100 : 0) + "%";
    });
    return section;
  }

  // ----- 전체 계획 패널 -----
  function buildPlan() {
    const plan = window.ROADMAP_PLAN;
    if (!plan) return null;
    const box = el("section", "rm-plan");
    const head = el("button", "rm-plan-head");
    head.type = "button";
    const chev = el("span", "rm-chevron", "▸");
    head.append(chev, el("span", null, "🗺 전체 학습 계획 (주차별 · 7일 시작 · CodePrep 활용)"));
    box.appendChild(head);
    const body = el("div", "rm-plan-body");
    body.hidden = true;
    if (plan.overview) body.appendChild(el("p", "rm-line", plan.overview));

    if (plan.sevenDay && plan.sevenDay.length) {
      body.appendChild(el("div", "rm-sub-title", "이번 주 7일 시작 플랜"));
      const t = el("table", "rm-plan-tbl");
      plan.sevenDay.forEach((d) => {
        const tr = el("tr");
        tr.appendChild(el("td", "rm-plan-k", d.day));
        const td = el("td");
        td.appendChild(el("div", "rm-plan-action", d.action));
        if (d.daily) td.appendChild(el("div", "rm-plan-daily", d.daily));
        tr.appendChild(td);
        t.appendChild(tr);
      });
      body.appendChild(t);
    }
    if (plan.weekly && plan.weekly.length) {
      body.appendChild(el("div", "rm-sub-title", "주차별 플랜 (상시: 🟩 알고리즘 1문제/일 · ☕ Java/Kotlin 심화 1개/일)"));
      const t = el("table", "rm-plan-tbl");
      const h2 = el("tr");
      ["주차", "평일 메인", "주말 실습", "알고리즘"].forEach((h) => h2.appendChild(el("th", null, h)));
      t.appendChild(h2);
      plan.weekly.forEach((w) => {
        const tr = el("tr");
        tr.appendChild(el("td", "rm-plan-k", w.week));
        tr.appendChild(el("td", null, w.main));
        tr.appendChild(el("td", null, w.weekend));
        tr.appendChild(el("td", null, w.algo));
        t.appendChild(tr);
      });
      body.appendChild(t);
      (plan.extend || []).forEach((line) => body.appendChild(el("p", "rm-line muted", line)));
    }
    if (plan.codeprep && plan.codeprep.length) {
      body.appendChild(el("div", "rm-sub-title", "CodePrep 활용법"));
      plan.codeprep.forEach((c) => {
        body.appendChild(el("div", "rm-cp-t", c.title));
        const ul = el("ul", "rm-selfcheck");
        (c.items || []).forEach((it) => ul.appendChild(el("li", null, it)));
        body.appendChild(ul);
      });
    }
    box.appendChild(body);
    head.addEventListener("click", () => {
      body.hidden = !body.hidden;
      chev.textContent = body.hidden ? "▸" : "▾";
    });
    return box;
  }

  function render() {
    const root = document.getElementById("roadmap-view");
    root.innerHTML = "";
    counters = [];

    const phases = (window.ROADMAP || []).slice();

    const overall = el("div", "overall");
    const top = el("div", "overall-top");
    top.appendChild(el("span", null, "전체 진행률"));
    const pct = el("span", null, "0%");
    pct.id = "overall-pct";
    top.appendChild(pct);
    overall.appendChild(top);
    const { wrap, fill } = progressBar();
    overall.appendChild(wrap);
    overall.appendChild(el("div", "rm-tip", "스테이지를 누르면 별도 학습 창이 떠요(Ctrl/⌘+클릭은 새 탭). 학습 후 '✅ 학습 완료'와 '📋 Claude 퀴즈용 복사'를 쓰세요."));
    root.appendChild(overall);

    const allKeys = [];
    phases.forEach((ph) => allKeys.push(...phaseKeys(ph)));
    counters.push(() => {
      const done = countDone(allKeys);
      const total = allKeys.length;
      pct.textContent = `${total ? Math.round((done / total) * 100) : 0}% (${done}/${total})`;
      fill.style.width = (total ? (done / total) * 100 : 0) + "%";
    });

    const plan = buildPlan();
    if (plan) root.appendChild(plan);

    phases.forEach((ph) => root.appendChild(buildPhase(ph)));
    refresh();
  }

  window.IP = window.IP || {};
  window.IP.roadmap = { render };
})();
