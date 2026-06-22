/**
 * AI 면접관 (Claude API 연동).
 *
 * 이 앱은 빌드 없는 정적 사이트라 npm SDK 대신 fetch로 Messages API를 직접 호출한다.
 * 키는 사용자가 직접 입력(BYOK)하고 브라우저 localStorage에만 저장된다.
 * ⚠️ 키를 소스에 하드코딩하거나 커밋하지 말 것. 공개 배포 시엔 각자 자기 키를 쓰거나 백엔드 프록시를 둘 것.
 */
(function () {
  const KEY = "ip_ai_cfg";
  const API_URL = "https://api.anthropic.com/v1/messages";
  const DEFAULT_MODEL = "claude-opus-4-8";

  function getConfig() {
    try {
      const c = JSON.parse(localStorage.getItem(KEY) || "{}");
      return { apiKey: c.apiKey || "", model: c.model || DEFAULT_MODEL };
    } catch (_) {
      return { apiKey: "", model: DEFAULT_MODEL };
    }
  }
  function setConfig(patch) {
    localStorage.setItem(KEY, JSON.stringify({ ...getConfig(), ...patch }));
  }
  function hasKey() {
    return !!getConfig().apiKey;
  }

  const SYSTEM = [
    "당신은 한국 IT 기업의 시니어 백엔드 면접관입니다.",
    "지원자의 답변을 평가하고, 실제 기술 면접처럼 한국어로 이어서 질문하세요.",
    "반드시 아래 형식으로만 답하세요:",
    "점수: (0~100점)",
    "잘한 점: (구체적으로)",
    "보완할 점: (빠뜨렸거나 틀린 핵심 개념 위주로)",
    "꼬리질문: (실제 면접관이 이어서 물어볼 질문 1개)",
    "참고 모범답안을 기준으로 삼되 지원자의 표현을 존중하고, 사고 과정 없이 최종 피드백만 간결하게 쓰세요.",
  ].join("\n");

  async function callMessages(messages) {
    const { apiKey, model } = getConfig();
    if (!apiKey) throw new Error("NO_KEY");

    const res = await fetch(API_URL, {
      method: "POST",
      headers: {
        "content-type": "application/json",
        "x-api-key": apiKey,
        "anthropic-version": "2023-06-01",
        // 브라우저에서 직접 호출 허용(CORS). 키 노출 위험을 인지하고 사용.
        "anthropic-dangerous-direct-browser-access": "true",
      },
      body: JSON.stringify({ model, max_tokens: 2048, system: SYSTEM, messages }),
    });

    if (!res.ok) {
      let msg = `HTTP ${res.status}`;
      try {
        const e = await res.json();
        if (e && e.error && e.error.message) msg = e.error.message;
      } catch (_) {
        /* ignore */
      }
      const err = new Error(msg);
      err.status = res.status;
      throw err;
    }

    const data = await res.json();
    return (
      (data.content || [])
        .filter((b) => b.type === "text")
        .map((b) => b.text)
        .join("\n")
        .trim() || "(빈 응답)"
    );
  }

  // 첫 채점 메시지: 질문 + 모범답안 + 내가 쓴 답변
  function buildFirstMessage(q, modelAnswer, userAnswer) {
    const mine = userAnswer && userAnswer.trim() ? userAnswer.trim() : "(답변 작성 안 함 — 모른다고 가정)";
    return `질문: ${q}\n\n[참고 모범답안]\n${modelAnswer}\n\n[지원자 답변]\n${mine}`;
  }

  window.IP = window.IP || {};
  window.IP.ai = { getConfig, setConfig, hasKey, callMessages, buildFirstMessage, DEFAULT_MODEL };
})();
