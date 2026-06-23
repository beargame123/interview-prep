/* 대시보드 진입점: 탭 전환 + AI 설정 모달 + 로드맵/면접 진도 백업 */
(function () {
  const $ = (id) => document.getElementById(id);

  const TABS = ["stats", "roadmap", "interview"];

  function switchTab(name) {
    if (!TABS.includes(name)) name = "stats";
    document.querySelectorAll(".tab-btn").forEach((b) => {
      b.classList.toggle("active", b.dataset.tab === name);
    });
    $("tab-stats").hidden = name !== "stats";
    $("tab-roadmap").hidden = name !== "roadmap";
    $("tab-interview").hidden = name !== "interview";
    if (location.hash.slice(1) !== name) {
      try {
        history.replaceState(null, "", "#" + name);
      } catch (_) {
        location.hash = name;
      }
    }
    if (name === "stats") globalThis.AlgoDash.renderStats();
    if (name === "roadmap") globalThis.IP.roadmap.render();
    if (name === "interview") globalThis.IP.interview.render();
  }

  function init() {
    document.querySelectorAll(".tab-btn").forEach((b) => {
      b.addEventListener("click", () => switchTab(b.dataset.tab));
    });

    // ----- AI 면접관 설정 모달 -----
    const aiModal = $("ai-modal");
    function openAI() {
      const cfg = globalThis.IP.ai.getConfig();
      $("ai-key").value = cfg.apiKey;
      $("ai-model").value = cfg.model;
      aiModal.hidden = false;
    }
    function closeAI() {
      aiModal.hidden = true;
    }
    $("ai-settings-btn").addEventListener("click", openAI);
    $("ai-close").addEventListener("click", closeAI);
    $("ai-save").addEventListener("click", () => {
      globalThis.IP.ai.setConfig({ apiKey: $("ai-key").value.trim(), model: $("ai-model").value });
      closeAI();
    });
    aiModal.addEventListener("click", (e) => {
      if (e.target === aiModal) closeAI();
    });
    globalThis.IP = globalThis.IP || {};
    globalThis.IP.app = { openAISettings: openAI };

    // ----- 로드맵/면접 진도 백업 (localStorage) -----
    $("ip-export").addEventListener("click", () => {
      const blob = new Blob([globalThis.IP.store.exportJson()], { type: "application/json" });
      const a = document.createElement("a");
      a.href = URL.createObjectURL(blob);
      a.download = `codeprep-prep-${new Date().toISOString().slice(0, 10)}.json`;
      a.click();
      URL.revokeObjectURL(a.href);
    });
    $("ip-import").addEventListener("click", () => $("ip-import-file").click());
    $("ip-import-file").addEventListener("change", async (e) => {
      const file = e.target.files[0];
      if (!file) return;
      try {
        globalThis.IP.store.importJson(await file.text());
        globalThis.IP.roadmap.render();
        alert("가져오기 완료!");
      } catch (_) {
        alert("올바른 JSON 파일이 아니에요.");
      }
      e.target.value = "";
    });
    $("ip-reset").addEventListener("click", () => {
      if (!confirm("로드맵 체크와 면접 채점 기록을 초기화할까요? 되돌릴 수 없어요.")) return;
      globalThis.IP.store.reset();
      globalThis.IP.roadmap.render();
      globalThis.IP.interview.render();
    });

    // ----- 통합 백업 (통계 + 진도를 한 파일로) -----
    const backupMsg = $("backup-msg");
    function flashBackup(text) {
      if (!backupMsg) return;
      backupMsg.textContent = text;
      setTimeout(() => (backupMsg.textContent = ""), 2800);
    }
    $("all-export").addEventListener("click", async () => {
      const blob = new Blob([await globalThis.Backup.exportAll()], { type: "application/json" });
      const a = document.createElement("a");
      a.href = URL.createObjectURL(blob);
      a.download = `codeprep-backup-${new Date().toISOString().slice(0, 10)}.json`;
      a.click();
      URL.revokeObjectURL(a.href);
      flashBackup("전체 백업을 내보냈어요 ✓");
    });
    $("all-import").addEventListener("click", () => $("all-import-file").click());
    $("all-import-file").addEventListener("change", async (e) => {
      const file = e.target.files[0];
      if (!file) return;
      try {
        const r = await globalThis.Backup.importAll(await file.text());
        globalThis.AlgoDash.renderStats();
        globalThis.IP.roadmap.render();
        globalThis.IP.interview.render();
        flashBackup(`가져오기 완료 ✓ (${[r.algo ? "통계" : null, r.ip ? "진도" : null].filter(Boolean).join(" + ")})`);
      } catch (err) {
        flashBackup("실패: " + (err && err.message ? err.message : err));
      }
      e.target.value = "";
    });

    // 초기 탭: URL 해시(#roadmap 등) 우선, 없으면 통계
    switchTab(TABS.includes(location.hash.slice(1)) ? location.hash.slice(1) : "stats");
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", init);
  } else {
    init();
  }
})();
