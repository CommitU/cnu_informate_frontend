import axios, { AxiosInstance } from "axios";
import { API_CONFIG } from "../constants/config";

export interface ApiEvent {
  id: number;
  title: string;
  date: string;
  allDay: boolean;
  user: {
    id: number;
    email?: string;
    name?: string;
  };
  notice?: {
    id: number;
    title: string;
    url?: string;
  } | null;
  description?: string | null;
  location?: string | null;
  category?: string | null;
}

export interface CreateEventRequest {
  userId: number;
  noticeId?: number;
  title: string;
  date: string;
}

export interface CreateFromNoticeRequest {
  userId: number;
  noticeId: number;
  date: string;
  title?: string; // 사용자 입력 제목 (선택)
}

export class EventsApiService {
  private api: AxiosInstance;

  constructor() {
    this.api = axios.create({
      baseURL: API_CONFIG.BASE_URL,
      timeout: API_CONFIG.TIMEOUT,
      headers: {
        "Content-Type": "application/json",
      },
    });

    // 요청 인터셉터
    this.api.interceptors.request.use(
      (config) => {
        console.log(
          `🚀 Events API Request: ${config.method?.toUpperCase()} ${config.url}`
        );
        if (config.data) {
          console.log("📤 Request Body:", JSON.stringify(config.data, null, 2));
        }
        return config;
      },
      (error) => {
        console.error("❌ Events API Request Error:", error);
        return Promise.reject(error);
      }
    );

    // 응답 인터셉터
    this.api.interceptors.response.use(
      (response) => {
        console.log(
          `✅ Events API Response: ${response.status} ${response.config.url}`
        );
        return response;
      },
      (error) => {
        console.error(
          "❌ Events API Response Error:",
          error.response?.data || error.message
        );
        return Promise.reject(error);
      }
    );
  }

  // 일정 생성
  async createEvent(data: CreateEventRequest): Promise<ApiEvent> {
    const response = await this.api.post("/api/events", data);
    return response.data;
  }

  // 공지사항으로부터 일정 생성
  async createFromNotice(params: CreateFromNoticeRequest): Promise<ApiEvent> {
    const { userId, noticeId, date, title } = params;
    const data = {
      userId,
      noticeId,
      title: title || "공지사항에서 생성된 일정", // 사용자 입력 제목 또는 기본 제목
      date,
    };

    console.log("🔧 createFromNotice 입력 파라미터:", params);
    console.log("📋 전송할 데이터:", JSON.stringify(data, null, 2));

    const response = await this.api.post("/api/events", data);
    return response.data;
  }

  // 사용자별 일정 조회
  async getUserEvents(userId: number): Promise<ApiEvent[]> {
    const response = await this.api.get(`/api/events?userId=${userId}`);
    return response.data;
  }

  // 기간별 일정 조회 (달력용)
  async getEventsInRange(
    userId: number,
    start: string,
    end: string
  ): Promise<ApiEvent[]> {
    const response = await this.api.get(
      `/api/events/range?userId=${userId}&start=${start}&end=${end}`
    );
    return response.data;
  }

  // 일정 단건 조회
  async getEvent(id: number): Promise<ApiEvent> {
    const response = await this.api.get(`/api/events/${id}`);
    return response.data;
  }

  // 일정 수정
  async updateEvent(
    id: number,
    data: Partial<CreateEventRequest>
  ): Promise<ApiEvent> {
    const response = await this.api.put(`/api/events/${id}`, data);
    return response.data;
  }

  // 일정 삭제
  async deleteEvent(id: number): Promise<void> {
    await this.api.delete(`/api/events/${id}`);
  }

  // 제목으로 일정 검색
  async searchEvents(userId: number, title: string): Promise<ApiEvent[]> {
    const response = await this.api.get(
      `/api/events/search?userId=${userId}&title=${title}`
    );
    return response.data;
  }

  // 카테고리별 일정 조회
  async getEventsByCategory(
    userId: number,
    category: string
  ): Promise<ApiEvent[]> {
    const response = await this.api.get(
      `/api/events/category?userId=${userId}&category=${category}`
    );
    return response.data;
  }

  // Notice 연결된 일정 조회
  async getEventsWithNotice(userId: number): Promise<ApiEvent[]> {
    const response = await this.api.get(
      `/api/events/with-notice?userId=${userId}`
    );
    return response.data;
  }
}

// 싱글톤 인스턴스 생성
export const eventsApiService = new EventsApiService();

// 기존 정적 클래스 호환을 위한 래퍼
export class EventsApi {
  static async createEvent(data: CreateEventRequest): Promise<ApiEvent> {
    return eventsApiService.createEvent(data);
  }

  static async createFromNotice(
    params: CreateFromNoticeRequest
  ): Promise<ApiEvent> {
    return eventsApiService.createFromNotice(params);
  }

  static async getUserEvents(userId: number): Promise<ApiEvent[]> {
    return eventsApiService.getUserEvents(userId);
  }

  static async getEventsInRange(
    userId: number,
    start: string,
    end: string
  ): Promise<ApiEvent[]> {
    return eventsApiService.getEventsInRange(userId, start, end);
  }

  static async getEvent(id: number): Promise<ApiEvent> {
    return eventsApiService.getEvent(id);
  }

  static async updateEvent(
    id: number,
    data: Partial<CreateEventRequest>
  ): Promise<ApiEvent> {
    return eventsApiService.updateEvent(id, data);
  }

  static async deleteEvent(id: number): Promise<void> {
    return eventsApiService.deleteEvent(id);
  }

  static async searchEvents(
    userId: number,
    title: string
  ): Promise<ApiEvent[]> {
    return eventsApiService.searchEvents(userId, title);
  }

  static async getEventsByCategory(
    userId: number,
    category: string
  ): Promise<ApiEvent[]> {
    return eventsApiService.getEventsByCategory(userId, category);
  }

  static async getEventsWithNotice(userId: number): Promise<ApiEvent[]> {
    return eventsApiService.getEventsWithNotice(userId);
  }
}
