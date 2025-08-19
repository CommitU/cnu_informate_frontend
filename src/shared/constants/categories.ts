// 카테고리 상수 정의
export const CATEGORIES = {
  SPECIAL_LECTURE: "특강",
  PLANNING_MARKETING: "기획/마케팅",
  EMPLOYMENT_INTERNSHIP: "취업/인턴십",
  VOLUNTEER: "봉사 활동",
  IT_SW: "IT/SW",
  STUDY: "스터디",
  DESIGN: "디자인",
  STARTUP: "창업",
  VIDEO_CONTENT: "영상/콘텐츠",
  SUPPORTERS_REPORTERS: "서포터즈/기자단",
  ACADEMIC_GUIDE: "학사안내",
  ETC: "기타",
} as const;

// 카테고리 타입 정의
export type Category = (typeof CATEGORIES)[keyof typeof CATEGORIES];

// 모든 카테고리 배열
export const ALL_CATEGORIES: Category[] = [
  CATEGORIES.SPECIAL_LECTURE,
  CATEGORIES.PLANNING_MARKETING,
  CATEGORIES.EMPLOYMENT_INTERNSHIP,
  CATEGORIES.VOLUNTEER,
  CATEGORIES.IT_SW,
  CATEGORIES.STUDY,
  CATEGORIES.DESIGN,
  CATEGORIES.STARTUP,
  CATEGORIES.VIDEO_CONTENT,
  CATEGORIES.SUPPORTERS_REPORTERS,
  CATEGORIES.ACADEMIC_GUIDE,
  CATEGORIES.ETC,
];

// 카테고리별 색상 매핑
export const CATEGORY_COLORS: Record<Category, string> = {
  [CATEGORIES.SPECIAL_LECTURE]: "#FF3B30", // 빨간색
  [CATEGORIES.PLANNING_MARKETING]: "#FF2D92", // 분홍색
  [CATEGORIES.EMPLOYMENT_INTERNSHIP]: "#34C759", // 초록색
  [CATEGORIES.VOLUNTEER]: "#FF9500", // 주황색
  [CATEGORIES.IT_SW]: "#AF52DE", // 보라색
  [CATEGORIES.STUDY]: "#5AC8FA", // 하늘색
  [CATEGORIES.DESIGN]: "#FF6B35", // 주황빨강
  [CATEGORIES.STARTUP]: "#007AFF", // 파란색
  [CATEGORIES.VIDEO_CONTENT]: "#FF6B6B", // 연한 빨강
  [CATEGORIES.SUPPORTERS_REPORTERS]: "#4ECDC4", // 청록색
  [CATEGORIES.ACADEMIC_GUIDE]: "#45B7D1", // 진한 하늘색
  [CATEGORIES.ETC]: "#8E8E93", // 회색
};

// 카테고리별 아이콘 매핑 (선택사항)
export const CATEGORY_ICONS: Record<Category, string> = {
  [CATEGORIES.SPECIAL_LECTURE]: "🎓",
  [CATEGORIES.PLANNING_MARKETING]: "📊",
  [CATEGORIES.EMPLOYMENT_INTERNSHIP]: "💼",
  [CATEGORIES.VOLUNTEER]: "🤝",
  [CATEGORIES.IT_SW]: "💻",
  [CATEGORIES.STUDY]: "📚",
  [CATEGORIES.DESIGN]: "🎨",
  [CATEGORIES.STARTUP]: "🚀",
  [CATEGORIES.VIDEO_CONTENT]: "🎬",
  [CATEGORIES.SUPPORTERS_REPORTERS]: "📝",
  [CATEGORIES.ACADEMIC_GUIDE]: "📋",
  [CATEGORIES.ETC]: "📌",
};

// 카테고리 색상 가져오기 함수
export const getCategoryColor = (category: string): string => {
  return (
    CATEGORY_COLORS[category as Category] || CATEGORY_COLORS[CATEGORIES.ETC]
  );
};

// 카테고리 아이콘 가져오기 함수
export const getCategoryIcon = (category: string): string => {
  return CATEGORY_ICONS[category as Category] || CATEGORY_ICONS[CATEGORIES.ETC];
};

// 카테고리 유효성 검사 함수
export const isValidCategory = (category: string): category is Category => {
  return ALL_CATEGORIES.includes(category as Category);
};
