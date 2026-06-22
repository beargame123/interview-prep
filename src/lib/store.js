/**
 * 저장 계층(Storage Layer).
 *
 * 지금은 chrome.storage.local에 저장하지만, 모든 읽기/쓰기를 이 모듈로 한정해
 * 두었기 때문에 나중에 Django/DRF 백엔드(REST API)로 교체할 때 이 파일만
 * 바꾸면 된다. (예: getData → fetch('/api/sessions'))
 */
(function () {
  const KEY = "algo_data_v1";
  const DEFAULTS = {
    sessions: [],
    settings: { pomodoroMinutes: 25, autoStart: true },
    roadmap: [], // 공부 로드맵 체크리스트
  };

  async function getData() {
    const obj = await chrome.storage.local.get(KEY);
    const data = obj[KEY] || {};
    return {
      sessions: Array.isArray(data.sessions) ? data.sessions : [],
      settings: { ...DEFAULTS.settings, ...(data.settings || {}) },
      roadmap: Array.isArray(data.roadmap) ? data.roadmap : [],
    };
  }

  async function setData(data) {
    await chrome.storage.local.set({ [KEY]: data });
  }

  async function addSession(session) {
    const data = await getData();
    data.sessions.push(session);
    await setData(data);
    return session;
  }

  async function getSessions() {
    return (await getData()).sessions;
  }

  async function getSettings() {
    return (await getData()).settings;
  }

  async function updateSettings(patch) {
    const data = await getData();
    data.settings = { ...data.settings, ...patch };
    await setData(data);
    return data.settings;
  }

  // 세션만 비우고 설정/로드맵은 유지
  async function clearSessions() {
    const data = await getData();
    data.sessions = [];
    await setData(data);
  }

  // 공부 로드맵(체크리스트)
  async function getRoadmap() {
    return (await getData()).roadmap;
  }

  async function saveRoadmap(items) {
    const data = await getData();
    data.roadmap = items;
    await setData(data);
    return items;
  }

  async function exportJson() {
    return JSON.stringify(await getData(), null, 2);
  }

  async function importJson(json) {
    const parsed = JSON.parse(json);
    await setData({
      sessions: Array.isArray(parsed.sessions) ? parsed.sessions : [],
      settings: { ...DEFAULTS.settings, ...(parsed.settings || {}) },
      roadmap: Array.isArray(parsed.roadmap) ? parsed.roadmap : [],
    });
  }

  globalThis.Algo = globalThis.Algo || {};
  globalThis.Algo.store = {
    getData,
    setData,
    addSession,
    getSessions,
    getSettings,
    updateSettings,
    clearSessions,
    getRoadmap,
    saveRoadmap,
    exportJson,
    importJson,
  };
})();
