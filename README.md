# CodePrep — 코테·면접 올인원 트레이너 (Chrome Extension)

AlgoTracker(풀이 시간/통계 자동 기록)와 면접 트레이너(공부 로드맵 + AI 모의 면접)를
**하나의 크롬 확장**으로 합친 프로젝트. 빌드 없음 — "압축해제 로드"만 하면 동작합니다.

## 한 번에 하는 것

- ⏱️ **인페이지 타이머** — 백준·프로그래머스·LeetCode 문제 페이지에서 풀이 시간 자동 측정(뽀모도로 알림, ✅해결/🔁시도 기록)
- 📊 **학습 통계 탭** — 최근 12주 잔디, 유형별 약점 분석, 사이트별, 연속 학습일, 최근 기록
- 📋 **공부 로드맵 탭 (인덱스형)** — **단계별 학습 순서**(DB → 알고리즘 → CS → 아키텍처 → **Java/Kotlin**). 5개 페이즈 · **31개 스테이지** · 232개 토픽 + 153개 실습(hands-on) + 페이즈별 통과 기준(stage gate). 스테이지를 누르면 **새 탭의 학습 페이지([`learn.html`](src/dashboard/learn.html))**가 열려 학습 → **✅ 학습 완료** / **📋 Claude 퀴즈용 복사**(Chrome의 Claude/claude.ai에 붙여넣어 그 단계 퀴즈 생성). 출처: CS = gyoogle *'면접을 위한 CS 전공지식 노트'*, 알고리즘 = 프로그래머스 레벨(Lv0~5) + LeetCode, DB = 현행 + SQLD 보강, Java/Kotlin = 동시성·코루틴 / 언어 내부 / Spring 내부. (서술형 원문: [`STUDY_ROADMAP.md`](STUDY_ROADMAP.md))
- 🎤 **실전 풀이 탭** — 면접 질문(**248문항**: DB·알고리즘·CS·아키텍처·**Java/Kotlin**, 로드맵 자가점검 191문항 포함) → 내 답변 → 모범답안 대조 → 자가채점, 그리고 **🤖 AI 면접관**(본인 키)으로 채점·꼬리질문

## 설치 (빌드 불필요)

1. `chrome://extensions` → 우측 상단 **개발자 모드** 켜기
2. **압축해제된 확장 프로그램을 로드** → 이 `codeprep` 폴더 선택
3. 문제 페이지를 열면 우측 하단 타이머가 뜨고, 툴바 아이콘 → **대시보드 열기**로 3개 탭 사용

## 웹에서 바로 쓰기 (GitHub Pages)

확장을 설치하지 않아도 **로드맵·모의 면접·AI 면접관**은 웹에서 그대로 동작합니다.

- 진입점은 루트 [`index.html`](index.html) (랜딩) → 대시보드(`src/dashboard/dashboard.html`).
- `src/lib/chrome-shim.js`가 비확장 환경에서 `chrome.storage`를 `localStorage`로 대체하므로, Pages에서도 대시보드가 깨지지 않습니다(확장에선 no-op).
- 탭 딥링크: `dashboard.html#roadmap` / `#interview` / `#stats`.
- 단, **문제 페이지 자동 타이머/풀이 기록은 확장 전용**(콘텐츠 스크립트가 필요)이라 Pages에선 통계가 비어 있습니다.

**배포 방법**: GitHub 저장소 → Settings → Pages → Source를 `main` 브랜치 `/ (root)`로 지정.
빌드가 없으므로 푸시하면 `https://<user>.github.io/<repo>/` 에서 바로 열립니다. (`/`에서 Jekyll이 파일을 건드리지 않도록 `.nojekyll` 포함)

## 데이터 저장

- **풀이 시간/통계**: `chrome.storage`(타이머·서비스워커·통계 탭 공유)
- **로드맵·면접 진도**: `localStorage`(대시보드 페이지)
- 📦 **전체 백업**: 로드맵 탭 → **백업/복원**에서 통계 + 진도를 한 파일(`codeprep-backup-*.json`)로 내보내기/가져오기. 기존 단일 백업(통계만/진도만)도 그대로 가져올 수 있음.

## 🤖 AI 면접관 (선택)

대시보드 헤더 **🤖 AI 설정**에 본인 Anthropic API 키 입력(기본 모델 Claude Opus 4.8).
실전 풀이에서 **🤖 AI 채점** → 점수·피드백·꼬리질문 → 이어서 대화.

- 키는 **이 브라우저에만** 저장. 확장이 `host_permissions`로 api.anthropic.com을 호출(별도 CORS 설정 불필요).
- 키를 소스에 넣거나 커밋하지 마세요. 토큰 비용은 본인 키에 청구됩니다.

## 구조

```
codeprep/
├── index.html                 # GitHub Pages 랜딩 (→ 대시보드)
├── .nojekyll                  # Pages에서 Jekyll 처리 비활성화
├── STUDY_ROADMAP.md           # 전체 서술형 학습 로드맵(원문)
├── manifest.json
├── icons/
├── data/                      # 로드맵·면접 질문 데이터
│   ├── roadmap.data.js        # window.ROADMAP(페이즈→스테이지→토픽) + window.ROADMAP_PLAN
│   └── questions.data.js
└── src/
    ├── lib/
    │   ├── chrome-shim.js     # 비확장 환경에서 chrome.storage→localStorage (확장에선 no-op)
    │   ├── sites.js           # 문제 사이트 파싱 (Algo)
    │   ├── store.js           # 풀이 세션 저장 chrome.storage (Algo)
    │   ├── stats.js           # 통계 계산 (Algo)
    │   ├── ip-store.js        # 로드맵/면접 진도 localStorage (IP)
    │   ├── backup.js          # 통계+진도 통합 백업/복원
    │   └── ai.js              # AI 면접관(Claude API, BYOK)
    ├── content/               # 인페이지 타이머 위젯
    ├── background/            # 서비스워커(배지·알림)
    ├── popup/                 # 툴바 팝업(오늘 요약)
    └── dashboard/             # 탭형 대시보드
        ├── dashboard.html
        ├── dashboard.css
        ├── learn.html         # 새 탭 학습 페이지(스테이지 상세 + Claude 퀴즈 복사)
        ├── learn.js
        ├── stats.js           # 📊 통계 탭
        ├── roadmap.js         # 📋 로드맵 탭(인덱스형 → learn.html 링크)
        ├── interview.js       # 🎤 실전 풀이 탭
        └── app.js             # 탭 전환 / 모달 / 백업
```

## 로드맵

- [x] 두 저장소(chrome.storage·localStorage) 통합 백업
- [ ] solved.ac 티어/태그 연동
- [ ] AI 키 노출 없는 백엔드 프록시 옵션
- [ ] 오답노트(❌·🤔) 필터, 숙련도 차트
