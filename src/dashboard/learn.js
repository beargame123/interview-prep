/* 학습 페이지: ?phase=&stage= 로 한 스테이지를 새 탭에서 학습.
 * - 진도 체크는 IP.store(localStorage) 사용 → 대시보드 로드맵 인덱스와 키 공유.
 * - "학습 완료" 시 토픽/실습 일괄 체크. "Claude 퀴즈용 복사"로 학습 내용을 클립보드에 담아 Chrome의 Claude에 붙여넣어 퀴즈 생성.
 */
(function () {
  const store = window.IP.store;
  const topicKey = (st, i) => `${st.id}/t${i}`;
  const handsKey = (st, i) => `${st.id}/h${i}`;

  function el(tag, cls, text) {
    const n = document.createElement(tag);
    if (cls) n.className = cls;
    if (text != null) n.textContent = text;
    return n;
  }
  const params = new URLSearchParams(location.search);
  const phaseId = params.get("phase");
  const stageId = params.get("stage");

  // 전체 스테이지 평탄화(순서 유지) — 이전/다음 이동용
  const flat = [];
  (window.ROADMAP || []).forEach((ph) =>
    (ph.stages || []).forEach((st) => flat.push({ ph, st }))
  );
  const curIdx = flat.findIndex((x) => x.ph.id === phaseId && x.st.id === stageId);
  const cur = curIdx >= 0 ? flat[curIdx] : null;

  const root = document.getElementById("learn-root");
  const crumb = document.getElementById("learn-crumb");
  const nav = document.getElementById("learn-nav");

  if (!cur) {
    crumb.textContent = "학습 항목을 찾을 수 없어요";
    root.appendChild(el("p", "muted-empty", "대시보드 로드맵에서 스테이지의 '열기'를 눌러 들어와 주세요."));
    document.title = "CodePrep — 학습";
    return;
  }

  const { ph, st } = cur;
  document.title = `${st.title} · CodePrep`;
  crumb.innerHTML = "";
  crumb.append(
    el("span", "lc-phase", `${ph.emoji || ""} ${ph.title}`),
    el("span", "lc-sep", "›"),
    el("span", "lc-stage", `S${st.num}. ${st.title}${st.star ? " ⭐" : ""}`)
  );

  // ----- 진도 키/카운트 -----
  function keys() {
    const k = [];
    (st.topics || []).forEach((_, i) => k.push(topicKey(st, i)));
    (st.handsOn || []).forEach((_, i) => k.push(handsKey(st, i)));
    return k;
  }
  const countEl = el("span", "learn-count");
  function refreshCount() {
    const all = keys();
    const done = all.filter((k) => store.isDone(k)).length;
    countEl.textContent = `${done}/${all.length}`;
    countEl.classList.toggle("complete", all.length > 0 && done === all.length);
  }

  function checkRow(key, mainText, subText, extraClass) {
    const row = el("label", "rm-item" + (extraClass ? " " + extraClass : "") + (store.isDone(key) ? " done" : ""));
    const cb = el("input");
    cb.type = "checkbox";
    cb.checked = store.isDone(key);
    cb.addEventListener("change", () => {
      store.setDone(key, cb.checked);
      row.classList.toggle("done", cb.checked);
      refreshCount();
    });
    const body = el("div", "rm-item-body");
    body.appendChild(el("span", "rm-item-t", mainText));
    if (subText) body.appendChild(el("div", "rm-item-p", subText));
    row.append(cb, body);
    return row;
  }

  // ----- 본문 -----
  const head = el("div", "learn-stage-head");
  const titleWrap = el("div");
  titleWrap.append(el("div", "learn-eyebrow", `${ph.title} · 단계 ${st.num}${st.estimate ? " · ⏱ " + st.estimate : ""}`));
  titleWrap.append(el("h1", "learn-title", `${st.title}${st.star ? " ⭐" : ""}`));
  head.append(titleWrap, countEl);
  root.appendChild(head);

  if (st.goal) {
    const g = el("p", "learn-goal");
    g.append(el("b", null, "🎯 목표 "), document.createTextNode(st.goal));
    root.appendChild(g);
  }
  if (st.prerequisites && st.prerequisites !== "없음") {
    const pr = el("p", "rm-line muted");
    pr.append(el("b", null, "🔑 전제 "), document.createTextNode(st.prerequisites));
    root.appendChild(pr);
  }

  if (st.topics && st.topics.length) {
    root.appendChild(el("div", "rm-sub-title", "핵심 토픽"));
    st.topics.forEach((t, i) => root.appendChild(checkRow(topicKey(st, i), t.t, t.p)));
  }
  if (st.handsOn && st.handsOn.length) {
    root.appendChild(el("div", "rm-sub-title", "🛠 직접 해보기"));
    st.handsOn.forEach((h, i) => root.appendChild(checkRow(handsKey(st, i), h, null, "hands")));
  }
  if (st.selfCheck && st.selfCheck.length) {
    root.appendChild(el("div", "rm-sub-title", "❓ 자가점검 (말로 답해보기)"));
    const ul = el("ul", "rm-selfcheck");
    st.selfCheck.forEach((q) => ul.appendChild(el("li", null, q)));
    root.appendChild(ul);
  }
  if (st.resources && st.resources.length) {
    const res = el("div", "rm-res");
    res.appendChild(el("span", "rm-res-label", "📚"));
    st.resources.forEach((r) => res.appendChild(el("span", "rm-chip", r)));
    root.appendChild(res);
  }

  // ----- 액션 바 -----
  const actions = el("div", "learn-actions");
  const doneBtn = el("button", "primary", "✅ 이 단계 학습 완료(전체 체크)");
  doneBtn.addEventListener("click", () => {
    keys().forEach((k) => store.setDone(k, true));
    render();
  });
  const quizBtn = el("button", "ai-btn", "📋 Claude 퀴즈용으로 복사");
  quizBtn.addEventListener("click", copyForQuiz);
  const msg = el("span", "learn-msg");
  actions.append(doneBtn, quizBtn, msg);
  root.appendChild(actions);
  root.appendChild(
    el("p", "learn-hint", "복사 후 Chrome의 Claude(또는 claude.ai)에 붙여넣으면 이 단계 학습 내용으로 퀴즈를 만들어 줘요.")
  );

  // ----- 퀴즈 프롬프트 만들기 + 복사 -----
  function buildQuizPrompt() {
    const lines = [];
    lines.push(`다음은 백엔드 면접 대비 학습 내용입니다. 이 내용만을 근거로 면접 대비 퀴즈 8문제를 만들어 주세요.`);
    lines.push(`조건: 단답/서술/비교 문제를 섞고, 각 문제에 정답과 2~3줄 해설을 달고, 마지막에 난이도 높은 꼬리질문 2개를 추가해 주세요. 학습 내용에 없는 사실은 지어내지 마세요.`);
    lines.push("");
    lines.push(`# 주제: ${ph.title} > ${st.title}`);
    if (st.goal) lines.push(`목표: ${st.goal}`);
    lines.push("");
    lines.push("## 핵심 토픽");
    (st.topics || []).forEach((t) => lines.push(`- ${t.t}: ${t.p}`));
    if (st.handsOn && st.handsOn.length) {
      lines.push("");
      lines.push("## 직접 해보기");
      st.handsOn.forEach((h) => lines.push(`- ${h}`));
    }
    if (st.selfCheck && st.selfCheck.length) {
      lines.push("");
      lines.push("## 참고 자가점검 질문");
      st.selfCheck.forEach((q) => lines.push(`- ${q}`));
    }
    return lines.join("\n");
  }

  function flashMsg(text, ok) {
    msg.textContent = text;
    msg.style.color = ok === false ? "#fca5a5" : "#86efac";
    setTimeout(() => (msg.textContent = ""), 4000);
  }

  async function copyForQuiz() {
    const text = buildQuizPrompt();
    try {
      await navigator.clipboard.writeText(text);
      flashMsg("복사됨 ✓ Claude에 붙여넣어 퀴즈를 받아보세요");
    } catch (_) {
      // 폴백: 임시 textarea
      const ta = document.createElement("textarea");
      ta.value = text;
      ta.style.position = "fixed";
      ta.style.opacity = "0";
      document.body.appendChild(ta);
      ta.focus();
      ta.select();
      let ok = false;
      try {
        ok = document.execCommand("copy");
      } catch (e) {}
      document.body.removeChild(ta);
      flashMsg(ok ? "복사됨 ✓" : "복사 실패 — 길게 눌러 직접 복사해 주세요", ok);
    }
  }

  // ----- 이전/다음 -----
  nav.innerHTML = "";
  const prev = curIdx > 0 ? flat[curIdx - 1] : null;
  const next = curIdx < flat.length - 1 ? flat[curIdx + 1] : null;
  function navLink(item, label) {
    const a = el("a", "ghost sm", label);
    a.href = `learn.html?phase=${encodeURIComponent(item.ph.id)}&stage=${encodeURIComponent(item.st.id)}`;
    return a;
  }
  if (prev) nav.appendChild(navLink(prev, "← 이전"));
  if (next) nav.appendChild(navLink(next, "다음 →"));

  // 학습완료 후 본문 갱신을 위해 render()로 감싸 재실행
  function render() {
    location.reload();
  }

  refreshCount();
})();
