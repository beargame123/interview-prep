/* 로드맵 탭: 페이즈 → 스테이지 → 토픽 체크리스트 (단계별 학습 순서)
 * 데이터: window.ROADMAP (페이즈 배열), window.ROADMAP_PLAN (선택: 주차별/7일/활용법)
 * 진도: window.IP.store (localStorage)
 * 체크 토글 시 전체 재렌더 없이 카운터/진행바만 갱신하고, 스테이지는 접기/펼치기.
 */
(function () {
  const store = window.IP.store;
  const PRIO_LABEL = { 1: "최우선", 2: "중요", 3: "후순위" };

  const expanded = new Set(); // 펼쳐진 스테이지 id
  let counters = []; // 진행률 갱신 함수들 (토글 때 일괄 실행)

  // ---- 진도 키 ----
  const topicKey = (st, i) => `${st.id}/t${i}`;
  const handsKey = (st, i) => `${st.id}/h${i}`;
  const gateKey = (ph, i) => `${ph.id}/gate${i}`;

  function stageKeys(st) {
    const keys = [];
    (st.topics || []).forEach((_, i) => keys.push(topicKey(st, i)));
    (st.handsOn || []).forEach((_, i) => keys.push(handsKey(st, i)));
    return keys;
  }
  function phaseKeys(ph) {
    const keys = [];
    (ph.stages || []).forEach((st) => keys.push(...stageKeys(st)));
    (ph.gate || []).forEach((_, i) => keys.push(gateKey(ph, i)));
    return keys;
  }
  const countDone = (keys) => keys.filter((k) => store.isDone(k)).length;

  function el(tag, cls, text) {
    const n = document.createElement(tag);
    if (cls) n.className = cls;
    if (text != null) n.textContent = text;
    return n;
  }

  function refresh() {
    counters.forEach((fn) => fn());
  }

  // 체크 항목 한 줄 (label + checkbox + 본문[+부연])
  function checkRow(key, mainText, subText, extraClass) {
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
    if (subText) body.appendChild(el("div", "rm-item-p", subText));
    row.append(cb, body);
    return row;
  }

  function progressBar() {
    const wrap = el("div", "bar");
    const fill = el("div", "bar-fill");
    wrap.appendChild(fill);
    return { wrap, fill };
  }

  // ---- 스테이지 카드 ----
  function buildStage(ph, st) {
    const card = el("section", "rm-stage" + (st.star ? " star" : ""));

    // 헤더 (클릭하면 접기/펼치기)
    const head = el("button", "rm-stage-head");
    head.type = "button";
    const chevron = el("span", "rm-chevron", "▸");
    const titleWrap = el("div", "rm-stage-title");
    titleWrap.appendChild(el("span", "rm-stage-num", `S${st.num}`));
    titleWrap.appendChild(el("span", "rm-stage-name", st.title + (st.star ? " ⭐" : "")));
    const meta = el("div", "rm-stage-meta");
    if (st.estimate) meta.appendChild(el("span", "rm-est", "⏱ " + st.estimate));
    const cnt = el("span", "rm-stage-count");
    meta.appendChild(cnt);
    head.append(chevron, titleWrap, meta);
    card.appendChild(head);

    // 본문
    const bodyWrap = el("div", "rm-stage-body");
    if (st.goal) {
      const g = el("p", "rm-line");
      g.append(el("b", null, "🎯 목표 "), document.createTextNode(st.goal));
      bodyWrap.appendChild(g);
    }
    if (st.prerequisites && st.prerequisites !== "없음") {
      const pr = el("p", "rm-line muted");
      pr.append(el("b", null, "🔑 전제 "), document.createTextNode(st.prerequisites));
      bodyWrap.appendChild(pr);
    }

    // 핵심 토픽 (체크)
    if (st.topics && st.topics.length) {
      bodyWrap.appendChild(el("div", "rm-sub-title", "핵심 토픽"));
      st.topics.forEach((t, i) => bodyWrap.appendChild(checkRow(topicKey(st, i), t.t, t.p)));
    }
    // 직접 해보기 (체크)
    if (st.handsOn && st.handsOn.length) {
      bodyWrap.appendChild(el("div", "rm-sub-title", "🛠 직접 해보기"));
      st.handsOn.forEach((h, i) => bodyWrap.appendChild(checkRow(handsKey(st, i), h, null, "hands")));
    }
    // 자가점검 (표시만 — 실전 풀이 탭에서 연습)
    if (st.selfCheck && st.selfCheck.length) {
      bodyWrap.appendChild(el("div", "rm-sub-title", "❓ 자가점검 (실전 풀이 탭에서 말로 답해보기)"));
      const ul = el("ul", "rm-selfcheck");
      st.selfCheck.forEach((q) => ul.appendChild(el("li", null, q)));
      bodyWrap.appendChild(ul);
    }
    // 추천 자료 (칩)
    if (st.resources && st.resources.length) {
      const res = el("div", "rm-res");
      res.appendChild(el("span", "rm-res-label", "📚"));
      st.resources.forEach((r) => res.appendChild(el("span", "rm-chip", r)));
      bodyWrap.appendChild(res);
    }
    card.appendChild(bodyWrap);

    // 접기 상태 반영
    function applyExpand() {
      const open = expanded.has(st.id);
      bodyWrap.hidden = !open;
      chevron.textContent = open ? "▾" : "▸";
      card.classList.toggle("open", open);
    }
    head.addEventListener("click", () => {
      if (expanded.has(st.id)) expanded.delete(st.id);
      else expanded.add(st.id);
      applyExpand();
    });
    applyExpand();

    // 카운터 갱신
    const keys = stageKeys(st);
    counters.push(() => {
      const done = countDone(keys);
      cnt.textContent = `${done}/${keys.length}`;
      cnt.classList.toggle("complete", keys.length > 0 && done === keys.length);
    });

    return card;
  }

  // ---- 페이즈 통과 기준 ----
  function buildGate(ph) {
    if (!ph.gate || !ph.gate.length) return null;
    const box = el("section", "rm-gate");
    box.appendChild(el("div", "rm-gate-title", "🚩 통과 기준 — 다 체크되면 다음 페이즈로"));
    ph.gate.forEach((g, i) => box.appendChild(checkRow(gateKey(ph, i), g, null, "gate")));
    return box;
  }

  // ---- 페이즈 ----
  function buildPhase(ph) {
    const section = el("section", "rm-phase prio-bd-" + ph.priority);

    const head = el("div", "rm-phase-head");
    head.appendChild(el("span", "rm-phase-emoji", ph.emoji || "📌"));
    const h2 = el("h2", null, ph.title);
    head.appendChild(h2);
    if (ph.track) head.appendChild(el("span", "rm-track", ph.track));
    head.appendChild(el("span", `prio prio-${ph.priority}`, PRIO_LABEL[ph.priority] || ""));
    if (ph.estimate) head.appendChild(el("span", "rm-phase-est", ph.estimate));
    const pcnt = el("span", "rm-phase-count");
    head.appendChild(pcnt);
    section.appendChild(head);

    if (ph.summary) section.appendChild(el("p", "rm-phase-summary", ph.summary));

    const { wrap, fill } = progressBar();
    section.appendChild(wrap);

    (ph.stages || []).forEach((st) => section.appendChild(buildStage(ph, st)));
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

  // ---- 전체 계획 패널 (선택) ----
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

    // 7일 시작 플랜
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

    // 주차별
    if (plan.weekly && plan.weekly.length) {
      body.appendChild(el("div", "rm-sub-title", "주차별 플랜 (상시: 🟩 알고리즘 1문제/일 · 🐍 Python 30분/일)"));
      const t = el("table", "rm-plan-tbl");
      const head2 = el("tr");
      ["주차", "평일 메인", "주말 실습", "알고리즘"].forEach((h) => head2.appendChild(el("th", null, h)));
      t.appendChild(head2);
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

    // CodePrep 활용법
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

    // 전체 진행률
    const overall = el("div", "overall");
    const top = el("div", "overall-top");
    top.appendChild(el("span", null, "전체 진행률"));
    const pct = el("span", null, "0%");
    pct.id = "overall-pct";
    top.appendChild(pct);
    overall.appendChild(top);
    const { wrap, fill } = progressBar();
    overall.appendChild(wrap);
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

    // 기본으로 첫 페이즈의 첫 스테이지만 펼침
    if (expanded.size === 0 && phases[0] && phases[0].stages && phases[0].stages[0]) {
      expanded.add(phases[0].stages[0].id);
    }

    phases.forEach((ph) => root.appendChild(buildPhase(ph)));

    refresh();
  }

  window.IP = window.IP || {};
  window.IP.roadmap = { render };
})();
