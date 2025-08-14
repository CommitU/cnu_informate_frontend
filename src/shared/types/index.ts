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

// 카테고리 타입
export type Category =
  | "전체"
  | "특강"
  | "기획/마케팅"
  | "취업/인턴십"
  | "봉사 활동"
  | "IT/SW"
  | "스터디"
  | "디자인"
  | "창업"
  | "영상/콘텐츠"
  | "서포터즈/기자단";

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
  NoticeDetail: { notice: Notice };
  InfoItemDetail: { item: InfoItem };
};

export type MainStackParamList = {
  MainScreen: undefined;
  NoticeDetail: { notice: Notice };
};

export type InfoStackParamList = {
  InfoScreen: undefined;
  InfoItemDetail: { item: InfoItem };
};
