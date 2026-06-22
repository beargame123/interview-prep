/**
 * 학습 로드맵 데이터.
 * priority 1 = 최우선(DB·알고리즘·CS), 2 = 아키텍처/트렌드, 3 = 언어(나중에)
 * 항목은 "면접에서 설명할 수 있어야 하는 단위"로 잘게 쪼갬.
 */
window.ROADMAP = [
  {
    id: "db",
    title: "데이터베이스",
    priority: 1,
    groups: [
      {
        title: "인덱스",
        items: [
          "B-Tree 인덱스 구조와 탐색/삽입 동작 원리",
          "클러스터드 vs 논클러스터드 인덱스 차이",
          "복합 인덱스와 선두 컬럼(leftmost prefix) 규칙",
          "커버링 인덱스 (인덱스만으로 쿼리 해결)",
          "인덱스가 안 타는 경우 (컬럼 가공/형변환/선행 와일드카드 LIKE '%x')",
          "인덱스 트레이드오프 (읽기 ↑ vs 쓰기·저장공간 ↓)",
          "카디널리티와 인덱스 선택성",
          "Hash 인덱스 vs B-Tree 인덱스",
        ],
      },
      {
        title: "트랜잭션 & 동시성",
        items: [
          "ACID 4가지 속성과 각각의 의미",
          "격리수준 4단계 (READ UNCOMMITTED → SERIALIZABLE)",
          "이상현상: Dirty Read / Non-repeatable Read / Phantom Read",
          "공유락(S) vs 배타락(X)",
          "비관적 락 vs 낙관적 락 (버전/CAS)",
          "MVCC 동작 원리 (스냅샷, undo 로그)",
          "데드락 발생 조건과 해결(타임아웃/락 순서)",
          "트랜잭션 전파(propagation) 개념",
        ],
      },
      {
        title: "쿼리 & 성능",
        items: [
          "조인 알고리즘: Nested Loop / Hash Join / Sort-Merge",
          "실행계획(EXPLAIN) 읽는 법",
          "N+1 문제 원인과 해결 (조인 fetch / batch size)",
          "슬로우 쿼리 튜닝 접근법",
          "페이지네이션: OFFSET vs 커서(keyset) 기반",
          "통계정보와 옵티마이저",
        ],
      },
      {
        title: "설계 & 확장",
        items: [
          "정규화(1NF~3NF)와 반정규화 트레이드오프",
          "PK/FK, 자연키 vs 대리키(surrogate)",
          "파티셔닝 vs 샤딩 vs 레플리케이션",
          "읽기 복제본(read replica)과 쓰기 분리",
          "CAP 정리와 일관성 모델",
          "RDB vs NoSQL 선택 기준",
          "커넥션 풀과 적정 크기 산정",
        ],
      },
    ],
  },
  {
    id: "algo",
    title: "알고리즘 & 자료구조",
    priority: 1,
    groups: [
      {
        title: "복잡도 & 기초",
        items: [
          "시간/공간 복잡도, 빅오 표기법 (최악/평균/상각)",
          "분할정복, 재귀와 메모이제이션",
          "정렬 비교: 퀵/머지/힙 (복잡도·안정성·인플레이스)",
        ],
      },
      {
        title: "자료구조",
        items: [
          "배열 vs 연결리스트 트레이드오프",
          "스택 / 큐 / 덱과 활용",
          "해시테이블: 충돌 처리(체이닝/개방주소법), 평균·최악 복잡도",
          "힙 / 우선순위 큐",
          "이진탐색트리(BST)와 균형트리(AVL/Red-Black) 개념",
          "트라이(Trie)",
          "유니온-파인드(서로소 집합) + 경로압축",
        ],
      },
      {
        title: "그래프",
        items: [
          "BFS / DFS와 적용 상황",
          "다익스트라 (우선순위 큐) / 벨만-포드 (음수 간선)",
          "플로이드-워셜 (전체 쌍 최단경로)",
          "위상 정렬 (DAG)",
          "최소 신장 트리: 크루스칼 / 프림",
        ],
      },
      {
        title: "문제풀이 패턴",
        items: [
          "동적계획법(DP): 점화식·상태 정의",
          "그리디와 정당성(그리디 선택 속성) 판단",
          "이분탐색 / 파라메트릭 서치",
          "투 포인터 / 슬라이딩 윈도우",
          "백트래킹과 가지치기",
        ],
      },
    ],
  },
  {
    id: "cs",
    title: "CS 전공 기초",
    priority: 1,
    groups: [
      {
        title: "운영체제",
        items: [
          "프로세스 vs 스레드, 멀티스레드 장단점",
          "컨텍스트 스위칭 비용과 발생 시점",
          "CPU 스케줄링 (FCFS/SJF/RR/우선순위)",
          "동기화: 뮤텍스 vs 세마포어, 임계구역",
          "경쟁 상태(race condition)와 원자성",
          "데드락 4조건과 예방/회피/탐지",
          "가상 메모리, 페이징 vs 세그멘테이션",
          "페이지 교체 알고리즘 (LRU/Clock)",
        ],
      },
      {
        title: "네트워크",
        items: [
          "OSI 7계층 / TCP-IP 4계층",
          "TCP vs UDP",
          "3-way handshake / 4-way handshake",
          "흐름 제어 vs 혼잡 제어",
          "HTTP 메서드와 상태코드 분류",
          "HTTP/1.1 vs HTTP/2 vs HTTP/3 (멀티플렉싱, HOL, QUIC)",
          "HTTPS / TLS 핸드셰이크",
          "DNS 동작 과정",
          "쿠키 / 세션 vs 토큰(JWT), 인증 vs 인가",
          "CORS 동작과 프리플라이트",
          "L4 vs L7 로드밸런싱",
        ],
      },
      {
        title: "기타",
        items: [
          "프로세스 간 통신(IPC)",
          "동시성(concurrency) vs 병렬성(parallelism)",
          "캐시와 지역성, 캐시 무효화 전략",
          "직렬화/역직렬화와 포맷(JSON/Protobuf)",
        ],
      },
    ],
  },
  {
    id: "arch",
    title: "백엔드 아키텍처 & 트렌드",
    priority: 2,
    groups: [
      {
        title: "설계 원칙",
        items: [
          "SOLID 5원칙 (각각 한 줄 설명 가능하게)",
          "응집도(cohesion) / 결합도(coupling)",
          "DRY / KISS / YAGNI",
          "의존성 역전(DIP)과 의존성 주입(DI)",
          "대표 디자인 패턴 (전략/팩토리/옵저버/데코레이터/싱글톤)",
        ],
      },
      {
        title: "아키텍처 스타일",
        items: [
          "레이어드(N-tier) 아키텍처와 한계",
          "헥사고날 아키텍처 (포트 & 어댑터)",
          "클린 아키텍처 (의존성 규칙)",
          "어니언 아키텍처와의 공통점",
          "모놀리식 vs 마이크로서비스(MSA) 트레이드오프",
        ],
      },
      {
        title: "DDD (도메인 주도 설계)",
        items: [
          "유비쿼터스 언어(ubiquitous language)",
          "바운디드 컨텍스트 (bounded context)",
          "엔티티 vs 값 객체(Value Object)",
          "애그리거트와 애그리거트 루트, 일관성 경계",
          "리포지토리 / 도메인 서비스 / 팩토리",
          "도메인 이벤트",
          "전술적 설계 vs 전략적 설계",
          "애플리케이션 서비스 vs 도메인 서비스",
        ],
      },
      {
        title: "분산 & 운영",
        items: [
          "CQRS / 이벤트 소싱",
          "메시지 큐 (Kafka vs RabbitMQ) 와 비동기",
          "SAGA 패턴과 분산 트랜잭션",
          "멱등성(idempotency) 보장",
          "캐싱 전략 (look-aside/write-through) 와 캐시 스탬피드",
          "API 버저닝과 하위호환성",
          "테스트 전략 (단위/통합/E2E, 테스트 피라미드, TDD)",
          "관측성(observability): 로깅/메트릭/트레이싱",
        ],
      },
    ],
  },
  {
    id: "lang",
    title: "언어 / 프레임워크 (후순위)",
    priority: 3,
    groups: [
      {
        title: "현재 주력 심화 (Java/Kotlin·Spring)",
        items: [
          "JVM 메모리 구조와 GC",
          "Spring: IoC/DI, AOP, 트랜잭션 추상화",
          "코루틴 / 스레드풀 / 동시성",
        ],
      },
      {
        title: "Python / Django (지원 회사용)",
        items: [
          "Python 기초 (자료형·컴프리헨션·데코레이터)",
          "Django ORM / DRF (Serializer·ViewSet)",
          "※ DB·알고리즘·CS·아키텍처 이후에 학습",
        ],
      },
    ],
  },
];
