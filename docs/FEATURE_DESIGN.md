# CNU InfoMate - 기능 설계 문서

## 📋 프로젝트 개요

**프로젝트명**: CNU InfoMate  
**버전**: 1.0.0  
**개발 기간**: 2024년  
**플랫폼**: React Native (iOS/Android)

---

## 🎯 앱 목적

충남대학교 학생들을 위한 맞춤형 공지사항 및 학사 정보 제공 앱으로, 사용자의 관심 분야를 기반으로 한 개인화된 정보 추천 서비스를 제공합니다.

---

## 🏗️ 전체 앱 구조

```
사용자 접속 → 관심 분야 선택 → 메인 추천 공지 확인 → 하단 메뉴로 정보 접근 및 설정
```

### 📱 화면 구성

1. **로그인/회원가입 화면**
2. **관심 분야 선택 화면** (최초 로그인 시)
3. **메인 화면** (추천 공지 표시)
4. **정보 확인 탭** (하단 좌측 메뉴)
5. **설정 탭** (하단 우측 메뉴)

---

## 🧩 기능 상세 설계

### 1. 🔐 사용자 로그인 및 초기 설정

#### 1.1 회원가입 / 로그인

- **기능**: 소셜 로그인 (Google) 또는 자체 로그인
- **담당**: 백엔드, 프론트엔드
- **기술 스택**:
  - 프론트엔드: React Native Auth
  - 백엔드: JWT 토큰 기반 인증
- **데이터 구조**:
  ```json
  {
    "user_id": "string",
    "student_id": "string",
    "name": "string",
    "email": "string",
    "interests": ["array"],
    "created_at": "timestamp"
  }
  ```

#### 1.2 관심 분야 선택 UI

- **기능**: 카테고리별 관심 분야 선택 인터페이스
- **담당**: 프론트엔드
- **카테고리 목록**:
  - 특강/세미나
  - 마케팅/홍보
  - 취업/인턴십
  - IT/개발
  - 학사/수업
  - 장학금
  - 동아리/모임
  - 기타
- **UI 구성**: 체크박스 또는 토글 버튼 형태

#### 1.3 관심 분야 저장 API

- **기능**: 선택한 관심 분야 DB 저장 및 수정
- **담당**: 백엔드
- **API 엔드포인트**: `POST /api/user/interests`

---

### 2. 🏠 메인 화면 (추천 공지 표시)

#### 2.1 관심 분야 기반 추천 로직

- **기능**: 사용자 관심 분야 기반 공지 추천 알고리즘
- **담당**: 백엔드
- **추천 로직**:
  1. 사용자 관심 분야 매칭
  2. 최신성 가중치 적용
  3. 중요도 점수 계산
  4. 개인화 점수 산출

#### 2.2 추천 공지 API

- **기능**: 프론트엔드에 전달할 JSON 형태 API
- **담당**: 백엔드
- **API 엔드포인트**: `GET /api/notices/recommended`
- **응답 구조**:
  ```json
  {
    "notices": [
      {
        "id": "string",
        "title": "string",
        "content": "string",
        "category": "string",
        "importance": "number",
        "created_at": "timestamp",
        "url": "string"
      }
    ]
  }
  ```

#### 2.3 공지 카드 UI

- **기능**: 공지사항 간략 요약 카드 형태 표시
- **담당**: 프론트엔드
- **UI 구성**:
  - 제목 (최대 2줄)
  - 카테고리 태그
  - 작성일
  - 중요도 표시 (별표 또는 색상)
  - 미리보기 내용 (최대 3줄)

#### 2.4 공지 상세 보기

- **기능**: 공지 클릭 시 전체 내용 표시
- **담당**: 프론트엔드, 백엔드
- **기능**:
  - 전체 내용 표시
  - 원본 링크 이동
  - 공유 기능
  - 북마크 기능

---

### 3. 📚 정보 확인 탭 (하단 좌측 메뉴)

#### 3.1 학사 일정 표시

- **기능**: 캘린더 형식 또는 리스트 형식으로 학사 일정 표시
- **담당**: 프론트엔드
- **데이터 소스**: 학사과 공지사항 크롤링
- **UI 구성**:
  - 월별 캘린더 뷰
  - 리스트 뷰 (최신순)
  - 검색 기능

#### 3.2 장학 정보 / 공지

- **기능**: 카테고리 필터링 및 목록 출력
- **담당**: 백엔드, 프론트엔드
- **카테고리**:
  - 국가장학금
  - 교내장학금
  - 교외장학금
  - 근로장학금
- **필터링 옵션**:
  - 날짜 범위
  - 장학금 유형
  - 지원 자격

#### 3.3 공지 상세 보기

- **기능**: 각 정보 항목 클릭 시 상세 내용 표시
- **담당**: 프론트엔드
- **기능**:
  - 전체 내용 표시
  - 첨부파일 다운로드
  - 공유 기능

#### 3.4 정보 카테고리 API

- **기능**: 학사, 장학 등 유형별 분류된 API 제공
- **담당**: 백엔드
- **API 엔드포인트**:
  - `GET /api/notices/academic` (학사)
  - `GET /api/notices/scholarship` (장학)
  - `GET /api/notices/event` (행사)

---

### 4. ⚙️ 설정 탭 (하단 우측 메뉴)

#### 4.1 관심 분야 수정

- **기능**: 관심 분야 재설정 화면
- **담당**: 프론트엔드
- **기능**:
  - 기존 선택 항목 표시
  - 체크박스로 수정
  - 저장 시 API 호출

#### 4.2 알림 설정

- **기능**: 푸시 알림 설정 여부
- **담당**: 프론트엔드
- **설정 옵션**:
  - 전체 알림 ON/OFF
  - 카테고리별 알림 설정
  - 알림 시간 설정
  - 소리/진동 설정

#### 4.3 계정 설정

- **기능**: 로그아웃, 탈퇴 등
- **담당**: 프론트엔드, 백엔드
- **기능**:
  - 프로필 정보 수정
  - 비밀번호 변경
  - 로그아웃
  - 계정 탈퇴
  - 개인정보 처리방침

---

### 5. 🔔 푸시 알림 기능 (선택)

#### 5.1 알림 트리거 정의

- **기능**: 새로운 관심 분야 공지 발생 시 알림
- **담당**: 백엔드
- **트리거 조건**:
  - 새로운 공지 등록
  - 사용자 관심 분야와 매칭
  - 중요도 기준 충족

#### 5.2 푸시 전송

- **기능**: Firebase 등 푸시 API 연동
- **담당**: 백엔드
- **기술 스택**: Firebase Cloud Messaging (FCM)
- **알림 내용**:
  - 제목: 공지 제목
  - 내용: 공지 요약
  - 클릭 시: 해당 공지로 이동

#### 5.3 알림 내역 UI

- **기능**: 받은 알림을 한눈에 보기
- **담당**: 프론트엔드
- **UI 구성**:
  - 알림 목록 (최신순)
  - 읽음/안읽음 표시
  - 알림 삭제 기능
  - 전체 삭제 기능

---

## 📦 데이터베이스 설계

### 사용자 테이블 (users)

```sql
CREATE TABLE users (
  id UUID PRIMARY KEY,
  student_id VARCHAR(20) UNIQUE NOT NULL,
  name VARCHAR(100) NOT NULL,
  email VARCHAR(255) UNIQUE NOT NULL,
  interests TEXT[], -- JSON 배열
  notification_settings JSONB,
  created_at TIMESTAMP DEFAULT NOW(),
  updated_at TIMESTAMP DEFAULT NOW()
);
```

### 공지사항 테이블 (notices)

```sql
CREATE TABLE notices (
  id UUID PRIMARY KEY,
  title VARCHAR(500) NOT NULL,
  content TEXT NOT NULL,
  category VARCHAR(50) NOT NULL,
  importance INTEGER DEFAULT 1,
  url VARCHAR(500),
  created_at TIMESTAMP DEFAULT NOW(),
  updated_at TIMESTAMP DEFAULT NOW()
);
```

### 학사 일정 테이블 (academic_schedules)

```sql
CREATE TABLE academic_schedules (
  id UUID PRIMARY KEY,
  title VARCHAR(200) NOT NULL,
  description TEXT,
  start_date DATE NOT NULL,
  end_date DATE,
  category VARCHAR(50) NOT NULL,
  created_at TIMESTAMP DEFAULT NOW()
);
```

### 장학 정보 테이블 (scholarships)

```sql
CREATE TABLE scholarships (
  id UUID PRIMARY KEY,
  title VARCHAR(200) NOT NULL,
  description TEXT,
  amount INTEGER,
  application_start DATE,
  application_end DATE,
  category VARCHAR(50) NOT NULL,
  created_at TIMESTAMP DEFAULT NOW()
);
```

### 알림 설정 테이블 (notification_settings)

```sql
CREATE TABLE notification_settings (
  id UUID PRIMARY KEY,
  user_id UUID REFERENCES users(id),
  category VARCHAR(50) NOT NULL,
  enabled BOOLEAN DEFAULT true,
  created_at TIMESTAMP DEFAULT NOW()
);
```

---

## 🛠️ 기술 스택

### 프론트엔드

- **프레임워크**: React Native 0.80.2
- **언어**: TypeScript
- **상태 관리**: Redux Toolkit 또는 Zustand
- **네비게이션**: React Navigation 6
- **UI 라이브러리**: React Native Elements 또는 NativeBase
- **네트워킹**: Axios
- **푸시 알림**: React Native Firebase

### 백엔드

- **프레임워크**: Node.js + Express 또는 Python + FastAPI
- **데이터베이스**: PostgreSQL
- **인증**: JWT
- **푸시 알림**: Firebase Cloud Messaging
- **크롤링**: Puppeteer 또는 BeautifulSoup

### 개발 도구

- **버전 관리**: Git
- **코드 품질**: ESLint, Prettier
- **테스팅**: Jest
- **빌드 도구**: Metro Bundler

---

## 📋 개발 일정

### Phase 1: 기본 구조 및 인증 (2주)

- [ ] 프로젝트 초기 설정
- [ ] 로그인/회원가입 기능
- [ ] 관심 분야 선택 UI
- [ ] 기본 네비게이션 구조

### Phase 2: 메인 기능 개발 (3주)

- [ ] 추천 공지 API 개발
- [ ] 메인 화면 UI 구현
- [ ] 공지 상세 보기 기능
- [ ] 정보 확인 탭 구현

### Phase 3: 추가 기능 및 최적화 (2주)

- [ ] 설정 탭 구현
- [ ] 푸시 알림 기능
- [ ] 성능 최적화
- [ ] 테스트 및 버그 수정

### Phase 4: 배포 및 마무리 (1주)

- [ ] 앱스토어 배포 준비
- [ ] 최종 테스트
- [ ] 문서화
- [ ] 배포

---

## 🎨 UI/UX 가이드라인

### 색상 팔레트

- **Primary**: #1976D2 (충남대학교 블루)
- **Secondary**: #FF6B35 (오렌지)
- **Background**: #F5F5F5
- **Text**: #212121
- **Gray**: #757575

### 타이포그래피

- **제목**: 18px, Bold
- **부제목**: 16px, Medium
- **본문**: 14px, Regular
- **설명**: 12px, Light

### 아이콘

- Material Design Icons 사용
- 크기: 24px (기본)
- 색상: Primary 또는 Gray

---

## 🔧 API 명세

### 인증 API

- `POST /api/auth/login` - 로그인
- `POST /api/auth/register` - 회원가입
- `POST /api/auth/logout` - 로그아웃

### 사용자 API

- `GET /api/user/profile` - 프로필 조회
- `PUT /api/user/profile` - 프로필 수정
- `PUT /api/user/interests` - 관심 분야 수정

### 공지사항 API

- `GET /api/notices/recommended` - 추천 공지 조회
- `GET /api/notices/{category}` - 카테고리별 공지 조회
- `GET /api/notices/{id}` - 공지 상세 조회

### 알림 API

- `GET /api/notifications` - 알림 목록 조회
- `PUT /api/notifications/settings` - 알림 설정 수정
- `DELETE /api/notifications/{id}` - 알림 삭제

---

## 📝 참고 사항

1. **접근성**: 모든 UI 요소는 접근성 가이드라인을 준수해야 합니다.
2. **성능**: 이미지 최적화, 메모리 누수 방지, 네트워크 요청 최소화를 고려합니다.
3. **보안**: 사용자 데이터 암호화, API 보안, 토큰 관리에 주의합니다.
4. **테스트**: 단위 테스트, 통합 테스트, E2E 테스트를 작성합니다.
5. **문서화**: 코드 주석, API 문서, 사용자 가이드를 작성합니다.

---

**문서 버전**: 1.0  
**최종 수정일**: 2024년  
**작성자**: 개발팀
