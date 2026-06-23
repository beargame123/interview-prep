# 김호영 백엔드 이직 마스터 학습 로드맵
### (DB → 알고리즘 → CS → 아키텍처 → Python/Django, 5개 분야 통합본)

---

## 1) 전체 그림 — 왜 이 순서로 타는가

이 로드맵은 **"실무에서 가장 깊게 쓰는 토대부터, 면접에서 무기가 되는 순서대로"** 쌓도록 설계했다. 김호영 님은 이미 Java/Spring 백엔드 중급자이므로 개념의 절반은 갖춰져 있다. 핵심은 **새 지식 습득이 아니라 "Spring/JPA에서 알던 것 → PostgreSQL/Django/DRF로 전이"** 와 **"막연히 아는 것 → 면접에서 설명 가능한 것"** 으로 끌어올리는 것이다.

큰 페이즈는 다음과 같다. **분야는 순차로 끝내지 않고, 메인 트랙을 굵게 가면서 알고리즘과 Python은 상시 병행**한다.

| Phase | 주력 분야 | 기간(누적) | 목표 한 줄 |
|---|---|---|---|
| **Phase 0** | 상시 트랙 셋업 | 0주차~끝 | 알고리즘 매일 1문제 + Python 매일 30분 병행 시작 |
| **Phase 1** | DB (메인) | 1~11주 | 설계→인덱스→트랜잭션→실행계획→확장, 면접 최빈출 깊이 완성 |
| **Phase 2** | 알고리즘 (집중 승격) | 4~끝 | 상시 트랙을 코테 통과 수준으로 가속(병행 → 일부 집중) |
| **Phase 3** | CS(OS·네트워크) | 12~17주 | 한 번의 HTTP 요청을 OS×네트워크 용어로 끝까지 설명 |
| **Phase 4** | 아키텍처·DDD | 18~26주 | 헥사고날+DDD를 Django로 재현, 분산/운영까지 |
| **Phase 5** | Python/Django/DRF | 6~끝(집중은 후반) | 면접 실무 무기 + CodePrep 백엔드 캡스톤 |

> **설계 의도**: DB·트랜잭션·인덱스는 모든 백엔드의 바닥이자 면접 1순위라 메인으로 먼저. 알고리즘은 "누적 노출량 = 실력"이라 첫날부터 매일 병행. CS는 DB/트랜잭션 이해를 보강하고 동시성(GIL·WSGI)으로 Python과 연결. 아키텍처는 DB의 트랜잭션 경계 지식이 전제라 그 뒤. Python은 본인이 후순위로 정했지만 "면접의 실제 무기"이므로 초반부터 매일 조금씩 깔아두고 후반에 집중 폭발시킨다.

---

## 2) 분야 간 의존관계 / 병행 규칙

**순차(메인 트랙, 한 번에 하나):** DB → CS → 아키텍처 → Python(집중)
이 네 개는 동시에 메인으로 돌리지 않는다. 매주 "이번 주 메인 분야의 이론 1꼭지/일"이 중심축이다.

**상시 병행(매일, 끝까지):**
- **알고리즘 1문제/일** — 첫날부터 면접 직전까지. 25분 룰 적용. 메인 분야가 무엇이든 멈추지 않는다.
- **Python 30분/일** — 1주차부터 시작(언어 차이만 흡수). DB 페이즈 동안 "Python 무기 카드"를 쌓아두면, Django 페이즈에서 폭발적으로 빨라진다.

**분야 내부 의존(반드시 이 순서):**
- DB: 설계 → 인덱스 → 트랜잭션 → 실행계획 → 확장. (인덱스 모르면 실행계획·락 범위 이해 불가)
- 알고리즘: 복잡도 → 기본 자료구조 → 탐색/정렬/힙/유니온파인드 → 그래프 → DP/고급.
- CS: HTTP → TCP → TLS/DNS/인증/CORS → HTTP진화/OSI → (OS축) 프로세스/스레드 → 동시성/GIL → 데드락/메모리 → IPC/WSGI 통합.
- 아키텍처: SOLID → 레이어드 한계 → 헥사고날 → DDD전술 → DDD전략 → 분산/운영.
- Python: 언어차이 → Django코어 → DRF → 테스트/배포 → 캡스톤.

**교차 의존(분야를 가로지르는 연결점):**
- **트랜잭션·격리수준·MVCC**(DB Phase1) → **데드락**(CS Phase3) → **트랜잭션 경계/SAGA/Outbox**(아키텍처 Phase4)는 같은 뿌리. DB에서 깊게 파두면 뒤 두 번이 복습이 된다.
- **GIL / 동시성**(CS) → **WSGI/ASGI·Celery·async ORM**(Python)으로 직결.
- **N+1**(DB 실행계획) → **select_related/prefetch_related**(Django ORM) → **Repository 패턴**(아키텍처)으로 이어짐.
- **CAP/복제/파티셔닝/캐시**(DB 확장) → **분산/SAGA/CQRS**(아키텍처 운영)와 거의 동일 주제.

---

## 3) 페이즈별 상세

> 형식: 각 stage마다 **[목표 / 핵심 토픽 / hands-on / 자가점검 / 추천자료 / 예상소요]**.

---

## PHASE 0 — 상시 트랙 셋업 (0주차, 반나절)

시작하기 전에 **매일 돌릴 두 트랙의 레일**을 깐다.
- 알고리즘: 백준/프로그래머스 계정, 25분 타이머(CodePrep), 오답 태그 체계(DP/그래프/그리디…).
- Python: `venv` 1개 생성, `pip + requirements.txt` 왕복 1회, REPL 열어보기.
- DB: Docker로 PostgreSQL 16 컨테이너 1개 상시 가동 (`docker run --name pg -e POSTGRES_PASSWORD=pw -p 5432:5432 -d postgres:16`), DBeaver/psql 접속.

---

## PHASE 1 — 데이터베이스 (메인 트랙, 1~11주차)
*기준: PostgreSQL, Django ORM ↔ JPA/Hibernate 전이*

### DB-Stage 1. 관계형 모델 · SQL · 데이터 모델링 기초
- **목표**: 테이블/관계/제약을 직접 설계하고 PostgreSQL에서 DDL/DML/JOIN/집계/서브쿼리를 막힘없이 작성·해석한다. 이 토대가 있어야 이후 인덱스·실행계획·튜닝이 말이 된다.
- **핵심 토픽**
  - 관계형 모델 용어 + **NULL의 3-valued logic**: `NULL = NULL`이 FALSE가 아니라 UNKNOWN인 이유.
  - DDL·타입: `integer/bigserial/varchar/text/numeric/timestamptz/boolean/jsonb/uuid` 용도별 선택. `char(n) vs varchar vs text`, `timestamp vs timestamptz` 차이.
  - 제약조건: PK/FK/UNIQUE/NOT NULL/CHECK/DEFAULT, FK의 `ON DELETE CASCADE/RESTRICT/SET NULL` ↔ Django `on_delete=CASCADE/PROTECT` ↔ JPA cascade.
  - SELECT 논리적 실행 순서: `FROM→WHERE→GROUP BY→HAVING→SELECT→ORDER BY→LIMIT`. WHERE vs HAVING.
  - JOIN: INNER/LEFT/RIGHT/FULL/CROSS/SELF, `LEFT JOIN + IS NULL`로 '없는 것 찾기'.
  - 서브쿼리·집합연산: 스칼라/인라인뷰/상관 서브쿼리, `IN/EXISTS/NOT EXISTS`, `UNION vs UNION ALL`, **NOT IN + NULL 함정**.
  - 집계 + 윈도우 함수 입문: `ROW_NUMBER()/RANK()/SUM() OVER(PARTITION BY ...)`로 그룹별 순위·누적합 (면접 SQL 단골).
- **hands-on**
  1. 쇼핑몰 미니 스키마(`users, products, orders, order_items`) 4테이블을 FK 포함 직접 CREATE + 샘플 30행 INSERT.
  2. 연습 쿼리 10개: '회원별 총 주문금액 TOP 5', '주문 없는 회원', '카테고리별 매출과 전체 대비 비율(윈도우)', 'order_items JOIN 영수증 출력'.
  3. PostgreSQL 공식 Tutorial 따라 치며 `\d \dt \di \x` psql 메타명령 익히기.
- **자가점검**: WHERE/HAVING 차이(GROUP BY 없이 HAVING 가능?) · NOT IN + NULL이 결과를 비우는 이유 · INNER vs LEFT 행 수가 같고 다른 경우 · timestamp vs timestamptz 기본값과 이유 · char/varchar/text 저장·성능 차이와 권장.
- **추천자료**: PostgreSQL 공식 'The SQL Language/Tutorial' · 『SQL 첫걸음』 · pgexercises.com · SQLBolt / LeetCode Database(Easy).
- **예상소요**: 1.5~2주.

### DB-Stage 2. 설계 · 정규화 · 키
- **목표**: 요구사항을 ERD로 그리고 정규화/반정규화를 트레이드오프 근거와 함께 결정한다. '나중에 인덱스로 못 메꾸는' 구조적 결함을 예방.
- **핵심 토픽**
  - ERD(까마귀발), 1:1/1:N/N:M, N:M을 중간(연결) 테이블로 해소 ↔ Django `ManyToManyField` ↔ JPA `@ManyToMany + @JoinTable`.
  - 함수적 종속(FD), 부분/이행 종속, 1NF→2NF→3NF→BCNF 분해. '이 테이블 몇 정규형이고 왜 위반인지'.
  - 반정규화: 읽기 성능 ↔ 갱신 이상(update anomaly)·정합성 비용.
  - 키: 자연키 vs 대리키(surrogate), Django `BigAutoField` ↔ JPA `@GeneratedValue(IDENTITY/SEQUENCE)`.
  - PostgreSQL 시퀀스/IDENTITY/bigserial, **UUID v4 vs v7 인덱스 단편화**, 분산 환경에서 auto-increment 곤란 → UUIDv7/ULID 대안.
  - 무결성 3종: 개체(PK)/참조(FK)/도메인(타입·CHECK). 앱 검증 vs DB 제약.
  - **ORM이 만드는 스키마 읽기(전이 포인트)**: Django model → `makemigrations` → `sqlmigrate`로 실제 DDL 확인 ↔ JPA `ddl-auto`.
- **hands-on**
  1. 1단계 스키마를 dbdiagram.io로 ERD화 → 일부러 '나쁜 테이블'(주문에 회원명·상품명 중복) 만들고 3NF로 분해 과정을 기록.
  2. 같은 스키마를 Django `models.py` → `makemigrations` → `sqlmigrate` → 1단계 손DDL과 diff.
  3. N:M(products↔tags)을 `ManyToManyField`로, 자동 생성 중간 테이블 `\d` 확인 → `through=`로 추가 컬럼 붙이기.
  4. PK를 `UUIDField`로 바꿔 대량 INSERT 시 인덱스 순서 변화 관찰(4단계 후 재방문).
- **자가점검**: 2NF vs 3NF(부분/이행 종속) · 반정규화 비용 · 대리키 이유와 단점 · FK를 DB에 vs 앱에서만 관리 트레이드오프 · N:M의 RDB/ORM 매핑.
- **추천자료**: 『SQL 안티패턴』 · 『Database Design for Mere Mortals』 · Django Models/Migrations · dbdiagram.io.
- **예상소요**: 1.5주.

### DB-Stage 3. 스토리지 엔진 · 인덱스 내부구조 ⭐(1순위 핵심)
- **목표**: 인덱스를 자료구조 수준에서 이해하고 '어떤 인덱스를 어떤 컬럼 순서로'를 근거 있게 결정. 인덱스가 '안 타는' 케이스를 즉답.
- **핵심 토픽**
  - 디스크 I/O와 페이지(PostgreSQL 8KB), random I/O가 비싸서 인덱스가 필요한 근본 이유.
  - **B-Tree / B+Tree**: 균형, 리프 정렬·연결(range scan), 낮은 높이로 적은 I/O. 'B+는 리프에만 데이터·리프 연결' (면접 단골).
  - 클러스터드 vs 논클러스터드: **PostgreSQL은 항상 논클러스터드(heap + ctid), CLUSTER는 일회성 재정렬** ↔ MySQL InnoDB의 PK=클러스터드.
  - 복합 인덱스 leftmost prefix: `(a,b,c)`는 a / a,b / a,b,c엔 쓰이고 b·b,c엔 안 씀. 등호 먼저, 범위 마지막.
  - 커버링 인덱스 / Index Only Scan: INCLUDE 컬럼, visibility map 관계.
  - 카디널리티·선택성: 고유값 비율 높을수록 효과적, 성별 같은 저카디널리티 단독은 무의미.
  - **인덱스가 안 타는 경우**: 컬럼 가공(`func(col)=x`), 묵시적 형변환, 선행 와일드카드 `LIKE '%x'`, OR, 낮은 선택성. 해결책(함수/표현식 인덱스).
  - PostgreSQL 인덱스 확장: Hash, **GIN(jsonb/배열/전문검색)**, GiST, **BRIN(시계열)**, **Partial Index**, Expression Index.
  - 트레이드오프: 읽기↑ vs 쓰기 비용·저장공간·유지 오버헤드↑.
- **hands-on**
  1. `generate_series`로 orders 100만 행 → 인덱스 없이 조회 `EXPLAIN ANALYZE`(Seq Scan) → 인덱스 생성 후 재측정.
  2. 복합 인덱스 `(status, created_at)` 실험: 선두 컬럼 규칙 체감.
  3. 커버링 인덱스 `(status) INCLUDE (id)`로 Index Only Scan 유도, VACUUM 전후 비교.
  4. 안 타는 케이스 재현: `WHERE EXTRACT(year FROM created_at)=2025` → 표현식 인덱스로 개선.
  5. Partial Index: `WHERE is_deleted=false`만 인덱싱해 크기/속도 비교.
- **자가점검**: B-Tree vs B+Tree와 DB가 B+Tree 쓰는 이유 · `(a,b,c)`에서 `WHERE b=? AND c=?`가 못 타는 이유 · PostgreSQL 인덱스는 클러스터드인가(MySQL과 차이) · `LIKE '%abc'` 해결책 · 커버링 인덱스와 Index Only Scan 미보장 이유 · 저카디널리티 인덱스가 보통 무의미하지만 유효한 경우(partial).
- **추천자료**: **Use The Index, Luke!**(무료 온라인) · PostgreSQL Indexes 챕터 · 『Real MySQL 8.0』 1권 인덱스 파트 · PostgreSQL Physical Storage.
- **예상소요**: 2주 (hands-on에 시간 더 투자).

### DB-Stage 4. 트랜잭션 · 격리수준 · 동시성 제어 ⭐(면접 최빈출)
- **목표**: ACID·격리수준·이상현상·락·MVCC를 한 흐름으로 설명하고, 동시성 시나리오에서 적절한 락/격리수준 선택. 중복 결제·lost update를 진단·예방.
- **핵심 토픽**
  - ACID 각각 '무엇을 보장·어떻게 구현'(WAL/redo·undo, commit/rollback)까지.
  - 이상현상: Dirty/Non-repeatable/Phantom Read를 시퀀스로, + Lost Update, Write Skew.
  - 격리수준 4단계 표. **PostgreSQL 기본=READ COMMITTED, RR/SERIALIZABLE은 MVCC(SSI)로 구현되어 표준과 다름(PG의 RR은 phantom도 막음)**.
  - **MVCC**: xmin/xmax 버전, 스냅샷 읽기('읽기가 쓰기를 막지 않음'), 새 버전 생성 → dead tuple → VACUUM 필요. Oracle/MySQL undo segment와 차이.
  - 락: 공유(S)/배타(X), 행 vs 테이블, `SELECT ... FOR UPDATE / FOR SHARE`, 인덱스 유무가 락 범위에 미치는 영향.
  - 비관적 vs 낙관적 락: JPA `@Version/@Lock(PESSIMISTIC)` ↔ Django `select_for_update()` / 수동 version.
  - 데드락 4조건(상호배제·점유와대기·비선점·순환대기) + 해결(락 순서 통일·타임아웃·자동 detection).
  - 트랜잭션 전파/경계: Spring `@Transactional(REQUIRED/REQUIRES_NEW/NESTED)` ↔ Django `transaction.atomic()` 중첩·savepoint, autocommit 차이.
  - **(전이 핵심) ORM 트랜잭션 매핑**: `@Transactional` ↔ `transaction.atomic`, `ATOMIC_REQUESTS`, 그리고 **JPA 영속성 컨텍스트(1차 캐시·flush·dirty checking) ↔ Django는 1차 캐시/자동 dirty checking 없음** (결정적 차이).
- **hands-on**
  1. psql 두 세션으로 격리수준 바꿔가며 dirty/non-repeatable read 관찰.
  2. Lost Update 재현 → `SELECT FOR UPDATE` 또는 version 컬럼으로 해결.
  3. 두 세션 `row1→row2 / row2→row1` UPDATE로 데드락 발생, PG abort 로그 확인.
  4. Django `transaction.atomic()` + `select_for_update()`로 재고 차감 동시성 테스트(멀티스레드/프로세스), 락 유무 정합성 비교.
  5. SERIALIZABLE에서 write skew 재현 → serialization failure 재시도 로직.
- **자가점검**: Isolation 구현 방식과 높일수록 잃는 것 · MVCC와 '읽기가 쓰기 안 막음'·VACUUM 필요 이유 · PG 기본 격리수준과 표준 RR과 차이 · 비관/낙관 락 선택과 ORM 구현 · 데드락 4조건과 현실적 감소법 · `REQUIRES_NEW`의 Django 대응·영속성 컨텍스트 차이 · 중복 결제(따닥) DB 레벨 차단법(unique·락·멱등키).
- **추천자료**: PostgreSQL Concurrency Control(필독) · **DDIA 7장 Transactions** · Django Database transactions · Hermitage 프로젝트.
- **예상소요**: 2~2.5주 (여기서 깊이를 만든다).

### DB-Stage 5. 쿼리 실행계획 · 조인 알고리즘 · 튜닝 ⭐(ORM 전이 핵심)
- **목표**: `EXPLAIN (ANALYZE, BUFFERS)`를 읽고 병목을 짚어 개선. 옵티마이저 선택을 추론하고 ORM의 N+1 등 비효율을 잡는다.
- **핵심 토픽**
  - 옵티마이저(CBO)와 통계(pg_stats, ANALYZE), 통계 낡으면 나쁜 계획 → autovacuum 역할.
  - EXPLAIN 읽기: vs ANALYZE, cost(추정) vs actual time, rows 추정 vs 실제 괴리(=통계 신호), BUFFERS, 트리는 안쪽부터.
  - 스캔: Seq / Index / Index Only / Bitmap Index Scan.
  - 조인 알고리즘: Nested Loop(소량+인덱스), Hash Join(대량+등호), Sort-Merge(정렬된 대량).
  - **N+1 (전이 최중요)**: JPA fetch join/@EntityGraph/batch size ↔ **Django `select_related`(JOIN, FK/1:1) vs `prefetch_related`(별도 쿼리+메모리 조인, M:N/역참조)**.
  - 슬로우 쿼리 튜닝 절차: 식별(pg_stat_statements) → EXPLAIN ANALYZE → 병목 파악 → 인덱스/재작성 → 재측정.
  - 페이지네이션: OFFSET이 뒤로 갈수록 느린 이유 vs keyset(cursor) 장단점 → DRF CursorPagination.
  - 안티패턴: `SELECT *`, 함수로 감싼 WHERE, 불필요 DISTINCT, OR 남용, 큰 IN, `count(*)` 비용, `.all()` 후 파이썬 필터 → Django `.only()/.defer()/.values()/.exists()/.count()`.
- **hands-on**
  1. 100만 행에서 3종 조인 유도 + `set enable_hashjoin=off`로 강제 비교.
  2. Django N+1 재현: 게시글 목록 작성자 이름 → `connection.queries`/debug-toolbar로 쿼리 수 → select/prefetch_related 후 비교.
  3. `OFFSET 10000 LIMIT 20` vs keyset 응답시간 측정(그래프).
  4. `pg_stat_statements`로 느린 TOP5 → 튜닝 1회 완주(before/after).
  5. estimated vs actual rows 10배 차이 쿼리 → ANALYZE 후 계획 변화.
- **자가점검**: EXPLAIN vs ANALYZE와 첫 신호 · NL vs Hash 유리 상황 · N+1과 select/prefetch_related·fetch join 차이 · OFFSET 느려짐·keyset 트레이드오프 · 인덱스 있는데 Seq Scan 고르는 이유 · rows 추정 괴리 원인·대처 · count/exists 적절 사용 이유.
- **추천자료**: PostgreSQL Performance Tips/Using EXPLAIN · explain.dalibo.com · 『SQL Performance Explained』 · Django DB optimization · django-debug-toolbar, pg_stat_statements.
- **예상소요**: 2~2.5주 (Django 실습 비중 높게).

### DB-Stage 6. 확장 · 복제 · 분산 · 운영 (시니어 깊이)
- **목표**: 복제·파티셔닝·샤딩과 정합성 트레이드오프(CAP/일관성)를 설명하고, 커넥션 풀·백업·모니터링 운영까지 답한다.
- **핵심 토픽**
  - 스케일업 vs 스케일아웃, 읽기-쓰기 분리 → Django DATABASE ROUTERS.
  - 복제: 동기 vs 비동기, replication lag → read-after-write 불일치(중요 읽기는 primary). PG streaming replication/WAL shipping.
  - 파티셔닝: range/list/hash, partition pruning, 선언적 `PARTITION BY`(시계열).
  - 샤딩: 샤드 키(핫스팟·rebalancing), 크로스 샤드 조인/트랜잭션 어려움. **파티셔닝(한 서버 내) vs 샤딩(서버 간)**.
  - CAP: 분할 시 C·A 택일(P는 선택 아님), strong vs eventual, PACELC.
  - RDB vs NoSQL 선택, **PostgreSQL jsonb로 NoSQL 요구 흡수**.
  - 커넥션 풀: 풀 크기 산정, Django `CONN_MAX_AGE` 한계 → PgBouncer 필요. HikariCP ↔ PgBouncer.
  - 운영: 백업(pg_dump/PITR), VACUUM/autovacuum·bloat·XID wraparound, 모니터링(연결수·캐시적중·락대기·복제지연).
  - 캐싱: look-aside/write-through, 무효화·스탬피드(thundering herd) (아키텍처와 접점).
- **hands-on**
  1. primary + replica streaming replication → lag 측정, read-after-write 불일치 재현.
  2. 주문 테이블 월별 range 파티션 → partition pruning을 EXPLAIN으로 확인.
  3. Django DATABASE ROUTERS로 읽기=replica/쓰기=primary 검증.
  4. PgBouncer transaction pooling으로 커넥션 수↓ 처리량 변화 측정.
  5. jsonb + GIN 인덱스로 `@>, ->>` 조회 성능 측정.
- **자가점검**: 파티셔닝 vs 샤딩·샤드 키 실수 결과 · read replica 정합성 문제·해결 · 'CA 시스템' 표현이 부정확한 이유·PG 단일노드 분류 · NoSQL vs jsonb 충분한 경우 · 풀 크기 무작정↑ 나빠지는 이유·PgBouncer · VACUUM 없으면 생기는 문제 · 캐시 정합성·스탬피드 차단.
- **추천자료**: **DDIA 5/6/9장** · PostgreSQL HA/Partitioning/Vacuuming · Django Multiple databases · PgBouncer 문서 · Kleppmann 'Please stop calling databases CP or AP'.
- **예상소요**: 2~3주 (면접 빈출 위주 선택 집중).

> **🟢 PHASE 1 통과 기준은 §5 참조.**

---

## PHASE 2 — 알고리즘 & 자료구조 (상시 병행 + 중반 집중)
*매일 1문제, 25분 룰. 아래 stage는 "병행하며 쌓는 학습 분량"의 순서다.*

### ALG-Stage 1. 복잡도와 기본 자료구조 (측정 도구 장착)
- **목표**: 코드를 보고 시간/공간 복잡도를 즉석 추정, 입력 한계(n)로 허용 복잡도 역산. 배열/스택/큐/덱/해시를 Python 관용구로.
- **핵심 토픽**
  - 빅오(최악/평균/상각), 상수·저차항 버리기, **상각 O(1)**(동적배열 append).
  - **입력 한계 → 허용 복잡도 역산표**: n≤10^6→O(n)/O(n log n), 10^5→O(n log n), 5000→O(n²), 20~25→O(2^n)/O(n!). '1초 ≈ 1억 연산'.
  - 시간/공간 트레이드오프, 메모리 산정.
  - 배열 vs 연결리스트(임의접근·캐시 vs 삽입/삭제). Python list=동적배열.
  - 스택/큐/덱: 괄호짝(스택), BFS(큐), 슬라이딩 윈도우 최대(덱). **`list.pop(0)` 금지 → `collections.deque`**.
  - 해시: 체이닝 vs 개방주소, load factor·리해싱, 평균 O(1)/최악 O(n). Python dict/set.
  - **Python 표준 무기**: deque, defaultdict, Counter, heapq, bisect, `sys.stdin.readline`, `setrecursionlimit`. Java PriorityQueue↔heapq, HashMap↔dict, ArrayDeque↔deque.
- **hands-on**: 같은 문제(합=K 쌍)를 O(n²)→정렬+투포인터→해시 3버전 · Counter/defaultdict/deque/bisect 스니펫 4개를 'Python 무기 카드'로(CodePrep 이론 등록) · `input()` vs `sys.stdin.readline()` 10^6줄 비교 템플릿화 · n→복잡도 역산표 책상에 붙이기.
- **자가점검**: 이중루프+이분탐색 복잡도 · n=10^5에서 O(n²) 통과 여부 · append 상각 O(1) 이유 · list 큐가 느린 이유 · 해시 평균 O(1)·최악 O(n) 완화책.
- **추천자료**: 『이것이 취업을 위한 코딩테스트다 with 파이썬』 · 백준 단계별 입출력/배열 · 프로그래머스 입문/Lv0~1 · Python docs(collections/heapq/bisect) · VisuAlgo.
- **예상소요**: 1.5~2주 분량(병행).

### ALG-Stage 2. 탐색·정렬 + 트리/우선순위 자료구조
- **목표**: 정렬을 비교·선택, 이분탐색/파라메트릭 서치로 '답을 탐색', 힙/BST/트라이/유니온파인드를 언제 꺼낼지. 누적합·투포인터·슬라이딩 윈도우로 구간 문제 선형 해결.
- **핵심 토픽**
  - 정렬: 퀵(in-place·불안정·최악 O(n²))/머지(안정·O(n)메모리)/힙(in-place·불안정). Python `sort`=Timsort(안정), `key=/reverse=`.
  - 분할정복·재귀·메모이제이션, `setrecursionlimit`, `@lru_cache`.
  - 이분탐색 lower/upper bound, 경계(`<=, <`), `bisect_left/right`.
  - **파라메트릭 서치**: 최적화 → '가능한가(yes/no)' 단조 변환(랜선 자르기·최소거리 최대화). 결정함수가 핵심.
  - 투 포인터 / 슬라이딩 윈도우: 이중루프 O(n²)→O(n) 신호.
  - 누적합/차이배열: 전처리 O(n) 후 구간합 O(1), 2D 누적합. (면접·CT 빈출)
  - 힙/우선순위 큐: Top-K·다익스트라. Python `heapq`=최소힙 → 최대힙 부호반전, `(우선순위,값)` 튜플.
  - BST/균형트리(AVL/RB): Java TreeMap=RB, **Python엔 내장 균형트리 없음 → `sortedcontainers` 또는 bisect+list**.
  - 트라이: dict 중첩, 접두사 검색·자동완성.
  - **유니온-파인드 + 경로압축/union by rank**: 사이클 판별·크루스칼 부품.
- **hands-on**: 이분탐색 템플릿 2종 + 파라메트릭 결정함수 템플릿 · 정렬+투포인터(두/세 수의 합), 슬라이딩 윈도우(합≥S 최소 길이) · 1D/2D 누적합·차이배열 · 유니온파인드 경로압축+rank까지 손구현·사이클 판별 · heapq로 Top-K·K개 리스트 병합.
- **자가점검**: 퀵 vs 머지(안정성·메모리·최악) · 파라메트릭 서치와 일반 이분탐색 차이 · 구간합 Q번을 O(N+Q)로 · 경로압축·union by rank가 각각 최적화하는 것 · Python에서 '정렬 유지+이분 삽입'.
- **추천자료**: 『이것이~』 정렬/이진탐색/서로소집합 · 백준 단계별 · Python docs(bisect/heapq) · sortedcontainers · 프로그래머스 Lv.2.
- **예상소요**: 2.5~3주 분량(병행).

### ALG-Stage 3. 그래프 알고리즘
- **목표**: 인접리스트 모델링 + BFS/DFS, 최단경로(다익스트라·벨만포드·플로이드워셜·0-1 BFS), 위상정렬, MST, SCC, LCA를 유형 보고 즉시 매칭.
- **핵심 토픽**: 인접리스트 vs 인접행렬 · BFS(가중치 없는 최단·레벨, deque)/DFS(경로·연결요소·사이클·위상, 재귀 깊이 주의) · **다익스트라**(heapq, `(거리,노드)`, skip 패턴) · 벨만포드/음수 사이클 · 플로이드워셜(k 가장 바깥) · **0-1 BFS / 멀티소스 BFS**(벽 부수기·불 번지기) · 위상정렬(Kahn·진입차수·사이클 판정) · MST(크루스칼=희소/프림=밀집) · **SCC**(Tarjan/Kosaraju, 개념+1구현) · **LCA**(binary lifting, 개념).
- **hands-on**: 미로 BFS 최단 + DFS 영역 수 · 다익스트라 템플릿 + 경로복원 · 위상정렬(선수과목) · 크루스칼(2단계 유니온파인드 재사용) · 0-1 BFS 1문제 + 멀티소스 BFS 1문제.
- **자가점검**: BFS vs DFS 적합 상황 · 다익스트라가 음수에서 틀리는 이유·대안 · 플로이드 k가 바깥인 이유 · 위상정렬 불가 감지 · 밀집 그래프 MST 선택 · 0-1 BFS가 다익스트라보다 빠른 이유.
- **추천자료**: 『이것이~』 그래프/최단경로 · 백준 골드 그래프 · cp-algorithms.com · VisuAlgo · USACO Guide(Silver~Gold).
- **예상소요**: 3~4주 분량(빈출이라 충분히, SCC·LCA는 개념 위주).

### ALG-Stage 4. DP·고급 패턴 + 실전 운영
- **목표**: DP를 상태정의·점화식으로 설계, 그리디 정당성 판단, 백트래킹·비트마스킹·세그먼트 트리·문자열까지 동원해 골드~플래티넘을 시간 내 해결. 25분 룰로 실전 운영.
- **핵심 토픽**: DP(상태정의·점화식, Top-down `@lru_cache`/Bottom-up) · **대표 DP**(배낭·LIS(O(n log n))·편집거리·LCS·구간·트리 DP) · 비트마스킹 DP(TSP, `dp[mask][i]`) · 그리디 정당성·반례 · 백트래킹·가지치기(N-Queen) · **세그먼트 트리/펜윅(BIT)** · 좌표압축 · 문자열(KMP 실패함수/라빈-카프) · **25분 룰 운영법**(막힌 이유 한 줄 기록→재풀이) · 코테 실전(입출력·`setrecursionlimit`·엣지케이스·반례).
- **hands-on**: 대표 DP 6종 '점화식 카드' · 비트마스킹 TSP 1 + 백트래킹 1 · 세그먼트 트리·펜윅 손구현 + 좌표압축 결합 1 · **주 1회 90분 3문제 모의고사(CodePrep 타이머/통계)** · 오답 노트 루프(태그별 주말 재풀이, 재현률 추적).
- **자가점검**: 'DP다' 신호 2가지·상태 정의 · 그리디 최적 보장·반례 · 값도 자주 바뀌는 구간합 도구·복잡도 · 비트마스킹 n 한계·상태표현 · KMP가 빠른 이유·실패함수 · 시간초과 최적화 순서 · 깊은 재귀 DFS 대처 2가지.
- **추천자료**: 『알고리즘 문제 해결 전략(종만북)』 · 『이것이~』 DP/그리디 · 백준+solved.ac 태그 · 프로그래머스 고득점 Kit · cp-algorithms.com · AtCoder Educational DP Contest.
- **예상소요**: 4~6주+ (면접 직전까지 모의+오답 루프 지속, 종료선 없음).

> **🟢 PHASE 2 통과 기준은 §5 참조.** (알고리즘은 "졸업"이 아니라 "수준 유지")

---

## PHASE 3 — CS 전공 기초 (OS + 네트워크, 12~17주차)
*네트워크와 OS 두 축을 번갈아. 매 단계 끝에서 Java/Spring → Python/Django(WSGI/ASGI·GIL) 연결.*

### CS-Stage 1. 네트워크 입문 — 한 번의 HTTP 요청이 흐르는 길
- **목표**: URL 입력→응답 렌더링 전 과정을 단계별 설명. HTTP 요청/응답 구조를 떠서 읽는다.
- **핵심 토픽**: URL 입력 시 전체 흐름(DNS→TCP→(TLS)→HTTP→처리→응답→렌더) · HTTP 메시지 구조(`@RequestBody/@ResponseBody`와 연결) · 메서드와 멱등성·안전성(PUT 멱등, POST 비멱등) · 상태코드(200/201/204/301/304/400/401/403/404/409/429/500/502/503, **401 vs 403, 502 vs 503**) · 헤더(Content-Type/Accept/Authorization, DRF가 Accept로 JSON/Browsable 선택) · REST 자원 설계·무상태.
- **hands-on**: 개발자도구 Network 탭 라벨링 · `curl -v https://httpbin.org/get` 원문 표시 · `curl -X POST ... -d '{"a":1}'` · Spring API와 동일 엔드포인트를 DRF로 흉내·라우팅 비교.
- **자가점검**: URL→응답 순서 · 401/403/500/502/503 차이 · PUT/POST 멱등성과 재시도 · stateless 의미와 로그인 유지.
- **추천자료**: MDN HTTP 가이드 · 『그림으로 배우는 HTTP & Network Basic』 · httpbin.org · 개발자도구/curl.
- **예상소요**: 4~6일.

### CS-Stage 2. 전송 계층 — TCP / UDP와 연결의 생애주기
- **목표**: TCP 신뢰성(연결·종료·재전송·흐름/혼잡 제어)을 설명, TCP vs UDP 선택.
- **핵심 토픽**: TCP vs UDP · 3-way handshake(왜 3단계) · 4-way + TIME_WAIT(소켓 쌓임) · 신뢰성(시퀀스·ACK·재전송) · 흐름 제어(수신자 보호, 슬라이딩 윈도우) · 혼잡 제어(slow start, 네트워크 보호) · 소켓·포트·**5-tuple**.
- **hands-on**: Wireshark로 SYN/SYN,ACK/ACK·FIN 찾기 · `netstat -an`/`ss -tan` 소켓 상태 · Python `socket` TCP 에코 서버/클라 · 같은 걸 UDP로(`SOCK_DGRAM`).
- **자가점검**: 3-way가 3단계인 이유 · 흐름 vs 혼잡 제어 · TIME_WAIT 존재 이유·쌓이면 문제 · DNS가 UDP 쓰는 이유·TCP 전환 · TCP 신뢰성 보장 방식.
- **추천자료**: 『컴퓨터 네트워킹 하향식 접근』 3장 · Wireshark · Python socket HOWTO · Cloudflare 'What is TCP/IP?'.
- **예상소요**: 1주.

### CS-Stage 3. 보안·이름·브라우저 정책 — HTTPS/TLS, DNS, 쿠키/세션/JWT, CORS
- **목표**: HTTPS 도청·변조 방지(TLS 핸드셰이크), DNS, 웹 인증(세션 vs JWT), CORS를 면접에서 막힘없이.
- **핵심 토픽**: DNS 동작(캐시→리졸버→루트→TLD→권한, TTL, A/AAAA/CNAME/MX) · 대칭 vs 비대칭키 · TLS 핸드셰이크·인증서(ECDHE, 신원확인+도청/변조 방지) · 쿠키·세션(Secure/HttpOnly/SameSite, Spring Session ↔ `django.contrib.sessions`) · **JWT와 인증 vs 인가**(access/refresh, 강제 무효화 어려움, Spring Security 필터체인 ↔ DRF authentication/permission) · **CORS와 SOP**(프리플라이트 OPTIONS, '브라우저' 정책이라 서버↔서버 무관, django-cors-headers) · XSS/CSRF(HttpOnly·SameSite·CSRF 토큰).
- **hands-on**: `nslookup`/`dig`로 레코드·TTL · 인증서 보기 + `openssl s_client` 체인 · Application 탭 쿠키 속성 · 프론트(:3000)→백(:8000) CORS 에러 재현 → django-cors-headers 허용·프리플라이트 확인 · jwt.io 3분할 디코드.
- **자가점검**: HTTPS 도청·변조 동시 차단·세션키 합의 · 세션 vs JWT 트레이드오프·로그아웃 · CORS 강제 주체·프리플라이트 조건 · HttpOnly/SameSite가 막는 공격 · DNS 질의(캐시 포함).
- **추천자료**: MDN CORS/cookies/SOP · Cloudflare 'How does SSL/TLS work?'/'What is DNS?' · jwt.io · Django CSRF/Sessions·django-cors-headers · OWASP XSS/CSRF.
- **예상소요**: 1.5주.

### CS-Stage 4. HTTP 진화와 인프라 경계 — HTTP/2·3, OSI, L4/L7
- **목표**: HTTP/1.1→2→3을 HOL 블로킹 관점으로, OSI/TCP-IP를 '분류 틀'로, L4/L7·리버스 프록시 위치 이해.
- **핵심 토픽**: HTTP/1.1 한계(HOL, keep-alive) · HTTP/2(멀티플렉싱·HPACK, TCP HOL 잔존) · HTTP/3(QUIC, UDP 기반, TCP HOL 제거, 0-RTT) · OSI 7/TCP-IP 4(HTTP=응용, TCP=전송, IP=인터넷 분류) · IP·라우팅·NAT · **L4(IP/포트) vs L7(URL/헤더/쿠키)**·sticky session · 리버스 프록시(Nginx: TLS 종료·정적·LB → WAS). Spring 앞 Nginx ↔ Django 앞 Nginx+Gunicorn.
- **hands-on**: Network 탭 Protocol 컬럼(h2/h3) · `curl --http2 -I` vs `--http1.1` · Nginx 리버스 프록시 → Django/Gunicorn `proxy_pass` · `tracert`/`traceroute` 홉 확인.
- **자가점검**: 1.1/2/3 HOL 위치·해결 · HTTP/3가 UDP에서 신뢰성 보장 방법 · L4 vs L7·쿠키 라우팅 · HTTP/TLS/TCP/IP 계층 · 리버스 프록시 이유 3+.
- **추천자료**: Cloudflare 'HTTP/2 vs HTTP/3'/'What is QUIC?' · 하향식 접근 1/4장 · MDN 'Evolution of HTTP' · Nginx Reverse Proxy/LB.
- **예상소요**: 1주.

### CS-Stage 5. OS 입문 — 프로세스 / 스레드 / 스케줄링
- **목표**: 프로세스 vs 스레드, 컨텍스트 스위칭 비용, CPU 스케줄링을 'Gunicorn worker 몇 개', '동기 vs 비동기 서버'와 연결.
- **핵심 토픽**: 프로세스(독립 메모리) vs 스레드(힙/코드 공유) · 메모리 구조(코드/데이터/힙/스택)·상태 전이·PCB · 컨텍스트 스위칭(직접+캐시/TLB 무효화 간접 비용) · 스케줄링(FCFS/SJF/RR/우선순위/MLFQ, 선점 vs 비선점, starvation, 타임퀀텀) · 유저/커널 모드·시스템 콜 · **블로킹 I/O와 워커 모델**(Spring MVC 스레드풀 ↔ Django+Gunicorn sync worker).
- **hands-on**: 작업관리자/Process Explorer로 프로세스·스레드 관찰 · Python threading 카운터(GIL 복선) · multiprocessing vs threading CPU 바운드 시간 비교 · Gunicorn `--workers N`과 동시 처리 관계.
- **자가점검**: 프로세스 vs 스레드(메모리) · 컨텍스트 스위칭 직접/간접 비용 · RR 타임퀀텀 크고 작을 때 · 요청당 스레드 서버 한계 · 유저/커널 모드 분리 이유.
- **추천자료**: OSTEP Virtualization · 공룡책 프로세스/스레드/스케줄링 · KOCW 운영체제(반효경) · Process Explorer.
- **예상소요**: 1~1.5주.

### CS-Stage 6. 동시성과 동기화 — race condition, 뮤텍스/세마포어, GIL
- **목표**: race condition·임계구역 보호·동시성 vs 병렬성을 설명하고 **GIL이 그림을 어떻게 바꾸는지** 명확히.
- **핵심 토픽**: 동시성(번갈아) vs 병렬성(물리 동시) · race condition·임계구역(`counter++`=read-modify-write) · 원자성·CAS(AtomicInteger) · 뮤텍스(소유권 O) vs 세마포어(N개·소유권 X) · 조건변수·모니터·RW Lock · **GIL**(CPython 한 번에 한 스레드 바이트코드 → CPU 바운드는 multiprocessing, I/O 바운드는 스레드/async 유효, Java 진짜 멀티스레드와 차이) · 동시성 안전 설계(불변·스레드로컬·메시지 패싱, Spring 싱글톤 빈 주의).
- **hands-on**: threading 공유변수 100만 증가(lock 없이→어긋남→`threading.Lock`) · 같은 걸 multiprocessing(GIL 무관 병렬) · I/O 바운드를 threading vs asyncio(둘 다 빨라짐, GIL 안 막는 이유) · `threading.Semaphore`로 동시 N개 제한.
- **자가점검**: race condition·`counter++` 위험·차단 · 뮤텍스 vs 세마포어(소유권) · GIL 있어도 멀티스레딩 의미 있는 경우 · 동시성 vs 병렬성·단일코어 동시성 · CPU 바운드 병렬화 방법.
- **추천자료**: OSTEP Concurrency · Python threading/multiprocessing/asyncio · Real Python GIL/Concurrency · David Beazley 'Understanding the Python GIL'.
- **예상소요**: 1.5주 (race/GIL 실습 비중↑).

### CS-Stage 7. 데드락과 메모리 — 교착 상태, 가상 메모리, 페이징
- **목표**: 데드락 4조건·예방/회피/탐지를 DB 락과 연결, 가상 메모리·페이징·페이지 폴트·교체 알고리즘 설명.
- **핵심 토픽**: 데드락 4조건·예방(락 순서 통일)·회피(은행원)·탐지/회복(victim 롤백, DB 락 순서와 연결) · 가상 메모리(격리·과할당) · 페이징 vs 세그멘테이션(내부/외부 단편화, 페이지 테이블·MMU) · 페이지 폴트·디맨드 페이징·thrashing · TLB(컨텍스트 스위칭 시 무효화) · 교체 알고리즘(FIFO/LRU/Clock/Optimal, Belady's anomaly).
- **hands-on**: Python 두 스레드 반대 순서 락→데드락 재현→순서 통일 · DB 세션 2개 교차 UPDATE→데드락·victim 롤백 메시지 · 메모리·페이지 폴트 관찰 · LRU 캐시 구현/`functools.lru_cache` 히트율.
- **자가점검**: 데드락 4조건·현실적 예방 · DB 데드락 발생·감소(락 순서) · 가상 메모리·페이징·page fault · TLB와 컨텍스트 스위칭 · LRU vs Clock·실무에서 Clock류 이유.
- **추천자료**: OSTEP Deadlock·Memory Virtualization · 공룡책 데드락/가상메모리 · KOCW 메모리/페이징 · MySQL/PostgreSQL Deadlock 진단.
- **예상소요**: 1.5주.

### CS-Stage 8. 통합·심화 — IPC, 캐시/지역성, 직렬화, WSGI/ASGI
- **목표**: OS/네트워크 조각을 백엔드 실무로 통합. WSGI/ASGI·동기/비동기를 OS(스레드/이벤트루프)×네트워크(소켓/HTTP) 교차점에서 설명.
- **핵심 토픽**: IPC(파이프·메시지큐·공유메모리·소켓·시그널, 네트워크 소켓도 IPC) · 캐시·지역성(시간/공간, L1/L2/L3, 캐시 라인, 배열이 연결리스트보다 캐시 친화) · 캐시 무효화·일관성(look-aside/write-through/back, TTL, 스탬피드·single-flight, Redis) · 직렬화(JSON vs Protobuf vs MessagePack, DRF Serializer가 직렬화+검증) · **I/O 모델**(blocking/non-blocking/multiplexing(epoll)/async, 이벤트 루프, C10K) · **WSGI vs ASGI**(Gunicorn↔Uvicorn↔Spring MVC↔WebFlux) · 동기 vs 비동기 서버 선택·worker 산정·keep-alive · **엔드투엔드**(클라→DNS→TCP→TLS→Nginx(L7)→Gunicorn→Django→DB, 1단계 그림 완성형).
- **hands-on**: multiprocessing.Queue 프로듀서-컨슈머 + 소켓 버전 비교 · JSON vs Protobuf 크기/시간 측정 · Gunicorn(WSGI) vs Uvicorn(ASGI) 동시 I/O 처리량(wrk/locust/ab) · Redis look-aside 히트/미스 + 스탬피드 재현 · 'URL→응답' 그림을 OS+네트워크 용어로 한 장에 재작성.
- **자가점검**: WSGI vs ASGI·ASGI 유리 워크로드 · GIL 환경 I/O 바운드·CPU 바운드 확장 · Protobuf 득실 · 지역성·배열 캐시 친화 이유 · URL→Django→DB 전체 경로(OS/네트워크) · epoll vs 스레드 다수(C10K).
- **추천자료**: PEP 3333(WSGI)·ASGI 명세 · Django WSGI/ASGI/Async support · Gunicorn/Uvicorn · OSTEP I/O·Stevens·'The C10K problem' · Protobuf·Redis caching.
- **예상소요**: 2주 (부하테스트/통합 비중↑).

> **🟢 PHASE 3 통과 기준은 §5 참조.**

---

## PHASE 4 — 백엔드 아키텍처 & DDD (18~26주차)
*Spring에서 알던 것을 닻으로, Django에서 재현. Django는 fat model/view를 유도하므로 의도적 service layer·repository 도입이 체감 포인트.*

### ARCH-Stage 1. 객체지향 & 설계 원칙 (모든 아키텍처의 어휘)
- **목표**: SOLID·응집/결합·DIP/DI로 설명하고, 임의 클래스의 원칙 위반을 짚는다.
- **핵심 토픽**: 응집도/결합도(결합 종류, 저결합이 변경비용↓) · **SOLID 각각 + 반례**(SRP의 actor, LSP 정사각형-직사각형) · DIP/DI/IoC(Spring `@Autowired` ↔ Django는 DI 컨테이너 없어 생성자/팩토리/settings 주입) · DRY/KISS/YAGNI·과설계 경계(우연한 vs 본질적 중복) · 핵심 패턴(전략=OCP/DIP, 옵저버=도메인 이벤트 뿌리, 어댑터=헥사고날 뿌리) · 추상화 비용·좋은 추상화 기준.
- **hands-on**: Spring Service의 SRP/DIP 위반 표시→인터페이스 추출+생성자 주입 before/after 1커밋 · 결제수단 if-else→전략 패턴(OCP 확인) · 같은 전략 패턴을 Python ABC vs Protocol 두 방식·차이 메모 · '저장+메일+검증' 한 클래스→3책임 분리·테스트 난이도 비교.
- **자가점검**: SRP의 '책임/변경 이유'와 actor · DIP vs DI·Spring엔 있고 Django엔 없는 것 · 구현체 하나인데 인터페이스 정당한 경우 vs 과설계 · 전략 패턴이 실현하는 원칙 · DRY 오용으로 결합↑ 사례.
- **추천자료**: 『Clean Code』·『Clean Architecture』 1~3부 · 『Head First Design Patterns』 · Refactoring.Guru · 『Refactoring 2판』.
- **예상소요**: 1.5~2주.

### ARCH-Stage 2. 레이어드 아키텍처의 한계 진단 (문제 정의)
- **목표**: Controller→Service→Repository가 왜 '도메인이 프레임워크/DB에 끌려다니는' 구조로 무너지는지 자기 경험으로 설명. 헥사고날/클린이 풀려는 문제 정확히 짚기.
- **핵심 토픽**: N-tier 의존 방향의 함정(Service가 ORM 엔티티에 의존→도메인이 영속성에 의존) · **Anemic Domain Model**(로직이 Service로, 캡슐화 깨짐, fat views/fat models) · 프레임워크/DB 결합으로 인한 테스트·교체 비용 · 트랜잭션 스크립트 vs 도메인 모델(모든 프로젝트에 DDD가 답은 아님) · **Django MTV가 레이어드에 주는 압력**(models=ORM+도메인, views=컨트롤러+로직, serializers=DTO+검증 → service layer 도입 동기).
- **hands-on**: Spring 도메인 규칙이 @Service에 흩어진 3곳→엔티티 메서드로 끌어오기 시도·막히는 지점 기록 · Django fat view→service 함수 추출·뷰 줄 수/테스트성 변화 · Django ORM을 DB 없이 단위 테스트 시도(DB 필요해지는 지점)·도메인/ORM 분리 효과 정리 · 트랜잭션 스크립트 vs 도메인 모델 두 버전 비교.
- **자가점검**: 단방향 의존인데 도메인이 DB에 의존하는 이유 · Anemic이 안티패턴인 이유·정당한 경우 · DB 없이 단위 테스트 못하는 구조적 원인 · MTV가 fat 유도하는 방식·완화 · 모든 프로젝트에 헥사고날/DDD 안 쓰는 이유·판단 기준.
- **추천자료**: 『PoEAA』(Transaction Script/Domain Model/Service Layer) · Fowler 'AnemicDomainModel' · Django Models/Views · 'Against service layers in Django' 찬반 · 『Two Scoops of Django』.
- **예상소요**: 1주.

### ARCH-Stage 3. 헥사고날 & 클린 아키텍처 (포트 & 어댑터) ⭐(핵심 관심사·면접 단골)
- **목표**: 도메인 중심 + 포트/어댑터로 외부 격리를 직접 설계하고, Spring에서 익힌 구조를 Django(앱 분리 + service layer + repository)로 옮긴다.
- **핵심 토픽**: 헥사고날 전체 그림('의존성은 항상 안쪽') · 인바운드 포트(유스케이스) vs 아웃바운드 포트(저장소/외부 API) · 인바운드 어댑터(Controller/리스너) vs 아웃바운드 어댑터(ORM repo/HTTP 클라) · **Repository 패턴·영속성 모델 분리**(Spring Data JPA Repository ↔ Django엔 없어 '추상 Repository + ORM 구현' 손작성) · 애플리케이션 서비스(조율·트랜잭션·DTO, 도메인 규칙 없음) vs 도메인 서비스(순수 규칙) · 클린/어니언과 헥사고날 관계 · **트랜잭션 경계는 애플리케이션 서비스 단위**(`@Transactional` ↔ `transaction.atomic`) · DTO↔도메인↔영속 모델 매핑(DRF Serializer를 웹 어댑터에 가둘지).
- **hands-on**: Django 작은 도메인(주문/포인트)을 `domain/application/adapters(web=DRF, persistence=ORM repo)`로 분리·아웃바운드 포트(`OrderRepository` ABC) 정의·ORM 구현 주입 · 도메인 객체(순수 dataclass) ↔ ORM 모델 분리·매핑(to_domain/to_orm)·**도메인 테스트가 DB 없이** 도는 것 확인 · 애플리케이션 서비스에 `transaction.atomic`·DRF view는 얇게 · 포트 구현을 ORM 버전 + 인메모리 fake 버전·테스트 속도 비교 · Spring 헥사고날 샘플 ↔ Django 버전 매핑 대조표.
- **자가점검**: 인바운드/아웃바운드 포트·누가 구현 · 도메인/ORM 분리 득실 · 애플리케이션 vs 도메인 서비스·트랜잭션 경계 · Spring Data JPA Repo vs Django 수동 Repo · DB 없이 테스트 가능한 이유(의존 방향) · DRF Serializer 계층·도메인 검증을 Serializer에 넣으면 문제인 이유.
- **추천자료**: 『Get Your Hands Dirty on Clean Architecture』 · 『Clean Architecture』 · Cockburn 'Hexagonal Architecture' 원문 · **『Architecture Patterns with Python』(cosmicpython.com 무료, 가장 직접적)** · Django transactions · DRF Serializers/ViewSets.
- **예상소요**: 2.5~3주.

### ARCH-Stage 4. DDD 전술적 설계 (도메인을 코드로)
- **목표**: 엔티티/VO/애그리거트/도메인 서비스/팩토리/도메인 이벤트로 규칙을 응집, 애그리거트 경계로 트랜잭션 일관성 설계.
- **핵심 토픽**: 엔티티(식별자·가변) vs VO(값·불변, Money/Email, Java record ↔ `@dataclass(frozen=True)`) · **애그리거트·루트·불변식**(외부 접근 유일 통로) · 애그리거트 4규칙(작게·ID 참조·트랜잭션당 1개·나머지 최종 일관성, 락 경합/성능과 직결) · 도메인 서비스·팩토리 · **Repository는 애그리거트 루트당 하나** · 도메인 이벤트(OrderPlaced, 옵저버의 도메인 버전, `ApplicationEventPublisher/@TransactionalEventListener` ↔ Django signals/명시적 디스패처, signal 남용 위험) · 이벤트 발행 시점(커밋 후 기본, outbox 연결) · 명세 패턴·검증 위치(불변식은 도메인 안, 형식은 Serializer).
- **hands-on**: VO(Money/Email)를 frozen dataclass로 원시 타입 대체 · Order 애그리거트(OrderLine은 루트 통해서만, '합계=라인 합' 불변식·위반 예외 테스트) · 애그리거트 간 ID 참조로 전환·'하나 즉시+나머지 도메인 이벤트' 리팩터링 · OrderPlaced 이벤트→포인트 적립 핸들러(signals 버전 vs 명시적 이벤트 버스·추적성/테스트성 비교) · 도메인 검증 vs DRF 형식 검증 분리·에러 흐름 구분.
- **자가점검**: 엔티티 vs VO 동일성·VO 불변 이유 · 애그리거트 경계 기준·'트랜잭션당 하나' 중요성 · 애그리거트 간 ID 참조 이유 · 도메인 서비스 vs 애플리케이션 서비스 · 도메인 이벤트와 옵저버·커밋 전/후 트레이드오프 · Django signals 장점·위험 · 불변식 검증과 형식 검증 분리 이유.
- **추천자료**: 『DDD(Evans)』 · 『IDDD(Vernon)』(4규칙·이벤트) · 『DDD Distilled』 · 『Architecture Patterns with Python』 · Django Signals.
- **예상소요**: 3주.

### ARCH-Stage 5. DDD 전략적 설계 (경계와 모델)
- **목표**: 유비쿼터스 언어·바운디드 컨텍스트·컨텍스트 맵으로 '어디서 모델을 나눌지' 결정, 그 경계가 MSA/모놀리식 모듈 분리 기준이 됨을 설명.
- **핵심 토픽**: 유비쿼터스 언어(용어 불일치=버그·소통비용) · 바운디드 컨텍스트(같은 '상품'이 주문/재고/카탈로그에서 다름) · 서브도메인(Core/Supporting/Generic, build vs buy) · 컨텍스트 맵 패턴(Partnership/Customer-Supplier/Conformist/**ACL**/Shared Kernel/OHS/Published Language) · 컨텍스트 ↔ 모듈러 모놀리스/MSA 경계 · 모놀리식 vs 모듈러 모놀리스 vs MSA(성급한 MSA 위험) · **Django app을 컨텍스트 경계로**(앱 간 직접 ORM 참조 대신 인터페이스/이벤트) · 이벤트 스토밍 기초.
- **hands-on**: CodePrep(또는 커머스) 유비쿼터스 언어 사전·코드 이름 불일치 일치화 · 도메인을 2~3 컨텍스트로 쪼개고 컨텍스트 맵+패턴 라벨 · Django 컨텍스트별 app 분리·앱 간 ORM import를 공개 인터페이스/도메인 이벤트로 교체 · 외부(PG 응답)→도메인 변환 **ACL** 구현 · 미니 이벤트 스토밍(이벤트/커맨드/애그리거트).
- **자가점검**: 바운디드 컨텍스트 vs 마이크로서비스 관계 · 같은 회원/상품 다른 모델·단일 모델 위험 · ACL이 막는 것·위치 · Core/Supporting/Generic 노력 배분 · 모놀리식 우선 vs MSA 우선 근거·위험 · Django 컨텍스트 표현·앱 간 결합 끊기 · 유비쿼터스 언어 깨지면 문제.
- **추천자료**: 『DDD』 4부 · 『IDDD』 2~3장 · 『Building Microservices 2판』 · 『Monolith to Microservices』 · EventStorming · 'DDD Reference'(Evans 무료 PDF).
- **예상소요**: 2~2.5주.

### ARCH-Stage 6. 분산 & 운영 (일관성·복원력·관측) ⭐(가장 무겁고 면접 가중치↑)
- **목표**: SAGA·outbox·멱등성·CQRS·캐싱·복원력 패턴으로 분산 트랜잭션·중복·장애를 다루고, 관측성·테스트 전략으로 운영 가능한 시스템 설계.
- **핵심 토픽**: CAP·최종 일관성 · **SAGA**(코레오그래피 vs 오케스트레이션, 보상 트랜잭션) · **Transactional Outbox**(이중 쓰기 문제 해결, at-least-once) · 멱등성(Idempotency-Key·유니크 제약·처리이력, GET/PUT/DELETE vs POST에 키) · 메시지 큐(RabbitMQ vs Kafka, at-most/least/exactly-once, 컨슈머 멱등성, Django Celery) · CQRS/이벤트 소싱(감사·재구성 vs 복잡도, 단순 CRUD엔 과함) · 캐싱(look-aside/write-through/back, TTL 지터, single-flight, Django cache framework) · 복원력(재시도·타임아웃·**서킷 브레이커 Closed/Open/Half-Open**·백프레셔, 지수 백오프+멱등) · API 버저닝(URI/헤더/미디어타입, 호환 깨지 않는 진화, DRF 버저닝) · 테스트 전략(피라미드+계약 테스트, 헥사고날 덕에 도메인 단위 테스트 빠름) · 관측성(구조화 로깅·메트릭 RED/USE·분산 트레이싱 trace/span·correlation ID·OpenTelemetry).
- **hands-on**: 도메인 이벤트를 **Transactional Outbox**로 업그레이드(같은 atomic 안에 outbox 적재·Celery beat 폴링 발행) · POST 결제에 Idempotency-Key(유니크 제약+기존 결과 반환)·두 번 호출 한 번 처리 테스트 · 주문/재고 오케스트레이션 SAGA·재고 실패 시 보상 트랜잭션 통합 테스트 · Celery 비동기 작업+지수 백오프 재시도+멱등 · 읽기 화면을 CQRS식 별도 조회 모델·최종 일관성 갱신 그림 · 구조화 로깅+correlation ID·(가능하면) OpenTelemetry span 흐름.
- **자가점검**: 2PC 대신 SAGA 이유·코레오그래피 vs 오케스트레이션 · 이중 쓰기 문제·Outbox 해결 · exactly-once 어려움·컨슈머 멱등성 · POST 멱등성 구현·저장/제약 · CQRS/이벤트 소싱·단순 CRUD에 과한 이유 · 캐시 스탬피드·무효화 어려움 · 서킷 브레이커 3상태·재시도와 멱등성 함께 · 하위호환 깨지 않는 API 진화·버저닝 장단점 · 분산 장애 추적(트레이싱/상관 ID).
- **추천자료**: 『Microservices Patterns』(microservices.io) · **『DDIA』** · 『Building Microservices 2판』 · 『Architecture Patterns with Python』 · Celery/Django cache/DRF Versioning · OpenTelemetry.
- **예상소요**: 3.5~4주.

> **🟢 PHASE 4 통과 기준은 §5 참조.**

---

## PHASE 5 — Python / Django / DRF (집중은 후반, 캡스톤으로 마감)
*1~4단계 언어/코어/DRF/운영은 사실 Phase 1~4 내내 "매일 30분 병행"으로 천천히 깔아둔 뒤, 이 페이즈에서 집중 폭발 + 캡스톤.*

### PY-Stage 1. Python 언어 차이 — Java/Kotlin과 다른 부분만
- **목표**: 동적 타입·덕 타이핑·가변/불변·GIL·가상환경 차이를 설명하고 백엔드성 스크립트를 관용적으로.
- **핵심 토픽**: 동적 타입 + type hint(강제 아님, mypy) · 덕 타이핑·`typing.Protocol` · 가변/불변·참조 의미론·**가변 기본 인자 함정(`def f(x=[])`)** · 컴프리헨션 vs 제너레이터(즉시 vs 지연) · 일급 함수·클로저·**데코레이터(`functools.wraps`)**(AOP/@Transactional과 유사) · 클래스·`@property`·`@dataclass`(Lombok @Data ↔)·dunder · **GIL**(CPU 바운드 multiprocessing/I/O 바운드 스레드·async, Python 3.13 free-threaded 언급) · 가상환경·의존성(venv/pip/requirements, uv/poetry, Maven/Gradle ↔ pip/uv) · 예외·컨텍스트 매니저(try-with-resources ↔ `with`) · async/await 개념만.
- **hands-on**: comprehension vs generator `getsizeof` 비교 · `@timer` 데코레이터(wraps 포함, CodePrep 타이머와 연결) · `@dataclass` Problem 모델·`__eq__`/정렬 · venv 생성→설치→`pip freeze`→복원 왕복.
- **자가점검**: GIL·CPU/I/O 바운드 차이 · 가변 기본 인자 버그·올바른 패턴 · 데코레이터 구현·`wraps` 필요 이유 · 덕 타이핑 vs interface 다형성 · 리스트 컴프리헨션 vs 제너레이터.
- **추천자료**: Python Tutorial(자료형/컴프리헨션/예외) · 『Fluent Python 2판』 · Real Python(Decorators/GIL) · uv/mypy.
- **예상소요**: 1.5~2주(병행, OOP/예외는 빠르게 통과).

### PY-Stage 2. Django 코어 — MTV + ORM (Spring MVC·JPA에서 전이)
- **목표**: 프로젝트를 처음부터 띄우고, 모델 정의·마이그레이션, N+1 없는 CRUD, MTV 흐름 설명.
- **핵심 토픽**: 프로젝트 vs 앱·settings·manage.py(Boot 단일 앱 ↔ project+app) · MTV(View=컨트롤러, Template=뷰, **명시적 Service 레이어 없음**) · URL 라우팅(`path/include/name/reverse`) · Model·필드(`null vs blank`, Meta·indexes, JPA @Entity ↔) · 마이그레이션(Flyway/Liquibase ↔ migrations, RunPython, 충돌) · QuerySet 지연 평가·트리거 · **N+1·select_related/prefetch_related**(JPA fetch join ↔) · 집계·F·Q(F로 경합 회피) · 트랜잭션(`atomic`/`ATOMIC_REQUESTS`/`select_for_update`, @Transactional ↔) · Django Admin(즉시 백오피스) · CBV vs FBV(ViewSet 디딤돌).
- **hands-on**: `startproject codeprep + startapp problems`·SQLite 기동 · Problem/Submission/Tag 모델→`sqlmigrate` SQL 확인 · shell_plus에서 N+1 만들고 select/prefetch_related로 쿼리 수↓(debug-toolbar) · `atomic`으로 '제출 저장+통계 갱신'·롤백 확인 · Admin 커스터마이즈.
- **자가점검**: select vs prefetch_related·생성 SQL · QuerySet lazy·실행 시점 · @Transactional vs atomic 롤백 · makemigrations vs migrate·무중단 컬럼 추가 · F()가 동시성 안전한 이유 · MTV에서 비즈니스 로직 위치(fat model vs service).
- **추천자료**: Django 공식 튜토리얼 1~7부 · Topics(Models/Queries/Transactions/Migrations) · 『Two Scoops of Django』 · debug-toolbar/django-extensions · **Django 5.2 LTS 기준**.
- **예상소요**: 2.5~3주.

### PY-Stage 3. DRF — REST API 레이어 ⭐(이직 면접 핵심 무기)
- **목표**: 직렬화·검증·인증·인가·페이지네이션·필터·예외·문서화를 갖춘 프로덕션급 API 설계, Serializer/ViewSet 흐름 설명.
- **핵심 토픽**: DRF 사이클(Renderer/Parser, Browsable API) · **Serializer/ModelSerializer**(직렬화+역직렬화+검증, `validate_<field>/validate/create/update`, Jackson+DTO+@Valid ↔) · 중첩 Serializer·관계(source, SerializerMethodField, read/write_only) · Validation 계층(UniqueTogetherValidator) · **APIView→Generics→ViewSet→ModelViewSet**(CRUD 6액션 자동, @RestController ↔) · Router·@action · **인증**(Session/Token, **simplejwt access/refresh·회전·블랙리스트**, Spring Security 필터체인 ↔) · **권한**(IsAuthenticated/커스텀 BasePermission·`has_permission`/`has_object_permission`, @PreAuthorize ↔) · 페이지네이션(Page/LimitOffset/**Cursor**)·django-filter·Search/Ordering · 예외 처리(custom exception_handler, @ControllerAdvice ↔) · 쓰로틀링·버저닝·캐싱 · **drf-spectacular**(OpenAPI/Swagger, Springdoc ↔).
- **hands-on**: ModelSerializer+ModelViewSet+Router로 Problem CRUD(Browsable 확인) · `@action`으로 `POST /problems/{id}/submit`·정답률 통계 · simplejwt 로그인·IsAuthenticated·본인 제출만(has_object_permission) · CursorPagination vs PageNumber 성능 비교 · custom exception_handler로 `{code,message,details}` 통일 · drf-spectacular Swagger UI.
- **자가점검**: 역직렬화 흐름(run_validation→validate_field→validate→create/update) · APIView/Generic/ViewSet/ModelViewSet 선택 · JWT access/refresh·탈취 대응·세션 대비 · `has_permission` vs `has_object_permission` 호출 시점 · 오프셋 vs 커서·무한 스크롤 · DTO+@Valid vs Serializer 책임 · ModelViewSet 6액션·HTTP/URL.
- **추천자료**: DRF 공식 튜토리얼 1~6부+API Guide · drf-spectacular · simplejwt·django-filter · DRF 3.17 릴리스 노트 · CodePrep 도메인으로 실습.
- **예상소요**: 3~4주 (시간 배분 최대).

### PY-Stage 4. 실전·운영 — pytest·Celery·gunicorn/uvicorn·성능
- **목표**: 테스트로 회귀 차단, 백그라운드/비동기 적용, WSGI/ASGI 배포, 성능·보안 체크리스트 설명.
- **핵심 토픽**: **pytest + pytest-django**(fixture, `@pytest.mark.django_db`, factory_boy, parametrize, APIClient, JUnit5+Mockito ↔) · 테스트 전략·커버리지(트랜잭션 롤백 격리, coverage.py) · 환경 분리(settings base/dev/prod, django-environ, DEBUG/ALLOWED_HOSTS/SECRET_KEY, Spring profiles ↔) · **Celery + 브로커**(무거운 작업 비동기, `@shared_task`, 재시도·ETA, celery beat, @Async/@Scheduled ↔) · 캐싱·Redis(@Cacheable ↔) · **WSGI vs ASGI, gunicorn vs uvicorn**(worker 산정, Tomcat ↔) · **Django 비동기 현황**(async view 성숙, ORM은 부분 비동기·`sync_to_async`, I/O 바운드·WebSocket에서 실익) · 정적/미디어(collectstatic, WhiteNoise/nginx, S3)·Docker 배포 · 보안 체크리스트(CSRF/CORS, ORM 파라미터화, `check --deploy`) · 로깅·Sentry·nplusone 회귀 감시 · CI(GitHub Actions ruff+pytest).
- **hands-on**: pytest-django+factory_boy로 API 단위+통합+APIClient·coverage 80%+ · Celery+Redis로 '제출 채점' 비동기·celery beat 일일 통계 · settings 분리+.env·`check --deploy` 통과 · Dockerfile+compose(web=gunicorn/worker=celery/redis/db) · WSGI vs ASGI 양쪽 기동·async view 차이 · GitHub Actions ruff+pytest.
- **자가점검**: WSGI vs ASGI·gunicorn vs uvicorn · Django ORM 완전 비동기 여부·`sync_to_async` · Celery 시나리오·멱등성·재시도·중복 방지 · 테스트 DB 격리(롤백)·fixture · 배포 전 보안 체크리스트 · GIL인데 async view가 I/O에서 이득인 이유 · @Async/@Scheduled의 Django 대응.
- **추천자료**: Django Testing/Async/Deployment checklist · pytest-django·factory_boy·Celery('First steps with Django') · gunicorn/uvicorn·WhiteNoise·ruff·coverage·Sentry · 『Two Scoops』·'Security in Django'.
- **예상소요**: 3~4주 (캡스톤과 병행).

### PY-Stage 5. 캡스톤 — CodePrep 백엔드를 Django REST로 재구현 (포트폴리오)
- **목표**: 1~4단계를 하나의 서비스로 통합 — 인증·도메인 API·비동기·테스트·배포·문서를 갖춘 포트폴리오 완성, 설계 의사결정과 함께 면접에서 설명.
- **핵심 토픽**: 도메인 모델링(User/Problem/Submission/Tag/RoadmapItem/InterviewQA, 인덱스·제약—DB 학습 연결) · API 설계(통계 엔드포인트·페이지네이션·필터·에러 포맷, OpenAPI 산출물) · 인증·인가(simplejwt, 사용자별 격리, 관리자 분리) · 비동기·집계(Celery로 통계/스트릭(잔디), 캐싱) · **AI 면접관 연동**(LLM API 호출을 Celery 비동기, 키는 .env) · 테스트·CI·배포(pytest 커버리지·GitHub Actions·Docker, README 아키텍처 다이어그램·의사결정 기록) · **면접용 Spring↔Django 비교 회고**.
- **hands-on**: 신규 백엔드 리포(앱 분리: accounts/problems/stats/interview) · 크롬 확장이 1개 화면(풀이 통계) 실제 호출—E2E 1줄기 · Celery 일일 스트릭/정답률+Redis 캐시 · drf-spectacular OpenAPI·README Swagger 링크 · 커버리지 배지+CI 그린+compose 한 방 · docs에 'Spring↔Django 매핑 표'+'의사결정 로그'.
- **자가점검**: 트랜잭션 경계 위치·이유(제출+통계) · 사용자별 격리 계층(쿼리·권한) · Celery로 뺀 작업·판단 기준 · Spring/JPA였다면 더 쉽고/번거로운 곳 · N+1 발견·제거 측정값 · 가장 큰 기술 의사결정 1개·트레이드오프.
- **추천자료**: 『Two Scoops』 · DRF API Guide+drf-spectacular · Deployment checklist+Docker · Anthropic API 문서(AI 면접관) · 본인 CodePrep 확장(클라이언트 재사용).
- **예상소요**: 4~6주 (주말 중심, 평일은 알고리즘/이론 유지, MVP→문서화→배포 순).

> **🟢 PHASE 5 통과 기준은 §5 참조.**

---

## 4) 추천 주차별 플랜 (예시 14주 코어 + 알파)

> **상시 트랙(매일, 모든 주차 공통, 표에서 생략):**
> - 🟩 **알고리즘 1문제/일** (25분 룰, CodePrep 타이머·오답 태그)
> - 🐍 **Python 30분/일** (PY-Stage 1~2를 천천히 — DB 페이즈 동안 언어/Django 코어 자가학습으로 깔아둠)
> - 🌿 바쁜 날은 "잔디만"(15~30분: 알고리즘 1문제 또는 이론 1꼭지만)
> - 주말 = 프로젝트/hands-on 실습

| 주차 | 평일 메인(이론 1꼭지/일) | 주말 실습 | 상시 알고리즘 단계 |
|---|---|---|---|
| **W1** | DB-S1 SQL/모델링 기초 | 쇼핑몰 4테이블 CREATE+쿼리 10개 | ALG-S1 복잡도·자료구조 |
| **W2** | DB-S1 마무리 + DB-S2 ERD/정규화 | ERD 작성·3NF 분해 | ALG-S1 |
| **W3** | DB-S2 키/시퀀스 + ORM 스키마 읽기 | Django models→sqlmigrate diff | ALG-S2 이분/정렬/누적합 |
| **W4** | DB-S3 인덱스 내부구조 ⭐ | 100만 행 EXPLAIN, 복합/커버링 인덱스 | ALG-S2 |
| **W5** | DB-S3 마무리 + DB-S4 트랜잭션/MVCC ⭐ | 두 세션 이상현상·데드락 재현 | ALG-S2 유니온파인드/힙 |
| **W6** | DB-S4 락/격리수준/전파 ⭐ | Django select_for_update 동시성 테스트 | ALG-S3 그래프(BFS/DFS) |
| **W7** | DB-S5 실행계획/조인/N+1 ⭐ | 3종 조인 EXPLAIN, N+1 측정·제거 | ALG-S3 다익스트라/위상 |
| **W8** | DB-S5 튜닝/페이지네이션 + DB-S6 복제/파티셔닝 | primary/replica·파티셔닝·PgBouncer | ALG-S3 MST/0-1 BFS |
| **W9** | CS-S1 HTTP + CS-S2 TCP/UDP | Wireshark 핸드셰이크·socket 에코 | ALG-S4 DP 시작 |
| **W10** | CS-S3 TLS/DNS/JWT/CORS | CORS 재현·인증서·JWT 디코드 | ALG-S4 DP 대표유형 |
| **W11** | CS-S4 HTTP2/3·OSI + CS-S5 프로세스/스레드 | Nginx 리버스 프록시·Gunicorn workers | ALG-S4 백트래킹/비트마스킹 |
| **W12** | CS-S6 동시성/GIL + CS-S7 데드락/메모리 | threading/multiprocessing·LRU·DB 데드락 | ALG-S4 세그먼트 트리 |
| **W13** | CS-S8 WSGI/ASGI 통합 + ARCH-S1 SOLID | Gunicorn vs Uvicorn 부하·전략 패턴 리팩터링 | 🟩 주1 모의고사(90분 3문제) |
| **W14** | ARCH-S2 레이어드 한계 + ARCH-S3 헥사고날 시작 ⭐ | Django fat→service, 헥사고날 폴더 분리 | 🟩 모의+오답 루프 |

**W15+ (코어 이후, 면접 시점까지 연장):**
- W15~17: ARCH-S3 헥사고날 완성 → ARCH-S4 DDD 전술 → ARCH-S5 전략(주말마다 Django 헥사고날/애그리거트/컨텍스트 분리 점진 구축).
- W18~21: ARCH-S6 분산/운영(outbox·SAGA·Celery·관측성) + **PY-Stage 3 DRF 집중**(이직 핵심 무기, 시간 최대).
- W22~26: **PY-Stage 4 운영(pytest/Celery/배포) + PY-Stage 5 캡스톤**(CodePrep 백엔드 MVP→문서화→배포). 알고리즘은 모의+오답 루프로 수준 유지.

> 12~16주는 "코어 골격(DB 완성 + CS + 아키텍처/Python 진입)"의 현실적 범위다. 아키텍처 후반·DRF·캡스톤은 W15 이후 연장 구간으로, 이직 지원 시점에 맞춰 캡스톤을 MVP로 먼저 띄우고 점진 보강하는 게 합리적이다.

---

## 5) 페이즈별 통과 기준 (Stage Gate — 자가 판정)

**🟢 Phase 1 (DB) 통과 기준**
1. 빈 DB에서 정규화된 4~5테이블 스키마를 ERD→DDL→Django model까지 막힘없이 짠다.
2. 임의 쿼리에 `(컬럼 순서 포함) 어떤 인덱스를 왜 걸지` 근거를 대고, '안 타는 케이스'를 즉답한다.
3. 격리수준 4단계·MVCC·비관/낙관 락을 화이트보드에 그려 설명하고, 중복 결제 차단법 3가지를 댄다.
4. `EXPLAIN ANALYZE`를 읽어 병목(스캔/조인/정렬)을 짚고, N+1을 select/prefetch_related로 제거한 측정값이 있다.
5. CAP·복제 지연·파티셔닝 vs 샤딩·커넥션 풀을 면접 답변 수준으로 말한다.

**🟢 Phase 2 (알고리즘) 통과 기준** (졸업이 아닌 "수준 도달")
1. 입력 n만 보고 허용 복잡도를 30초 안에 역산한다.
2. 다익스트라·위상정렬·유니온파인드·대표 DP 6종을 빈 화면에서 템플릿 없이 구현한다.
3. 주 1회 모의고사(90분 3문제)에서 쉬움·중간을 시간 내 통과한다.
4. 오답 노트의 '재현률'이 우상향한다(본 문제 → 재현 가능한 문제로 전환).

**🟢 Phase 3 (CS) 통과 기준**
1. URL 입력→Django→DB 응답 전체 경로를 OS(소켓·시스템콜·워커)+네트워크(DNS·TCP·TLS·HTTP) 용어로 끊김 없이 설명한다.
2. TCP 핸드셰이크·TIME_WAIT·흐름 vs 혼잡 제어를 답한다.
3. HTTPS/JWT/CORS·세션 vs 토큰을 면접 수준으로 설명한다.
4. GIL이 CPU/I/O 바운드에 미치는 영향과 WSGI vs ASGI 선택을 근거와 함께 말한다.
5. 데드락 4조건을 DB 락 사례로 연결해 설명한다.

**🟢 Phase 4 (아키텍처) 통과 기준**
1. 레이어드의 한계를 자기 경험으로 설명하고 헥사고날이 푸는 문제를 정확히 짚는다.
2. Django로 포트/어댑터/Repository/도메인 분리를 직접 구현해 도메인 테스트가 DB 없이 돈다.
3. 엔티티/VO/애그리거트(4규칙)·도메인 이벤트를 코드로 보인다.
4. 바운디드 컨텍스트·ACL을 그리고 Django app 경계로 표현한다.
5. SAGA·Outbox·멱등성·서킷 브레이커를 트레이드오프와 함께 설명하고 outbox/멱등 POST를 구현했다.

**🟢 Phase 5 (Python) 통과 기준**
1. GIL·데코레이터·가변 기본 인자·덕 타이핑을 코드 예로 설명한다.
2. select/prefetch_related로 N+1을 잡고 `transaction.atomic` 경계를 의도대로 둔다.
3. DRF로 인증(JWT)·권한·페이지네이션·예외·문서를 갖춘 API를 30분 내 골격 완성한다.
4. pytest로 API 테스트 + Celery 비동기 + Docker 배포 + CI 그린이 된다.
5. **캡스톤이 배포되어 있고**, 트랜잭션 경계·N+1 제거·Celery 판단·Spring↔Django 비교를 의사결정 로그로 설명한다.

---

## 6) CodePrep 활용법 (이 로드맵 × 본인 도구)

**① 로드맵 체크리스트 탭**
- 위 5개 Phase × 각 Stage × 토픽을 **체크리스트 항목으로 그대로 import**. 계층은 `Phase > Stage > 토픽 > (hands-on / 자가점검)`.
- 원칙 "하루 1체크": 평일엔 '이론 1꼭지'를 한 항목으로 체크, 주말엔 'hands-on 1개'를 체크. 잔디 유지일은 알고리즘 1문제 체크만으로도 OK.
- 각 Stage 끝의 **stage gate(§5)를 '관문 항목'으로** 별도 등록 → 5개 다 체크돼야 다음 Phase 잠금 해제(스스로 강제).

**② 풀이 타이머 · 통계**
- 알고리즘 **25분 룰을 타이머로 강제**: 25분 알람 → 막히면 풀이 학습 → '왜 못 떠올렸나(상태정의/자료구조/복잡도)' 한 줄을 시도 기록으로 저장.
- 주 1회 90분 모의고사(3문제)를 타이머/통계로 기록 → **정답률·재현률·태그별 약점**을 통계 대시보드로 추적. DP·그래프 등 약한 태그가 보이면 주말 오답 루프에 우선 투입.
- 이론도 "손으로 타이핑" 원칙을 타이머와 결합: 한 꼭지 타이핑 세션을 기록해 잔디 유지.

**③ 면접 모의문답 탭**
- 각 Stage의 **자가점검 질문을 그대로 면접 문답 카드로** 등록(이 문서에 이미 분야별로 다 들어있음). 예: DB-S4 '중복 결제(따닥)를 DB 레벨에서 막는 법 3가지'.
- 분야 태그(DB/ALG/CS/ARCH/PY)로 분류 → 면접 직전 분야별 속성 복습.
- "Spring↔Django 매핑 질문"을 별도 카테고리로(예: '@Transactional ↔ atomic 차이', 'fetch join ↔ select_related') → 전이 면접 대비.

**④ AI 면접관**
- 자가점검을 통과했다 싶으면 **AI 면접관에게 해당 토픽 꼬리질문**을 요청: "PostgreSQL MVCC를 설명했더니 VACUUM·XID wraparound로 파고드는 꼬리질문을 해줘".
- 캡스톤 단계에서는 **설계 의사결정 방어 연습**: "내 트랜잭션 경계 선택을 SAGA·outbox 관점에서 반박해봐" → 답변을 면접 문답 카드로 다시 저장(피드백 루프).
- AI 면접관 기능 자체를 캡스톤(PY-S5)의 백엔드 엔드포인트로 구현 → **로드맵 학습이 곧 포트폴리오 기능**이 되는 선순환.

---

## 7) 이번 주 당장 시작할 7일치 액션

| Day | 상시(매일) | 메인 액션 |
|---|---|---|
| **Day 1 (월)** | 🟩 알고리즘 1문제(복잡도 의식하며) · 🐍 Python REPL 30분 | Docker로 PostgreSQL 16 컨테이너 가동 + DBeaver/psql 접속. CodePrep에 본 로드맵 Phase/Stage를 체크리스트로 import. |
| **Day 2 (화)** | 🟩 1문제 · 🐍 comprehension/제너레이터 스니펫 | DB-S1: 관계형 모델·NULL 3-valued logic·타입(timestamptz/jsonb 등) 1꼭지 타이핑. `users/products` 2테이블 CREATE. |
| **Day 3 (수)** | 🟩 1문제(25분 룰·시도 기록) · 🐍 데코레이터 `@timer` | DB-S1: 제약조건(FK ON DELETE) + SELECT 논리 실행순서. `orders/order_items` 추가, 샘플 30행 INSERT. |
| **Day 4 (목)** | 🟩 1문제 · 🐍 `@dataclass` Problem 모델 | DB-S1: JOIN 5종 + LEFT JOIN IS NULL. 연습 쿼리 '주문 없는 회원'·'회원별 총액 TOP5' 작성. |
| **Day 5 (금)** | 🟩 1문제 · 🐍 venv→pip freeze→복원 왕복 | DB-S1: 서브쿼리(EXISTS/NOT IN+NULL 함정) + 윈도우 함수 입문. '카테고리별 매출 비율(윈도우)' 쿼리. |
| **Day 6 (토)** | 🌿 잔디 유지(1문제) | **주말 실습**: 연습 쿼리 10개 완주 + psql 메타명령(`\d \dt \di \x`) 익히기. DB-S1 자가점검 5문항 자문자답 → 막힌 건 면접 문답 카드로 저장. |
| **Day 7 (일)** | 🌿 잔디 유지(이론 1꼭지) | **주말 실습**: DB-S2 진입 준비 — dbdiagram.io로 쇼핑몰 ERD 그리기. 이번 주 회고 + CodePrep 통계로 잔디/정답률 확인, 다음 주(DB-S2 정규화) 계획 체크. |

> 핵심 리듬: **평일 = DB 이론 1꼭지(손 타이핑) + 알고리즘 1문제(25분 룰) + Python 30분**, **주말 = DB hands-on + 자가점검을 면접 카드로 전환**. 바쁜 날은 알고리즘 1문제만이라도 — 잔디를 끊지 않는 게 6개월짜리 로드맵 완주의 1순위 규칙이다.

