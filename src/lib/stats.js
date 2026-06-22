/**
 * 통계 계산용 순수 함수 모음. (chrome API 의존 없음 → 테스트하기 쉬움)
 */
(function () {
  const DAY = 24 * 60 * 60 * 1000;

  // 로컬 시간 기준 'YYYY-MM-DD'
  function dayKey(ts) {
    const d = new Date(ts);
    const y = d.getFullYear();
    const m = String(d.getMonth() + 1).padStart(2, "0");
    const day = String(d.getDate()).padStart(2, "0");
    return `${y}-${m}-${day}`;
  }

  function startOfToday() {
    const d = new Date();
    d.setHours(0, 0, 0, 0);
    return d.getTime();
  }

  const isSolved = (s) => s.status === "solved";

  function summarize(sessions) {
    let solved = 0;
    let seconds = 0;
    for (const s of sessions) {
      if (isSolved(s)) solved += 1;
      seconds += s.seconds || 0;
    }
    return { count: sessions.length, solved, seconds };
  }

  function inRange(sessions, fromTs) {
    return sessions.filter((s) => (s.endedAt || s.startedAt || 0) >= fromTs);
  }

  function todayStats(sessions) {
    return summarize(inRange(sessions, startOfToday()));
  }

  function weekStats(sessions) {
    return summarize(inRange(sessions, startOfToday() - 6 * DAY));
  }

  // 최근 days일 동안 날짜별 {count, solved, seconds} 버킷 (오래된 → 최신 순)
  function dailyBuckets(sessions, days) {
    const buckets = new Map();
    const today = startOfToday();
    for (let i = days - 1; i >= 0; i--) {
      buckets.set(dayKey(today - i * DAY), { count: 0, solved: 0, seconds: 0 });
    }
    for (const s of sessions) {
      const key = dayKey(s.endedAt || s.startedAt || Date.now());
      const b = buckets.get(key);
      if (!b) continue;
      b.count += 1;
      if (isSolved(s)) b.solved += 1;
      b.seconds += s.seconds || 0;
    }
    return [...buckets.entries()].map(([date, v]) => ({ date, ...v }));
  }

  // 연속 학습일(오늘 또는 어제부터 거슬러 올라가며 카운트)
  function streak(sessions) {
    const set = new Set(sessions.map((s) => dayKey(s.endedAt || s.startedAt || 0)));
    if (set.size === 0) return 0;
    let cursor = startOfToday();
    if (!set.has(dayKey(cursor))) cursor -= DAY; // 오늘 없으면 어제부터(유예)
    let count = 0;
    while (set.has(dayKey(cursor))) {
      count += 1;
      cursor -= DAY;
    }
    return count;
  }

  function countBy(sessions, keyFn) {
    const map = new Map();
    for (const s of sessions) {
      for (const k of [].concat(keyFn(s)).filter(Boolean)) {
        map.set(k, (map.get(k) || 0) + 1);
      }
    }
    return [...map.entries()].sort((a, b) => b[1] - a[1]).map(([key, count]) => ({ key, count }));
  }

  const byTag = (sessions) => countBy(sessions, (s) => s.tags || []);
  const bySite = (sessions) => countBy(sessions, (s) => s.site);

  // 사람이 읽는 시간 표기
  function formatDuration(sec) {
    sec = Math.round(sec || 0);
    const h = Math.floor(sec / 3600);
    const m = Math.floor((sec % 3600) / 60);
    const s = sec % 60;
    if (h > 0) return `${h}시간 ${m}분`;
    if (m > 0) return `${m}분 ${s}초`;
    return `${s}초`;
  }

  // 타이머용 mm:ss / h:mm:ss
  function clock(sec) {
    sec = Math.max(0, Math.floor(sec || 0));
    const h = Math.floor(sec / 3600);
    const m = Math.floor((sec % 3600) / 60);
    const s = sec % 60;
    const mm = String(m).padStart(2, "0");
    const ss = String(s).padStart(2, "0");
    return h > 0 ? `${h}:${mm}:${ss}` : `${mm}:${ss}`;
  }

  globalThis.Algo = globalThis.Algo || {};
  globalThis.Algo.stats = {
    dayKey,
    todayStats,
    weekStats,
    dailyBuckets,
    streak,
    byTag,
    bySite,
    summarize,
    formatDuration,
    clock,
  };
})();
