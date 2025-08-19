# ERD 테이블 상세 설명

## 1. source (데이터 소스)

크롤링할 웹사이트나 데이터 소스를 관리하는 테이블

| 컬럼명     | 타입      | 설명                                              |
| ---------- | --------- | ------------------------------------------------- |
| id         | PK        | 소스 고유 식별자                                  |
| name       | String    | 소스명 (예: "서울대학교 공지사항", "카카오 채용") |
| base_url   | String    | 크롤링할 기본 URL                                 |
| type       | String    | 소스 유형 (RSS, HTML, API 등)                     |
| is_active  | Boolean   | 활성화 여부 (크롤링 대상인지 결정)                |
| created_at | Timestamp | 소스 등록일시                                     |

## 2. notice (공지사항/게시물)

크롤링으로 수집된 실제 데이터를 저장하는 핵심 테이블

| 컬럼명      | 타입      | 설명                          |
| ----------- | --------- | ----------------------------- |
| id          | PK        | 게시물 고유 식별자            |
| source_id   | FK        | 출처 소스 참조                |
| external_id | String    | 원본 사이트의 게시물 ID       |
| url         | String    | 원본 게시물 링크              |
| title       | String    | 게시물 제목                   |
| content     | Text      | 게시물 본문 내용              |
| posted_at   | Timestamp | 원본 사이트 게시일시          |
| scraped_at  | Timestamp | 크롤링으로 수집한 일시        |
| deadline_at | Timestamp | 마감일 (공고, 모집 등의 경우) |
| hash        | String    | 중복 체크용 해시값            |

## 3. crawl_job (크롤링 작업)

크롤링 작업의 실행 이력과 상태를 관리하는 테이블

| 컬럼명      | 타입      | 설명                                    |
| ----------- | --------- | --------------------------------------- |
| id          | PK        | 작업 고유 식별자                        |
| source_id   | FK        | 크롤링 대상 소스 참조                   |
| started_at  | Timestamp | 크롤링 시작 시간                        |
| finished_at | Timestamp | 크롤링 완료 시간                        |
| status      | String    | 작업 상태 (RUNNING, SUCCESS, FAILED 등) |
| error_msg   | String    | 실패시 오류 메시지                      |

## 4. attachment (첨부파일)

게시물에 포함된 첨부파일 정보를 저장하는 테이블

| 컬럼명    | 타입    | 설명                 |
| --------- | ------- | -------------------- |
| id        | PK      | 첨부파일 고유 식별자 |
| notice_id | FK      | 해당 게시물 참조     |
| file_name | String  | 파일명               |
| file_url  | String  | 파일 다운로드 URL    |
| file_size | Integer | 파일 크기 (bytes)    |

## 5. category (카테고리)

게시물 분류를 위한 카테고리 체계 테이블

| 컬럼명    | 타입   | 설명                                    |
| --------- | ------ | --------------------------------------- |
| id        | PK     | 카테고리 고유 식별자                    |
| code      | String | 카테고리 코드 (예: "RECRUIT", "NOTICE") |
| name      | String | 카테고리명 (예: "채용공고", "일반공지") |
| parent_id | FK     | 상위 카테고리 참조 (계층구조 지원)      |

## 6. notice_category (게시물-카테고리 연결)

AI 모델을 통한 게시물 자동 분류 결과를 저장하는 테이블

| 컬럼명        | 타입   | 설명                     |
| ------------- | ------ | ------------------------ |
| notice_id     | FK     | 게시물 참조              |
| category_id   | FK     | 카테고리 참조            |
| confidence    | Float  | AI 분류 신뢰도 (0.0~1.0) |
| model_version | String | 사용된 AI 모델 버전      |

## 7. app_user (사용자)

시스템 사용자 정보를 관리하는 테이블

| 컬럼명        | 타입      | 설명                      |
| ------------- | --------- | ------------------------- |
| id            | PK        | 사용자 고유 식별자        |
| email         | String    | 사용자 이메일 (로그인 ID) |
| password_hash | String    | 암호화된 비밀번호         |
| name          | String    | 사용자 이름               |
| created_at    | Timestamp | 계정 생성일시             |

## 8. user_interest_category (사용자 관심 카테고리)

사용자별 관심 카테고리와 가중치를 설정하는 테이블

| 컬럼명      | 타입  | 설명                                   |
| ----------- | ----- | -------------------------------------- |
| user_id     | FK    | 사용자 참조                            |
| category_id | FK    | 카테고리 참조                          |
| weight      | Float | 관심도 가중치 (높을수록 우선순위 높음) |

## 9. user_keyword (사용자 키워드)

사용자가 설정한 알림 키워드를 관리하는 테이블

| 컬럼명     | 타입   | 설명                                 |
| ---------- | ------ | ------------------------------------ |
| id         | PK     | 키워드 고유 식별자                   |
| user_id    | FK     | 사용자 참조                          |
| keyword    | String | 알림 키워드 (예: "인턴", "개발자")   |
| match_type | String | 매칭 방식 (EXACT, PARTIAL, REGEX 등) |

## 10. notification (알림)

사용자에게 발송되는 알림을 관리하는 테이블

| 컬럼명       | 타입      | 설명                                 |
| ------------ | --------- | ------------------------------------ |
| id           | PK        | 알림 고유 식별자                     |
| user_id      | FK        | 알림 받을 사용자 참조                |
| notice_id    | FK        | 알림 대상 게시물 참조                |
| scheduled_at | Timestamp | 알림 예약 발송 시간                  |
| sent_at      | Timestamp | 실제 발송 시간                       |
| status       | String    | 알림 상태 (PENDING, SENT, FAILED 등) |
| channel      | String    | 알림 채널 (EMAIL, PUSH, SMS 등)      |

## 관계도 요약

```
source (1) ←→ (N) notice (1) ←→ (N) attachment
   ↓                ↓
crawl_job          notice_category
                      ↓
app_user (1) ←→ (N) user_interest_category ←→ category
   ↓                                           ↑
user_keyword                                parent_id (self-reference)
   ↓
notification ←→ notice
```

## 시스템 동작 흐름

1. **크롤링**: `source`에 등록된 사이트들을 `crawl_job`으로 주기적 크롤링
2. **데이터 수집**: 새로운 게시물을 `notice`에 저장, 첨부파일은 `attachment`에 저장
3. **자동 분류**: AI 모델로 게시물을 분석하여 `notice_category`에 분류 결과 저장
4. **개인화**: 사용자의 `user_interest_category`와 `user_keyword` 설정을 기반으로 매칭
5. **알림 발송**: 매칭된 게시물에 대해 `notification` 생성 및 발송
