# API 명세서

## 📅 Calendar API (Event)

### Base URL: `/api/events`

#### 1. 일정 생성

```http
POST /api/events
Content-Type: application/json

{
  "userId": 1,
  "noticeId": 100,
  "title": "테스트 일정",
  "date": "2025-08-25"
}
```

**Request Parameters:**

- `userId` (필수): 사용자 ID
- `noticeId` (선택): 연결할 공지사항 ID (없으면 일반 일정)
- `title` (필수): 일정 제목
- `date` (필수): 일정 날짜

**Response:**

```json
{
  "id": 13,
  "title": "테스트 일정",
  "date": "2025-08-25",
  "user": {
    "id": 1
  },
  "notice": {
    "id": 100,
    "title": "연결된 공지사항 제목"
  }
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
GET /api/events/range?userId=1&start=2025-08-01&end=2025-08-31
```

#### 5. 공지사항으로부터 일정 생성

```http
POST /api/events/from-notice?userId=1&noticeId=1&date=2025-08-25
```

**Parameters:**

- `userId` (필수): 사용자 ID
- `noticeId` (필수): 공지사항 ID
- `date` (필수): 일정 날짜

**Response:**

```json
{
  "id": 14,
  "title": "2025학년도 제2학기 예비수강신청 계획 안내",
  "date": "2025-08-25",
  "user": {
    "id": 1
  },
  "notice": {
    "id": 1,
    "title": "2025학년도 제2학기 예비수강신청 계획 안내",
    "url": "https://plus.cnu.ac.kr/..."
  }
}
```

#### 6. Notice 연결된 일정 조회

```http
GET /api/events/with-notice?userId=1
```

#### 7. 일정 수정

```http
PUT /api/events/{id}
Content-Type: application/json

{
  "title": "수정된 일정",
  "date": "2025-08-25"
}
```

#### 8. 일정 삭제

```http
DELETE /api/events/{id}
```
