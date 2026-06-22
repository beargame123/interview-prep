/**
 * 사이트 어댑터: 현재 페이지가 어떤 PS 사이트의 문제인지 판별하고
 * 문제 번호 / 제목 / 난이도 / 태그를 best-effort로 파싱한다.
 *
 * content script와 popup/dashboard에서 함께 쓰기 위해 ES module이 아닌
 * 전역 네임스페이스(globalThis.Algo.sites)에 노출한다.
 * (MV3 content script는 manifest의 js 배열로 함께 주입되면 같은 스코프를 공유한다)
 */
(function () {
  const SITES = {
    baekjoon: { name: "백준", color: "#0076c0" },
    programmers: { name: "프로그래머스", color: "#21a35e" },
    leetcode: { name: "LeetCode", color: "#ffa116" },
  };

  // host → site key
  function matchSite(host) {
    if (host.includes("acmicpc.net")) return "baekjoon";
    if (host.includes("programmers.co.kr")) return "programmers";
    if (host.includes("leetcode.com")) return "leetcode";
    return null;
  }

  const text = (el) => (el && el.textContent ? el.textContent.trim() : "");

  // 작은 요소들 중에서 정규식에 맞는 첫 텍스트를 찾는다(SPA 난이도/레벨 추출용)
  function findText(re, selector) {
    const nodes = document.querySelectorAll(selector || "span,div,strong,em,a");
    for (const n of nodes) {
      const t = (n.textContent || "").trim();
      if (re.test(t)) return t.match(re)[0].trim();
    }
    return null;
  }

  function parseBaekjoon() {
    const m = location.pathname.match(/\/problem\/(\d+)/);
    if (!m) return null;
    const tags = [
      ...document.querySelectorAll("#problem_tags a, .problem-label a, .spoiler a"),
    ]
      .map(text)
      .filter(Boolean);
    return {
      site: "baekjoon",
      problemId: m[1],
      title: text(document.querySelector("#problem_title")) || `백준 ${m[1]}`,
      difficulty: null, // 백준은 페이지에서 티어를 노출하지 않음(solved.ac 필요)
      tags: [...new Set(tags)].slice(0, 8),
      url: location.href.split(/[?#]/)[0],
    };
  }

  function parseProgrammers() {
    const m = location.pathname.match(/lessons\/(\d+)/);
    if (!m) return null;
    const title =
      text(
        document.querySelector(
          ".challenge-title, .algorithm-title, .lesson-content h3, h3.challenge-title"
        )
      ) || document.title.replace(/\s*[|\-–]\s*프로그래머스.*$/i, "").trim();
    return {
      site: "programmers",
      problemId: m[1],
      title: title || `프로그래머스 ${m[1]}`,
      difficulty: findText(/Lv\.?\s*\d+/i),
      tags: [],
      url: location.href.split(/[?#]/)[0],
    };
  }

  function parseLeetcode() {
    const m = location.pathname.match(/problems\/([^/]+)/);
    if (!m) return null;
    const slug = m[1];
    // 제목: slug를 가리키는 앵커 우선, 없으면 document.title 사용
    const anchor = document.querySelector(`a[href*="/problems/${slug}/"]`);
    const title =
      text(anchor) ||
      document.title.replace(/\s*[-|]\s*LeetCode.*$/i, "").replace(/^\d+\.\s*/, "").trim() ||
      slug.replace(/-/g, " ");
    const diffEl = document.querySelector('[class*="difficulty" i]');
    const difficulty =
      (diffEl && /^(Easy|Medium|Hard)$/i.test(text(diffEl)) ? text(diffEl) : null) ||
      findText(/^(Easy|Medium|Hard)$/);
    const topics = [...document.querySelectorAll('a[href^="/tag/"]')].map(text).filter(Boolean);
    return {
      site: "leetcode",
      problemId: slug,
      title,
      difficulty,
      tags: [...new Set(topics)].slice(0, 8),
      url: location.href.split(/[?#]/)[0],
    };
  }

  // 현재 페이지를 파싱. 문제 페이지가 아니면 null.
  function detect() {
    const site = matchSite(location.hostname);
    if (site === "baekjoon") return parseBaekjoon();
    if (site === "programmers") return parseProgrammers();
    if (site === "leetcode") return parseLeetcode();
    return null;
  }

  globalThis.Algo = globalThis.Algo || {};
  globalThis.Algo.sites = { SITES, matchSite, detect };
})();
