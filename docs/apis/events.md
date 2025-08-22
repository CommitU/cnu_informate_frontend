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
  "userId": "1",
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
  "userId": "1",
  "description": null,
  "location": null,
  "category": null
}
```

#### 2. 일정 단건 조회

```http
GET /api/events/{id}
```

#### 3. 사용자별 일정 조회

```http
GET /api/events?userId=user1
```

#### 4. 기간별 일정 조회 (달력 뷰용)

```http
GET /api/events/range?userId=user1&start=2025-08-01T00:00:00&end=2025-08-31T23:59:59
```

#### 5. 제목으로 일정 검색

```http
GET /api/events/search?userId=user1&title=회의
```

#### 6. 카테고리별 일정 조회

```http
GET /api/events/category?userId=user1&category=업무
```

#### 7. 일정 수정

```http
PUT /api/events/{id}
Content-Type: application/json

{
  "title": "수정된 일정",
  "startAt": "2025-08-25T10:00:00",
  "endAt": "2025-08-26T19:00:00",
  "userId": "1"
}
```

#### 8. 일정 삭제

```http
DELETE /api/events/{id}
```

---
