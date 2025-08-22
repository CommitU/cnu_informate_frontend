# CNU Informate - 프로젝트 기능 정리

## 📱 프로젝트 개요

**프로젝트명**: CNU Informate  
**버전**: 1.0.0  
**플랫폼**: React Native (iOS/Android)  
**개발 언어**: TypeScript  
**상태 관리**: Zustand  
**스타일링**: NativeWind (Tailwind CSS)

---

## 🎯 앱 목적

충남대학교 학생들을 위한 맞춤형 공지사항 및 학사 정보 제공 앱으로, 사용자의 관심 분야를 기반으로 한 개인화된 정보 추천 서비스를 제공합니다.

---

## 🏗️ 전체 앱 구조

### 네비게이션 구조

```
App.tsx
├── AuthStackNavigator (비인증 상태)
│   ├── LoginScreen
│   └── RegisterScreen
└── MainTabNavigator (인증 상태)
    ├── MainStackNavigator
    │   ├── MainScreen
    │   └── DetailScreen
    ├── CalendarScreen
    ├── InfoStackNavigator
    │   ├── InfoScreen
    │   └── DetailScreen
    └── SettingsScreen
```

---

## 🔐 1. 인증 기능 (Authentication)

### 1.1 로그인 기능

- **파일**: `src/features/auth/LoginScreen.tsx`
- **기능**:
  - 이메일/비밀번호 로그인
  - 비밀번호 표시/숨김 토글
  - 로그인 상태 관리
  - 회원가입 화면 이동
- **UI 구성**:
  - 학교 로고 및 앱 제목
  - 이메일 입력 필드
  - 비밀번호 입력 필드 (보안 토글)
  - 로그인 버튼
  - 회원가입 링크

### 1.2 회원가입 기능

- **파일**: `src/features/auth/RegisterScreen.tsx`
- **기능**:
  - 이메일, 비밀번호, 이름, 학번 입력
  - 비밀번호 확인
  - 회원가입 처리
  - 로그인 화면 이동

### 1.3 인증 상태 관리

- **파일**: `src/stores/authStore.ts`
- **기능**:
  - 사용자 정보 저장/관리
  - 로그인/로그아웃 상태 관리
  - AsyncStorage를 통한 영구 저장
  - 초기화 상태 관리

---

## 🏠 2. 메인 화면 (Home)

### 2.1 추천 공지사항

- **파일**: `src/features/home/MainScreen.tsx`
- **기능**:
  - 사용자 관심분야 기반 추천 공지사항 표시
  - 관심분야가 없을 경우 최근 공지사항 5개 표시
  - 새로고침 기능
  - 로딩/에러 상태 처리
- **UI 구성**:
  - 관심분야 요약 카드
  - 공지사항 섹션
  - 로딩/에러 상태 표시

### 2.2 관심분야 요약 카드

- **파일**: `src/features/home/components/InterestSummaryCard.tsx`
- **기능**:
  - 선택된 관심분야 표시
  - 관심분야 수정 버튼
  - 시각적 요약 정보

### 2.3 공지사항 카드

- **파일**: `src/features/home/components/NoticeCard.tsx`
- **기능**:
  - 공지사항 제목, 내용 미리보기
  - 카테고리 태그
  - 작성일 표시
  - 클릭 시 상세보기

### 2.4 상태 관리 컴포넌트

- **로딩 상태**: `LoadingState.tsx`
- **에러 상태**: `ErrorState.tsx`
- **빈 상태**: `EmptyState.tsx`

---

## 📚 3. 정보 확인 탭 (Info)

### 3.1 카테고리별 공지사항

- **파일**: `src/features/info/InfoScreen.tsx`
- **기능**:
  - 12개 카테고리별 공지사항 필터링
  - 검색 기능
  - 카테고리별 공지사항 개수 표시
  - 새로고침 기능
- **카테고리**:
  - 특강
  - 기획/마케팅
  - 취업/인턴십
  - 봉사 활동
  - IT/SW
  - 스터디
  - 디자인
  - 창업
  - 영상/콘텐츠
  - 서포터즈/기자단
  - 학사안내
  - 기타

### 3.2 카테고리 탭

- **파일**: `src/features/info/components/CategoryTab.tsx`
- **기능**:
  - 카테고리 선택 UI
  - 각 카테고리별 공지사항 개수 표시
  - 활성 카테고리 하이라이트

### 3.3 정보 아이템 카드

- **파일**: `src/features/info/components/InfoItemCard.tsx`
- **기능**:
  - 공지사항 정보 표시
  - 카테고리별 색상 구분
  - 클릭 시 상세보기

---

## 📅 4. 일정 관리 (Calendar)

### 4.1 캘린더 화면

- **파일**: `src/features/calendar/CalendarScreen.tsx`
- **기능**:
  - 월별 캘린더 뷰
  - 일정 표시 및 관리
  - 일정 추가/삭제
  - 일정 상세 모달
- **UI 구성**:
  - 월 네비게이션
  - 캘린더 그리드
  - 일정 목록
  - 일정 추가 버튼

### 4.2 일정 관리

- **파일**: `src/stores/eventStore.ts`
- **기능**:
  - 사용자 일정 저장/관리
  - 공지사항에서 일정 생성
  - 날짜별 일정 조회
  - 일정 삭제

---

## ⚙️ 5. 설정 (Settings)

### 5.1 설정 화면

- **파일**: `src/features/settings/SettingsScreen.tsx`
- **기능**:
  - 관심분야 수정
  - 계정 설정
  - 로그아웃
  - 계정 탈퇴
- **설정 섹션**:
  - 관심분야 설정
  - 계정 관리
  - 앱 정보

### 5.2 관심분야 관리

- **파일**: `src/stores/interestStore.ts`
- **기능**:
  - 관심분야 목록 관리
  - 관심분야 선택/해제
  - 선택된 관심분야 조회
  - AsyncStorage를 통한 영구 저장

---

## 🔗 6. 공통 기능 (Shared)

### 6.1 상세보기 화면

- **파일**: `src/features/shared/DetailScreen.tsx`
- **기능**:
  - 공지사항 상세 내용 표시
  - 원본 링크 이동
  - 공유 기능
  - 뒤로가기

### 6.2 공통 컴포넌트

- **파일**: `src/shared/components/`
- **컴포넌트**:
  - `Button.tsx`: 재사용 가능한 버튼
  - `Input.tsx`: 입력 필드
  - `Card.tsx`: 카드 레이아웃
  - `ScreenHeader.tsx`: 화면 헤더

---

## 🌐 7. API 서비스

### 7.1 공지사항 API

- **파일**: `src/shared/services/api.ts`
- **기능**:
  - 모든 공지사항 조회
  - 추천 공지사항 조회
  - 카테고리별 공지사항 조회
  - 공지사항 검색
  - 카테고리 정보 조회

### 7.2 이벤트 API

- **파일**: `src/shared/services/eventsApi.ts`
- **기능**:
  - 사용자 일정 조회
  - 일정 생성
  - 일정 삭제
  - 기간별 일정 조회

---

## 🎨 8. UI/UX 특징

### 8.1 디자인 시스템

- **스타일링**: NativeWind (Tailwind CSS)
- **아이콘**: Expo Vector Icons (Ionicons)
- **색상**: 카테고리별 색상 구분
- **애니메이션**: React Native Animated

### 8.2 사용자 경험

- **로딩 상태**: 모든 데이터 로딩 시 로딩 인디케이터
- **에러 처리**: 사용자 친화적 에러 메시지
- **새로고침**: Pull-to-refresh 기능
- **반응형**: 다양한 화면 크기 지원

---

## 📊 9. 데이터 구조

### 9.1 공지사항 타입

```typescript
interface Notice {
  id: number;
  title: string;
  content: string;
  url: string;
  postedAt: string;
  scrapedAt: string;
  deadlineAt?: string;
}
```

### 9.2 사용자 타입

```typescript
interface User {
  id: string;
  email: string;
  name: string;
  studentId?: string;
}
```

### 9.3 관심분야 타입

```typescript
interface Interest {
  id: string;
  name: string;
  selected: boolean;
}
```

### 9.4 일정 타입

```typescript
interface Event {
  id: string;
  title: string;
  date: string;
  originalItemTitle: string;
  createdAt: string;
}
```

---

## 🔧 10. 기술 스택

### 10.1 프론트엔드

- **React Native**: 0.79.5
- **Expo**: ~53.0.20
- **TypeScript**: ~5.8.3
- **React Navigation**: 7.x
- **Zustand**: ^5.0.7
- **NativeWind**: ^4.1.23
- **Axios**: ^1.11.0

### 10.2 개발 도구

- **ESLint**: ^9.25.0
- **Prettier**: prettier-plugin-tailwindcss
- **Metro Bundler**: React Native 번들러

### 10.3 라이브러리

- **AsyncStorage**: 로컬 데이터 저장
- **React Native Gesture Handler**: 제스처 처리
- **React Native Reanimated**: 애니메이션
- **Expo Haptics**: 햅틱 피드백

---

## 📱 11. 화면별 기능 상세

### 11.1 로그인 화면

- 이메일/비밀번호 입력
- 비밀번호 표시/숨김
- 로그인 버튼 (로딩 상태 포함)
- 회원가입 링크
- 에러 메시지 표시

### 11.2 메인 화면

- 관심분야 요약 카드
- 추천 공지사항 목록
- 새로고침 기능
- 공지사항 클릭 시 상세보기
- 로딩/에러/빈 상태 처리

### 11.3 정보 화면

- 카테고리 탭 (12개 카테고리)
- 검색 기능
- 카테고리별 공지사항 개수
- 공지사항 목록
- 필터링 및 정렬

### 11.4 일정 화면

- 월별 캘린더 뷰
- 일정 표시 (점으로 표시)
- 일정 클릭 시 상세 모달
- 일정 추가/삭제
- 날짜 네비게이션

### 11.5 설정 화면

- 관심분야 토글 (8개 항목)
- 계정 관리 섹션
- 로그아웃 버튼
- 계정 탈퇴 옵션
- 앱 정보

---

## 🚀 12. 성능 최적화

### 12.1 상태 관리

- Zustand를 통한 효율적인 상태 관리
- 필요한 상태만 구독하여 리렌더링 최소화
- AsyncStorage를 통한 영구 저장

### 12.2 네트워크 최적화

- Axios 인터셉터를 통한 로깅
- 에러 처리 및 재시도 로직
- 요청/응답 캐싱

### 12.3 UI 최적화

- React.memo를 통한 컴포넌트 메모이제이션
- 불필요한 리렌더링 방지
- 이미지 최적화

---

## 🔒 13. 보안 및 개인정보

### 13.1 인증 보안

- JWT 토큰 기반 인증
- 비밀번호 암호화
- 세션 관리

### 13.2 데이터 보안

- AsyncStorage를 통한 안전한 로컬 저장
- 민감한 정보 암호화
- API 통신 보안

### 13.3 개인정보 보호

- 최소한의 개인정보 수집
- 사용자 동의 기반 데이터 처리
- 데이터 삭제 기능

---

## 📈 14. 향후 개발 계획

### 14.1 추가 기능

- 푸시 알림 기능
- 공지사항 북마크
- 공지사항 공유 기능
- 다크 모드 지원
- 다국어 지원

### 14.2 성능 개선

- 이미지 캐싱
- 무한 스크롤
- 가상화된 리스트
- 오프라인 지원

### 14.3 사용자 경험

- 온보딩 화면
- 튜토리얼
- 사용자 피드백 시스템
- 접근성 개선

---

## 📝 15. 개발 가이드라인

### 15.1 코드 스타일

- TypeScript 사용
- ESLint 규칙 준수
- 컴포넌트별 파일 분리
- 의미있는 변수명 사용

### 15.2 폴더 구조

```
src/
├── features/          # 기능별 폴더
│   ├── auth/         # 인증 관련
│   ├── home/         # 메인 화면
│   ├── info/         # 정보 화면
│   ├── calendar/     # 일정 관리
│   ├── settings/     # 설정
│   └── shared/       # 공통 기능
├── stores/           # 상태 관리
├── shared/           # 공통 리소스
│   ├── components/   # 공통 컴포넌트
│   ├── services/     # API 서비스
│   ├── constants/    # 상수
│   ├── types/        # 타입 정의
│   └── utils/        # 유틸리티
└── hooks/            # 커스텀 훅
```

### 15.3 네이밍 규칙

- 컴포넌트: PascalCase
- 파일명: PascalCase (컴포넌트), camelCase (기타)
- 변수/함수: camelCase
- 상수: UPPER_SNAKE_CASE
- 타입/인터페이스: PascalCase

---

**문서 버전**: 1.0  
**최종 수정일**: 2024년 12월  
**작성자**: 개발팀
