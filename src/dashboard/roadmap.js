/* 로드맵 탭: 우선순위별 카테고리 → 그룹 → 체크 항목 + 진행률 */
(function () {
  const store = window.IP.store;
  const PRIO_LABEL = { 1: "최우선", 2: "중요", 3: "후순위" };

  function itemKey(catId, gi, ii) {
    return `${catId}:${gi}:${ii}`;
  }

  function countCategory(cat) {
    let total = 0;
    let done = 0;
    cat.groups.forEach((g, gi) => {
      g.items.forEach((_, ii) => {
        total += 1;
        if (store.isDone(itemKey(cat.id, gi, ii))) done += 1;
      });
    });
    return { total, done };
  }

  function render() {
    const root = document.getElementById("roadmap-view");
    root.innerHTML = "";

    const cats = [...window.ROADMAP].sort((a, b) => a.priority - b.priority);

    // 전체 진행률
    let gTotal = 0;
    let gDone = 0;
    cats.forEach((c) => {
      const { total, done } = countCategory(c);
      gTotal += total;
      gDone += done;
    });
    const overall = document.createElement("div");
    overall.className = "overall";
    overall.innerHTML = `
      <div class="overall-top">
        <span>전체 진행률</span>
        <span id="overall-pct">${gTotal ? Math.round((gDone / gTotal) * 100) : 0}% (${gDone}/${gTotal})</span>
      </div>
      <div class="bar"><div class="bar-fill" style="width:${gTotal ? (gDone / gTotal) * 100 : 0}%"></div></div>`;
    root.appendChild(overall);

    for (const cat of cats) {
      const { total, done } = countCategory(cat);
      const section = document.createElement("section");
      section.className = "rm-cat";

      const head = document.createElement("div");
      head.className = "rm-cat-head";
      head.innerHTML = `
        <h2>${cat.title}</h2>
        <span class="prio prio-${cat.priority}">${PRIO_LABEL[cat.priority] || ""}</span>
        <span class="rm-cat-count">${done}/${total}</span>`;
      section.appendChild(head);

      cat.groups.forEach((g, gi) => {
        const gWrap = document.createElement("div");
        gWrap.className = "rm-group";
        const gt = document.createElement("div");
        gt.className = "rm-group-title";
        gt.textContent = g.title;
        gWrap.appendChild(gt);

        g.items.forEach((text, ii) => {
          const key = itemKey(cat.id, gi, ii);
          const row = document.createElement("label");
          row.className = "rm-item" + (store.isDone(key) ? " done" : "");

          const cb = document.createElement("input");
          cb.type = "checkbox";
          cb.checked = store.isDone(key);
          cb.addEventListener("change", () => {
            store.setDone(key, cb.checked);
            render(); // 진행률 갱신
          });

          const span = document.createElement("span");
          span.textContent = text;

          row.append(cb, span);
          gWrap.appendChild(row);
        });

        section.appendChild(gWrap);
      });

      root.appendChild(section);
    }
  }

  window.IP = window.IP || {};
  window.IP.roadmap = { render };
})();
