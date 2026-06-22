/**
 * 백그라운드 서비스워커.
 * - content script가 보내는 메시지를 받아 배지/알림을 처리한다.
 * - MV3 서비스워커는 수시로 잠들기 때문에 상태를 보관하지 않고 메시지 기반으로만 동작.
 */

// 첫 설치 시 기본 설정 주입
chrome.runtime.onInstalled.addListener(async () => {
  const KEY = "algo_data_v1";
  const obj = await chrome.storage.local.get(KEY);
  if (!obj[KEY]) {
    await chrome.storage.local.set({
      [KEY]: { sessions: [], settings: { pomodoroMinutes: 25, autoStart: true } },
    });
  }
});

chrome.runtime.onMessage.addListener((msg) => {
  if (!msg || !msg.type) return;

  switch (msg.type) {
    case "tick":
      // 툴바 배지에 경과 분 표시
      chrome.action.setBadgeBackgroundColor({ color: "#6366f1" });
      chrome.action.setBadgeText({ text: msg.minutes > 0 ? String(msg.minutes) : "" });
      break;

    case "reset":
      chrome.action.setBadgeText({ text: "" });
      break;

    case "pomodoro":
      chrome.notifications.create(`pomo-${Date.now()}`, {
        type: "basic",
        iconUrl: chrome.runtime.getURL("icons/icon128.png"),
        title: "🍅 뽀모도로 완료!",
        message: `${msg.minutes}분 집중 완료 — "${msg.title || "문제"}"\n잠깐 쉬었다 가요.`,
        priority: 2,
      });
      break;
  }
});
