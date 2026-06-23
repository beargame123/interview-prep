/**
 * 통합 백업 — 두 저장소를 한 파일로.
 *  - Algo.store: 풀이 세션/설정 (chrome.storage, 또는 shim된 localStorage)
 *  - IP.store:   로드맵 진도/면접 채점 (localStorage)
 * 하나의 JSON으로 내보내고, 가져올 때 둘 다 복원한다.
 * 기존 단일 백업(통계만/진도만)도 그대로 가져올 수 있게 하위호환.
 */
(function () {
  async function exportAll() {
    const algo = await globalThis.Algo.store.getData();
    const ip = globalThis.IP.store.raw();
    return JSON.stringify(
      { _codeprep: "backup", version: 1, exportedAt: new Date().toISOString(), algo, ip },
      null,
      2
    );
  }

  async function importAll(json) {
    const parsed = JSON.parse(json);
    // 통합 백업 형식
    if (parsed && parsed._codeprep) {
      if (parsed.algo) await globalThis.Algo.store.importJson(JSON.stringify(parsed.algo));
      if (parsed.ip) globalThis.IP.store.importJson(JSON.stringify(parsed.ip));
      return { algo: !!parsed.algo, ip: !!parsed.ip };
    }
    // 하위호환: 통계만(sessions/settings) 백업
    if (parsed && (parsed.sessions || parsed.settings || parsed.roadmap)) {
      await globalThis.Algo.store.importJson(json);
      return { algo: true, ip: false };
    }
    // 하위호환: 진도만(roadmapDone/qStatus) 백업
    if (parsed && (parsed.roadmapDone || parsed.qStatus)) {
      globalThis.IP.store.importJson(json);
      return { algo: false, ip: true };
    }
    throw new Error("알 수 없는 백업 형식이에요.");
  }

  globalThis.Backup = { exportAll, importAll };
})();
