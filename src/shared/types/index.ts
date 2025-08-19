// 공지사항 타입
export interface Notice {
  id: string;
  title: string;
  content: string;
  category: string;
  created_at: string;
  url?: string;
}

// 정보 아이템 타입
export interface InfoItem {
  id: string;
  title: string;
  content: string;
  category: string;
  date?: string;
  startDate?: string;
  endDate?: string;
  amount?: number;
  url?: string;
}

// 통합 상세 아이템 타입
export interface DetailItem {
  id: string;
  title: string;
  content: string;
  category: string;
  type: "notice" | "info";
  // 공지사항 관련 필드
  created_at?: string;
  // 정보 아이템 관련 필드
  date?: string;
  startDate?: string;
  endDate?: string;
  amount?: number;
  // 공통 필드
  url?: string;
}

// 사용자 타입
export interface User {
  id: string;
  email: string;
  name: string;
  studentId?: string;
}

// 관심 분야 타입
export interface Interest {
  id: string;
  name: string;
  selected: boolean;
}

// 설정 아이템 타입
export interface SettingItem {
  id: string;
  title: string;
  subtitle?: string;
  type: "toggle" | "button" | "link";
  value?: boolean;
  onPress?: () => void;
  onToggle?: (value: boolean) => void;
}

// 설정 섹션 타입
export interface SettingSection {
  id: string;
  title: string;
  items: SettingItem[];
}

// 카테고리 타입 (constants/categories.ts에서 import)
export type { Category } from "../constants/categories";

// 네비게이션 타입
export interface NavigationProps {
  navigation: any;
  route?: any;
}

// 스택 네비게이션 파라미터 타입
export type RootStackParamList = {
  Main: undefined;
  Calendar: undefined;
  Info: undefined;
  Settings: undefined;
  Detail: { item: DetailItem };
};

export type MainStackParamList = {
  MainScreen: undefined;
  Detail: { item: DetailItem };
};

export type InfoStackParamList = {
  InfoScreen: undefined;
  Detail: { item: DetailItem };
};
