# CodePrep — 코테·면접 올인원 트레이너 (Chrome Extension)

AlgoTracker(풀이 시간/통계 자동 기록)와 면접 트레이너(공부 로드맵 + AI 모의 면접)를
**하나의 크롬 확장**으로 합친 프로젝트. 빌드 없음 — "압축해제 로드"만 하면 동작합니다.

## 한 번에 하는 것

- ⏱️ **인페이지 타이머** — 백준·프로그래머스·LeetCode 문제 페이지에서 풀이 시간 자동 측정(뽀모도로 알림, ✅해결/🔁시도 기록)
- 📊 **학습 통계 탭** — 최근 12주 잔디, 유형별 약점 분석, 사이트별, 연속 학습일, 최근 기록
- 📋 **공부 로드맵 탭** — DB·알고리즘·CS·아키텍처(헥사고날·DDD) 상세 체크리스트(104항목) + 진행률
- 🎤 **실전 풀이 탭** — 면접 질문(57문항) → 내 답변 → 모범답안 대조 → 자가채점, 그리고 **🤖 AI 면접관**(본인 키)으로 채점·꼬리질문

## 설치 (빌드 불필요)

1. `chrome://extensions` → 우측 상단 **개발자 모드** 켜기
2. **압축해제된 확장 프로그램을 로드** → 이 `codeprep` 폴더 선택
3. 문제 페이지를 열면 우측 하단 타이머가 뜨고, 툴바 아이콘 → **대시보드 열기**로 3개 탭 사용

## 데이터 저장

- **풀이 시간/통계**: `chrome.storage`(타이머·서비스워커·통계 탭 공유)
- **로드맵·면접 진도**: `localStorage`(대시보드 페이지)
- 각 탭에서 JSON 내보내기/가져오기 지원

## 🤖 AI 면접관 (선택)

대시보드 헤더 **🤖 AI 설정**에 본인 Anthropic API 키 입력(기본 모델 Claude Opus 4.8).
실전 풀이에서 **🤖 AI 채점** → 점수·피드백·꼬리질문 → 이어서 대화.

- 키는 **이 브라우저에만** 저장. 확장이 `host_permissions`로 api.anthropic.com을 호출(별도 CORS 설정 불필요).
- 키를 소스에 넣거나 커밋하지 마세요. 토큰 비용은 본인 키에 청구됩니다.

## 구조

```
codeprep/
├── manifest.json
├── icons/
├── data/                      # 로드맵·면접 질문 데이터
│   ├── roadmap.data.js
│   └── questions.data.js
└── src/
    ├── lib/
    │   ├── sites.js           # 문제 사이트 파싱 (Algo)
    │   ├── store.js           # 풀이 세션 저장 chrome.storage (Algo)
    │   ├── stats.js           # 통계 계산 (Algo)
    │   ├── ip-store.js        # 로드맵/면접 진도 localStorage (IP)
    │   └── ai.js              # AI 면접관(Claude API, BYOK)
    ├── content/               # 인페이지 타이머 위젯
    ├── background/            # 서비스워커(배지·알림)
    ├── popup/                 # 툴바 팝업(오늘 요약)
    └── dashboard/             # 탭형 대시보드
        ├── dashboard.html
        ├── dashboard.css
        ├── stats.js           # 📊 통계 탭
        ├── roadmap.js         # 📋 로드맵 탭
        ├── interview.js       # 🎤 실전 풀이 탭
        └── app.js             # 탭 전환 / 모달 / 백업
```

## 로드맵

- [ ] 두 저장소(chrome.storage·localStorage) 통합 + 단일 백업
- [ ] solved.ac 티어/태그 연동
- [ ] AI 키 노출 없는 백엔드 프록시 옵션
- [ ] 오답노트(❌·🤔) 필터, 숙련도 차트
