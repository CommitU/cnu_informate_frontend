// 공지사항 타입
export interface Notice {
  id: string;
  title: string;
  content: string;
  category: string;
  importance: number;
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

// 카테고리 타입
export type Category = "학사일정" | "장학금" | "공지사항";

// 네비게이션 타입
export interface NavigationProps {
  navigation: any;
  route?: any;
}
