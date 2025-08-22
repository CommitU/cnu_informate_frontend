import axios, { AxiosInstance, AxiosResponse } from "axios";
import { API_CONFIG, API_ENDPOINTS } from "../constants/config";
import { Notice } from "../types";

// API 응답 타입
interface ApiResponse<T> {
  data: T;
  message?: string;
  success: boolean;
}

// API 에러 타입
interface ApiError {
  message: string;
  status: number;
  code?: string;
}

// 공지사항 API 서비스 클래스
export class NoticeApiService {
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
          `🚀 API Request: ${config.method?.toUpperCase()} ${config.url}`
        );
        return config;
      },
      (error) => {
        console.error("❌ API Request Error:", error);
        return Promise.reject(error);
      }
    );

    // 응답 인터셉터
    this.api.interceptors.response.use(
      (response: AxiosResponse) => {
        console.log(
          `✅ API Response: ${response.status} ${response.config.url}`
        );
        return response;
      },
      (error) => {
        console.error(
          "❌ API Response Error:",
          error.response?.data || error.message
        );
        return Promise.reject(this.handleApiError(error));
      }
    );
  }

  // 에러 처리
  private handleApiError(error: any): ApiError {
    if (error.response) {
      return {
        message: error.response.data?.message || "서버 오류가 발생했습니다.",
        status: error.response.status,
        code: error.response.data?.code,
      };
    } else if (error.request) {
      return {
        message: "네트워크 연결을 확인해주세요.",
        status: 0,
        code: "NETWORK_ERROR",
      };
    } else {
      return {
        message: error.message || "알 수 없는 오류가 발생했습니다.",
        status: 0,
        code: "UNKNOWN_ERROR",
      };
    }
  }

  // 모든 공지사항 조회
  async getAllNotices(): Promise<Notice[]> {
    try {
      const response = await this.api.get<Notice[]>(API_ENDPOINTS.NOTICES.BASE);
      return response.data;
    } catch (error) {
      throw this.handleApiError(error);
    }
  }

  // 특정 공지사항 조회
  async getNoticeById(id: number): Promise<Notice> {
    try {
      const response = await this.api.get<Notice>(
        `${API_ENDPOINTS.NOTICES.BASE}/${id}`
      );
      return response.data;
    } catch (error) {
      throw this.handleApiError(error);
    }
  }

  // 소스별 공지사항 조회
  async getNoticesBySource(sourceId: number): Promise<Notice[]> {
    try {
      const response = await this.api.get<Notice[]>(
        `${API_ENDPOINTS.NOTICES.BY_SOURCE}/${sourceId}`
      );
      return response.data;
    } catch (error) {
      throw this.handleApiError(error);
    }
  }

  // 제목으로 공지사항 검색
  async searchNoticesByTitle(title: string): Promise<Notice[]> {
    try {
      const response = await this.api.get<Notice[]>(
        `${API_ENDPOINTS.NOTICES.SEARCH}?title=${encodeURIComponent(title)}`
      );
      return response.data;
    } catch (error) {
      throw this.handleApiError(error);
    }
  }

  // 활성 공지사항 조회 (마감일 지나지 않은 것)
  async getActiveNotices(): Promise<Notice[]> {
    try {
      const response = await this.api.get<Notice[]>(
        API_ENDPOINTS.NOTICES.ACTIVE
      );
      return response.data;
    } catch (error) {
      throw this.handleApiError(error);
    }
  }

  // 최근 공지사항 조회 (최근 10개)
  async getRecentNotices(): Promise<Notice[]> {
    try {
      const response = await this.api.get<Notice[]>(
        API_ENDPOINTS.NOTICES.RECENT
      );
      return response.data;
    } catch (error) {
      throw this.handleApiError(error);
    }
  }

  // 기간별 공지사항 조회
  async getNoticesByDateRange(
    startDate: string,
    endDate: string
  ): Promise<Notice[]> {
    try {
      const response = await this.api.get<Notice[]>(
        `${API_ENDPOINTS.NOTICES.BY_RANGE}?startDate=${startDate}&endDate=${endDate}`
      );
      return response.data;
    } catch (error) {
      throw this.handleApiError(error);
    }
  }

  // 관심분야 기반 추천 공지사항 조회
  async getRecommendedNotices(
    interests: string[],
    limit: number = 5
  ): Promise<Notice[]> {
    try {
      const interestsParam = interests.join(",");
      const response = await this.api.get<Notice[]>(
        `${API_ENDPOINTS.NOTICES.RECOMMEND}?interests=${encodeURIComponent(interestsParam)}&limit=${limit}`
      );
      return response.data;
    } catch (error) {
      throw this.handleApiError(error);
    }
  }

  // 카테고리 목록 조회
  async getNoticeCategories(): Promise<{
    [key: string]: { sourceId: number; name: string; count: number };
  }> {
    try {
      const response = await this.api.get(API_ENDPOINTS.NOTICES.CATEGORIES);
      return response.data;
    } catch (error) {
      throw this.handleApiError(error);
    }
  }

  // 카테고리별 공지사항 조회
  async getNoticesByCategory(categoryId: number): Promise<Notice[]> {
    try {
      const response = await this.api.get<Notice[]>(
        `${API_ENDPOINTS.NOTICES.BY_CATEGORY}/${categoryId}`
      );
      return response.data;
    } catch (error) {
      throw this.handleApiError(error);
    }
  }

  // 공지사항 생성
  async createNotice(noticeData: Partial<Notice>): Promise<Notice> {
    try {
      const response = await this.api.post<Notice>(
        API_ENDPOINTS.NOTICES.BASE,
        noticeData
      );
      return response.data;
    } catch (error) {
      throw this.handleApiError(error);
    }
  }

  // 공지사항 수정
  async updateNotice(id: number, noticeData: Partial<Notice>): Promise<Notice> {
    try {
      const response = await this.api.put<Notice>(
        `${API_ENDPOINTS.NOTICES.BASE}/${id}`,
        noticeData
      );
      return response.data;
    } catch (error) {
      throw this.handleApiError(error);
    }
  }

  // 공지사항 삭제
  async deleteNotice(id: number): Promise<void> {
    try {
      await this.api.delete(`${API_ENDPOINTS.NOTICES.BASE}/${id}`);
    } catch (error) {
      throw this.handleApiError(error);
    }
  }
}

// 싱글톤 인스턴스 생성
export const noticeApiService = new NoticeApiService();
