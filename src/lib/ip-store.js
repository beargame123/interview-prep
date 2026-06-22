/**
 * 진도 저장소 (localStorage).
 * - 모든 읽기/쓰기를 이 모듈로 한정 → 나중에 서버 동기화로 교체 쉬움.
 */
(function () {
  const KEY = "ip_data_v1";
  const DEFAULTS = { roadmapDone: {}, qStatus: {} };

  function load() {
    try {
      const raw = localStorage.getItem(KEY);
      if (!raw) return structuredClone(DEFAULTS);
      const data = JSON.parse(raw);
      return {
        roadmapDone: data.roadmapDone || {},
        qStatus: data.qStatus || {},
      };
    } catch (_) {
      return structuredClone(DEFAULTS);
    }
  }

  function save(data) {
    localStorage.setItem(KEY, JSON.stringify(data));
  }

  let cache = load();

  // ---- 로드맵 체크 상태 ----
  function isDone(key) {
    return !!cache.roadmapDone[key];
  }
  function setDone(key, done) {
    if (done) cache.roadmapDone[key] = true;
    else delete cache.roadmapDone[key];
    save(cache);
  }

  // ---- 질문 학습 상태 (자가채점/메모) ----
  // rating: "know" | "meh" | "dunno"
  function getStatus(qid) {
    return cache.qStatus[qid] || null;
  }
  function setRating(qid, rating, note) {
    const prev = cache.qStatus[qid] || { count: 0 };
    cache.qStatus[qid] = {
      rating,
      count: (prev.count || 0) + 1,
      note: note != null ? note : prev.note || "",
      ts: Date.now(),
    };
    save(cache);
  }

  function exportJson() {
    return JSON.stringify(cache, null, 2);
  }
  function importJson(json) {
    const parsed = JSON.parse(json);
    cache = {
      roadmapDone: parsed.roadmapDone || {},
      qStatus: parsed.qStatus || {},
    };
    save(cache);
  }
  function reset() {
    cache = structuredClone(DEFAULTS);
    save(cache);
  }

  window.IP = window.IP || {};
  window.IP.store = {
    isDone,
    setDone,
    getStatus,
    setRating,
    exportJson,
    importJson,
    reset,
    raw: () => cache,
  };
})();
