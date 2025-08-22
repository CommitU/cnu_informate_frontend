import { NavigationProp, RouteProp } from "@react-navigation/native";

// 공지사항 타입 (API 스펙 기반)
export interface Notice {
  id: number;
  sourceId: number;
  externalId?: string;
  url: string;
  title: string;
  content: string;
  postedAt?: string;
  scrapedAt: string;
  deadlineAt?: string;
  hash?: string;
}

// 기존 타입과의 호환성을 위한 레거시 타입
export interface LegacyNotice {
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
  id: string | number;
  title: string;
  content: string;
  category?: string;
  type: "notice" | "info";
  // 공지사항 관련 필드
  created_at?: string;
  postedAt?: string;
  scrapedAt?: string;
  deadlineAt?: string;
  url?: string;
  // 정보 아이템 관련 필드
  date?: string;
  startDate?: string;
  endDate?: string;
  amount?: number;
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
export interface NavigationProps<
  T extends keyof RootStackParamList = keyof RootStackParamList,
> {
  navigation: NavigationProp<RootStackParamList, T>;
  route?: RouteProp<RootStackParamList, T>;
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
