# API 명세서

## 📅 Calendar API (Event)

### Base URL: `/api/events`

#### 1. 일정 생성

```http
POST /api/events
Content-Type: application/json

{
  "title": "테스트 일정",
  "startAt": "2025-08-25T09:00:00",
  "endAt": "2025-08-26T18:00:00",
  "user": {
    "id": 1
  },
  "description": "선택적 설명",
  "location": "선택적 위치",
  "category": "선택적 카테고리",
  "allDay": false
}
```

**Response:**

```json
{
  "id": 13,
  "title": "테스트 일정",
  "startAt": "2025-08-25T09:00:00",
  "endAt": "2025-08-26T18:00:00",
  "allDay": false,
  "user": {
    "id": 1,
    "email": "user@example.com",
    "name": "사용자명"
  },
  "notice": null,
  "description": "선택적 설명",
  "location": "선택적 위치",
  "category": "선택적 카테고리"
}
```

#### 2. 일정 단건 조회

```http
GET /api/events/{id}
```

#### 3. 사용자별 일정 조회

```http
GET /api/events?userId=1
```

#### 4. 기간별 일정 조회 (달력 뷰용)

```http
GET /api/events/range?userId=1&start=2025-08-01T00:00:00&end=2025-08-31T23:59:59
```

#### 5. 제목으로 일정 검색

```http
GET /api/events/search?userId=1&title=회의
```

#### 6. 카테고리별 일정 조회

```http
GET /api/events/category?userId=1&category=업무
```

#### 7. 공지사항으로부터 일정 생성

```http
POST /api/events/from-notice?userId=1&noticeId=1&startAt=2025-08-25T10:00:00&endAt=2025-08-25T11:00:00
```

**Response:**

```json
{
  "id": 14,
  "title": "2025학년도 제2학기 예비수강신청 계획 안내",
  "startAt": "2025-08-25T10:00:00",
  "endAt": "2025-08-25T11:00:00",
  "allDay": false,
  "user": {
    "id": 1
  },
  "notice": {
    "id": 1,
    "title": "2025학년도 제2학기 예비수강신청 계획 안내",
    "url": "https://plus.cnu.ac.kr/..."
  },
  "description": "공지사항에서 생성된 일정",
  "category": "마감일"
}
```

#### 8. Notice 연결된 일정 조회

```http
GET /api/events/with-notice?userId=1
```

#### 9. 일정 수정

```http
PUT /api/events/{id}
Content-Type: application/json

{
  "title": "수정된 일정",
  "startAt": "2025-08-25T10:00:00",
  "endAt": "2025-08-26T19:00:00",
  "user": {
    "id": 1
  }
}
```

#### 10. 일정 삭제

```http
DELETE /api/events/{id}
```
