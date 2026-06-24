# 백엔드 이직 학습 로드맵 (CodePrep)

> 순서: **DB → 알고리즘 → CS → 아키텍처 → Java/Kotlin**. 코딩테스트 기준 언어 **Java**, 스택 **JDK 17 / Spring Boot 3.x / JPA(Hibernate) / PostgreSQL**.
> CS는 gyoogle *'면접을 위한 CS 전공지식 노트'*, 알고리즘은 프로그래머스 레벨(Lv0~5) + LeetCode, DB는 현행 + SQLD 보강, Java/Kotlin은 동시성·코루틴 / 언어 내부 / Spring 내부.
> 이 문서는 `data/roadmap.data.js`에서 자동 생성됩니다(확장의 로드맵 탭·학습 페이지와 동일 내용).

## 전체 그림

실무에서 가장 깊게 쓰는 토대부터, 면접 무기가 되는 순서대로. DB·CS·아키텍처·Java/Kotlin은 한 번에 하나씩 메인 트랙으로 순차 진행하고, 알고리즘과 Java/Kotlin 심화는 첫날부터 매일 병행한다. 코딩테스트는 Java 기준(1초≈10^8 연산).

## 학습 순서 한눈에

| Phase | 트랙 | 기간 | 스테이지 |
|---|---|---|---|
| 🗄️ **데이터베이스** | 메인 트랙 | 1~12주차 | S1 · S2 · S3⭐ · S4⭐ · S5⭐ · S6 · S7⭐ |
| 🧩 **알고리즘 & 자료구조 — 프로그래머스 레벨 사다리 × 고득점 Kit × LeetCode 병행** | 매일 병행 | 상시 병행(첫날~면접 직전), 집중 가속은 4~끝 / 단계별 학습 분량 누적 약 11~16주 | S1 · S2⭐ · S3⭐ · S4⭐ · S5⭐ · S6⭐ · S7⭐ |
| 🌐 **CS 전공 기초 (OS · 네트워크)** | 메인 트랙 | 12~17주차 (6스테이지) | S1 · S2⭐ · S3 · S4⭐ · S5⭐ · S6 |
| 🏛️ **백엔드 아키텍처 & DDD** | 메인 트랙 | 18~26주차 | S1 · S2 · S3⭐ · S4 · S5 · S6⭐ |
| ☕ **Java / Kotlin 심화** | 현재 스택 심화 · 매일 병행 | 전 기간 매일 병행(집중은 면접 직전 2~3주) | S1⭐ · S2⭐ · S3⭐ · S4⭐ · S5⭐ |

## Phase별 상세

### 🗄️ 데이터베이스  ·  메인 트랙  ·  1~12주차

> DB·트랜잭션·인덱스는 모든 백엔드의 바닥이자 면접 1순위라 메인으로 먼저 탄다. 설계→인덱스→트랜잭션→실행계획→확장 순으로, 인덱스를 알아야 실행계획·락 범위가 이해되는 분야 내부 의존을 따라 PostgreSQL과 JPA/Hibernate(영속성 컨텍스트·매핑·N+1 해결)를 함께 완성한다. 마지막 SQLD(Oracle/ANSI 표준) 시험 포인트로 자격증·표준 문법까지 보강한다.

#### S1. 관계형 모델 · SQL · 데이터 모델링 기초  ·  ⏱ 1.5~2주

- **🎯 목표** — 테이블/관계/제약을 직접 설계하고 PostgreSQL에서 DDL/DML/JOIN/집계/서브쿼리를 막힘없이 작성·해석한다. 이 토대가 있어야 이후 인덱스·실행계획·튜닝이 말이 된다.
- **핵심 토픽**
  - **관계형 모델 용어 + NULL의 3-valued logic** — `NULL = NULL`이 FALSE가 아니라 UNKNOWN인 이유.
  - **DDL·타입** — `integer/bigserial/varchar/text/numeric/timestamptz/boolean/jsonb/uuid` 용도별 선택. `char(n) vs varchar vs text`, `timestamp vs timestamptz` 차이.
  - **제약조건** — PK/FK/UNIQUE/NOT NULL/CHECK/DEFAULT, FK의 `ON DELETE CASCADE/RESTRICT/SET NULL` ↔ JPA `@OnDelete`/연관관계 매핑의 cascade·orphanRemoval(JPA cascade는 영속성 전이이고 DB의 ON DELETE와 별개임에 주의).
  - **SELECT 논리적 실행 순서** — `FROM→WHERE→GROUP BY→HAVING→SELECT→ORDER BY→LIMIT`. WHERE vs HAVING.
  - **JOIN** — INNER/LEFT/RIGHT/FULL/CROSS/SELF, `LEFT JOIN + IS NULL`로 '없는 것 찾기'.
  - **서브쿼리·집합연산** — 스칼라/인라인뷰/상관 서브쿼리, `IN/EXISTS/NOT EXISTS`, `UNION vs UNION ALL`, NOT IN + NULL 함정.
  - **집계 + 윈도우 함수 입문** — `ROW_NUMBER()/RANK()/SUM() OVER(PARTITION BY ...)`로 그룹별 순위·누적합 (면접 SQL 단골).
- **🛠 직접 해보기**
  - 쇼핑몰 미니 스키마(`users, products, orders, order_items`) 4테이블을 FK 포함 직접 CREATE + 샘플 30행 INSERT.
  - 연습 쿼리 10개: '회원별 총 주문금액 TOP 5', '주문 없는 회원', '카테고리별 매출과 전체 대비 비율(윈도우)', 'order_items JOIN 영수증 출력'.
  - PostgreSQL 공식 Tutorial 따라 치며 `\d \dt \di \x` psql 메타명령 익히기.
- **❓ 자가점검**
  - WHERE/HAVING 차이(GROUP BY 없이 HAVING 가능?)
  - NOT IN + NULL이 결과를 비우는 이유
  - INNER vs LEFT 행 수가 같고 다른 경우
  - timestamp vs timestamptz 기본값과 이유
  - char/varchar/text 저장·성능 차이와 권장.
- **📚 추천 자료** — PostgreSQL 공식 'The SQL Language/Tutorial' · 『SQL 첫걸음』 · pgexercises.com · SQLBolt / LeetCode Database(Easy).

#### S2. 설계 · 정규화 · 키  ·  ⏱ 1.5주

- **🎯 목표** — 요구사항을 ERD로 그리고 정규화/반정규화를 트레이드오프 근거와 함께 결정한다. '나중에 인덱스로 못 메꾸는' 구조적 결함을 예방.
- **핵심 토픽**
  - **ERD(까마귀발)** — 1:1/1:N/N:M, N:M을 중간(연결) 테이블로 해소 ↔ JPA `@ManyToMany + @JoinTable`(부가 컬럼이 없을 때) / 부가 컬럼이 필요하면 연결 엔티티를 만들어 `@ManyToOne` 두 개로 매핑.
  - **함수적 종속(FD)** — 부분/이행 종속, 1NF→2NF→3NF→BCNF 분해. '이 테이블 몇 정규형이고 왜 위반인지'.
  - **반정규화** — 읽기 성능 ↔ 갱신 이상(update anomaly)·정합성 비용.
  - **키** — 자연키 vs 대리키(surrogate), JPA `@Id @GeneratedValue(strategy = IDENTITY/SEQUENCE)`로 대리키 매핑(IDENTITY는 INSERT 시점 채번이라 쓰기 배치(batch insert)와 상성이 나쁘고, SEQUENCE는 사전 채번·allocationSize로 묶기 가능).
  - **PostgreSQL 시퀀스/IDENTITY/bigserial** — UUID v4 vs v7 인덱스 단편화, 분산 환경에서 auto-increment 곤란 → UUIDv7/ULID 대안.
  - **무결성 3종** — 개체(PK)/참조(FK)/도메인(타입·CHECK). 앱 검증 vs DB 제약.
  - **ORM이 만드는 스키마 읽기(매핑 포인트)** — JPA 엔티티(@Entity·@Table·@Column) → Hibernate `ddl-auto`(none/validate/update/create/create-drop)로 스키마를 생성·검증 → `hibernate.show_sql`+`format_sql=true` 또는 schema-generation 스크립트로 실제 발행되는 DDL 로그를 직접 확인(운영에선 update/create 대신 validate + Flyway/Liquibase 권장).
  - **[SQLD] 3층 스키마** — 외부(External, View)/개념(Conceptual, 통합 ERD)/내부(Internal, 물리 저장) 3계층과 논리적·물리적 독립성. 개념 스키마=전사 데이터 모델 통합 관점.
  - **[SQLD] 엔터티·속성·관계** — 엔터티(인스턴스 집합)/속성(더 쪼갤 수 없는 데이터 단위)/관계(엔터티 간 연관). 관계의 표기: 차수(cardinality 1:1/1:N/N:M)·선택성(optional/mandatory).
  - **[SQLD] 식별자 분류** — 주식별자(PK 후보, 유일·최소·불변·NOT NULL) vs 보조식별자, 단일 vs 복합식별자, 본질식별자 vs 인조(대리)식별자. 외부식별자(foreign identifier)=다른 엔터티의 주식별자를 관계로 받아온 것(=FK 역할).
  - **[SQLD] 식별/비식별 관계** — 식별 관계: 부모 주식별자가 자식의 주식별자 일부가 됨(자식 PK에 포함, 실선)·강한 종속. 비식별 관계: 부모 주식별자가 자식의 일반 속성(FK)으로만 들어감(점선)·약한 종속. 무분별한 식별관계 연쇄는 PK 컬럼 증식 유발.
  - **[SQLD] 본질식별자 vs 인조식별자** — 본질(자연)식별자=업무적으로 의미 있는 키(주민번호·사업자번호 등), 인조식별자=순번/일련번호로 새로 부여한 대리키. 인조식별자는 단순·불변이나 중복 데이터 방어가 약해질 수 있음(트레이드오프).
- **🛠 직접 해보기**
  - 1단계 스키마를 dbdiagram.io로 ERD화 → 일부러 '나쁜 테이블'(주문에 회원명·상품명 중복) 만들고 3NF로 분해 과정을 기록.
  - 같은 스키마를 JPA 엔티티(@Entity/@Table/@Column/@Id)로 작성 → `ddl-auto: create`로 띄우고 `show_sql`로 발행 DDL 로그를 캡처 → 1단계 손DDL과 diff.
  - N:M(products↔tags)을 `@ManyToMany + @JoinTable`로 매핑하고 자동 생성 조인 테이블을 `\d`로 확인 → 부가 컬럼(추가일·정렬순서 등)이 필요해지면 연결 엔티티(ProductTag)로 리팩터링해 `@ManyToOne` 2개 + 복합키로 바꾸기.
  - PK를 UUID(@Id @GeneratedValue 없이 애플리케이션 생성 또는 UUIDv7)로 바꿔 대량 INSERT 시 인덱스 순서 변화 관찰(4단계 후 재방문).
  - [SQLD] 같은 ERD를 식별관계 버전 / 비식별관계 버전 둘로 그려 자식 PK 구성이 어떻게 달라지는지 비교(주식별자 상속 여부).
- **❓ 자가점검**
  - 2NF vs 3NF(부분/이행 종속)
  - 반정규화 비용
  - 대리키 이유와 단점
  - FK를 DB에 vs 앱에서만 관리 트레이드오프
  - N:M의 RDB/JPA 매핑(@ManyToMany vs 연결 엔티티 선택 기준).
  - [SQLD] 3층 스키마 각 계층과 논리적·물리적 독립성이 뜻하는 것
  - [SQLD] 식별 관계 vs 비식별 관계 차이와 자식 주식별자에 미치는 영향
  - [SQLD] 주식별자의 4조건(유일성·최소성·불변성·존재성)과 본질식별자 vs 인조식별자 선택 기준.
- **📚 추천 자료** — 『SQL 안티패턴』 · 『Database Design for Mere Mortals』 · Hibernate ORM User Guide(Entity/Mapping/Schema generation) · dbdiagram.io. · 한국데이터산업진흥원 SQL 자격검정 실전문제('노랑이') 1과목(데이터 모델링의 이해) · SQL 전문가 가이드(SQLD 공식 가이드) 데이터 모델링 파트.

#### S3. 스토리지 엔진 · 인덱스 내부구조 ⭐  ·  ⏱ 2주 (hands-on에 시간 더 투자)

- **🎯 목표** — 인덱스를 자료구조 수준에서 이해하고 '어떤 인덱스를 어떤 컬럼 순서로'를 근거 있게 결정. 인덱스가 '안 타는' 케이스를 즉답.
- **핵심 토픽**
  - **디스크 I/O와 페이지** — PostgreSQL 8KB, random I/O가 비싸서 인덱스가 필요한 근본 이유.
  - **B-Tree / B+Tree** — 균형, 리프 정렬·연결(range scan), 낮은 높이로 적은 I/O. 'B+는 리프에만 데이터·리프 연결' (면접 단골).
  - **클러스터드 vs 논클러스터드** — PostgreSQL은 항상 논클러스터드(heap + ctid), CLUSTER는 일회성 재정렬 ↔ MySQL InnoDB의 PK=클러스터드.
  - **복합 인덱스 leftmost prefix** — `(a,b,c)`는 a / a,b / a,b,c엔 쓰이고 b·b,c엔 안 씀. 등호 먼저, 범위 마지막.
  - **커버링 인덱스 / Index Only Scan** — INCLUDE 컬럼, visibility map 관계.
  - **카디널리티·선택성** — 고유값 비율 높을수록 효과적, 성별 같은 저카디널리티 단독은 무의미.
  - **인덱스가 안 타는 경우** — 컬럼 가공(`func(col)=x`), 묵시적 형변환, 선행 와일드카드 `LIKE '%x'`, OR, 낮은 선택성. 해결책(함수/표현식 인덱스).
  - **PostgreSQL 인덱스 확장** — Hash, GIN(jsonb/배열/전문검색), GiST, BRIN(시계열), Partial Index, Expression Index.
  - **트레이드오프** — 읽기↑ vs 쓰기 비용·저장공간·유지 오버헤드↑.
- **🛠 직접 해보기**
  - `generate_series`로 orders 100만 행 → 인덱스 없이 조회 `EXPLAIN ANALYZE`(Seq Scan) → 인덱스 생성 후 재측정.
  - 복합 인덱스 `(status, created_at)` 실험: 선두 컬럼 규칙 체감.
  - 커버링 인덱스 `(status) INCLUDE (id)`로 Index Only Scan 유도, VACUUM 전후 비교.
  - 안 타는 케이스 재현: `WHERE EXTRACT(year FROM created_at)=2025` → 표현식 인덱스로 개선.
  - Partial Index: `WHERE is_deleted=false`만 인덱싱해 크기/속도 비교.
- **❓ 자가점검**
  - B-Tree vs B+Tree와 DB가 B+Tree 쓰는 이유
  - `(a,b,c)`에서 `WHERE b=? AND c=?`가 못 타는 이유
  - PostgreSQL 인덱스는 클러스터드인가(MySQL과 차이)
  - `LIKE '%abc'` 해결책
  - 커버링 인덱스와 Index Only Scan 미보장 이유
  - 저카디널리티 인덱스가 보통 무의미하지만 유효한 경우(partial).
- **📚 추천 자료** — Use The Index, Luke!(무료 온라인) · PostgreSQL Indexes 챕터 · 『Real MySQL 8.0』 1권 인덱스 파트 · PostgreSQL Physical Storage.

#### S4. 트랜잭션 · 격리수준 · 동시성 제어 ⭐  ·  ⏱ 2~2.5주 (여기서 깊이를 만든다)

- **🎯 목표** — ACID·격리수준·이상현상·락·MVCC를 한 흐름으로 설명하고, 동시성 시나리오에서 적절한 락/격리수준 선택. 중복 결제·lost update를 진단·예방.
- **핵심 토픽**
  - **ACID** — 각각 '무엇을 보장·어떻게 구현'(WAL/redo·undo, commit/rollback)까지.
  - **이상현상** — Dirty/Non-repeatable/Phantom Read를 시퀀스로, + Lost Update, Write Skew.
  - **격리수준 4단계 표** — PostgreSQL 기본=READ COMMITTED, RR/SERIALIZABLE은 MVCC(SSI)로 구현되어 표준과 다름(PG의 RR은 phantom도 막음).
  - **MVCC** — xmin/xmax 버전, 스냅샷 읽기('읽기가 쓰기를 막지 않음'), 새 버전 생성 → dead tuple → VACUUM 필요. Oracle/MySQL undo segment와 차이.
  - **락** — 공유(S)/배타(X), 행 vs 테이블, `SELECT ... FOR UPDATE / FOR SHARE`, 인덱스 유무가 락 범위에 미치는 영향.
  - **비관적 vs 낙관적 락** — JPA 낙관적 락 `@Version`(엔티티 버전 컬럼으로 갱신 충돌 감지 → OptimisticLockException), 비관적 락 `@Lock(LockModeType.PESSIMISTIC_READ/WRITE)`(내부적으로 `SELECT ... FOR SHARE/UPDATE` 발행). 충돌이 드물면 낙관적, 잦으면 비관적.
  - **데드락 4조건** — 상호배제·점유와대기·비선점·순환대기 + 해결(락 순서 통일·타임아웃·자동 detection).
  - **트랜잭션 전파/경계** — Spring `@Transactional`의 전파(propagation: REQUIRED/REQUIRES_NEW/NESTED)와 격리(isolation), readOnly·rollbackFor 옵션. REQUIRES_NEW는 물리적으로 별도 트랜잭션을 띄우고, NESTED는 savepoint 기반이라 부분 롤백만 됨. 같은 빈 내부 메서드 호출(self-invocation)은 프록시를 안 거쳐 @Transactional이 무시되는 함정.
  - **(핵심) JPA 영속성 컨텍스트와 트랜잭션** — `@Transactional` 경계가 곧 영속성 컨텍스트(persistence context)의 생존 범위. 1차 캐시(같은 트랜잭션 내 동일 식별자 조회 시 동일 인스턴스 반환), dirty checking(스냅샷과 비교해 flush 시 변경된 필드만 UPDATE 자동 발행), 쓰기 지연(write-behind, flush까지 SQL 모음), 트랜잭션 커밋 시 자동 flush. 준영속(detached) 상태에서는 dirty checking이 동작하지 않아 merge가 필요함을 안다.
- **🛠 직접 해보기**
  - psql 두 세션으로 격리수준 바꿔가며 dirty/non-repeatable read 관찰.
  - Lost Update 재현 → `SELECT FOR UPDATE`(JPA `@Lock(PESSIMISTIC_WRITE)`) 또는 `@Version` 낙관적 락으로 해결.
  - 두 세션 `row1→row2 / row2→row1` UPDATE로 데드락 발생, PG abort 로그 확인.
  - Spring `@Transactional` + 비관적 락(`@Lock(PESSIMISTIC_WRITE)`)으로 재고 차감 동시성 테스트(멀티스레드), 락 유무에 따른 정합성 차이 비교 → 같은 시나리오를 `@Version` 낙관적 락 + 재시도로 다시 구현해 대조.
  - SERIALIZABLE에서 write skew 재현 → serialization failure 재시도 로직.
- **❓ 자가점검**
  - Isolation 구현 방식과 높일수록 잃는 것
  - MVCC와 '읽기가 쓰기 안 막음'·VACUUM 필요 이유
  - PG 기본 격리수준과 표준 RR과 차이
  - 비관/낙관 락 선택과 JPA 구현(@Lock vs @Version)
  - 데드락 4조건과 현실적 감소법
  - `REQUIRES_NEW` vs `NESTED` 차이와 영속성 컨텍스트·flush 시점
  - 중복 결제(따닥) DB 레벨 차단법(unique·락·멱등키).
- **📚 추천 자료** — PostgreSQL Concurrency Control(필독) · DDIA 7장 Transactions · Spring Framework Reference — Transaction Management / Hibernate ORM User Guide(Locking·Flushing) · Hermitage 프로젝트.

#### S5. 쿼리 실행계획 · 조인 알고리즘 · 튜닝 ⭐  ·  ⏱ 2~2.5주 (JPA 실습 비중 높게)

- **🎯 목표** — `EXPLAIN (ANALYZE, BUFFERS)`를 읽고 병목을 짚어 개선. 옵티마이저 선택을 추론하고 JPA의 N+1 등 비효율을 잡는다.
- **핵심 토픽**
  - **옵티마이저(CBO)와 통계** — pg_stats, ANALYZE, 통계 낡으면 나쁜 계획 → autovacuum 역할.
  - **EXPLAIN 읽기** — vs ANALYZE, cost(추정) vs actual time, rows 추정 vs 실제 괴리(=통계 신호), BUFFERS, 트리는 안쪽부터.
  - **스캔** — Seq / Index / Index Only / Bitmap Index Scan.
  - **조인 알고리즘** — Nested Loop(소량+인덱스), Hash Join(대량+등호), Sort-Merge(정렬된 대량).
  - **N+1 (핵심)** — 지연로딩(LAZY) 연관을 루프에서 접근하면 N+1. 해결: fetch join(JPQL `join fetch` — 한 쿼리 JOIN으로 즉시 로딩, 단 컬렉션 fetch join + 페이징은 메모리 페이징 경고/위험, 컬렉션 두 개 동시 fetch join은 MultipleBagFetchException)·`@EntityGraph`(쿼리별로 연관을 즉시 로딩, 내부적으로 JOIN)·`@BatchSize`/`hibernate.default_batch_fetch_size`(연관을 IN 쿼리로 묶어 N+1→N/batch+1). 일대다 페이징이면 batch fetch가, 단건 조회면 fetch join이 보통 유리.
  - **슬로우 쿼리 튜닝 절차** — 식별(pg_stat_statements) → EXPLAIN ANALYZE → 병목 파악 → 인덱스/재작성 → 재측정.
  - **페이지네이션** — OFFSET이 뒤로 갈수록 느린 이유 vs keyset(cursor) 장단점 → Spring Data의 `Slice`(다음 페이지 존재만 확인, count 생략)나 keyset/cursor 쿼리(`WHERE (created_at, id) < (?, ?) ORDER BY ... LIMIT n`)로 구현.
  - **안티패턴** — `SELECT *`, 함수로 감싼 WHERE, 불필요 DISTINCT, OR 남용, 큰 IN, `count(*)` 비용. JPA: 필요 컬럼만 가져오는 DTO 프로젝션(생성자 표현식/인터페이스 프로젝션), 존재 확인은 `exists`, 카운트는 `count` 쿼리, OSIV로 인한 영속성 컨텍스트 지연 종료·뷰 렌더링 중 추가 쿼리 주의.
- **🛠 직접 해보기**
  - 100만 행에서 3종 조인 유도 + `set enable_hashjoin=off`로 강제 비교.
  - JPA N+1 재현: 게시글 목록 작성자 이름 접근 → Hibernate `show_sql`/p6spy로 발행 쿼리 수 카운트 → fetch join / `@EntityGraph` / `@BatchSize` 각각 적용 후 쿼리 수·실행계획 비교.
  - `OFFSET 10000 LIMIT 20` vs keyset 응답시간 측정(그래프).
  - `pg_stat_statements`로 느린 TOP5 → 튜닝 1회 완주(before/after).
  - estimated vs actual rows 10배 차이 쿼리 → ANALYZE 후 계획 변화.
- **❓ 자가점검**
  - EXPLAIN vs ANALYZE와 첫 신호
  - NL vs Hash 유리 상황
  - N+1과 fetch join vs @EntityGraph vs @BatchSize 차이(언제 무엇을 쓰나)
  - 컬렉션 fetch join + 페이징이 위험한 이유
  - OFFSET 느려짐·keyset 트레이드오프
  - 인덱스 있는데 Seq Scan 고르는 이유
  - rows 추정 괴리 원인·대처
  - count/exists 적절 사용 이유.
- **📚 추천 자료** — PostgreSQL Performance Tips/Using EXPLAIN · explain.dalibo.com · 『SQL Performance Explained』 · Hibernate ORM User Guide(Fetching) / 『자바 ORM 표준 JPA 프로그래밍』(김영한) — 즉시·지연 로딩, fetch join, N+1 · p6spy / datasource-proxy, pg_stat_statements.

#### S6. 확장 · 복제 · 분산 · 운영  ·  ⏱ 2~3주 (면접 빈출 위주 선택 집중)

- **🎯 목표** — 복제·파티셔닝·샤딩과 정합성 트레이드오프(CAP/일관성)를 설명하고, 커넥션 풀·백업·모니터링 운영까지 답한다.
- **핵심 토픽**
  - **스케일업 vs 스케일아웃** — 읽기-쓰기 분리 → Spring `AbstractRoutingDataSource`(또는 `@Transactional(readOnly=true)` 기준)로 읽기=replica/쓰기=primary 라우팅.
  - **복제** — 동기 vs 비동기, replication lag → read-after-write 불일치(중요 읽기는 primary). PG streaming replication/WAL shipping.
  - **파티셔닝** — range/list/hash, partition pruning, 선언적 `PARTITION BY`(시계열).
  - **샤딩** — 샤드 키(핫스팟·rebalancing), 크로스 샤드 조인/트랜잭션 어려움. 파티셔닝(한 서버 내) vs 샤딩(서버 간).
  - **CAP** — 분할 시 C·A 택일(P는 선택 아님), strong vs eventual, PACELC.
  - **RDB vs NoSQL 선택** — PostgreSQL jsonb로 NoSQL 요구 흡수.
  - **커넥션 풀** — 풀 크기 산정(코어·디스크 기준 적정값), Spring Boot 기본 HikariCP의 maximumPoolSize·connectionTimeout. DB 연결 한계를 넘어서면 PgBouncer로 서버 측 풀링 추가(HikariCP=앱 측 풀 ↔ PgBouncer=DB 앞단 풀, 둘은 계층이 다름).
  - **운영** — 백업(pg_dump/PITR), VACUUM/autovacuum·bloat·XID wraparound, 모니터링(연결수·캐시적중·락대기·복제지연).
  - **캐싱** — look-aside/write-through, 무효화·스탬피드(thundering herd) (아키텍처와 접점).
- **🛠 직접 해보기**
  - primary + replica streaming replication → lag 측정, read-after-write 불일치 재현.
  - 주문 테이블 월별 range 파티션 → partition pruning을 EXPLAIN으로 확인.
  - Spring `AbstractRoutingDataSource`로 읽기=replica/쓰기=primary 라우팅을 구성하고 `@Transactional(readOnly=true)` 분기 검증.
  - PgBouncer transaction pooling으로 커넥션 수↓ 처리량 변화 측정.
  - jsonb + GIN 인덱스로 `@>, ->>` 조회 성능 측정.
- **❓ 자가점검**
  - 파티셔닝 vs 샤딩·샤드 키 실수 결과
  - read replica 정합성 문제·해결
  - 'CA 시스템' 표현이 부정확한 이유·PG 단일노드 분류
  - NoSQL vs jsonb 충분한 경우
  - 풀 크기 무작정↑ 나빠지는 이유·HikariCP와 PgBouncer의 역할 차이
  - VACUUM 없으면 생기는 문제
  - 캐시 정합성·스탬피드 차단.
- **📚 추천 자료** — DDIA 5/6/9장 · PostgreSQL HA/Partitioning/Vacuuming · Spring Boot Reference — Data(다중 DataSource)·HikariCP · PgBouncer 문서 · Kleppmann 'Please stop calling databases CP or AP'.

#### S7. SQLD 시험 포인트(SQL 활용) — Oracle/ANSI 표준 ⭐  ·  ⏱ 1~1.5주 (자격증 병행 시)

- **🎯 목표** — SQLD '노랑이'(SQL 자격검정 실전문제) 빈출인 표준 조인·집합연산·계층형 질의·서브쿼리·그룹/윈도우 함수·Top-N·PIVOT을 Oracle/ANSI 표준 문법으로 작성·해석하고, 실무 PostgreSQL과의 문법 차이를 짚는다. ★주의: SQLD는 Oracle/ANSI 표준 기준 — ROWNUM·CONNECT BY·MINUS·PIVOT은 Oracle 전용이라 PostgreSQL에선 다른 문법을 쓴다.
- **🔑 전제** — db-s1(SQL 기초), db-s2(모델링 용어)
- **핵심 토픽**
  - **표준 조인(ANSI JOIN)** — `NATURAL JOIN`(동일명 컬럼 자동 조인, ON/USING과 같은 join 절에 병용 불가·조인 컬럼에 테이블 한정자 사용 불가)·`JOIN ... USING(col)`(동일명 컬럼 한 번만 출력)·`JOIN ... ON`(공통 컬럼이 양쪽 모두 출력)·`CROSS JOIN`(카티션 곱)·`LEFT/RIGHT/FULL OUTER JOIN`. Oracle 구식 `(+)` 외부조인 표기 ↔ ANSI OUTER JOIN. PostgreSQL도 ANSI 표준 조인은 동일하나 `(+)` 미지원.
  - **집합연산자** — `UNION`(중복 제거+정렬)·`UNION ALL`(중복 유지, 정렬 X)·`INTERSECT`(교집합)·`MINUS`(차집합). ★MINUS는 Oracle 전용 — PostgreSQL/ANSI 표준은 `EXCEPT`(동일 의미). 컬럼 수·타입 호환 필요, ORDER BY는 맨 마지막에 한 번.
  - **계층형 질의(Oracle 전용)** — `START WITH`(루트 조건)·`CONNECT BY PRIOR`(부모-자식 연결 방향)·`LEVEL`(깊이)·`CONNECT_BY_ROOT`·`SYS_CONNECT_BY_PATH`·`ORDER SIBLINGS BY`. ★Oracle 전용 — PostgreSQL은 `WITH RECURSIVE` 재귀 CTE로 동일 결과를 작성(문법 전혀 다름).
  - **서브쿼리** — 스칼라 서브쿼리(SELECT절, 1행 1열)·인라인 뷰(FROM절 서브쿼리)·중첩/상관 서브쿼리(WHERE절, 바깥 행마다 평가). `IN/EXISTS/ANY/ALL`, NOT IN + NULL 함정. PostgreSQL 동일.
  - **그룹 함수(소계/집계 확장)** — `GROUP BY ROLLUP(a,b)`(계층적 소계+총합)·`CUBE(a,b)`(모든 조합 소계)·`GROUPING SETS`(원하는 집계 집합만)·`GROUPING()`(소계행 식별, 소계/총합행은 1·일반 행은 0 반환). PostgreSQL도 ROLLUP/CUBE/GROUPING SETS 모두 지원(동일).
  - **윈도우 함수(분석 함수)** — 순위: `RANK`(동순위 후 건너뜀 1,1,3)·`DENSE_RANK`(안 건너뜀 1,1,2)·`ROW_NUMBER`(무조건 고유 1,2,3). 행 참조: `LAG/LEAD`(이전/다음 행). 집계: `SUM/AVG ... OVER(PARTITION BY ... ORDER BY ... ROWS/RANGE ...)`로 누적·이동. `RATIO_TO_REPORT`·`NTILE`. PostgreSQL 윈도우 함수 동일(표준)이나 `RATIO_TO_REPORT`는 Oracle 전용(PostgreSQL은 `값 / SUM() OVER()`로 대체).
  - **Top-N 조회** — Oracle `ROWNUM`(WHERE 통과 후·정렬/집계 전 시점에 부여 → `WHERE ROWNUM <= N`만 동작, `> N`은 항상 false)·`ROW_NUMBER() OVER(ORDER BY)`로 정확한 Top-N. ANSI `FETCH FIRST n ROWS ONLY`(Oracle 12c+/PostgreSQL 지원). ★ROWNUM은 Oracle 전용 — PostgreSQL은 `LIMIT n [OFFSET m]` 또는 `FETCH FIRST`. Oracle ROWNUM ↔ PostgreSQL LIMIT.
  - **PIVOT/UNPIVOT** — `PIVOT`(행→열 전환, 집계 동반)·`UNPIVOT`(열→행). ★Oracle 11g+ 전용 — PostgreSQL은 네이티브 PIVOT 없음(조건부 집계 `SUM(CASE WHEN ... )` 또는 집계 `FILTER`절, tablefunc의 `crosstab`로 대체).
  - **정규표현식 함수** — Oracle `REGEXP_LIKE/REGEXP_SUBSTR/REGEXP_REPLACE/REGEXP_INSTR/REGEXP_COUNT`. PostgreSQL은 `~`(매치 연산자)·`regexp_replace`·`regexp_matches`·`regexp_substr`(15+) 등으로 함수·연산자 형태가 다름.
  - **관리 구문(DDL/DML/MERGE/TCL/DCL)** — DDL(CREATE/ALTER/DROP/TRUNCATE)·DML(INSERT/UPDATE/DELETE/SELECT)·`MERGE`(UPSERT, USING ... ON ... WHEN MATCHED/NOT MATCHED)·TCL(COMMIT/ROLLBACK/SAVEPOINT)·DCL(GRANT/REVOKE). ★Oracle은 DDL 실행 시 앞뒤로 암묵적 COMMIT이 일어나 DDL(=TRUNCATE 포함) 롤백 불가 — SQLD는 이 Oracle 기준. ★단 PostgreSQL은 DDL이 트랜잭션 안에서 동작해 TRUNCATE·대부분의 DDL을 ROLLBACK 가능(CREATE DATABASE 등 일부 예외) — 실무 전이 시 주의. PostgreSQL MERGE는 15+ 지원, 또는 `INSERT ... ON CONFLICT`(단 동시성 보장 방식이 MERGE와 다름).
- **🛠 직접 해보기**
  - 사원-부서 표준 조인 세트를 NATURAL/USING/ON 세 방식으로 각각 작성 → USING과 ON에서 공통컬럼 출력 차이 확인.
  - UNION vs UNION ALL 결과·정렬·성능 차이 측정, INTERSECT/MINUS(또는 PostgreSQL EXCEPT)로 차집합.
  - 조직도(사원 manager_id) 계층형 질의: Oracle `CONNECT BY PRIOR + LEVEL + SYS_CONNECT_BY_PATH`로 작성 → 같은 결과를 PostgreSQL `WITH RECURSIVE`로 다시 작성해 문법 대조.
  - 급여 순위표를 RANK/DENSE_RANK/ROW_NUMBER 한 쿼리에 나란히 출력해 동순위 처리 차이 눈으로 확인.
  - 부서·직급별 매출에 ROLLUP/CUBE/GROUPING SETS 적용 + GROUPING()으로 소계행 라벨링.
  - Top-N: Oracle `ROWNUM <= 5`가 정렬 전 적용돼 틀리는 케이스 → 인라인뷰로 정렬 후 ROWNUM 또는 ROW_NUMBER/FETCH FIRST로 교정.
  - [전이 실험] PostgreSQL에서 BEGIN → TRUNCATE → ROLLBACK 후 데이터가 복구됨을 확인(Oracle이었다면 불가) — DDL 트랜잭션 차이 체감.
  - '노랑이'(SQL 자격검정 실전문제) 2/3과목 SQL 활용 문제를 회차별로 풀고 오답 노트.
- **❓ 자가점검**
  - NATURAL JOIN vs USING vs ON 차이, USING/ON에서 공통컬럼이 결과에 몇 번 나오나
  - UNION vs UNION ALL(정렬·중복·성능), MINUS와 PostgreSQL EXCEPT 관계
  - CONNECT BY PRIOR의 PRIOR 위치가 부모→자식/자식→부모 방향을 어떻게 정하나, PostgreSQL 대응 문법은?
  - RANK vs DENSE_RANK vs ROW_NUMBER 출력 차이(동순위 1,1,?)
  - ROLLUP vs CUBE 생성 소계 집합 차이, GROUPING() 반환값(0/1) 용도
  - `WHERE ROWNUM > 1`이 항상 빈 결과인 이유와 올바른 Top-N 작성법, ROWNUM ↔ LIMIT 대응
  - PIVOT이 Oracle 전용인 이유와 PostgreSQL 대체(조건부 집계/crosstab)
  - TRUNCATE가 Oracle에서 롤백 안 되는 이유(DDL 암묵적 commit)와, PostgreSQL에선 롤백 가능하다는 차이. MERGE가 처리하는 일.
- **📚 추천 자료** — 한국데이터산업진흥원 'SQL 자격검정 실전문제'(노랑이) · 『SQL 전문가 가이드』(SQLD 공식 가이드) · Oracle Database SQL Language Reference(조인·계층형 질의·분석 함수·MERGE) · PostgreSQL 공식 문서: WITH Queries(Recursive)·Window Functions·GROUPING SETS·MERGE·TRUNCATE(문법·트랜잭션 비교용).

**🚩 데이터베이스 통과 기준**

1. 빈 DB에서 정규화된 4~5테이블 스키마를 ERD→DDL→JPA 엔티티 매핑까지 막힘없이 짜고, ddl-auto/show_sql로 실제 발행 DDL을 확인한다.
2. 임의 쿼리에 `(컬럼 순서 포함) 어떤 인덱스를 왜 걸지` 근거를 대고, '안 타는 케이스'를 즉답한다.
3. 격리수준 4단계·MVCC·비관/낙관 락을 화이트보드에 그려 설명하고(JPA @Lock vs @Version 매핑 포함), 중복 결제 차단법 3가지를 댄다.
4. `EXPLAIN ANALYZE`를 읽어 병목(스캔/조인/정렬)을 짚고, N+1을 fetch join/@EntityGraph/@BatchSize로 제거한 측정값이 있다.
5. CAP·복제 지연·파티셔닝 vs 샤딩·커넥션 풀(HikariCP/PgBouncer)을 면접 답변 수준으로 말한다.
6. SQLD: 3층 스키마와 주식별자·외부식별자·식별/비식별 관계를 ERD 용어로 설명하고, 본질식별자 vs 인조식별자 선택 근거를 댄다.
7. SQLD: 계층형 질의(CONNECT BY/START WITH/PRIOR)·윈도우 함수(RANK/DENSE_RANK/ROW_NUMBER)·집합연산자·Top-N을 Oracle 표준 문법으로 작성하고, PostgreSQL과의 문법 차이(WITH RECURSIVE·EXCEPT·LIMIT·TRUNCATE 롤백 등)를 짚는다.

---

### 🧩 알고리즘 & 자료구조 — 프로그래머스 레벨 사다리 × 고득점 Kit × LeetCode 병행  ·  매일 병행  ·  상시 병행(첫날~면접 직전), 집중 가속은 4~끝 / 단계별 학습 분량 누적 약 11~16주

> 매일 1문제 + 25분 룰을 끝까지 돌리며, 프로그래머스 레벨 사다리(Lv0~Lv5)를 타고 고득점 Kit 10개 카테고리(해시·스택/큐·힙·정렬·완전탐색·그리디·DP·DFS/BFS·이분탐색·그래프)를 정확히 깐다. 각 단계마다 LeetCode 동일 패턴(Two Pointers/Sliding Window/Binary Search/Backtracking/Union-Find/Trie/Monotonic Stack)을 병행해 코테 통과 + 면접 설명 가능 수준을 동시에 만든다. Java 자료구조(PriorityQueue/HashMap/ArrayDeque/TreeMap)를 코테 관용구로 손에 익히고, 복잡도 역산은 'Java 기준 1초 ≈ 10^8 연산'으로 일관되게 적용하는 데 초점.

#### S1. 복잡도 · 기본 자료구조 · Java 무기 세팅 (Lv0~Lv1)  ·  ⏱ 학습 분량 약 1.5~2주(병행)

- **🎯 목표** — 코드를 보고 시간/공간 복잡도를 즉석 추정하고, 입력 한계 n으로 허용 복잡도를 역산한다. 배열/스택/큐/덱/해시를 Java 관용구로 막힘없이 쓰고, 채점 환경(입출력·재귀 한계)을 템플릿화한다. 이 '측정 도구'가 있어야 이후 모든 풀이 선택이 근거를 갖는다.
- **🔑 전제** — Java 기본 문법(반복문/메서드/배열·컬렉션). 별도 선수 없음 — 첫날부터 시작.
- **핵심 토픽**
  - **빅오 표기 · 상각 분석** — 최악/평균/상각을 구분하고 상수·저차항을 버리는 이유를 안다. 동적배열(ArrayList) add가 '상각(amortized) O(1)'인 이유(용량이 차면 1.5배(oldCapacity + oldCapacity>>1)로 재할당하며 복사 O(n)이 발생하지만, 그 비용이 이전 add들에 분산되어 평균 O(1))를 설명한다. 단, 단일 add의 최악은 여전히 O(n)임을 구분한다.
  - **입력 한계 → 허용 복잡도 역산** — '1초 ≈ 약 1억(10^8) 단순 연산'이라는 어림(Java/JVM 기준)으로 n에 맞는 복잡도를 고른다: n≤10^6→O(n)/O(n log n), 10^5→O(n log n), 5000 안팎→O(n²), 20~25 안팎→O(2^n)/O(n!). 문제를 풀기 전에 목표 복잡도부터 정한다.
  - **배열 vs 연결리스트** — 임의접근 O(1)·캐시 친화(배열) vs 노드 위치를 이미 알고 있을 때 그 지점의 삽입/삭제 O(1)(연결리스트)의 트레이드오프. 단, 연결리스트도 위치를 '찾는' 데는 O(n)이 든다. Java ArrayList는 동적배열이라 중간 삽입/삭제가 O(n)임을, LinkedList는 임의접근이 O(n)임을 안다.
  - **스택 / 큐 / 덱** — 괄호 짝 맞추기=스택, BFS=큐, 양끝 연산=덱이라는 매칭. Java에서 스택·큐·덱은 모두 ArrayDeque로 통일해 쓰고(스택은 push/pop, 큐는 offer/poll), 구식 Stack 클래스나 LinkedList보다 ArrayDeque가 빠른 이유를 안다.
  - **해시 테이블(HashMap/HashSet)** — 평균 O(1) 조회/삽입, 최악 O(n)(충돌 집중)임을 안다. 체이닝/load factor·리해싱·Java 8+ 버킷의 트리화(treeify) 개념을 알고(버킷 길이 8 이상이면서 테이블 용량 64 이상일 때 레드블랙 트리로 변환), '존재 여부/빈도/매핑' 문제에서 해시를 가장 먼저 떠올린다(HashSet로 존재 여부, HashMap으로 빈도/매핑). 정렬·범위 조회가 필요하면 TreeMap/TreeSet(O(log n))으로 넘어가는 신호도 안다.
  - **Java 표준 무기 카드** — ArrayDeque, HashMap/getOrDefault·merge, PriorityQueue, TreeMap, Arrays.sort/Collections.sort, Comparator, Collections.binarySearch의 용도와 호출형을 외워 둔다. 대량 입력에서 Scanner가 느린 이유(토큰 파싱·동기화 오버헤드·정규식 기반 파싱)와 BufferedReader + StringTokenizer / StreamTokenizer, 출력은 StringBuilder + BufferedWriter로 모아 쓰는 대체 패턴을 안다.
- **🛠 직접 해보기**
  - 같은 문제(합=K가 되는 두 수 찾기)를 ① 이중루프 O(n²) ② 정렬+투포인터 O(n log n) ③ 해시(HashMap) O(n) 세 버전으로 작성해 복잡도 차이를 체감한다(LeetCode Two Sum 패턴 = 프로그래머스 Lv0~1 해시 입문).
  - HashMap.getOrDefault/merge, ArrayDeque, Arrays.sort + Comparator, Collections.binarySearch 스니펫 4개를 'Java 무기 카드'로 CodePrep 이론에 등록한다.
  - Scanner vs BufferedReader로 10^6줄 읽기 시간을 비교하고, 표준 입출력 템플릿(BufferedReader + StringTokenizer + StringBuilder/BufferedWriter)을 만들어 둔다.
  - n→허용 복잡도 역산표(Java 1초 ≈ 10^8)를 출력해 책상에 붙인다.
  - 프로그래머스 Lv0~Lv1(입문)과 코딩테스트 입문 Kit를 매일 1문제로 시작한다.
- **❓ 자가점검**
  - 바깥 루프 n번 안에서 이분탐색을 호출하면 전체 복잡도는? (O(n log n))
  - n=10^5에서 O(n²) 풀이가 시간 내 통과할까? 근거는? (10^10 연산 ≈ Java 1초 예산(10^8) 초과 → 통과 불가)
  - ArrayList.add가 상각 O(1)인 이유를 한 문장으로. (가끔의 O(n) 재할당 비용이 다수 add에 분산되기 때문)
  - Java에서 스택/큐/덱을 한 자료구조로 통일한다면 무엇을 쓰고 왜인가? (ArrayDeque — 구식 Stack/LinkedList보다 빠르고 양끝 연산 O(1))
  - 해시 평균 O(1)이 최악 O(n)으로 무너지는 상황(충돌 집중)과 Java 8+가 이를 완화하는 방법은?(버킷이 길어지면 레드블랙 트리로 변환해 해당 버킷 탐색을 O(log n))
- **📚 추천 자료** — 프로그래머스 코딩테스트 입문 Kit / Lv0~Lv1 · Java API docs — java.util(Collections framework: ArrayDeque/HashMap/PriorityQueue/TreeMap) · Baeldung — Java Collections / Comparator 정리 · LeetCode — Arrays & Hashing, Two Pointers 입문(Easy) · VisuAlgo(자료구조 시각화)

#### S2. 해시 · 정렬 · 스택/큐 (Lv2 Kit 본진) ⭐ ⭐  ·  ⏱ 학습 분량 약 2~2.5주(병행)

- **🎯 목표** — 고득점 Kit의 해시·정렬·스택/큐를 유형별로 완성한다. 정렬은 특성으로 선택하고, 스택/큐는 '언제 꺼내는지' 신호를 익히며, 해시는 조회/빈도/그룹화 문제를 선형으로 푼다. LeetCode의 Monotonic Stack·Two Pointers 패턴을 같이 깔아 Lv2 코테 합격선을 만든다.
- **🔑 전제** — algo-s1(복잡도 역산, ArrayDeque/HashMap 사용).
- **핵심 토픽**
  - **정렬 알고리즘 특성과 선택** — 퀵(in-place·불안정·평균 O(n log n)·최악 O(n²))/머지(안정·O(n) 추가메모리·항상 O(n log n))/힙(in-place·불안정·O(n log n))을 구분한다. Java는 객체(참조형) 정렬에 안정 정렬(TimSort)을, 기본형 배열엔 듀얼피벗 퀵정렬(불안정)을 쓴다는 차이를 알고, Comparator.comparing·thenComparing·reversed로 다중 기준 정렬하는 법을 안다.
  - **해시 활용 패턴** — 빈도수 세기(HashMap merge/getOrDefault), 그룹화(computeIfAbsent로 Map<K,List<V>>), 두 컬렉션 차집합/교집합(HashSet retainAll/removeAll), 매핑 역추적까지 Kit 해시 유형을 커버한다. '완주하지 못한 선수', '전화번호부 접두어' 같은 유형에서 해시/정렬 중 무엇이 맞는지 판단한다(접두어 문제는 정렬 후 인접 비교 또는 트라이도 가능).
  - **스택 — 짝/괄호/되돌리기** — 올바른 괄호, 짝지어 제거, 쇠막대기류처럼 '직전 것과 비교/취소'가 필요하면 스택(ArrayDeque)을 쓴다. 후입선출(LIFO)이 왜 이런 문제에 자연스러운지 설명한다.
  - **Monotonic Stack(단조 스택)** — '다음 큰 수(Next Greater Element)'·'각 막대 기준 확장 범위'를 전체 O(n)에 푸는 단조 스택 패턴을 안다(각 원소가 스택에 한 번 push/pop). 스택에 무엇을(인덱스/값) 어떤 단조성으로 유지하는지가 핵심.
  - **큐 / 우선순위 큐 입문** — 프로세스/프린터/다리를 지나는 트럭류 시뮬레이션을 ArrayDeque로 모델링한다. '가장 급한 것 먼저'가 필요하면 우선순위 큐(PriorityQueue)로 넘어가는 신호를 인지한다.
  - **투 포인터 / 슬라이딩 윈도우** — 정렬된 배열의 두 수 합, (값이 음수가 없을 때의) 연속 부분배열 합/길이 조건을 이중루프 O(n²)에서 O(n)으로 낮춘다. 윈도우를 언제 늘리고 줄이는지(조건 만족/위반) 불변식을 명확히 한다. 음수가 섞이면 단순 슬라이딩 윈도우가 깨질 수 있음을 안다.
- **🛠 직접 해보기**
  - 프로그래머스 고득점 Kit '해시' 전 문항 + '정렬' + '스택/큐'를 카테고리째 푼다.
  - LeetCode: Two Pointers(정렬배열 두 수 합), Sliding Window(최소/최대 길이 부분배열), Monotonic Stack(Next Greater / Daily Temperatures 패턴)을 각 1~2문제씩 병행한다.
  - Comparator 다중 기준(comparing+thenComparing+reversed) 스니펫과 단조 스택 템플릿을 무기 카드로 등록한다.
  - 슬라이딩 윈도우 '합≥S 최소 길이(양수 배열)' 1문제를 투포인터로 손구현한다.
- **❓ 자가점검**
  - 퀵 vs 머지: 안정성·추가 메모리·최악 복잡도를 각각 말하라. (퀵: 불안정·재귀스택 평균 O(log n)·최악 O(n²) / 머지: 안정·추가배열 O(n)·최악 O(n log n))
  - Java의 Collections.sort/Arrays.sort(객체)는 안정 정렬인가?(예, TimSort) 다중 기준 정렬은 어떻게?(Comparator.comparing().thenComparing())
  - '다음 큰 수'를 전체 O(n)에 푸는 자료구조와 스택에 무엇을 넣는가?(단조 스택, 보통 인덱스)
  - 슬라이딩 윈도우로 풀 수 있는 신호(문제 형태)는 무엇인가?(연속 구간 + 단조적으로 늘/줄 수 있는 조건, 보통 음수 없는 값)
  - 해시로 풀 때 시간/공간 트레이드오프를 한 문장으로.(추가 메모리 O(n)으로 조회를 평균 O(1)로 산다)
- **📚 추천 자료** — 프로그래머스 고득점 Kit — 해시 / 정렬 / 스택·큐 · LeetCode — Two Pointers, Sliding Window, Stack(Monotonic) 패턴(Easy~Medium) · Java API docs — Comparator / Collections.sort / Arrays.sort(TimSort vs 듀얼피벗 퀵) · Baeldung — Java HashMap(merge/computeIfAbsent) / ArrayDeque

#### S3. 힙(우선순위 큐) · 완전탐색 · 이분탐색 (Lv2~3) ⭐ ⭐  ·  ⏱ 학습 분량 약 2~2.5주(병행)

- **🎯 목표** — 힙으로 Top-K/병합을, 완전탐색으로 모든 경우를, 이분탐색으로 '정렬된 공간/답'을 탐색한다. 특히 파라메트릭 서치(최적화→결정문제 변환)를 손에 익혀 Lv3 진입선을 넘긴다. LeetCode Binary Search·Backtracking 패턴 병행.
- **🔑 전제** — algo-s1~2(정렬, PriorityQueue 존재 인지, 복잡도 역산).
- **핵심 토픽**
  - **힙 / 우선순위 큐(PriorityQueue)** — Java PriorityQueue는 기본이 최소힙이라 최대힙은 Comparator.reverseOrder() 또는 (a,b)->b-a 비교자로 만든다(단 b-a는 큰 음수/양수에서 int 오버플로 위험이 있어 값 범위가 크면 Integer.compare 사용). offer(add)/poll이 O(log n), peek이 O(1)임을 알고 Top-K·여러 정렬 리스트 병합·'더/덜 매운 음식' 같은 유형에 쓴다. 임의 원소 삭제(remove(o))는 O(n)이라 잦으면 lazy deletion(꺼낼 때 무효 표시 건너뛰기)을 쓴다는 점도 안다.
  - **완전탐색(브루트포스)** — 입력이 작을 때(역산표상 2^n/n! 허용 범위, 대략 n≤20~25) 모든 경우를 만든다. 재귀로 순열·조합·부분집합을 직접 생성하는 골격을 익히고(라이브러리 의존 없이), '모든 조합/순열을 본다'가 신호임을 안다.
  - **백트래킹(Backtracking)** — 부분해를 만들다 조건 위반 시 되돌아간다(가지치기). 재귀 깊이/방문 표시(boolean[] visited)/복원(상태 되돌리기) 패턴을 익히고, 순열·조합·부분집합·N-Queen류를 같은 골격으로 푼다.
  - **이분탐색 lower/upper bound** — 경계 조건(<= vs <)을 정확히 다뤄 첫/마지막 위치를 찾는다. lower bound(같은 값이 있으면 그 앞 위치=첫 위치)/upper bound(같은 값 뒤 위치)를 직접 구현하는 법과, Java Collections.binarySearch/Arrays.binarySearch는 중복 시 어느 위치를 줄지 보장하지 않아 경계 탐색엔 직접 구현이 필요함을 안다.
  - **파라메트릭 서치(결정문제 변환)** — '최댓값을 최대로/최솟값을 최소로' 최적화 문제를 'X가 가능한가? yes/no'의 단조(monotone) 결정함수로 바꿔 답 자체를 이분탐색한다(랜선 자르기·최소 거리 최대화). 결정함수가 임계값 기준으로 한 번만 yes↔no가 바뀌어야(단조성) 함이 핵심임을 안다(LeetCode 'Koko Eating Bananas'류 = answer-space binary search).
- **🛠 직접 해보기**
  - 프로그래머스 고득점 Kit '힙' + '완전탐색' + '이분탐색'을 카테고리째 푼다.
  - 이분탐색 템플릿 2종(lower/upper bound 직접 구현 / 파라메트릭 결정함수)을 무기 카드로 만든다.
  - PriorityQueue로 Top-K와 'K개 정렬 리스트 병합'을 손구현한다.
  - LeetCode: Binary Search(on answer space), Backtracking(Subsets/Permutations/Combination Sum 패턴)을 각 1~2문제 병행한다.
- **❓ 자가점검**
  - 파라메트릭 서치와 일반 이분탐색의 차이를 한 문장으로.(전자는 '정렬된 배열'이 아니라 '답 후보 공간'을 이분탐색) 결정함수가 만족해야 할 성질은?(답 기준 단조성: 어떤 임계값 이상/이하에서만 yes)
  - Java PriorityQueue로 최대힙을 만드는 두 가지 방법은?(Comparator.reverseOrder() / (a,b)->b-a 비교자, 단 오버플로 주의 시 Integer.compare(b,a))
  - 완전탐색이 허용되는 입력 크기 기준(n)은 대략 얼마인가?(순열 n!이면 n≤10 안팎, 부분집합 2^n이면 n≤20~25)
  - 백트래킹에서 '가지치기'가 없으면 무엇이 문제인가?(탐색 공간이 지수로 폭발해 시간초과)
  - lower bound와 upper bound의 차이는?(중복 값 기준 첫 위치냐 마지막+1 위치냐 → 첫/마지막 위치 탐색에 사용) Java 표준 binarySearch를 경계 탐색에 바로 못 쓰는 이유는?(중복 시 반환 위치 미보장)
- **📚 추천 자료** — 프로그래머스 고득점 Kit — 힙 / 완전탐색 / 이분탐색 · Java API docs — PriorityQueue / Arrays.binarySearch / Collections.binarySearch · Baeldung — 이분탐색·백트래킹 in Java · LeetCode — Binary Search, Backtracking 패턴(Medium 위주)

#### S4. DFS / BFS · 유니온-파인드 (Lv2~3 핵심) ⭐ ⭐  ·  ⏱ 학습 분량 약 2.5~3주(병행)

- **🎯 목표** — 그래프/격자를 인접리스트·2D 배열로 모델링하고 DFS/BFS를 자유자재로 쓴다. 가중치 없는 최단거리=BFS, 경로/연결요소/사이클=DFS를 즉시 매칭하고, 유니온-파인드로 집합/사이클 문제를 푼다. 코테·면접 최빈출 구간.
- **🔑 전제** — algo-s1~3(ArrayDeque, 재귀/스택).
- **핵심 토픽**
  - **그래프 표현 · 격자 모델링** — 인접리스트(List<List<Integer>> 또는 List<Integer>[], O(V+E) 공간, 희소 그래프 유리) vs 인접행렬(int[V][V], O(V²) 공간, 간선 존재 확인 O(1))의 트레이드오프를 알고, 미로/지도 문제를 2D 배열+방향벡터(dx,dy)로 모델링한다. 방문 표시와 경계 검사를 빼먹지 않는다.
  - **DFS(재귀/스택)** — 연결요소 개수, 영역 채우기(flood fill), 경로 탐색, 사이클 판정에 DFS를 쓴다. JVM 기본 스택으로 깊은 재귀가 StackOverflowError를 낼 수 있어, -Xss로 스택 크기를 늘리거나 명시적 스택(Deque) 반복 DFS로 바꾸는 법을 안다.
  - **BFS(큐) · 최단거리** — 간선 가중치가 모두 1(또는 동일)인 그래프/격자의 최단거리는 BFS로 구한다(ArrayDeque). 방문 처리를 큐에 '넣는 시점(enqueue)'에 해야 같은 노드가 여러 번 큐에 들어가지 않는다는 점을 안다.
  - **멀티소스 BFS / 0-1 BFS** — 시작점이 여러 개(불 번지기·토마토 익히기)면 모든 소스를 처음에 큐에 넣고 동시 확장한다. 간선 가중치가 0/1뿐이면 ArrayDeque의 양끝(가중치 0은 addFirst, 1은 addLast)으로 다익스트라보다 빠른 O(V+E) 0-1 BFS를 안다.
  - **유니온-파인드(Disjoint Set)** — find/union을 경로 압축(path compression)과 union by rank(또는 size)로 거의 상수 시간(상각 역아커만 α(n))에 만든다(parent 배열 int[]로 구현). 두 원소가 같은 집합인지, 무방향 그래프에 사이클이 있는지(간선 추가 시 두 끝이 이미 같은 집합?)를 판정한다(LeetCode Union-Find 패턴). 이건 다음 단계 크루스칼의 부품.
- **🛠 직접 해보기**
  - 프로그래머스 고득점 Kit 'DFS/BFS'를 카테고리째 푼다.
  - 미로 최단거리(BFS) + 영역 개수 세기(DFS)를 각각 손구현하고, 멀티소스 BFS 1문제 + 0-1 BFS 1문제를 푼다.
  - 유니온-파인드를 parent 배열 + 경로 압축 + union by rank까지 손구현하고 사이클 판별에 적용한다(다음 단계 크루스칼에서 재사용).
  - LeetCode: Graph DFS/BFS(Number of Islands 패턴), Union-Find(Graph Valid Tree / Connected Components 패턴)를 병행한다.
- **❓ 자가점검**
  - 가중치(모두 1)가 없는 최단거리에 DFS 대신 BFS를 쓰는 이유는?(BFS는 거리 오름차순으로 노드를 방문해 처음 도달 시 최단 보장; 일반 DFS는 그렇지 않음)
  - BFS에서 방문 표시를 '큐에 넣을 때' vs '꺼낼 때' 중 언제 해야 중복이 없나?(넣을 때)
  - 경로 압축과 union by rank는 각각 무엇을 최적화하나?(find 경로 단축 / 트리 높이 억제 → 둘이 합쳐져 거의 상수)
  - 0-1 BFS가 일반 다익스트라보다 빠른 조건은?(간선 가중치가 0과 1뿐일 때, ArrayDeque 양끝 삽입으로 O(V+E))
  - Java 재귀 DFS가 깊은 그래프에서 StackOverflowError로 터질 때 대처 두 가지는?(-Xss로 JVM 스택 크기 상향 / 명시적 스택(Deque) 반복 DFS)
- **📚 추천 자료** — 프로그래머스 고득점 Kit — DFS/BFS · LeetCode — Graphs(DFS/BFS), Union-Find 패턴(Medium) · cp-algorithms.com — DSU(Disjoint Set Union) · VisuAlgo — Graph Traversal

#### S5. 그리디 · 그래프 알고리즘(최단경로 · MST · 위상정렬) (Lv3) ⭐ ⭐  ·  ⏱ 학습 분량 약 2.5~3주(병행)

- **🎯 목표** — 그리디의 정당성을 판단하고 반례를 의식한다. 다익스트라/벨만포드/플로이드워셜로 가중치 최단경로를, 크루스칼/프림으로 MST를, 위상정렬로 의존 순서를 푼다. Kit '탐욕법'+'그래프'를 완성해 Lv3 코테를 안정 통과한다.
- **🔑 전제** — algo-s4(BFS/DFS, 유니온-파인드, PriorityQueue).
- **핵심 토픽**
  - **그리디(탐욕법)와 정당성** — 매 순간 국소 최적을 골라 전체 최적이 되려면 '탐욕 선택 속성 + 최적 부분 구조'가 성립해야 함을 안다. 거스름돈(동전 체계에 따라 그리디가 깨질 수 있음)/회의실 배정/체육복류에서 '정렬 기준 + 그리디 선택'을 세우고, 그리디가 틀리는 반례를 직접 만들어 DP와의 경계를 익힌다.
  - **다익스트라(Dijkstra)** — 음수 간선이 없는 그래프의 단일 출발점 최단경로를 PriorityQueue(이진 힙)로 O((V+E) log V)에 푼다. (거리, 노드)를 long 인코딩 또는 int[]{dist,node}로 담고, 꺼낸 거리가 기록된 최단거리보다 크면 skip하는 패턴을 안다. 음수 간선에서 틀리는 이유(확정한 노드를 다시 갱신해야 할 수 있음)를 설명한다.
  - **벨만포드 / 플로이드워셜** — 벨만포드는 음수 간선 허용·O(VE)·음수 사이클 탐지(V-1회 완화 후 한 번 더 완화에서 갱신되면 음수 사이클). 플로이드워셜은 모든 쌍 최단경로 O(V³)(2D 배열 dist[i][j])이며, 점화식에서 '경유지 k' 루프가 가장 바깥에 와야(각 k를 모든 (i,j)에 적용 완료한 뒤 다음 경유지로) 정답이 나오는 이유를 안다.
  - **MST — 크루스칼 / 프림** — 최소 신장 트리를 크루스칼(간선 가중치 정렬 + 유니온-파인드로 사이클 회피, O(E log E), 희소 그래프 유리)과 프림(정점 확장 + 우선순위 큐, 이진 힙 기준 O(E log V), 밀집 그래프엔 인접행렬+O(V²) 프림 유리)으로 푼다. algo-s4의 유니온-파인드를 그대로 재사용한다.
  - **위상정렬(Topological Sort)** — DAG의 선후 의존 순서를 Kahn(진입차수 0인 노드부터 큐) 또는 DFS 후위(post-order 역순)로 구한다. 사이클이 있으면 위상정렬이 불가능함을, Kahn에서는 '결과에 포함된 노드 수 < 전체 노드 수'(진입차수가 0이 되지 못한 노드 잔존)로 감지한다(선수과목·작업 순서).
- **🛠 직접 해보기**
  - 프로그래머스 고득점 Kit '탐욕법' + '그래프'를 카테고리째 푼다.
  - 다익스트라 템플릿(PriorityQueue + skip 패턴) + 경로 복원을 손구현한다.
  - 크루스칼을 algo-s4 유니온-파인드 재사용으로 구현하고, 위상정렬(선수과목)을 Kahn으로 푼다.
  - LeetCode: Dijkstra(Network Delay Time 패턴), Topological Sort(Course Schedule 패턴), MST 패턴을 병행한다.
- **❓ 자가점검**
  - 다익스트라가 음수 간선에서 틀리는 이유와 그때의 대안은?(이미 확정한 최단거리가 음수 간선으로 더 줄 수 있어 그리디 가정이 깨짐 → 벨만포드/SPFA)
  - 플로이드워셜에서 경유지 k 루프가 가장 바깥이어야 하는 이유는?(k까지를 경유지로 허용한 모든 쌍 최단을 완성한 뒤 k+1로 확장해야 점화식이 성립)
  - 밀집 그래프 MST에 크루스칼/프림 중 무엇을 고르고 왜?(밀집이면 프림, 특히 인접행렬+O(V²)이 간선 정렬 O(E log E)보다 유리할 수 있음)
  - 위상정렬이 불가능한 그래프를 어떻게 감지하나?(사이클 존재 → Kahn 결과 노드 수가 전체보다 적음)
  - 그리디가 최적을 보장하지 못하는 예를 하나 들고, 그때 무엇으로 푸나?(예: 특정 동전 체계의 거스름돈 → DP)
- **📚 추천 자료** — 프로그래머스 고득점 Kit — 탐욕법(그리디) / 그래프 · LeetCode — Shortest Path(Dijkstra), Topological Sort 패턴(Medium) · cp-algorithms.com — Dijkstra / Bellman-Ford / Floyd-Warshall / MST · USACO Guide(Silver~Gold) 그래프 섹션

#### S6. 동적계획법(DP) — 상태정의와 점화식 (Lv3~4) ⭐ ⭐  ·  ⏱ 학습 분량 약 2.5~3주(병행, 이후 면접 직전까지 복습)

- **🎯 목표** — DP를 '상태 정의 + 점화식 + 기저'로 설계한다. Top-down(메모이제이션 재귀)과 Bottom-up을 상황에 맞게 쓰고, 대표 DP 유형(배낭/LIS/LCS/편집거리/구간/트리)을 점화식 카드로 외워 Lv3~4 및 LeetCode Medium~Hard DP를 시간 내 푼다.
- **🔑 전제** — algo-s1~5(완전탐색/재귀, 복잡도 역산). 그리디와의 경계 인식.
- **핵심 토픽**
  - **DP 신호와 상태 정의** — '겹치는 부분 문제(overlapping subproblems) + 최적 부분 구조(optimal substructure)'가 보이면 DP를 의심한다. 완전탐색이 지수 시간일 때 메모이제이션으로 (상태 수 × 전이 비용)의 다항 시간으로 떨어뜨린다. dp[i]/dp[i][j]가 '무엇을 의미하는지'를 한 문장으로 정의하는 훈련.
  - **Top-down vs Bottom-up** — Top-down은 재귀 + 메모 배열(int[]/long[][], 미방문은 -1로 표시)로 직관적이지만 재귀 깊이(StackOverflowError)·호출 오버헤드 주의. Bottom-up은 반복문으로 스택 안전·상수적으로 빠른 경향. 둘을 같은 문제로 변환하는 법과 선택 기준(필요한 상태만 계산하면 Top-down, 전 상태를 채우면 Bottom-up)을 안다.
  - **배낭(Knapsack)** — 0/1 배낭(각 물건 1번)과 무한(완전) 배낭의 점화식 차이, 그리고 1차원 배열로 압축할 때 0/1은 무게(용량)를 역순으로, 무한은 정순으로 순회해야 하는 이유(같은 물건의 중복 사용 여부)를 안다.
  - **수열 DP — LIS / LCS / 편집거리** — LIS는 O(n²) DP와 O(n log n)(이분탐색으로 '길이별 최소 꼬리값' 리스트를 갱신; 이 리스트 자체는 LIS가 아니지만 길이는 정확) 두 방법을 안다. LCS·편집거리(Edit Distance)는 2D 표의 점화식(일치 시 대각선+0, 불일치 시 삽입/삭제/교체 중 최소+1)을 손으로 채운다(LeetCode 'Edit Distance' Hard / 'Longest Common Subsequence' Medium).
  - **구간 DP / 트리 DP** — 구간 DP는 dp[i][j]=구간 [i,j]의 최적을 '길이 작은 구간부터' 채운다(예: 행렬 곱셈 순서). 트리 DP는 자식의 결과를 모아 부모를 계산하는(post-order) 구조임을 안다(개념 + 1구현).
- **🛠 직접 해보기**
  - 대표 DP 6종(0/1 배낭·LIS·LCS·편집거리·구간·트리)의 '점화식 카드'를 만든다.
  - 같은 문제를 Top-down(메모 배열 재귀)과 Bottom-up 두 버전으로 작성해 변환을 익힌다.
  - LIS를 O(n²)와 O(n log n) 두 방식으로 구현한다.
  - LeetCode: 1D DP(House Robber/Coin Change 패턴), 2D DP(Edit Distance/LCS/Unique Paths 패턴), Knapsack 패턴을 병행한다.
  - 프로그래머스 고득점 Kit 'DP'를 카테고리째 푼다.
- **❓ 자가점검**
  - '이건 DP다'라고 판단하는 신호 두 가지는?(겹치는 부분 문제 + 최적 부분 구조)
  - 0/1 배낭을 1차원으로 압축할 때 무게를 역순으로 도는 이유는?(같은 물건을 두 번 쓰는 것을 막기 위해 — 이번 라운드에서 갱신 안 된 이전 값을 참조)
  - LIS를 O(n log n)으로 만드는 핵심 아이디어는?('길이 k인 증가 부분수열의 가능한 최소 꼬리값' 배열을 이분탐색으로 갱신; 그 배열의 길이가 LIS 길이)
  - Top-down과 Bottom-up을 각각 언제 고르나?(필요 상태만 방문하거나 전이가 복잡하면 Top-down, 전 상태를 규칙적으로 채우고 깊이가 깊으면 Bottom-up)
  - 그리디로 풀릴 것 같지만 실제로는 DP가 필요한 경우의 예는?(예: 임의 동전 체계의 거스름돈 최소 개수, 0/1 배낭)
- **📚 추천 자료** — 프로그래머스 고득점 Kit — DP · AtCoder Educational DP Contest(A~) · LeetCode — Dynamic Programming(1D/2D, Knapsack) 패턴(Medium~Hard) · cp-algorithms.com — DP 섹션

#### S7. 고급 패턴 · 실전 운영 (Lv4~5) ⭐ ⭐  ·  ⏱ 학습 분량 약 3~4주+ (면접 직전까지 모의+오답 루프 지속, 종료선 없음)

- **🎯 목표** — 비트마스킹 DP·세그먼트 트리/펜윅·트라이·문자열 매칭(KMP) 같은 고급 도구를 동원해 Lv4~5 및 LeetCode Hard를 시간 내 해결한다. 동시에 25분 룰·주 1회 모의고사·오답 루프로 '실력 유지' 루틴을 끝까지 운영한다. 알고리즘은 졸업이 아니라 유지다.
- **🔑 전제** — algo-s1~6 전체. 특히 DP·그래프·이분탐색 숙달.
- **핵심 토픽**
  - **비트마스킹 / 비트마스킹 DP** — 집합을 정수 비트로 표현하고 &|^<<>>로 부분집합/포함/토글을 다룬다. dp[mask][i] 형태의 외판원(TSP)류에서 상태 수가 2^n·n이라 n이 작아야(대략 ≤20) 함을 안다. 원소가 31~32개를 넘으면 int 대신 long 마스크를 써야 함도 안다(int는 32비트).
  - **세그먼트 트리 / 펜윅(BIT)** — 값이 자주 바뀌면서 구간 질의(세그먼트 트리는 합/최솟값/최댓값 등 결합법칙 연산, 펜윅은 주로 구간 합/누적)에 O(log n)으로 응답해야 할 때 쓴다. 정적 누적합(prefix sum)은 질의는 O(1)이지만 점 갱신마다 O(n) 재계산이라 갱신이 잦으면 부적합하다는 점을 안다. 좌표 압축과 결합하는 패턴을 안다.
  - **트라이(Trie)** — 문자열 집합을 자식 배열(TrieNode[26] 또는 HashMap<Character,Node>)로 표현해 접두사 검색·자동완성을 검색어 길이에 비례하는 시간에 푼다. LeetCode Trie 패턴(Implement Trie / Word Search II)과 매핑한다.
  - **문자열 매칭 — KMP** — 실패 함수(접두사 함수, 각 위치까지의 '가장 긴 진접두사=진접미사' 길이)로 텍스트에서 패턴을 O(n+m)에 찾는다. 단순 비교가 최악 O(nm)인데 KMP가 빠른 이유(불일치 시 텍스트 포인터를 되돌리지 않고 이미 매칭된 접두사 정보를 재활용)를 설명한다(개념 + 1구현).
  - **25분 룰 · 실전 운영** — 25분 막히면 풀이를 학습하되 '무엇 때문에 못 떠올렸나(상태정의/자료구조/복잡도/구현)'를 한 줄로 기록하고, 주말에 같은 문제를 다시 풀어 재현률을 추적한다. 입출력 최적화(BufferedReader/StringBuilder)·깊은 재귀의 -Xss 또는 반복 변환·엣지케이스(빈 입력/최대 입력/중복/단일 원소)를 매번 점검한다.
- **🛠 직접 해보기**
  - 비트마스킹 TSP 1문제 + 백트래킹 가지치기 1문제를 푼다.
  - 세그먼트 트리와 펜윅을 각각 손구현하고 좌표 압축과 결합한 1문제를 푼다.
  - 트라이를 구현해 접두사 검색 1문제, KMP를 구현해 패턴 매칭 1문제를 푼다.
  - 주 1회 90분 3문제 모의고사를 CodePrep 타이머/통계로 기록하고, 태그별 정답률·재현률을 추적해 약한 태그를 주말 오답 루프에 우선 투입한다.
  - LeetCode: Trie 패턴, Bit Manipulation, Hard DP/그래프를 섞어 Medium~Hard 비중을 점차 높인다.
- **❓ 자가점검**
  - 비트마스킹 DP에서 n의 현실적 상한과 그 이유는?(대략 n≤20, 상태가 2^n·n이라 2^20≈10^6 수준이 한계)
  - 구간 합을 '값 갱신이 잦은' 상황에서 정적 누적합 대신 무엇으로 푸나? 복잡도는?(세그먼트 트리/펜윅, 질의·갱신 각각 O(log n))
  - KMP가 단순 매칭(최악 O(nm))보다 빠른 이유를 실패 함수로 설명하라.(불일치 시 실패 함수가 가리키는 위치로 패턴만 이동, 텍스트 포인터는 되돌리지 않음 → O(n+m))
  - 시간초과가 났을 때 점검하는 최적화 순서를 말하라.(알고리즘→자료구조→입출력→상수)
  - 깊은 재귀 DFS가 StackOverflowError로 터질 때 대처 두 가지는?(-Xss로 JVM 스택 크기 상향 / 명시적 스택 반복 변환)
- **📚 추천 자료** — 『알고리즘 문제 해결 전략』(종만북) · 프로그래머스 고득점 Kit 전체 복습 + LeetCode 태그별 셀렉션 · LeetCode — Trie / Bit Manipulation / Segment Tree, Hard 셀렉션 · cp-algorithms.com — Prefix function(KMP) / Fenwick Tree / Segment Tree · CodePrep 타이머·통계(모의고사·오답 루프)

**🚩 알고리즘 & 자료구조 — 프로그래머스 레벨 사다리 × 고득점 Kit × LeetCode 병행 통과 기준**

1. 입력 한계(n)를 보고 허용 복잡도를 역산하고(Java 기준 1초 ≈ 10^8 연산), 임의 코드의 시간/공간 복잡도를 즉석 추정한다.
2. 고득점 Kit 10개 카테고리에서 각 유형의 '신호'를 보고 자료구조/알고리즘을 즉시 매칭한다(해시→조회 평균 O(1), 정렬 후 투포인터, 가중치 없는 최단경로→BFS / 가중치 있는 최단경로→다익스트라 등).
3. 25분 룰을 실제로 운영한다: 막히면 풀이 학습 후 '왜 못 떠올렸나(상태정의/자료구조/복잡도)' 한 줄 기록 → 주말 재풀이로 재현률 추적.
4. DFS/BFS·이분탐색(파라메트릭 포함)·다익스트라·유니온파인드·대표 DP(배낭/LIS/LCS/편집거리) 템플릿을 빈 화면에서 손으로 친다.
5. LeetCode Medium을 시간 내 자력으로 풀고, 동일 패턴을 프로그래머스 Lv2~3과 상호 매핑해 설명한다.
6. 주 1회 90분 3문제 모의고사를 타이머/통계로 기록하고, 약한 태그를 오답 루프에 우선 투입한다.

---

### 🌐 CS 전공 기초 (OS · 네트워크)  ·  메인 트랙  ·  12~17주차 (6스테이지)

> gyoogle '면접을 위한 CS 전공지식 노트'의 운영체제(15개)·네트워크(10개) 토픽을 한 개도 빠뜨리지 않고, 학습 순서(쉬움→어려움)대로 OS 3스테이지 + 네트워크 3스테이지로 묶은 페이즈다. 원 노트의 각 토픽을 학습 단위로 삼아, 면접에서 '설명 가능한' 정확한 핵심만 정리한다. Java/Spring 실무자가 이미 아는 개념(스레드풀·트랜잭션 락·HTTP)을 OS/네트워크 용어로 다시 세우고, 적절한 곳에서 Java/Spring(JVM엔 GIL이 없어 멀티코어 진짜 병렬 · Servlet 컨테이너(Tomcat) thread-per-request vs Spring WebFlux/Netty 이벤트 루프)으로 전이 한 줄을 남긴다. ⭐ 세 스테이지(OS 동기화·데드락, 네트워크 전송계층, 네트워크 보안·HTTP)가 면접 최빈출이다.

#### S1. OS 기초 — 운영체제·프로세스/스레드·주소 공간·인터럽트·시스템 콜·PCB/Context Switching  ·  ⏱ 1~1.5주

- **🎯 목표** — 운영체제가 무엇을 하는지(자원 관리·추상화), 프로세스와 스레드의 차이를 주소 공간 관점에서 정확히 구분하고, 인터럽트·시스템 콜로 커널이 개입하는 흐름과 Context Switching 비용을 설명한다. Spring MVC 스레드풀·Tomcat worker가 왜 그렇게 동작하는지의 OS 바닥을 깐다.
- **핵심 토픽**
  - **운영체제란** — CPU·메모리·I/O 같은 하드웨어 자원을 관리하고 프로세스에 추상화·격리를 제공하는 소프트웨어. 유저 모드(응용)와 커널 모드(특권 명령)를 가르는 이중 모드, OS=커널+시스템 인터페이스라는 큰 그림을 설명할 수 있다.
  - **프로세스 vs 스레드** — 프로세스=실행 중인 프로그램(독립된 주소 공간 보유), 스레드=프로세스 내 실행 흐름(코드·데이터·힙은 공유, 스택·레지스터·PC는 스레드별). '왜 스레드가 가볍고 통신이 쉬운가'와 '한 스레드의 잘못된 메모리 접근이 프로세스 전체를 죽일 수 있는 이유'(주소 공간 공유)를 설명.
  - **프로세스 주소 공간** — 코드(text)/데이터(전역·static)/힙(동적 할당, 보통 위로 성장)/스택(함수 호출·지역변수, 보통 아래로 성장) 네 영역. 힙과 스택이 서로를 향해 자라는 일반적 구조와, 스레드가 공유하는 영역(코드/데이터/힙) vs 스레드별로 분리되는 영역(스택)을 구분.
  - **인터럽트(Interrupt)** — CPU가 현재 작업을 멈추고 처리해야 하는 이벤트 신호. 하드웨어 인터럽트(I/O 완료·타이머 등 외부, 비동기) vs 소프트웨어 인터럽트(예외·trap, 명령 실행 중 발생하므로 동기적). 인터럽트 발생 시 ISR(인터럽트 핸들러)로 분기하고 끝나면 원래 작업 복귀. CPU가 계속 상태를 확인하는 폴링 대비 효율적인 이유.
  - **시스템 콜(System Call)** — 유저 프로세스가 파일·네트워크·프로세스 생성 등 커널 기능을 요청하는 인터페이스. trap(소프트웨어 인터럽트)으로 유저 모드→커널 모드 전환이 일어나는 이유, read/write/fork/exec 같은 대표 호출. '왜 응용이 직접 하드웨어를 못 만지고 커널을 거치는가'(보호·격리)를 설명.
  - **PCB와 Context Switching** — PCB(Process Control Block)=프로세스 상태(PID·PC·레지스터·메모리 정보·열린 파일 등)를 담는 커널 자료구조. Context Switching=실행 중 프로세스의 컨텍스트를 PCB에 저장하고 다음 프로세스 컨텍스트를 복원하는 과정. 직접 비용(저장·복원) + 간접 비용(캐시·TLB 무효화로 인한 성능 저하)으로 '비싸다'는 점, 같은 프로세스 내 스레드 전환이 프로세스 전환보다 싼 이유(주소 공간을 공유해 TLB/페이지 테이블 전환 부담이 작음).
- **🛠 직접 해보기**
  - 작업관리자/Process Explorer로 한 프로세스의 스레드 수·핸들·메모리 영역 관찰.
  - Java에서 ProcessBuilder(또는 별도 JVM 프로세스 기동) vs new Thread()/ExecutorService로 프로세스/스레드를 각각 생성해 PID·메모리(힙) 공유 여부 차이 확인.
  - strace(Linux)/Process Monitor(Windows)로 간단한 프로그램이 실제로 부르는 시스템 콜(open/read/write) 추적.
  - 전역(static) 변수와 지역 변수를 만들어 스택/데이터 영역 차이를 코드로 설명해보기.
- **❓ 자가점검**
  - 프로세스와 스레드의 차이를 주소 공간(공유/분리 영역) 기준으로 설명하라.
  - 유저 모드와 커널 모드를 나누는 이유와, 둘 사이 전환이 언제 일어나는가?
  - 시스템 콜이 인터럽트(trap)와 어떻게 연결되는가?
  - Context Switching이 비싼 이유를 직접 비용과 간접 비용으로 나눠 설명하라.
  - PCB에는 무엇이 담기며, 같은 프로세스 내 스레드 전환이 프로세스 전환보다 싼 이유는?
- **📚 추천 자료** — gyoogle '면접을 위한 CS 전공지식 노트' — Operating System 파트 · OSTEP(Operating Systems: Three Easy Pieces) — Virtualization · 공룡책(Operating System Concepts) — 프로세스/스레드 · KOCW 반효경 운영체제

#### S2. OS 동시성·동기화 ⭐ — IPC·CPU 스케줄링·Race Condition·세마포어/뮤텍스·데드락 ⭐  ·  ⏱ 1.5주

- **🎯 목표** — 프로세스 간 통신(IPC)과 CPU 스케줄링을 정리하고, 면접 최빈출인 Race Condition·임계 구역·세마포어/뮤텍스·데드락을 정확히 설명한다. DB 트랜잭션 락·데드락과 같은 뿌리임을 연결하고, JVM엔 GIL이 없어 자바 스레드가 멀티코어에서 진짜 병렬로 도는 점까지 한 줄로 잇는다.
- **🔑 전제** — Stage 1(프로세스/스레드)
- **핵심 토픽**
  - **IPC(Inter Process Communication)** — 독립된 주소 공간을 가진 프로세스들이 데이터를 주고받는 방법. 공유 메모리(빠름·동기화는 직접 관리), 메시지 전달(파이프·메시지 큐·소켓·시그널). 네트워크 소켓도 IPC의 한 형태이며, 같은 프로세스 내 스레드는 메모리를 공유하므로 별도 IPC 메커니즘 없이 공유 변수로 통신할 수 있다는 점(단, 동기화는 필요).
  - **CPU 스케줄링** — 준비 큐의 프로세스 중 다음에 실행할 것을 고르는 정책. 비선점(FCFS·비선점 SJF) vs 선점(Round Robin·선점형 우선순위·MLFQ). RR의 타임 퀀텀 크기 트레이드오프, SJF의 starvation, 평가 지표(처리량·대기시간·응답시간·turnaround time). 요청당 스레드 서버의 한계와 연결.
  - **Race Condition** — 둘 이상의 스레드/프로세스가 공유 자원에 동시에 접근하고 적어도 하나가 수정해, 실행 순서(타이밍)에 따라 결과가 달라지는 상황. counter++ 가 read-modify-write 3단계라 원자적이지 않다는 핵심 예시. 임계 구역(critical section)을 한 번에 하나만 들어가게 보호(상호 배제)해야 함.
  - **세마포어(Semaphore) & 뮤텍스(Mutex)** — 뮤텍스=소유권 개념이 있는 락, 잠근 스레드만 해제 가능, 한 번에 1개만 임계 구역 진입. 세마포어=정수 카운터로 동시 접근 N개를 허용하며 소유권이 없어 획득하지 않은 주체도 signal(V) 가능. binary semaphore(카운트 1)와 mutex가 비슷해 보여도, '소유권 유무'(누가 해제할 수 있는가)가 본질적 차이이고 세마포어는 신호/순서 제어에도 쓰인다는 점.
  - **데드락(DeadLock)** — 두 개 이상의 주체가 서로가 가진 자원을 기다리며 영원히 진행하지 못하는 상태. 발생 4조건=상호 배제·점유와 대기(hold and wait)·비선점·환형 대기(circular wait)가 동시에 모두 성립해야 함(네 조건은 필요조건). 대응=예방(조건 중 하나를 깨기, 예: 락 획득 순서 통일로 환형 대기 제거)·회피(은행원 알고리즘)·탐지/회복(victim 선정 후 롤백). DB 트랜잭션 데드락과 같은 원리이며, 보통 DB 엔진이 탐지해 한쪽을 롤백시킨다.
- **🛠 직접 해보기**
  - Java에서 공유 변수(int 카운터)를 여러 Thread가 대량 증가시켜 lock 없이 값이 어긋나는 Race Condition 재현 → synchronized 블록 또는 ReentrantLock으로 해결(JVM엔 GIL이 없어 멀티코어에서 진짜 병렬로 돌므로 race가 또렷하게 재현됨, AtomicInteger 비교도 함께).
  - java.util.concurrent.Semaphore(N)로 동시 실행 개수를 N개로 제한하는 작업 풀 구현(ExecutorService와 함께).
  - 두 스레드가 자원 A→B / B→A 순서로 락(synchronized/ReentrantLock)을 잡게 만들어 데드락 재현 → 락 순서를 통일해 해결(jstack/스레드 덤프로 BLOCKED 상태 확인).
  - DB 세션 두 개로 row1→row2 / row2→row1 교차 UPDATE를 걸어 DB 데드락을 발생시키고 엔진의 victim 롤백(deadlock detected) 로그 확인.
  - Round Robin 타임 퀀텀을 바꿔가며 평균 대기시간이 어떻게 변하는지 손으로 간트 차트 계산.
- **❓ 자가점검**
  - Race Condition이 무엇이고 counter++ 가 왜 위험한가? 어떻게 막는가?
  - 뮤텍스와 세마포어의 차이를 '소유권'(누가 해제할 수 있는가) 키워드로 설명하라.
  - 데드락 발생 4조건을 모두 말하고, 그중 하나를 깨는 현실적 예방법을 들어라.
  - 선점 vs 비선점 스케줄링의 차이와 Round Robin 타임 퀀텀이 너무 크거나 작을 때의 문제는?
  - IPC 방식 중 공유 메모리와 메시지 전달의 트레이드오프는? 같은 프로세스 내 스레드는 왜 별도 IPC가 덜 필요한가?
- **📚 추천 자료** — gyoogle '면접을 위한 CS 전공지식 노트' — Race Condition / Semaphore & Mutex / DeadLock / CPU 스케줄링 / IPC · OSTEP — Concurrency · 공룡책 — Synchronization / Deadlocks / CPU Scheduling · 『자바 병렬 프로그래밍(Java Concurrency in Practice)』 — 동기화/락/스레드 안전성

#### S3. OS 메모리·파일 시스템 — 페이징/세그멘테이션·페이지 교체·메모리 계층·파일 시스템  ·  ⏱ 1.5주

- **🎯 목표** — 가상 메모리를 페이징/세그멘테이션으로 구현하는 방식과 단편화, 페이지 폴트가 났을 때 어떤 페이지를 내보낼지(교체 알고리즘), 메모리 계층(레지스터~디스크)과 지역성, 그리고 파일 시스템의 기본 구조를 설명한다.
- **🔑 전제** — Stage 1(주소 공간)
- **핵심 토픽**
  - **페이징 & 세그멘테이션** — 가상 주소를 물리 주소로 매핑하는 두 방식. 페이징=고정 크기 페이지로 분할→외부 단편화 없음, 대신 마지막 페이지에서 내부 단편화 발생, 페이지 테이블·MMU 필요. 세그멘테이션=논리 단위(코드·스택 등) 가변 크기로 분할→내부 단편화는 없으나 외부 단편화 발생. 페이지 테이블이 가상 페이지 번호→물리 프레임 번호를 매핑한다는 점.
  - **페이지 교체 알고리즘** — 물리 메모리가 가득 찬 상태에서 page fault가 나면 내보낼 victim 페이지를 고르는 정책. FIFO(구현 쉬움, Belady's anomaly 발생 가능), LRU(가장 오래 안 쓴 것·정확하나 구현 비용 큼, 스택 알고리즘이라 Belady's anomaly 없음), LFU, Optimal(미래 참조를 안다는 이론적 최적·실현 불가하나 비교 기준, 역시 anomaly 없음), Clock/Second-chance(LRU 근사·실무적). demand paging과 thrashing 개념. ※ Belady's anomaly는 FIFO 등 비(非)스택 알고리즘에서만 나타난다.
  - **메모리(Memory)** — 레지스터→캐시(L1/L2/L3)→메인 메모리(RAM)→보조기억장치(디스크/SSD)로 갈수록 느리고 싸고 용량이 큰 메모리 계층. 시간 지역성·공간 지역성 때문에 캐시가 효과적이며, 배열이 연결 리스트보다 캐시 친화적인 이유(연속 메모리라 캐시 라인 단위 적재가 유리). 가상 메모리로 프로세스를 격리하고 물리 메모리보다 큰 논리 주소 공간을 제공.
  - **파일 시스템** — 디스크의 데이터를 파일·디렉터리로 추상화해 관리하는 계층. 파일=관련 정보의 집합, 디렉터리=파일 이름과 메타데이터를 묶는 구조(보통 트리). inode(파일 메타데이터+데이터 블록 포인터, Unix 계열) 개념, 블록 단위 저장과 단편화, 프로세스가 파일 디스크립터(정수 핸들)로 열린 파일을 가리킨다는 점을 설명할 수 있다.
- **🛠 직접 해보기**
  - 참조 문자열을 정해 FIFO / LRU / Optimal 각각의 page fault 수를 손으로 계산하고, FIFO에서 Belady's anomaly가 나는 참조열(예: 1,2,3,4,1,2,5,1,2,3,4,5)을 프레임 3개 vs 4개로 비교해 직접 확인.
  - Caffeine 캐시(또는 LinkedHashMap(accessOrder=true)로 직접 만든 LRU)로 함수 결과를 캐싱하고 stats()(hit/miss·evictionCount)로 적중률·LRU 축출을 관찰.
  - 배열 순회 vs 연결 리스트(LinkedList) 순회 시간을 측정해 캐시 지역성 효과 체감.
  - ls -li / stat로 inode 번호·블록 크기·파일 메타데이터 확인(또는 Windows에서 fsutil).
- **❓ 자가점검**
  - 페이징과 세그멘테이션의 차이를 내부/외부 단편화로 설명하라.
  - page fault가 나는 과정과 교체 알고리즘이 필요한 이유는?
  - LRU와 Optimal의 차이, Belady's anomaly가 무엇이며 어떤 알고리즘에서 나타나는가?
  - 메모리 계층과 지역성(시간/공간)을 설명하고, 배열이 캐시 친화적인 이유를 말하라.
  - 파일 시스템에서 inode와 디렉터리, 파일 디스크립터의 역할은?
- **📚 추천 자료** — gyoogle '면접을 위한 CS 전공지식 노트' — 페이징 & 세그멘테이션 / 페이지 교체 알고리즘 / Memory / 파일 시스템 · OSTEP — Memory Virtualization / Paging / Swapping · 공룡책 — Main Memory / Virtual Memory / File-System · KOCW 반효경 운영체제 — 메모리/가상메모리

#### S4. 네트워크 전송 계층 ⭐ — OSI 7계층·TCP 3·4 way handshake·흐름/혼잡 제어·UDP ⭐  ·  ⏱ 1.5주

- **🎯 목표** — OSI 7계층을 '분류 틀'로 익혀 HTTP/TCP/IP가 어디 있는지 배치하고, 면접 단골인 TCP의 연결·종료 핸드셰이크와 흐름 제어 vs 혼잡 제어를 정확히 구분하며, TCP와 UDP의 선택 기준을 설명한다.
- **핵심 토픽**
  - **OSI 7계층** — 물리(1)·데이터링크(2)·네트워크(3)·전송(4)·세션(5)·표현(6)·응용(7)으로 통신 기능을 계층화한 모델. 각 계층이 독립적이라 하위 변경이 상위에 영향 없음. HTTP=응용, TCP/UDP=전송, IP=네트워크, 이더넷=데이터링크로 배치할 수 있고, TCP/IP 4계층(또는 5계층) 모델과의 대응 관계를 설명.
  - **TCP 3·4 way handshake** — 연결 수립=3-way: SYN → SYN+ACK → ACK (양방향 시퀀스 번호 합의·양쪽 수신 능력 확인). 종료=4-way: FIN → ACK → FIN → ACK (양쪽이 독립적으로 자기 방향을 닫기 때문에 4단계, 수신 측 데이터 전송이 남아 ACK와 FIN이 분리됨). 종료 후 능동 종료(active close) 측이 2MSL 동안 TIME_WAIT에 머무는 이유(마지막 ACK 유실 시 상대 FIN 재전송에 대비 + 이전 연결의 지연 패킷이 새 연결에 섞이는 것 방지). '왜 연결은 3단계인가'(양방향 준비 확인)를 설명.
  - **흐름 제어 & 혼잡 제어** — 흐름 제어=수신자가 처리할 수 있는 양만큼만 보내도록 수신 버퍼를 보호(슬라이딩 윈도우, receiver window/rwnd). 혼잡 제어=네트워크 전체의 혼잡을 막기 위해 송신량(congestion window/cwnd) 조절(slow start·congestion avoidance·fast retransmit/fast recovery, AIMD). '보호 대상이 수신자(end)냐 네트워크 전체냐'가 둘을 가르는 핵심.
  - **UDP** — 연결을 맺지 않고(비연결형) 데이터그램을 보내는 전송 프로토콜. 핸드셰이크·재전송·순서 보장·흐름/혼잡 제어가 없어 가볍고 빠르며, 헤더가 작고 오버헤드가 적어 실시간 스트리밍·DNS·게임에 적합. TCP와 비교한 '신뢰성 vs 속도' 트레이드오프, DNS가 기본 UDP를 쓰되 응답이 (전통적 512바이트나 EDNS0 버퍼) 한계를 넘어 truncated(TC 비트)되면 클라이언트가 TCP로 재질의하는 동작.
- **🛠 직접 해보기**
  - Wireshark로 웹 요청을 캡처해 SYN / SYN,ACK / ACK 3-way와 FIN 종료 흐름을 직접 찾기.
  - netstat -an / ss -tan으로 ESTABLISHED·TIME_WAIT 등 소켓 상태 관찰.
  - Java로 TCP 에코 서버/클라이언트(java.net.ServerSocket/Socket) 작성 → 같은 것을 UDP(java.net.DatagramSocket/DatagramPacket)로 바꿔 연결 과정 유무 차이 체감.
  - 각 프로토콜·헤더를 OSI/TCP-IP 계층에 손으로 매핑해보기.
- **❓ 자가점검**
  - OSI 7계층을 순서대로 말하고 HTTP/TCP/IP/이더넷을 배치하라.
  - TCP 연결이 3-way, 종료가 4-way인 이유를 각각 설명하라.
  - TIME_WAIT는 왜 존재하며(2MSL 동안 무엇을 대비?) 많이 쌓이면 무엇이 문제인가?
  - 흐름 제어와 혼잡 제어의 차이를 '보호 대상' 기준으로 설명하라.
  - TCP와 UDP의 차이와, UDP가 적합한 사례는?
- **📚 추천 자료** — gyoogle '면접을 위한 CS 전공지식 노트' — OSI 7계층 / TCP 3,4 way handshake / 흐름제어&혼잡제어 / UDP · 『컴퓨터 네트워킹 하향식 접근』 3장(전송 계층) · Wireshark · Cloudflare 'What is TCP/IP?'

#### S5. 네트워크 보안·HTTP ⭐ — 대칭키/공개키·HTTP & HTTPS·TLS/SSL handshake ⭐  ·  ⏱ 1~1.5주

- **🎯 목표** — 대칭키와 공개키 암호의 차이를 이해하고, HTTP와 HTTPS의 차이, TLS handshake에서 인증서로 신원을 확인하고 세션키를 합의해 이후 대칭키로 통신하는 전체 흐름을 면접에서 막힘없이 설명한다.
- **🔑 전제** — Stage 4(TCP)
- **핵심 토픽**
  - **대칭키 & 공개키** — 대칭키=암호화·복호화에 같은 키 사용, 빠르지만 키를 안전하게 공유하는 문제(키 분배)가 있음. 공개키(비대칭키)=공개키로 암호화하면 개인키로만 복호화(반대로 개인키 서명→공개키 검증), 키 분배 문제는 해결되나 느림. 그래서 실제 프로토콜은 공개키로 신원 인증·키 합의를 처리하고 본 통신은 빠른 대칭키로 하는 하이브리드 구조를 쓴다. ※ 세션키를 '공개키로 암호화해 전달'하는 방식(RSA 키 전송)은 옛 TLS의 한 방식일 뿐이고, TLS 1.3은 (EC)DHE로 양측이 세션키를 각자 계산해 도출한다.
  - **HTTP & HTTPS** — HTTP=평문 전송이라 도청·변조에 취약, 무상태(stateless)·요청/응답 구조. HTTPS=HTTP 아래에 TLS(과거 SSL) 계층을 두어 암호화(기밀성)+무결성+서버 인증을 제공. HTTPS가 막는 것(도청·변조·서버 위장)과 못 막는 것(엔드포인트 자체 취약점, 사용자가 공격자 사이트에 정상 접속하는 피싱 등)을 구분하고, HTTP 메서드 멱등성·상태코드 같은 기본도 함께 정리.
  - **TLS·SSL handshake** — ClientHello/ServerHello로 버전·암호 스위트 합의 → 서버가 인증서(공개키 포함)를 보내고 클라이언트가 CA 체인으로 신원 검증 → 키 교환(현대 TLS는 ECDHE로, 인증서 키는 세션키 암호화가 아니라 '서명 검증=인증'에 쓰임)으로 양측이 같은 세션키(대칭키)를 도출, ECDHE는 순방향 비밀성(PFS) 제공 → 이후 대칭키로 암호화 통신. '인증서/공개키로 신원확인 + (EC)DHE로 세션키 합의, 대칭키로 본 통신'이라는 한 문장 요약을 말할 수 있다.
- **🛠 직접 해보기**
  - 브라우저 자물쇠 아이콘에서 인증서를 열어 발급자(CA)·유효기간·공개키 알고리즘 확인.
  - openssl s_client -connect host:443 으로 인증서 체인과 협상된 프로토콜 버전·암호 스위트 관찰.
  - Wireshark로 TLS handshake의 ClientHello/ServerHello/Certificate 메시지 식별(TLS 1.3은 Certificate 이후가 암호화돼 안 보이는 것까지 확인).
  - curl -v https://... 로 TLS 협상 로그(버전·cipher·인증서)를 확인하고 HTTP/HTTPS 차이 비교.
- **❓ 자가점검**
  - 대칭키와 공개키의 차이와 각각의 장단점은?
  - HTTPS는 무엇을 보장하고 무엇을 보장하지 못하는가?
  - TLS handshake에서 인증서로 신원을 검증하면서 세션키를 합의하는 과정을 설명하라.
  - 공개키만으로 통신하지 않고 대칭키를 따로 합의(또는 도출)하는 이유는?
  - 인증서로 서버 신원을 검증하는 원리(CA·신뢰 체인)는?
- **📚 추천 자료** — gyoogle '면접을 위한 CS 전공지식 노트' — 대칭키&공개키 / HTTP&HTTPS / TLS·SSL handshake · Cloudflare 'How does SSL/TLS work?' · MDN HTTP / HTTPS 가이드 · 『그림으로 배우는 HTTP & Network Basic』

#### S6. 네트워크 응용·I/O — 로드 밸런싱·Blocking/Non-blocking·Sync/Async·Blocking/Non-blocking I/O  ·  ⏱ 1.5주

- **🎯 목표** — 트래픽을 여러 서버로 분산하는 로드 밸런싱(L4/L7)을 이해하고, 면접에서 자주 헷갈리는 Blocking vs Non-blocking과 Synchronous vs Asynchronous의 두 축을 분리해 설명하며, Blocking/Non-blocking I/O 모델을 Servlet 컨테이너(Tomcat) thread-per-request·이벤트 루프(Netty)와 연결한다.
- **🔑 전제** — Stage 4(TCP), OS Stage 2(동시성)
- **핵심 토픽**
  - **로드 밸런싱** — 여러 서버에 요청을 분산해 가용성·처리량을 높이는 기법. L4(전송 계층, IP·포트 기반) vs L7(응용 계층, URL·헤더·쿠키 등 내용 기반) 로드 밸런서의 차이, 분배 알고리즘(라운드로빈·least connection·해시), 같은 클라이언트를 같은 서버로 보내는 sticky session. Nginx 같은 리버스 프록시가 L7 LB·TLS 종료를 맡는 위치.
  - **Blocking·Non-blocking & Synchronous·Asynchronous** — 두 축은 서로 다른 질문이다. Blocking/Non-blocking=호출이 즉시 제어권을 돌려주느냐, 작업이 끝날 때까지 잡아두느냐(제어 흐름·대기 방식). Sync/Async=작업 완료를 호출자가 직접 확인·대기하느냐, 완료를 콜백/이벤트 등으로 통지받느냐(완료 처리·통지 방식). 네 조합(sync-blocking, sync-non-blocking, async-blocking, async-non-blocking)을 구분할 수 있어야 하며, '블로킹=제어권을 안 돌려주고 대기, 동기=완료를 호출자가 직접 챙김'이 핵심.
  - **Blocking & Non-blocking I/O** — Blocking I/O=read/accept 등에서 데이터가 준비될 때까지 호출 스레드가 멈춤(요청당 스레드 모델). Non-blocking I/O=준비 안 됐으면 즉시 반환하며, 보통 I/O 멀티플렉싱(select/poll/epoll)으로 한 스레드가 다수 소켓을 감시(이벤트 루프). C10K 문제와의 관계, Servlet 컨테이너(Tomcat) thread-per-request(블로킹 워커) vs Spring WebFlux/Netty 이벤트 루프(논블로킹 async)로 전이.
- **🛠 직접 해보기**
  - Nginx로 백엔드 인스턴스 2개에 라운드로빈 분산(upstream) 설정 → 요청이 번갈아 가는지 로그 확인.
  - Java 소켓을 blocking(java.net.Socket)과 non-blocking(java.nio SocketChannel + Selector)으로 각각 작성해 동작 차이 체감.
  - CompletableFuture(또는 WebFlux/Reactor)로 다수 I/O 작업을 동시에 처리하고, 같은 작업을 동기 블로킹 코드로 했을 때와 처리 시간 비교.
  - Spring MVC(Tomcat thread-per-request) vs Spring WebFlux(Netty)에 동일한 I/O 바운드 엔드포인트를 올려 ab/wrk로 동시 처리량 비교.
- **❓ 자가점검**
  - L4와 L7 로드 밸런서의 차이는? 쿠키/URL 기반 라우팅은 어느 쪽인가?
  - Blocking/Non-blocking과 Synchronous/Asynchronous를 각각 다른 축으로 설명하라.
  - Blocking I/O의 요청당 스레드 모델이 가진 한계(C10K)는?
  - I/O 멀티플렉싱(epoll)과 다수 스레드 방식의 차이는?
  - Servlet(Tomcat) thread-per-request vs Spring WebFlux(Netty) 이벤트 루프의 차이와 비동기 서버가 유리한 워크로드는?
- **📚 추천 자료** — gyoogle '면접을 위한 CS 전공지식 노트' — 로드 밸런싱 / Blocking,Non-blocking&Synchronous,Asynchronous / Blocking&Non-blocking I/O · Nginx Load Balancing / Reverse Proxy 문서 · Servlet 명세 · Spring WebFlux/Project Reactor 레퍼런스 · 'The C10K problem'

**🚩 CS 전공 기초 (OS · 네트워크) 통과 기준**

1. 프로세스 vs 스레드를 주소 공간(코드/데이터/힙 공유, 스택/레지스터/PC 분리) 기준으로 설명하고, Context Switching이 PCB 저장·복원과 캐시/TLB 무효화로 비싼 이유를 답한다.
2. Race Condition과 임계 구역을 정의하고, 뮤텍스(소유권 O, 잠근 주체만 해제)와 세마포어(카운터 N, 소유권 X, 다른 주체가 signal 가능)의 차이를 설명한다.
3. 데드락 4조건(상호배제·점유와 대기·비선점·환형 대기)을 말하고 예방/회피/탐지·회복을 구분하며, DB 락 데드락 사례와 연결한다.
4. 페이징 vs 세그멘테이션(내부/외부 단편화)과 페이지 교체 알고리즘(FIFO/LRU/Optimal)을 설명하고, Belady's anomaly가 FIFO에서 발생하고 LRU·Optimal(스택 알고리즘)에서는 발생하지 않는 이유를 안다.
5. OSI 7계층에 HTTP/TCP/IP를 배치하고, TCP 3-way/4-way handshake와 흐름 제어 vs 혼잡 제어의 차이를 답한다.
6. 대칭키 vs 공개키, HTTP vs HTTPS, TLS handshake에서 인증서로 신원을 검증하고 세션키(대칭키)를 합의하는 과정을 면접 수준으로 설명한다.

---

### 🏛️ 백엔드 아키텍처 & DDD  ·  메인 트랙  ·  18~26주차

> 아키텍처는 DB의 트랜잭션 경계 지식이 전제라 그 뒤에 배치했고, Spring에서 알던 SOLID·헥사고날·DDD를 닻으로 삼아 코드로 재현한다. Spring은 로직을 @Service/@Controller로 모으는 fat Service/Controller(빈약한 도메인)를 유도하므로 의도적인 도메인(Aggregate)으로의 로직 이동·도메인과 JPA 엔티티 분리가 체감 포인트이며, SOLID→레이어드 한계→헥사고날→DDD 전술→DDD 전략→분산/운영 순으로 쌓아 분산 트랜잭션·운영까지 면접 가중치 높은 깊이를 완성한다.

#### S1. 객체지향 & 설계 원칙  ·  ⏱ 1.5~2주

- **🎯 목표** — SOLID·응집/결합·DIP/DI로 설명하고, 임의 클래스의 원칙 위반을 짚는다.
- **핵심 토픽**
  - **응집도/결합도** — 결합 종류, 저결합이 변경비용↓
  - **SOLID 각각 + 반례** — SRP의 actor, LSP 정사각형-직사각형
  - **DIP/DI/IoC** — DIP=고수준 모듈이 추상화에 의존(의존성 역전)이라는 '원칙', DI=의존을 외부에서 주입하는 '구현 기법', IoC=제어의 역전. Spring은 IoC 컨테이너가 빈을 관리하고 생성자 주입으로 DI를 수행(필드 @Autowired보다 생성자 주입 권장 — 불변·테스트 용이). DI 컨테이너 없이도 생성자/팩토리로 직접 주입하면 DIP는 지킬 수 있음(DI 컨테이너는 DIP의 충분조건이 아니라 편의 수단).
  - **DRY/KISS/YAGNI·과설계 경계** — 우연한 vs 본질적 중복
  - **핵심 패턴** — 전략=OCP/DIP, 옵저버=도메인 이벤트 뿌리, 어댑터=헥사고날 뿌리
  - **추상화 비용·좋은 추상화 기준** — 추상화 비용과 좋은 추상화의 기준
- **🛠 직접 해보기**
  - Spring @Service의 SRP/DIP 위반 표시→인터페이스(포트) 추출+생성자 주입 before/after 1커밋
  - 결제수단 if-else→전략 패턴(OCP 확인)
  - 같은 전략 패턴을 Java interface vs Kotlin interface(또는 sealed)+ 함수 타입 두 방식으로 구현·차이 메모
  - '저장+메일+검증' 한 클래스→3책임 분리·테스트 난이도 비교
- **❓ 자가점검**
  - SRP의 '책임/변경 이유'와 actor
  - DIP vs DI·원칙과 구현 기법의 차이(DI 컨테이너 없이 DIP를 지킬 수 있는가)
  - 구현체 하나인데 인터페이스 정당한 경우 vs 과설계
  - 전략 패턴이 실현하는 원칙
  - DRY 오용으로 결합↑ 사례
- **📚 추천 자료** — 『Clean Code』 · 『Clean Architecture』 1~3부 · 『Head First Design Patterns』 · Refactoring.Guru · 『Refactoring 2판』

#### S2. 레이어드 아키텍처의 한계 진단  ·  ⏱ 1주

- **🎯 목표** — Controller→Service→Repository가 왜 '도메인이 프레임워크/DB에 끌려다니는' 구조로 무너지는지 자기 경험으로 설명. 헥사고날/클린이 풀려는 문제 정확히 짚기.
- **핵심 토픽**
  - **N-tier 의존 방향의 함정** — Service가 JPA 엔티티에 의존→도메인이 영속성에 의존
  - **Anemic Domain Model** — 로직이 Service로, 캡슐화 깨짐, fat Service/fat Controller
  - **프레임워크/DB 결합으로 인한 테스트·교체 비용** — 프레임워크/DB 결합으로 인한 테스트·교체 비용
  - **트랜잭션 스크립트 vs 도메인 모델** — 모든 프로젝트에 DDD가 답은 아님
  - **Spring 레이어드 관행이 레이어드에 주는 압력** — JPA @Entity가 영속성 매핑과 도메인 모델을 겸함, 로직이 @Service로 몰림, DTO가 검증까지 겸함 → 빈약한 도메인을 유발하고 도메인(Aggregate)으로 로직을 옮길 동기 발생
- **🛠 직접 해보기**
  - Spring 도메인 규칙이 @Service에 흩어진 3곳→엔티티/도메인 객체 메서드로 끌어오기 시도·막히는 지점 기록
  - Spring fat @Service/@Controller 로직→도메인(Aggregate) 메서드로 추출·Service 줄 수/테스트성 변화
  - JPA 엔티티에 의존하는 도메인 로직을 DB 없이 단위 테스트 시도(DB·EntityManager가 필요해지는 지점)·도메인/JPA 엔티티 분리 효과 정리
  - 트랜잭션 스크립트 vs 도메인 모델 두 버전 비교
- **❓ 자가점검**
  - 단방향 의존인데 도메인이 DB에 의존하는 이유
  - Anemic이 안티패턴인 이유·정당한 경우
  - DB 없이 단위 테스트 못하는 구조적 원인
  - Spring/JPA 관행이 fat Service/빈약한 도메인을 유도하는 방식·완화
  - 모든 프로젝트에 헥사고날/DDD 안 쓰는 이유·판단 기준
- **📚 추천 자료** — 『PoEAA』(Transaction Script/Domain Model/Service Layer) · Fowler 'AnemicDomainModel' · Spring Framework Reference — Web MVC / Data Access · '도메인 모델 vs 트랜잭션 스크립트' 찬반 논의 · 『도메인 주도 설계로 시작하는 마이크로서비스 개발』

#### S3. 헥사고날 & 클린 아키텍처 (포트 & 어댑터) ⭐  ·  ⏱ 2.5~3주

- **🎯 목표** — 도메인 중심 + 포트/어댑터로 외부 격리를 직접 설계하고, 도메인은 Spring/JPA에 의존하지 않게(POJO/POKO) 두고 어댑터(JPA Repository·웹)에서만 프레임워크에 의존하도록 옮긴다.
- **핵심 토픽**
  - **헥사고날 전체 그림** — '의존성은 항상 안쪽'
  - **인바운드 포트(유스케이스) vs 아웃바운드 포트(저장소/외부 API)** — 인바운드 포트(유스케이스) vs 아웃바운드 포트(저장소/외부 API)
  - **인바운드 어댑터(@RestController/리스너) vs 아웃바운드 어댑터(JPA repo/HTTP 클라)** — 인바운드 어댑터(@RestController/리스너) vs 아웃바운드 어댑터(JPA repo/HTTP 클라)
  - **Repository 패턴·영속성 모델 분리** — 아웃바운드 포트(도메인이 정의한 Repository 인터페이스)를 어댑터에서 Spring Data JPA로 구현, 도메인 객체와 JPA @Entity를 분리해 매핑
  - **애플리케이션 서비스(조율·트랜잭션·DTO, 도메인 규칙 없음) vs 도메인 서비스(순수 규칙)** — 애플리케이션 서비스(조율·트랜잭션·DTO, 도메인 규칙 없음) vs 도메인 서비스(순수 규칙)
  - **클린/어니언과 헥사고날 관계** — 클린/어니언과 헥사고날 관계
  - **트랜잭션 경계는 애플리케이션 서비스 단위** — Spring @Transactional을 애플리케이션 서비스(유스케이스)에 둠
  - **DTO↔도메인↔영속 모델 매핑** — 요청/응답 DTO를 웹 어댑터(@RestController)에 가둘지
- **🛠 직접 해보기**
  - 작은 도메인(주문/포인트)을 domain/application/adapters(web=@RestController, persistence=JPA repo)로 패키지 분리·아웃바운드 포트(OrderRepository 인터페이스) 정의·JPA 구현 주입
  - 도메인 객체(순수 POJO/POKO, Spring·JPA 비의존) ↔ JPA @Entity 분리·매핑(toDomain/toEntity)·도메인 테스트가 DB 없이 도는 것 확인
  - 애플리케이션 서비스에 @Transactional·@RestController는 얇게
  - 포트 구현을 JPA 버전 + 인메모리 fake 버전·테스트 속도 비교
  - Spring 헥사고날 샘플(예: buckpal) 구조 ↔ 내 프로젝트 매핑 대조표
- **❓ 자가점검**
  - 인바운드/아웃바운드 포트·누가 구현
  - 도메인/JPA 엔티티 분리 득실
  - 애플리케이션 vs 도메인 서비스·트랜잭션 경계
  - Spring Data JPA Repository를 아웃바운드 어댑터로 두는 방법(포트는 도메인이 정의)
  - DB 없이 테스트 가능한 이유(의존 방향·도메인이 POJO)
  - DTO/요청 검증 계층·도메인 불변식 검증을 웹 DTO에 넣으면 문제인 이유
- **📚 추천 자료** — 『Get Your Hands Dirty on Clean Architecture』 · 『Clean Architecture』 · Cockburn 'Hexagonal Architecture' 원문 · buckpal(Tom Hombergs 헥사고날 Spring Boot 예제) · Spring Framework Reference — Transaction Management · Spring Web MVC(@RestController/DTO)

#### S4. DDD 전술적 설계  ·  ⏱ 3주

- **🎯 목표** — 엔티티/VO/애그리거트/도메인 서비스/팩토리/도메인 이벤트로 규칙을 응집, 애그리거트 경계로 트랜잭션 일관성 설계.
- **핵심 토픽**
  - **엔티티(식별자·가변) vs VO(값·불변, Money/Email)** — Java record(또는 불변 클래스) ↔ Kotlin data class(불변 프로퍼티)
  - **애그리거트·루트·불변식** — 외부 접근 유일 통로
  - **애그리거트 4규칙** — 작게·ID 참조·트랜잭션당 1개·나머지 최종 일관성, 락 경합/성능과 직결
  - **도메인 서비스·팩토리** — 도메인 서비스·팩토리
  - **Repository는 애그리거트 루트당 하나** — Repository는 애그리거트 루트당 하나
  - **도메인 이벤트** — OrderPlaced, 옵저버의 도메인 버전, Spring ApplicationEventPublisher/@TransactionalEventListener(phase=AFTER_COMMIT) ↔ 직접 만든 이벤트 디스패처, 이벤트 남발(과결합·추적 곤란) 위험
  - **이벤트 발행 시점** — 커밋 후 기본, outbox 연결
  - **명세 패턴·검증 위치** — 불변식은 도메인 안, 형식은 DTO/Bean Validation(@Valid)
- **🛠 직접 해보기**
  - VO(Money/Email)를 Java record(또는 Kotlin data class) 불변 타입으로 원시 타입 대체
  - Order 애그리거트(OrderLine은 루트 통해서만, '합계=라인 합' 불변식·위반 예외 테스트)
  - 애그리거트 간 ID 참조로 전환·'하나 즉시+나머지 도메인 이벤트' 리팩터링
  - OrderPlaced 이벤트→포인트 적립 핸들러(@TransactionalEventListener(AFTER_COMMIT) 버전 vs 직접 만든 명시적 이벤트 버스·추적성/테스트성 비교)
  - 도메인 불변식 검증 vs DTO/Bean Validation 형식 검증 분리·에러 흐름 구분
- **❓ 자가점검**
  - 엔티티 vs VO 동일성·VO 불변 이유
  - 애그리거트 경계 기준·'트랜잭션당 하나' 중요성
  - 애그리거트 간 ID 참조 이유
  - 도메인 서비스 vs 애플리케이션 서비스
  - 도메인 이벤트와 옵저버·커밋 전/후 트레이드오프
  - @TransactionalEventListener(AFTER_COMMIT)/이벤트 발행의 장점·위험
  - 불변식 검증과 형식 검증 분리 이유
- **📚 추천 자료** — 『DDD(Evans)』 · 『IDDD(Vernon)』(4규칙·이벤트) · 『DDD Distilled』 · Spring Framework Reference — Application Events(@TransactionalEventListener) · 『도메인 주도 개발 시작하기』(최범균)

#### S5. DDD 전략적 설계  ·  ⏱ 2~2.5주

- **🎯 목표** — 유비쿼터스 언어·바운디드 컨텍스트·컨텍스트 맵으로 '어디서 모델을 나눌지' 결정, 그 경계가 MSA/모놀리식 모듈 분리 기준이 됨을 설명.
- **핵심 토픽**
  - **유비쿼터스 언어** — 용어 불일치=버그·소통비용
  - **바운디드 컨텍스트** — 같은 '상품'이 주문/재고/카탈로그에서 다름
  - **서브도메인** — Core/Supporting/Generic, build vs buy
  - **컨텍스트 맵 패턴** — Partnership/Customer-Supplier/Conformist/ACL/Shared Kernel/OHS/Published Language
  - **컨텍스트 ↔ 모듈러 모놀리스/MSA 경계** — 컨텍스트 ↔ 모듈러 모놀리스/MSA 경계
  - **모놀리식 vs 모듈러 모놀리스 vs MSA** — 성급한 MSA 위험
  - **Gradle 멀티모듈/패키지를 컨텍스트 경계로** — Gradle 멀티모듈 또는 top-level 패키지 경계 = 바운디드 컨텍스트, 모듈/패키지 간 직접 JPA 엔티티·Repository 참조 대신 공개 인터페이스(포트)/도메인 이벤트로 결합 차단
  - **이벤트 스토밍 기초** — 이벤트 스토밍 기초
- **🛠 직접 해보기**
  - 프로젝트(또는 커머스) 유비쿼터스 언어 사전·코드 이름 불일치 일치화
  - 도메인을 2~3 컨텍스트로 쪼개고 컨텍스트 맵+패턴 라벨
  - 컨텍스트별 Gradle 멀티모듈(또는 패키지) 분리·모듈 간 JPA 엔티티/Repository import를 공개 인터페이스/도메인 이벤트로 교체
  - 외부(PG 응답)→도메인 변환 ACL 구현
  - 미니 이벤트 스토밍(이벤트/커맨드/애그리거트)
- **❓ 자가점검**
  - 바운디드 컨텍스트 vs 마이크로서비스 관계
  - 같은 회원/상품 다른 모델·단일 모델 위험
  - ACL이 막는 것·위치
  - Core/Supporting/Generic 노력 배분
  - 모놀리식 우선 vs MSA 우선 근거·위험
  - 컨텍스트를 Gradle 멀티모듈/패키지로 표현·모듈 간 결합 끊기
  - 유비쿼터스 언어 깨지면 문제
- **📚 추천 자료** — 『DDD』 4부 · 『IDDD』 2~3장 · 『Building Microservices 2판』 · 『Monolith to Microservices』 · EventStorming · 'DDD Reference'(Evans 무료 PDF)

#### S6. 분산 & 운영 ⭐  ·  ⏱ 3.5~4주

- **🎯 목표** — SAGA·outbox·멱등성·CQRS·캐싱·복원력 패턴으로 분산 트랜잭션·중복·장애를 다루고, 관측성·테스트 전략으로 운영 가능한 시스템 설계.
- **핵심 토픽**
  - **CAP·최종 일관성** — CAP·최종 일관성
  - **SAGA** — 코레오그래피 vs 오케스트레이션, 보상 트랜잭션
  - **Transactional Outbox** — 이중 쓰기 문제 해결, at-least-once
  - **멱등성** — Idempotency-Key·유니크 제약·처리이력, GET/PUT/DELETE vs POST에 키
  - **메시지 큐** — RabbitMQ vs Kafka, at-most/least/exactly-once, 컨슈머 멱등성, Spring의 @Async/이벤트 또는 메시지 큐(Spring for Apache Kafka/Spring AMQP)로 비동기 처리
  - **CQRS/이벤트 소싱** — 감사·재구성 vs 복잡도, 단순 CRUD엔 과함
  - **캐싱** — look-aside/write-through/back, TTL 지터, single-flight, Spring Cache 추상화(@Cacheable/@CacheEvict, Redis 등 백엔드)
  - **복원력** — 재시도·타임아웃·서킷 브레이커 Closed/Open/Half-Open·백프레셔, 지수 백오프+멱등(Resilience4j)
  - **API 버저닝** — URI/헤더/미디어타입, 호환 깨지 않는 진화, Spring REST API 버저닝
  - **테스트 전략** — 피라미드+계약 테스트, 헥사고날 덕에 도메인 단위 테스트 빠름
  - **관측성** — 구조화 로깅·메트릭 RED/USE·분산 트레이싱 trace/span·correlation ID·OpenTelemetry(Micrometer Tracing)
- **🛠 직접 해보기**
  - 도메인 이벤트를 Transactional Outbox로 업그레이드(같은 @Transactional 안에 outbox 테이블 적재·스케줄러(@Scheduled)/메시지 릴레이로 폴링 발행)
  - POST 결제에 Idempotency-Key(유니크 제약+기존 결과 반환)·두 번 호출 한 번 처리 테스트
  - 주문/재고 오케스트레이션 SAGA·재고 실패 시 보상 트랜잭션 통합 테스트
  - Spring @Async(또는 메시지 큐) 비동기 작업+지수 백오프 재시도(Resilience4j/@Retryable)+멱등
  - 읽기 화면을 CQRS식 별도 조회 모델·최종 일관성 갱신 그림
  - 구조화 로깅+correlation ID·(가능하면) OpenTelemetry/Micrometer Tracing span 흐름
- **❓ 자가점검**
  - 2PC 대신 SAGA 이유·코레오그래피 vs 오케스트레이션
  - 이중 쓰기 문제·Outbox 해결
  - exactly-once 어려움·컨슈머 멱등성
  - POST 멱등성 구현·저장/제약
  - CQRS/이벤트 소싱·단순 CRUD에 과한 이유
  - 캐시 스탬피드·무효화 어려움
  - 서킷 브레이커 3상태·재시도와 멱등성 함께
  - 하위호환 깨지 않는 API 진화·버저닝 장단점
  - 분산 장애 추적(트레이싱/상관 ID)
- **📚 추천 자료** — 『Microservices Patterns』(microservices.io) · 『DDIA』 · 『Building Microservices 2판』 · Spring for Apache Kafka / Spring AMQP / Spring Cache · Resilience4j · OpenTelemetry / Micrometer Tracing

**🚩 백엔드 아키텍처 & DDD 통과 기준**

1. 레이어드의 한계를 자기 경험으로 설명하고 헥사고날이 푸는 문제를 정확히 짚는다.
2. Spring/JPA로 포트/어댑터/Repository/도메인 분리를 직접 구현해 도메인(POJO/POKO) 테스트가 DB 없이 돈다.
3. 엔티티/VO/애그리거트(4규칙)·도메인 이벤트를 코드로 보인다.
4. 바운디드 컨텍스트·ACL을 그리고 Gradle 멀티모듈/패키지 경계로 표현한다.
5. SAGA·Outbox·멱등성·서킷 브레이커를 트레이드오프와 함께 설명하고 outbox/멱등 POST를 구현했다.

---

### ☕ Java / Kotlin 심화  ·  현재 스택 심화 · 매일 병행  ·  전 기간 매일 병행(집중은 면접 직전 2~3주)

> 기준: JDK 17 / Spring Boot 3.x(Jakarta) / JPA. 현재 스택(Java/Kotlin/Spring)을 '쓸 줄 안다'에서 '내부를 설명한다'로 끌어올리는 페이즈다. 언어 내부(컬렉션·제네릭·equals/hashCode) → Kotlin 차이(null-safety·checked exception 유무·data class vs record·inline·코루틴 토대) → JVM 동시성(JMM·volatile·락) → 코루틴(구조적 동시성·취소·Flow, 코루틴 vs 스레드/CompletableFuture) → Spring 내부(DI·AOP 프록시·@Transactional·영속성 컨텍스트) 순으로, 매일 30분씩 병행하며 면접에서 가장 자주 찔리는 'self-invocation·N+1·volatile 원자성' 같은 함정을 코드로 재현해 둔다. 버전 고정: JDK 17, Spring Boot 3.x는 Jakarta 패키지(javax→jakarta)·기본 CGLIB 프록시·OSIV 기본 true·순환참조 기본 금지. ★가상 스레드(Project Loom)는 JDK 17엔 정식 아님(JDK 21+) — 기본 전제로 깔지 말 것.

#### S1. 언어 내부 (Java) — 컬렉션 · 제네릭 · equals/hashCode ⭐  ·  ⏱ 1.5~2주

- **🎯 목표** — ArrayList/HashMap의 내부 동작(리사이즈·해시충돌·트리화)과 제네릭 타입 소거·PECS, equals/hashCode 규약을 코드로 설명한다. 컬렉션을 '쓰는' 수준에서 '왜 그렇게 동작하는지'로 올린다. (기준: JDK 17)
- **핵심 토픽**
  - **ArrayList vs LinkedList** — ArrayList=배열 기반 랜덤 액세스 O(1)·중간 삽입 O(n), LinkedList=이중 연결 리스트로 노드 참조만 있으면 삽입/삭제 자체는 O(1)이나 그 위치를 찾는 인덱스 접근이 O(n)이라 실제 인덱스 기반 삽입/삭제는 탐색 비용이 지배적. 실무에선 대부분 ArrayList가 캐시 지역성으로 유리.
  - **HashMap 버킷·해시충돌** — key의 hashCode()를 보조 해시(h ^ (h >>> 16), 상위 비트 XOR)로 섞어 버킷 인덱스를 정하고, 충돌 시 같은 버킷에 연결(separate chaining). 같은 버킷에 들어가도 hashCode 비교 후 equals로 키를 최종 구분.
  - **HashMap 리사이즈** — 기본 capacity 16·load factor 0.75 → size가 capacity*0.75(임계값) 초과 시 capacity를 2배로 늘리고 재해시(rehash). capacity가 2의 거듭제곱이라 인덱스를 hash & (capacity-1)로 빠르게 계산.
  - **Java 8 트리화 임계값** — 한 버킷의 노드 수가 TREEIFY_THRESHOLD(8) 이상이면서 전체 테이블 capacity가 MIN_TREEIFY_CAPACITY(64) 이상일 때 연결 리스트를 Red-Black Tree로 변환(검색 최악 O(n)→O(log n)). capacity가 64 미만이면 트리화 대신 리사이즈. 리사이즈/제거로 버킷 노드가 UNTREEIFY_THRESHOLD(6) 이하가 되면 다시 리스트로 untreeify. (JDK 17에서도 동일)
  - **fail-fast 이터레이터** — 순회 중 컬렉션 구조가 변경되면(modCount와 expectedModCount 불일치) ConcurrentModificationException 발생(best-effort, 보장은 아님). 순회 중 삭제는 Iterator.remove() 사용. ConcurrentHashMap·CopyOnWriteArrayList의 이터레이터는 예외를 던지지 않는 fail-safe(약한 일관성).
  - **제네릭 타입 소거(erasure)** — 제네릭 타입 정보는 컴파일 시 제거되어 런타임엔 raw type(또는 bound)만 남는다. 그래서 new T[]·T.class·instanceof List<String> 불가, List<String>과 List<Integer>의 런타임 클래스(getClass())는 동일.
  - **무공변 · 와일드카드 · PECS** — 제네릭은 기본 무공변(invariant): List<String>은 List<Object>의 하위 타입이 아님. ? extends T(상한·읽기/생산자), ? super T(하한·쓰기/소비자) — Producer-Extends, Consumer-Super(PECS). (Kotlin은 같은 개념을 선언 지점 변성 out/in으로도 표현 — Java는 사용 지점 와일드카드만)
  - **equals/hashCode 규약** — equals가 true인 두 객체는 hashCode도 반드시 같아야 한다(역은 불성립: hashCode가 같아도 equals는 다를 수 있음=해시충돌 허용). 반사성·대칭성·추이성·일관성. equals만 재정의하고 hashCode를 안 하면 HashMap/HashSet에서 다른 버킷으로 가 키를 못 찾는다.
  - **불변 객체** — final 필드·setter 없음·필요 시 방어적 복사로 생성 후 상태 불변. 스레드 안전·해시 키로 안전. record는 불변 데이터 캐리어(JDK 16 정식, 17에서 그대로 사용).
  - **String pool vs StringBuilder** — 문자열 리터럴은 String Constant Pool에 인터닝되어 공유, String은 불변이라 + 연산은 매번 새 객체 생성. 반복(루프) 연결은 StringBuilder(가변·비동기) 권장. 컴파일러는 한 표현식 내 + 연결을 최적화하는데, Java 8까지는 StringBuilder로, Java 9+(JEP 280)부터는 invokedynamic + StringConcatFactory 호출로 컴파일한다(JDK 17도 동일 — StringBuilder가 항상 쓰이는 게 아님).
  - **오토박싱 · record vs Kotlin data class** — int↔Integer 자동 변환 비용(루프 내 박싱 오버헤드·언박싱 시 null이면 NPE·==는 참조 비교). Integer는 기본 -128~127 캐시(Integer.valueOf)로 이 범위만 == 동일. record는 final 필드·정규(canonical) 생성자·접근자·equals/hashCode/toString을 자동 생성하는 불변 타입. ★Java record vs Kotlin data class 차이: record는 모든 컴포넌트가 final·불변 강제이고 위치 기반 접근자만, data class는 var도 허용(가변 가능)하고 copy()·componentN(구조 분해)을 추가로 생성. record는 메서드 상속 제약(다른 클래스 상속 불가)도 있음.
- **🛠 직접 해보기**
  - HashMap에 일부러 hashCode를 상수로 고정한 키 100개 이상을 넣어, 같은 버킷에 몰려 트리화되는 동작을 디버거/소스(JDK 17)로 추적(capacity 64 이상이어야 트리화됨에 유의).
  - equals만 재정의하고 hashCode는 빼먹은 클래스를 HashSet에 넣어 중복이 안 걸러지는 버그 재현 → hashCode 추가로 수정.
  - PECS 예제: copy(List<? super T> dst, List<? extends T> src) 시그니처를 직접 작성해 컴파일 통과시키기.
  - ArrayList와 LinkedList에 각 100만 건 인덱스 기반 중간 삽입/인덱스 접근 벤치마크로 체감 차이 측정.
  - Integer 캐시 함정: Integer a=127,b=127; a==b(true) vs 128(false)을 직접 확인.
  - javac로 + 연결 코드를 컴파일하고 javap -c로 바이트코드를 떠 JDK 17(Java 9+)에서 invokedynamic(StringConcatFactory)이 나오는지 확인.
  - 같은 DTO를 Java record와 Kotlin data class로 각각 작성해 copy()·구조 분해(componentN) 유무와 가변성 차이를 비교.
- **❓ 자가점검**
  - HashMap이 리사이즈하는 조건과, capacity가 항상 2의 거듭제곱인 이유는?
  - 버킷의 연결 리스트가 트리로 바뀌는 정확한 조건 두 가지(노드 수 8 이상·테이블 capacity 64 이상)와, capacity가 64 미만일 때 대신 일어나는 일은?
  - equals를 재정의할 때 hashCode도 함께 재정의해야 하는 이유를 HashMap 동작으로 설명하라.
  - 타입 소거 때문에 못 하는 연산 세 가지를 들어라.
  - PECS가 무엇이고 ? extends와 ? super를 언제 쓰는가?
  - fail-fast가 무엇이며 순회 중 안전하게 삭제하려면?
  - Java 9 이후(JDK 17 포함) + 문자열 연결은 무엇으로 컴파일되는가(StringBuilder인가)?
  - Java record와 Kotlin data class의 차이 두 가지는?(불변 강제 vs var 허용·copy/componentN 생성 여부)
- **📚 추천 자료** — 『Effective Java 3판』(equals/hashCode·제네릭·불변·박싱 항목) · OpenJDK 17 HashMap.java 소스(treeifyBin·resize, TREEIFY_THRESHOLD/MIN_TREEIFY_CAPACITY/UNTREEIFY_THRESHOLD) · Oracle Java Tutorials — Generics / Collections · JEP 280: Indify String Concatenation(문자열 연결 컴파일 방식) · 『Java Generics and Collections』(Naftalin & Wadler)

#### S2. 언어 내부 (Kotlin) — null-safety · 함수형 · 위임 (Java와의 차이) ⭐  ·  ⏱ 1.5~2주

- **🎯 목표** — Kotlin이 Java와 다른 핵심(null-safety·checked exception 유무·data class vs record·sealed·확장함수·inline·위임·스코프 함수)을 정확히 구분해 쓰고, Java interop 시 주의점을 설명한다. 코루틴 학습의 토대를 깐다.
- **🔑 전제** — Java 기본 문법
- **핵심 토픽**
  - **null-safety (Java와의 핵심 차이)** — ★Java는 모든 참조 타입이 null 허용이라 컴파일러가 null을 막지 못하지만, Kotlin은 타입 수준에서 nullable(String?)/non-null(String)을 구분해 컴파일 타임에 NPE 위험을 차단. 안전 호출 ?., 엘비스 ?:, 비널 단언 !!(null이면 NPE 유발). Java에서 온 타입은 플랫폼 타입(String!)으로 nullable/non-null이 불명확 → 컴파일러가 null 검사를 강제하지 못하므로 interop 경계에서 주의.
  - **checked exception 유무 (Java vs Kotlin)** — ★Java는 checked exception을 메서드 시그니처(throws)로 선언·호출부 처리(try-catch/throws)를 컴파일러가 강제. Kotlin엔 checked exception 개념 자체가 없어 모든 예외가 unchecked처럼 다뤄지고 throws 강제가 사라짐 → 코드는 간결하나 '어떤 예외가 나는지' 시그니처로 드러나지 않음. Java에 노출해야 하면 @Throws로 checked 시그니처를 명시.
  - **val vs var** — val=재할당 불가 참조(불변 참조이지 가리키는 객체 자체가 불변인 건 아님), var=재할당 가능. val이라도 가리키는 가변 컬렉션의 내부 원소는 바뀔 수 있음. (Java의 final 지역변수/필드에 대응하나, Kotlin은 val을 기본 권장 스타일로 더 강하게 밀어붙임)
  - **data class vs Java record** — data class=equals/hashCode/toString/copy/componentN 자동 생성. ★Java record와 비교: record는 모든 필드 final·불변 강제·다른 클래스 상속 불가인 반면, data class는 var 프로퍼티도 허용(가변 가능)하고 copy()와 구조 분해(componentN)를 추가 제공. '값 객체를 한 줄로' 목적은 같지만 불변 강제 강도와 copy 지원이 다름.
  - **sealed / object** — sealed class/interface=하위 타입을 같은 모듈(+같은 패키지) 내로 제한 → when 분기 망라성(exhaustiveness) 보장. (Java 17의 sealed class/permits·switch 패턴 매칭과 유사 개념이나 Kotlin은 when으로 더 일찍 정착) object=싱글턴 선언, companion object=클래스당 1개의 동반 객체(Java의 static 멤버 대용).
  - **확장 함수** — 기존 클래스를 수정·상속 없이 멤버처럼 호출하는 함수(Java엔 없는 기능 — 유틸 static 메서드를 멤버처럼). 실제로는 리시버를 첫 인자로 받는 static 메서드로 컴파일되고 정적 디스패치된다 → 가상 호출(오버라이드) 대상 아님(선언된 정적 타입 기준으로 해소).
  - **고차 함수 · 람다 · inline** — 함수를 인자/반환으로 다루면 람다마다 객체 생성 비용 발생 가능. inline 함수는 호출부에 함수 본문과 람다를 인라인해 람다 객체 생성·호출 오버헤드를 제거하고 람다 안에서 비지역 반환을 가능케 함(Java 람다는 inline 키워드가 없고 invokedynamic 기반). noinline=특정 람다 파라미터는 인라인 제외, crossinline=인라인하되 비지역 반환 금지(람다를 다른 실행 컨텍스트로 넘길 때).
  - **위임 by / lazy** — 프로퍼티 위임 by로 게터/세터 로직을 위임 객체에 위임. by lazy {}=최초 접근 시 1회 계산 후 캐시(기본 LazyThreadSafetyMode.SYNCHRONIZED으로 thread-safe), Delegates.observable, 클래스 위임 class A: I by impl. (Java엔 언어 차원의 프로퍼티 위임이 없어 보일러플레이트로 구현)
  - **스코프 함수** — let(리시버 it·람다 결과 반환·nullable 처리에 유용), run(리시버 this·람다 결과 반환), with(인자 this·람다 결과 반환), apply(리시버 this·객체 자신 반환·객체 설정), also(리시버 it·객체 자신 반환·부수효과). '리시버가 this냐 it이냐 + 반환이 객체 자신이냐 람다 결과냐'로 선택.
  - **Java interop** — @JvmStatic/@JvmOverloads/@JvmField로 Java 친화 시그니처 생성, 플랫폼 타입 주의, Kotlin Unit↔Java void, ★Kotlin엔 checked exception 개념이 없어 @Throws 없으면 Java 체크 예외 강제가 사라짐, KClass↔Class는 Foo::class.java/.kotlin. (JVM엔 GIL이 없어 멀티코어 진짜 병렬이므로 Java·Kotlin 코드가 한 JVM에서 그대로 섞여 병렬 실행)
- **🛠 직접 해보기**
  - Java에서 받은 값을 플랫폼 타입으로 다루다 NPE를 내고, ?:/?.로 방어하도록 리팩터.
  - 같은 도메인 예외를 Java(checked, throws 강제)와 Kotlin(throws 없이 호출)으로 각각 작성해 컴파일러 강제 차이를 체감하고, @Throws를 붙여 Java에서 catch가 강제되는지 확인.
  - 같은 값 객체를 Java record와 Kotlin data class로 작성해 copy()·구조 분해·가변성 차이를 표로 정리.
  - sealed class로 API 응답(Success/Error/Loading)을 모델링하고 when에서 else 없이 망라되는지 확인.
  - 같은 로직을 일반 람다 vs inline 함수로 짜고 Show Kotlin Bytecode → Decompile로 람다 객체 생성 차이 비교.
  - 5개 스코프 함수를 같은 객체 초기화 시나리오에 각각 적용해 반환값·리시버 차이 정리.
  - by lazy로 무거운 초기화를 지연시키고 최초 1회만 실행됨을 로그로 확인.
- **❓ 자가점검**
  - Java와 Kotlin의 null 처리 차이를 컴파일 타임 보장 관점에서 설명하라.
  - Kotlin엔 checked exception이 없다는 게 무슨 뜻이고 Java interop에서 어떤 문제가 되나? @Throws의 역할은?
  - data class와 Java record의 차이 두 가지는?(var 허용·copy/componentN)
  - 플랫폼 타입이 무엇이고 왜 위험한가?
  - 확장 함수가 오버라이드되지 않는(정적 디스패치) 이유는?
  - inline 함수가 해결하는 비용과 crossinline이 필요한 경우는?
  - let/run/apply/also/with를 반환값·리시버 기준으로 구분하라.
  - by lazy의 기본 thread-safety 모드는 무엇인가?
- **📚 추천 자료** — Kotlin 공식 문서(Null safety / Inline functions / Delegated properties / Scope functions / Exceptions) · 『Kotlin in Action』(Jemerov & Isakova) · Kotlin Koans(공식 인터랙티브 실습) · Java Language Specification — Records / Sealed Classes(JDK 17, 비교용)

#### S3. 동시성 (JVM) — JMM · volatile · 락 · java.util.concurrent ⭐  ·  ⏱ 2~2.5주

- **🎯 목표** — JMM의 가시성/원자성/순서와 happens-before를 이해하고, volatile·synchronized·j.u.c 도구를 상황에 맞게 골라 쓰며 데드락을 설명·회피한다. 면접 동시성 질문의 핵심. (기준 JDK 17 — thread-per-request 모델; 가상 스레드는 JDK 21+라 여기선 전제로 깔지 않음)
- **🔑 전제** — Java 언어 기본
- **핵심 토픽**
  - **Thread / Runnable / ExecutorService** — Thread 직접 상속보다 Runnable/Callable 구현 후 실행기(ExecutorService)에 위임이 권장. start()는 새 스레드에서 run()을 실행, run() 직접 호출은 현재 스레드에서 그냥 메서드 실행(새 스레드 안 생김). ★JVM엔 GIL이 없어 여러 스레드가 멀티코어에서 진짜 병렬로 실행됨(파이썬 GIL 같은 전역 락 제약 없음). 외부 프로세스가 필요하면 ProcessBuilder.
  - **JMM — 가시성·원자성·순서** — 각 스레드가 변수를 CPU 캐시/레지스터에 들고 있어 한 스레드의 쓰기가 다른 스레드에 즉시 안 보일 수 있음(가시성). 복합 연산(i++=읽기-증가-쓰기)은 원자적이지 않음(원자성). 컴파일러/JIT/CPU가 명령을 재정렬할 수 있음(순서).
  - **happens-before** — A happens-before B면 A의 메모리 효과가 B에서 보인다는 JMM의 부분 순서 규칙. 예: 모니터 unlock→이후 같은 모니터 lock, volatile write→이후 같은 변수 read, Thread.start()→시작된 스레드의 첫 동작, 스레드 종료→그를 join()한 이후 동작, 프로그램 순서(같은 스레드 내).
  - **volatile** — 변수의 가시성과 해당 변수 접근에 대한 재정렬 제한(happens-before)은 보장하지만, 복합 연산의 원자성은 보장하지 않는다. 그래서 volatile int의 count++는 여전히 race condition. '종료 플래그(가시성)' 용도엔 적합, '카운터(복합 연산)'엔 부적합(Atomic/락 필요).
  - **synchronized 모니터 락** — 객체 모니터를 획득/해제하는 재진입(reentrant) 락. 임계 구역의 상호 배제 + 가시성(lock 시 최신값 읽기, unlock 시 변경 반영)을 함께 보장. 인스턴스 메서드는 this, static 메서드는 해당 Class 객체가 락 대상.
  - **ExecutorService · 스레드풀** — 스레드 생성/소멸 비용을 줄이고 작업 큐로 관리. ThreadPoolExecutor의 corePoolSize/maxPoolSize/workQueue/거부 정책(RejectedExecutionHandler). Executors 팩토리(newFixedThreadPool 등), submit→Future로 결과/예외 수신. (JDK 17 기준 플랫폼 스레드 풀 — 가상 스레드 기반 Executors.newVirtualThreadPerTaskExecutor()는 JDK 21+)
  - **CompletableFuture (비동기 조합)** — Future의 한계(블로킹 get·조합 불가)를 넘어 thenApply/thenCompose/thenCombine/allOf로 비동기 작업을 논블로킹 파이프라인으로 합성. 콜백/예외(exceptionally·handle) 처리. ★Kotlin 코루틴과 비교: CompletableFuture는 스레드풀 위 콜백 체이닝이라 코드가 콜백 중첩·디스패처 명시가 번거롭고, 코루틴은 suspend로 순차 코드처럼 쓰되 구조적 동시성·취소 전파를 언어가 보장(java-s4에서 대조).
  - **ConcurrentHashMap** — Java 8+(JDK 17 동일)에선 segment 없이, 빈 버킷은 CAS로 무락 삽입하고 충돌 시 해당 버킷의 head 노드에만 synchronized를 거는 세분화 동기화 → Hashtable(메서드 전체 동기화)보다 처리량 높음. 읽기는 대부분 무락(volatile 읽기). 이터레이터는 fail-safe(약한 일관성), null 키/값 불가.
  - **Atomic · CAS** — AtomicInteger 등은 Compare-And-Swap(CAS) 하드웨어 명령으로 락 없이 원자적 갱신(lock-free). 경합 적을 때 빠르나 높은 경합에선 spin/재시도 비용, ABA 문제(필요 시 AtomicStampedReference).
  - **ReentrantLock** — synchronized보다 유연한 명시적 락 — tryLock(타임아웃 포함), lockInterruptibly, 공정성(fairness) 옵션, 하나의 락에 여러 Condition. 반드시 try/finally의 finally에서 unlock.
  - **CountDownLatch** — 카운트가 0이 될 때까지 await()가 대기하는 1회용 동기화 장치(0이 되면 다시 못 올림). 여러 스레드 작업 완료를 기다리는 용도. 반복적으로 재사용해야 하면 CyclicBarrier.
  - **데드락** — 둘 이상의 스레드가 서로가 쥔 락을 순환 대기. 발생 4조건(상호배제·점유대기(hold and wait)·비선점·순환대기). 회피: 락 획득 순서 일관화, tryLock 타임아웃, 락 보유 시간/범위 최소화.
  - **ThreadLocal** — 스레드별 독립 변수 저장(스레드 간 공유 없음). 트랜잭션 컨텍스트·SecurityContext 등에 사용. 스레드풀에서 재사용되는 스레드에 값이 남아 다음 작업 오염·메모리 누수 위험 → 작업 끝에 remove().
- **🛠 직접 해보기**
  - 두 스레드가 공유 카운터를 1만 번씩 증가시켜, 일반 int→경합으로 값 누락, AtomicInteger/synchronized→정확함을 비교.
  - volatile boolean 플래그로 워커 스레드를 정상 종료시키고, volatile 없이는 종료가 안 되는(가시성) 경우를 재현.
  - 일부러 락 두 개를 서로 반대 순서로 잡아 데드락을 만들고 jstack/스레드 덤프로 순환 대기 확인 → 락 순서 통일로 해결.
  - ExecutorService로 작업 100개를 제출하고 Future로 결과 수집, 풀 size별 처리 시간 비교.
  - 두 원격 호출을 CompletableFuture.thenCombine으로 비동기 합성하고, 같은 일을 코루틴 async로도 짜 콜백 체이닝 vs suspend 가독성 차이를 비교(java-s4 예고).
  - ThreadLocal에 값 남긴 채 스레드풀 재사용 → 다음 작업이 오염된 값을 보는 누수를 재현하고 remove()로 수정.
- **❓ 자가점검**
  - volatile이 보장하는 것과 보장하지 않는 것을 count++ 예로 설명하라.
  - happens-before 관계의 예를 3개 들어라.
  - synchronized와 ReentrantLock의 차이와 ReentrantLock을 택할 상황은?
  - CAS가 무엇이고 Atomic 클래스는 어떻게 lock-free로 동작하는가? ABA 문제는?
  - 데드락 발생 4조건과 실무 회피 전략은?
  - ThreadLocal을 스레드풀에서 쓸 때 반드시 remove()해야 하는 이유는?
  - Java 8 이후(JDK 17 포함) ConcurrentHashMap은 동기화 범위를 어떻게 줄였는가(segment와의 차이)?
  - CompletableFuture와 코루틴은 비동기 합성·취소·예외 전파에서 무엇이 다른가?
- **📚 추천 자료** — 『Java Concurrency in Practice』(Goetz) · 『Effective Java 3판』 동시성 장(Item 78~84) · Oracle Java Tutorials — Concurrency · JSR-133(Java Memory Model) FAQ · Java 17 API — CompletableFuture / java.util.concurrent

#### S4. 코루틴 (Kotlin) — suspend · 구조적 동시성 · Flow (vs 스레드/CompletableFuture) ⭐  ·  ⏱ 2~2.5주

- **🎯 목표** — suspend·CoroutineScope/Dispatchers·구조적 동시성·협조적 취소·예외 전파·Flow를 정확히 구분해 비동기 코드를 작성하고, 코루틴이 스레드 및 CompletableFuture와 어떻게 다른지(경량·구조적 동시성) 설명한다.
- **🔑 전제** — Kotlin 기본(java-s2), 스레드·CompletableFuture 개념(java-s3)
- **핵심 토픽**
  - **suspend 함수** — 스레드를 블로킹하지 않고 실행을 일시 중단(suspend)/재개(resume)할 수 있는 함수. 다른 suspend 함수나 코루틴 빌더 안에서만 호출 가능. 컴파일러가 Continuation을 추가하는 CPS(Continuation Passing Style)·상태 머신으로 변환.
  - **코루틴 vs 스레드 vs CompletableFuture** — 코루틴은 OS 스레드에 1:1 매핑되는 게 아니라 스레드 위에서 스케줄링되는 경량 단위 → 수만~수십만 개 생성 가능. 중단(suspend) 시 스레드를 점유하지 않고 반환하므로 적은 스레드로 많은 동시 작업 처리. ★Java 스레드는 OS 스레드 1:1(무겁다), CompletableFuture는 스레드풀 위 콜백 합성이라 비동기 흐름이 콜백 체이닝으로 흩어지고 취소·구조적 생명주기 관리가 약함. 코루틴은 suspend로 순차 코드처럼 쓰면서 구조적 동시성·취소 전파를 언어가 보장. (단 JDK 21+의 가상 스레드는 코루틴과 유사하게 경량 — JDK 17엔 없음)
  - **CoroutineScope · Context · Dispatchers** — Scope=코루틴 생명주기 경계(CoroutineContext를 가짐), Context=Job·Dispatcher·CoroutineName 등 요소 집합. Dispatchers.Default(CPU 집약·기본 코어 수만큼), IO(블로킹 I/O용, Default와 같은 스레드 풀을 공유하되 더 큰 스레드 한도-기본 64 또는 코어 수 중 큰 값), Main(UI 스레드·플랫폼 의존). withContext로 디스패처 전환.
  - **launch / async / await** — launch=결과 없는 작업·Job 반환(fire-and-forget, 예외를 즉시 전파). async=결과 있는 작업·Deferred 반환, await()로 결과 수신(예외는 await 시점에 던져짐). 병렬은 async 두 개를 띄우고 각각 await. (CompletableFuture의 thenCombine/allOf와 같은 병렬 합성을 async+await로 표현하되 구조적 스코프 안에서)
  - **구조적 동시성** — 부모 스코프가 자식 코루틴의 생명주기를 책임진다 — 부모는 모든 자식이 끝나야 완료, 부모 취소 시 자식 모두 취소, (일반 Job에선)자식 예외가 부모로 전파. 누수·고아 코루틴 방지. ★CompletableFuture엔 이런 구조적 생명주기·자동 취소 전파가 없어 직접 관리해야 함.
  - **협조적 취소** — 취소는 강제 스레드 중단이 아니라 협조적 — kotlinx.coroutines의 suspend 지점들이 취소를 확인해 CancellationException을 던짐. 취소 신호를 확인하지 않는 CPU 루프는 isActive 확인 또는 ensureActive()/yield() 호출을 넣어야 멈춤. cancel()만으론 비협조 루프는 계속 돈다. (Java Thread.interrupt()도 협조적 — 인터럽트 플래그를 코드가 확인해야 함)
  - **예외 전파 · SupervisorJob** — 일반 Job에선 자식 하나의 실패가 부모·형제 모두 취소시킴. SupervisorJob/supervisorScope에선 자식 실패가 형제·부모로 전파되지 않음(독립 실패). CoroutineExceptionHandler는 launch 등에서 끝까지 처리되지 않은 예외의 최종 핸들러(async의 await로 받는 예외엔 적용 안 됨).
  - **withContext** — 현재 코루틴의 컨텍스트(주로 디스패처)를 바꿔 블록을 실행하고 결과를 반환(블록 완료까지 suspend). 블로킹/IO 작업을 withContext(Dispatchers.IO)로 감싸 Main을 막지 않게 함. 새 코루틴을 시작하는 빌더가 아님.
  - **Flow (cold)** — 비동기 데이터 스트림. cold=수집(collect)할 때마다 producer 블록이 처음부터 다시 실행되어 방출. map/filter 등 중간 연산자는 지연 평가, collect가 terminal. collect 등 terminal 호출 전엔 아무 일도 안 일어남.
  - **StateFlow / SharedFlow** — hot 스트림 — 수집자 유무와 무관하게 활성. StateFlow=항상 현재 값 1개 보유·초기값 필수·새 구독자에 최신값 1개 replay·이전 값과 equals로 같으면 방출 생략(conflate). SharedFlow=다수 구독자에 브로드캐스트, replay/extraBufferCapacity/onBufferOverflow 설정 가능, 초기값·conflation 없음(설정에 따름).
- **🛠 직접 해보기**
  - 코루틴 10만 개를 launch해 모두 1초 delay 후 종료시키고, 같은 일을 Java 스레드 10만 개로 시도해 차이(경량)를 체감(JDK 17 플랫폼 스레드 기준 — 가상 스레드는 21+).
  - async 2개로 두 API 호출을 병렬화하고 순차 호출 대비 시간 단축 측정 → 같은 병렬화를 CompletableFuture.thenCombine으로도 짜 코드 가독성·취소 처리 차이 비교.
  - while 루프 코루틴을 cancel()해도 안 멈추는 비협조 케이스를 만들고 ensureActive()/isActive 추가로 취소되게 수정.
  - SupervisorJob vs 일반 Job에서 자식 하나를 실패시켜 형제 코루틴 생존 여부 차이 확인.
  - 같은 cold Flow를 두 번 collect해 매번 처음부터 방출됨을 확인하고, StateFlow로 바꿔 최신값 1개 공유·동일값 방출 생략 동작 비교.
- **❓ 자가점검**
  - 코루틴이 스레드보다 '경량'인 이유를 중단/스케줄링 관점에서 설명하라.
  - 코루틴과 CompletableFuture의 차이를 구조적 동시성·취소·예외 전파 관점에서 설명하라.
  - 구조적 동시성이 보장하는 3가지(완료 대기·취소 전파·예외 전파)는?
  - 협조적 취소란 무엇이며 CPU 바운드 루프에서 취소를 보장하려면?
  - Job과 SupervisorJob의 예외 전파 차이는?
  - launch와 async의 반환 타입과 예외 전달 시점 차이는?
  - cold Flow와 StateFlow/SharedFlow(hot)의 차이는? StateFlow의 conflation 기준(equals)은?
- **📚 추천 자료** — Kotlin 공식 문서 — Coroutines guide(Cancellation/Exceptions/Flow) · kotlinx.coroutines 공식 가이드(GitHub) · Roman Elizarov, 'Structured concurrency' 글 · 『Kotlin Coroutines: Deep Dive』(Marcin Moskała)

#### S5. Spring 내부 — DI · AOP 프록시 · @Transactional · 영속성 컨텍스트 (Spring Boot 3.x) ⭐  ·  ⏱ 2.5~3주 (시간 배분 최대)

- **🎯 목표** — Spring의 IoC/DI·AOP 프록시 메커니즘·@Transactional 동작·JPA 영속성 컨텍스트를 내부 동작으로 설명하고, self-invocation·N+1·롤백 규칙 같은 단골 함정을 코드로 재현·회피한다. 면접 최빈출. (기준: Spring Boot 3.x = Jakarta 패키지·기본 CGLIB·OSIV 기본 true·순환참조 기본 금지)
- **🔑 전제** — Java(java-s1), 트랜잭션·동시성 기본(DB 페이즈·java-s3)
- **핵심 토픽**
  - **Spring Boot 3.x = Jakarta 전환** — ★Spring Boot 3.x / Spring Framework 6.x는 Java EE→Jakarta EE 전환으로 javax.* 패키지가 jakarta.*로 바뀐다(javax.persistence→jakarta.persistence, javax.servlet→jakarta.servlet, javax.validation→jakarta.validation). 베이스라인 JDK 17. 구버전 라이브러리(javax 의존)는 호환 안 됨에 유의.
  - **Servlet 컨테이너 thread-per-request vs WebFlux** — 기본 Spring MVC는 Servlet 컨테이너(Tomcat) 위 thread-per-request — 요청 1건이 스레드 1개를 점유(블로킹). 동시성 한계는 스레드풀 크기. ★대안으로 Spring WebFlux는 Netty 이벤트 루프(논블로킹·적은 스레드로 많은 연결)를 쓰며 Reactor(Mono/Flux) 기반. 트레이드오프: WebFlux는 전체 스택이 논블로킹이어야 효과(블로킹 한 군데가 이벤트 루프를 막음). (JDK 21+ 가상 스레드는 thread-per-request의 블로킹 비용을 줄이는 또 다른 길 — JDK 17엔 없음)
  - **IoC / DI** — 객체 생성·의존성 주입 제어권을 컨테이너가 가짐(제어의 역전). 생성자 주입 권장(불변 final·필수 의존 명시·테스트 용이·생성자 순환참조는 기동 시 감지). 필드 주입은 테스트/불변성 측면에서 지양.
  - **BeanFactory vs ApplicationContext** — BeanFactory=빈을 관리하는 기본 컨테이너(요청 시점 lazy 생성). ApplicationContext=BeanFactory 확장으로 국제화(MessageSource)·이벤트 발행·AOP·환경/프로퍼티 추상화 등 추가, 기동 시 싱글턴 빈을 미리 생성(eager).
  - **빈 생명주기 · 스코프** — 인스턴스화→의존성 주입→*Aware 콜백→BeanPostProcessor before→@PostConstruct/InitializingBean→AOP 프록시 적용(BeanPostProcessor after)→사용→@PreDestroy/DisposableBean. (Spring Boot 3.x에선 @PostConstruct/@PreDestroy가 jakarta.annotation 패키지) 스코프: singleton(기본·컨테이너당 1개), prototype(요청마다 새 인스턴스, 컨테이너가 소멸 콜백을 호출/관리하지 않음), request/session/application(웹).
  - **순환참조 (Boot 3.x 기본 금지)** — A↔B 생성자 주입 순환은 기동 시 BeanCurrentlyInCreationException으로 실패. ★Spring Boot 2.6+ 및 3.x는 순환참조를 기본적으로 금지(필요 시 spring.main.allow-circular-references=true이지만 권장 안 함). 해결: 설계 분리, @Lazy, 세터/필드 주입(임시방편). 근본은 의존 방향 재설계.
  - **AOP — 프록시 기반** — Spring AOP는 런타임 프록시로 횡단 관심사(트랜잭션·로깅 등)를 적용. 빈을 감싼 프록시가 부가 동작 후 실제 타깃 메서드를 호출. 컴파일/로드 타임 위빙을 하는 AspectJ와 다르며, 기본은 메서드 실행 조인포인트만 지원.
  - **JDK 동적 프록시 vs CGLIB (Boot 기본 CGLIB)** — JDK 동적 프록시=인터페이스 기반(타깃이 인터페이스를 구현할 때, 인터페이스 타입으로 프록시). CGLIB=타깃 클래스를 상속한 서브클래스 프록시(인터페이스 없어도 가능, final 클래스/메서드는 오버라이드 불가라 프록시 불가). ★Spring Boot는 기본적으로 proxyTargetClass=true → 인터페이스 유무와 무관하게 CGLIB 사용(Boot 3.x 동일).
  - **self-invocation(내부 호출)** — 같은 빈 내부에서 this로 다른 메서드를 직접 호출하면 프록시를 거치지 않아 @Transactional·@Async·@Cacheable 등 프록시 기반 AOP가 적용되지 않는다. 자기 자신 주입/별도 빈 분리/AopContext.currentProxy()로 해결.
  - **@Transactional = AOP 프록시** — @Transactional은 트랜잭션 AOP 프록시로 동작 → 프록시를 거치지 않는 내부 호출(self-invocation)에는 적용 안 됨. 또한 CGLIB 프록시는 오버라이드로 동작하므로 private/final/static 메서드엔 어드바이스가 적용되지 않는다(오버라이드 불가). 따라서 public 메서드 권장. (Boot 3.x 어노테이션은 org.springframework.transaction.annotation.Transactional 그대로, 다만 JPA 엔티티 어노테이션은 jakarta.persistence)
  - **전파(propagation) · 격리(isolation)** — 전파: REQUIRED(기본·기존 트랜잭션 있으면 참여, 없으면 새로 생성), REQUIRES_NEW(항상 새 트랜잭션·기존은 일시 중단), NESTED(savepoint 기반·JDBC 등 지원 시), SUPPORTS/MANDATORY/NOT_SUPPORTED/NEVER 등. isolation 속성은 DB 트랜잭션 격리수준에 매핑(DB 페이즈와 연결).
  - **롤백 규칙** — 기본적으로 unchecked 예외(RuntimeException·Error) 및 그 하위에만 롤백, checked 예외엔 롤백하지 않고 커밋된다. checked 예외에도 롤백하려면 rollbackFor 지정(반대는 noRollbackFor). 예외를 메서드 안에서 잡고 다시 던지지 않으면 프록시가 예외를 못 봐 롤백 안 됨. (★Kotlin은 checked exception이 없어 모든 예외가 Runtime 계열처럼 다뤄지므로 기본 롤백 동작이 Java와 체감이 다를 수 있음에 유의)
  - **영속성 컨텍스트 — 1차 캐시·쓰기 지연·dirty checking** — 엔티티를 식별자(PK) 기준으로 관리하는 1차 캐시(동일 영속성 컨텍스트 내 같은 PK 조회는 같은 인스턴스 반환). INSERT/UPDATE/DELETE를 모았다가 flush 때 SQL 전송(쓰기 지연). 영속 상태 엔티티의 스냅샷과 현재 값을 비교해 변경을 감지하고 자동 UPDATE(dirty checking). (Boot 3.x = Hibernate 6.x / jakarta.persistence)
  - **flush 시점** — 트랜잭션 커밋 직전, JPQL/네이티브 쿼리 실행 직전(기본 FlushMode AUTO), em.flush() 명시 호출 시 영속성 컨텍스트의 변경을 DB에 반영. flush는 변경을 DB에 동기화할 뿐 1차 캐시를 비우지(clear) 않는다.
  - **지연 로딩 프록시 · N+1 · fetch join** — 지연 로딩(LAZY)은 연관 엔티티를 프록시로 두고 실제 접근 시 쿼리 실행. 목록을 순회하며 연관을 건마다 추가 조회해 쿼리가 1+N번 나가는 N+1을, fetch join(JPQL join fetch)/@EntityGraph/배치 사이즈(@BatchSize, hibernate.default_batch_fetch_size)로 해결.
  - **OSIV (Boot 기본 true)** — Open Session In View — ★Spring Boot 기본 spring.jpa.open-in-view=true(미설정 시 기동 로그에 경고). 영속성 컨텍스트를 컨트롤러/뷰 렌더링·응답 직렬화까지 열어둬 그 시점의 지연 로딩이 동작하지만, DB 커넥션을 요청 끝까지 점유하는 트레이드오프(thread-per-request 모델에서 커넥션 점유가 길어짐). 트래픽 큰 서비스는 false로 끄고 트랜잭션/페치 조인으로 처리 고려.
- **🛠 직접 해보기**
  - Spring Boot 3.x 프로젝트에서 jakarta.persistence.* 임포트로 엔티티를 작성하고, javax 의존 구버전 라이브러리를 넣었을 때 깨지는지(호환) 확인.
  - 같은 서비스 빈 안에서 @Transactional 메서드를 this로 내부 호출 → 트랜잭션이 안 걸리는 self-invocation을 재현하고 빈 분리로 수정.
  - checked 예외를 던져 롤백이 안 되는 것을 확인 → rollbackFor=Exception.class 지정 또는 RuntimeException으로 바꿔 롤백되게 함.
  - 지연 로딩 컬렉션을 루프에서 접근해 N+1 쿼리를 SQL 로그(show_sql/p6spy)로 확인 → join fetch로 쿼리 수 축소.
  - REQUIRES_NEW로 감싼 로그 저장이 바깥 트랜잭션 롤백과 무관하게 커밋되는지 확인.
  - 영속 엔티티 필드만 바꾸고 save 호출 없이 커밋 시 dirty checking으로 UPDATE가 나가는 것을 확인.
  - OSIV를 false로 바꾸고 트랜잭션 밖(컨트롤러/뷰)에서 LAZY 접근 시 LazyInitializationException이 나는지 확인.
- **❓ 자가점검**
  - Spring Boot 3.x에서 javax→jakarta 전환이 무엇을 의미하고 무엇이 깨지는가?
  - Servlet 컨테이너 thread-per-request와 WebFlux(Netty 이벤트 루프)의 동시성 모델 차이와 트레이드오프는?
  - Spring Boot가 기본적으로 CGLIB 프록시를 쓰는 이유(proxyTargetClass=true)와 JDK 동적 프록시와의 차이는?
  - self-invocation에서 @Transactional이 안 먹는 이유를 프록시로 설명하라. private/final 메서드는 왜 안 되는가?
  - @Transactional의 기본 롤백 규칙(checked는 커밋·unchecked는 롤백)과 바꾸는 방법은? Kotlin에선 왜 체감이 다를 수 있나?
  - Spring Boot 2.6+/3.x가 순환참조를 기본 금지하는 이유와 우회 옵션은?
  - 1차 캐시·쓰기 지연·dirty checking을 각각 설명하라. flush가 일어나는 시점 3가지와 flush가 1차 캐시를 비우는가?
  - N+1이 발생하는 원리와 fetch join으로 해결되는 이유는? OSIV가 기본 true일 때의 장점과 트레이드오프는?
- **📚 추천 자료** — Spring Framework 6.x 공식 레퍼런스(Core IoC / AOP / Data Access — Transaction) · Spring Boot 3.x 공식 문서(Migration / Application Properties — spring.jpa.open-in-view·spring.aop.proxy-target-class·spring.main.allow-circular-references) · 『토비의 스프링 3.1』(IoC/AOP/트랜잭션 원리 — 개념은 유효, 패키지는 jakarta 기준으로 환산) · 『자바 ORM 표준 JPA 프로그래밍』(김영한) — 영속성 컨텍스트·프록시·N+1 · Hibernate 6.x 공식 문서(Jakarta Persistence)

**🚩 Java / Kotlin 심화 통과 기준**

1. HashMap 트리화 임계값(노드 8·capacity 64)·리사이즈·equals/hashCode 규약·제네릭 타입 소거와 PECS를 코드 예로 설명하고, Java record vs Kotlin data class 차이를 댄다. (기준 JDK 17)
2. Java vs Kotlin 핵심 차이(checked exception 유무·null 처리·data class vs record)를 코드로 구분해 보인다.
3. volatile의 가시성/원자성 구분, happens-before, 데드락 4조건과 회피, ThreadLocal 누수를 직접 재현하고, CompletableFuture와 코루틴의 비동기 합성 차이를 설명한다. (가상 스레드는 JDK 21+임을 안다)
4. 구조적 동시성·협조적 취소·SupervisorJob 예외 전파·cold Flow vs StateFlow(equals conflation)를 코루틴 코드로 구분하고, 코루틴 vs 스레드/CompletableFuture를 대조한다.
5. Spring Boot 3.x 전제(Jakarta 패키지·기본 CGLIB·proxyTargetClass=true·순환참조 기본 금지)와 AOP 프록시·self-invocation·@Transactional 롤백 규칙(checked 커밋 vs unchecked 롤백)을 함정 재현으로 설명한다.
6. 영속성 컨텍스트(1차 캐시·쓰기 지연·dirty checking·flush 시점)와 N+1→fetch join, OSIV 기본 true 트레이드오프, thread-per-request vs WebFlux 모델 차이를 실측 로그/근거로 설명한다.

---

## 주차별 플랜

> 상시(매일): 🟩 알고리즘 1문제(Java·25분 룰) · ☕ Java/Kotlin 심화 1개념 · 바쁜 날은 잔디만 유지

| 주차 | 평일 메인 | 주말 실습 | 알고리즘 |
|---|---|---|---|
| **W1** | DB-S1 SQL/모델링 기초 | 쇼핑몰 4테이블 CREATE + 쿼리 10개 | algo-S1 복잡도·자료구조(Java) |
| **W2** | DB-S1 마무리 + DB-S2 ERD/정규화(+SQLD 모델링) | ERD 작성·3NF 분해 | algo-S1~S2 |
| **W3** | DB-S2 키 + JPA 스키마 읽기 | JPA 엔티티→ddl-auto 실제 DDL 확인 | algo-S2 해시·정렬·스택/큐 ⭐ |
| **W4** | DB-S3 인덱스 내부구조 ⭐ | 100만 행 EXPLAIN, 복합/커버링 인덱스 | algo-S2~S3 |
| **W5** | DB-S3 마무리 + DB-S4 트랜잭션/MVCC ⭐ | 두 세션 이상현상·데드락 재현 | algo-S3 힙·완전탐색·이분탐색 ⭐ |
| **W6** | DB-S4 락/격리수준 ⭐ | @Transactional + 비관/낙관 락 동시성 테스트 | algo-S4 DFS/BFS·유니온파인드 ⭐ |
| **W7** | DB-S5 실행계획/조인/N+1 ⭐ | EXPLAIN·fetch join/@BatchSize로 N+1 제거 | algo-S4~S5 |
| **W8** | DB-S6 복제/파티셔닝 + DB-S7 SQLD 시험 포인트 ⭐ | 표준조인·계층질의·윈도우함수·PIVOT 실습 | algo-S5 그리디·그래프 ⭐ |
| **W9** | CS OS1 기초 + OS2 동시성 ⭐ | Java Thread/ExecutorService 경쟁상태·데드락 재현 | algo-S6 DP 시작 ⭐ |
| **W10** | CS OS3 메모리/파일 + NET1 전송계층 ⭐ | Wireshark 핸드셰이크 + 페이지교체 계산 | algo-S6 DP 대표유형 |
| **W11** | CS NET2 보안·HTTP ⭐ | TLS 핸드셰이크 분석·JWT/HTTPS | algo-S7 고급(트라이/세그트리 개념) |
| **W12** | CS NET3 로드밸런싱·I/O 모델 | Nginx 리버스 프록시·Blocking vs NIO | 🟩 주1 모의고사(90분 3문제) |
| **W13** | ARCH-S1 SOLID + S2 레이어드 한계 | 전략 패턴 리팩터링 | 🟩 모의 + 오답 루프 |
| **W14** | ARCH-S3 헥사고날 ⭐ + S4 DDD 전술 | 포트&어댑터 분리·애그리거트 | 🟩 모의 + 오답 루프 |
| **W15** | ARCH-S5 DDD 전략 + S6 분산/운영 ⭐ | 바운디드 컨텍스트·outbox/멱등성 | 🟩 모의 유지 |
| **W16** | Java/Kotlin 집중 — 동시성(JMM·락)·코루틴 ⭐·Spring 내부(AOP·@Transactional·영속성) ⭐ | 코루틴 구조적 동시성·프록시 self-invocation 실험 | 🟩 모의 + 약점 복습 |

- Java/Kotlin 심화는 첫날부터 ☕ 매일 1개념(daily)으로 깔아두고, W16에 동시성·코루틴·Spring 내부를 집중적으로 끌어올린다(언어 내부는 daily 누적분으로 커버).
- 면접 직전 2주: 분야별 자가점검을 CodePrep 실전 풀이 탭 + AI 면접관으로 회전하고, 각 학습 페이지의 '📋 Claude 퀴즈용 복사'로 약점 단계만 집중 복습한다.

## 이번 주 7일 시작 플랜

| Day | 상시(매일) | 메인 액션 |
|---|---|---|
| **월** | 🟩 알고리즘 1문제(복잡도 의식·Java) · ☕ Java 컬렉션 1개념 | Docker로 PostgreSQL 16 가동 + DBeaver/psql 접속. CodePrep 로드맵에서 DB 스테이지를 눌러 새 탭 학습 시작. |
| **화** | 🟩 1문제 · ☕ HashMap 내부(버킷·해시충돌·리사이즈) | DB-S1: 관계형 모델·NULL 3-valued logic·타입. users/products 테이블 CREATE. |
| **수** | 🟩 1문제(25분 룰·시도 기록) · ☕ ArrayList vs LinkedList | DB-S1: 제약조건(FK ON DELETE) + SELECT 논리 실행순서. orders/order_items + 샘플 30행 INSERT. |
| **목** | 🟩 1문제 · ☕ equals/hashCode 규약 | DB-S1: JOIN 5종 + LEFT JOIN IS NULL. '주문 없는 회원'·'회원별 총액 TOP5' 쿼리. |
| **금** | 🟩 1문제 · ☕ 제네릭 타입소거·PECS | DB-S1: 서브쿼리(EXISTS/NOT IN+NULL 함정) + 윈도우 함수 입문. |
| **토** | 🌿 잔디 유지(1문제) | 주말: 연습 쿼리 10개 + psql 메타명령. 학습 페이지 '📋 Claude 퀴즈용 복사'로 DB-S1 복습 퀴즈 받기. |
| **일** | 🌿 잔디 유지(이론 1개념) | 주말: DB-S2 준비 — dbdiagram.io ERD. 주간 회고 + CodePrep 통계 확인. |

## CodePrep 활용법

**📋 로드맵(인덱스) 탭 + 학습 페이지**
- 스테이지를 누르면 새 탭에서 학습 페이지가 열린다. 평일엔 한 스테이지의 토픽을, 주말엔 hands-on을 체크. 진도는 인덱스에 자동 반영.
- 각 Phase의 통과 기준(🚩)을 다 체크해야 다음 Phase로 — 스스로 관문을 강제.

**⏱️ 풀이 타이머 · 통계**
- 알고리즘 25분 룰(Java)을 타이머로 강제 → 막히면 풀이 후 '왜 못 떠올렸나' 한 줄을 시도 기록으로.
- 주 1회 90분 모의고사 기록 → 태그별 약점(DP·그래프 등)을 주말 오답 루프에 우선 투입.

**🎤 실전 풀이(면접) 탭**
- 각 Stage의 자가점검 질문을 면접 카드로(Java/Kotlin 카테고리 포함) 분야별 속성 복습.
- 개념 ↔ 구현 매핑 질문(@Transactional 프록시·코루틴 vs 스레드 등)을 반복.

**🤖 AI 면접관 + 📋 Claude 퀴즈 복사**
- 학습 페이지에서 '✅ 학습 완료' 후 '📋 Claude 퀴즈용 복사' → Chrome의 Claude(또는 claude.ai)에 붙여 그 단계 내용으로 퀴즈·꼬리질문 생성.
- AI 면접관으로 자가점검 통과 후 심화 꼬리질문(예: MVCC → VACUUM·XID wraparound).

