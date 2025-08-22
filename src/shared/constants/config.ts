// Backend API Configuration
export const API_CONFIG = {
  // .env 파일의 EXPO_PUBLIC_BACKEND_URL 환경변수 사용
  BASE_URL: process.env.EXPO_PUBLIC_BACKEND_URL || "http://localhost:8080",
  TIMEOUT: 10000, // 10초
  RETRY_ATTEMPTS: 3,
};

// API Endpoints
export const API_ENDPOINTS = {
  NOTICES: {
    BASE: "/api/notices",
    RECENT: "/api/notices/recent",
    ACTIVE: "/api/notices/active",
    SEARCH: "/api/notices/search",
    BY_SOURCE: "/api/notices/source",
    BY_RANGE: "/api/notices/range",
    RECOMMEND: "/api/notices/recommend",
    CATEGORIES: "/api/notices/categories",
    BY_CATEGORY: "/api/notices/category",
  },
  EVENTS: {
    BASE: "/api/events",
  },
};
