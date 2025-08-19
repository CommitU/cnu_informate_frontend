import { getCategoryColor } from "../constants/categories";

// 카테고리별 색상 매핑 (constants/categories.ts로 이동)
export { getCategoryColor };

// 날짜 포맷팅
export const formatDate = (date?: string): string => {
  if (!date) return "";
  return new Date(date).toLocaleDateString("ko-KR");
};

// 날짜 범위 포맷팅
export const formatDateRange = (
  startDate?: string,
  endDate?: string
): string => {
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
