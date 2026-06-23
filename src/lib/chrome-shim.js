/**
 * chrome.* API shim (GitHub Pages / 일반 브라우저용).
 *
 * 크롬 확장으로 로드되면 chrome.storage가 이미 있으므로 이 파일은 아무것도 안 한다.
 * 확장이 아닌 일반 웹페이지(예: GitHub Pages)에서 dashboard.html을 열면
 * chrome.storage.local 이 없어 통계 탭이 깨지므로, localStorage로 대체 구현한다.
 * (Pages에서는 타이머가 없어 풀이 기록이 비어 있지만, 페이지는 정상 동작한다.)
 */
(function () {
  if (typeof chrome !== "undefined" && chrome.storage && chrome.storage.local) return;

  const LS = window.localStorage;
  const PREFIX = "cs_"; // chrome.storage 모사 키 접두사

  function readKey(k, out) {
    const raw = LS.getItem(PREFIX + k);
    if (raw != null) {
      try {
        out[k] = JSON.parse(raw);
      } catch (_) {
        out[k] = raw;
      }
    }
  }

  const local = {
    async get(keys) {
      const out = {};
      if (keys == null) {
        for (let i = 0; i < LS.length; i++) {
          const sk = LS.key(i);
          if (sk && sk.startsWith(PREFIX)) readKey(sk.slice(PREFIX.length), out);
        }
      } else if (typeof keys === "string") {
        readKey(keys, out);
      } else if (Array.isArray(keys)) {
        keys.forEach((k) => readKey(k, out));
      } else if (typeof keys === "object") {
        Object.keys(keys).forEach((k) => {
          readKey(k, out);
          if (!(k in out)) out[k] = keys[k]; // 기본값
        });
      }
      return out;
    },
    async set(obj) {
      Object.keys(obj).forEach((k) => LS.setItem(PREFIX + k, JSON.stringify(obj[k])));
    },
    async remove(keys) {
      (Array.isArray(keys) ? keys : [keys]).forEach((k) => LS.removeItem(PREFIX + k));
    },
    async clear() {
      const del = [];
      for (let i = 0; i < LS.length; i++) {
        const sk = LS.key(i);
        if (sk && sk.startsWith(PREFIX)) del.push(sk);
      }
      del.forEach((k) => LS.removeItem(k));
    },
  };

  window.chrome = window.chrome || {};
  window.chrome.storage = { local };
  // 서비스워커가 없는 환경이므로 알림/런타임은 no-op
  window.chrome.notifications = window.chrome.notifications || { create() {}, clear() {} };
  window.chrome.runtime = window.chrome.runtime || { lastError: null, sendMessage() {} };
})();
