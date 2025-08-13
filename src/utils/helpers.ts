import { Notice } from '../types';

// 카테고리별 색상 매핑
export const getCategoryColor = (category: string): string => {
  const colors: { [key: string]: string } = {
    "학사/수업": "#007AFF",
    "장학금": "#FF9500",
    "취업/인턴십": "#34C759",
    "IT/개발": "#AF52DE",
    "특강/세미나": "#FF3B30",
    "마케팅/홍보": "#FF2D92",
    "동아리/모임": "#5AC8FA",
    "기타": "#8E8E93",
  };
  return colors[category] || "#8E8E93";
};

// 중요도별 별점 생성
export const getImportanceStars = (importance: number): string => {
  return "★".repeat(importance) + "☆".repeat(5 - importance);
};

// 날짜 포맷팅
export const formatDate = (date?: string): string => {
  if (!date) return "";
  return new Date(date).toLocaleDateString("ko-KR");
};

// 날짜 범위 포맷팅
export const formatDateRange = (startDate?: string, endDate?: string): string => {
  if (!startDate || !endDate) return "";
  return `${formatDate(startDate)} ~ ${formatDate(endDate)}`;
};

// 금액 포맷팅
export const formatAmount = (amount?: number): string => {
  if (!amount) return "";
  return `${amount.toLocaleString()}원`;
};

// 이메일 유효성 검사
export const isValidEmail = (email: string): boolean => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
};

// 비밀번호 유효성 검사
export const isValidPassword = (password: string): boolean => {
  return password.length >= 6;
};
