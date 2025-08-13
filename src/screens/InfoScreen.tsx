import React, { useState } from "react";
import { RefreshControl, ScrollView, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

import { CategoryTab, InfoItemCard } from "../components";
import { ScreenHeader } from "../components/common";
import { Category, InfoItem } from "../types";

// 임시 데이터
const mockAcademicSchedule: InfoItem[] = [
  {
    id: "1",
    title: "2024학년도 2학기 수강신청",
    content: "2학기 수강신청 기간입니다.",
    category: "학사일정",
    startDate: "2024-02-15",
    endDate: "2024-02-20",
  },
  {
    id: "2",
    title: "2024학년도 1학기 종강",
    content: "1학기 종강일입니다.",
    category: "학사일정",
    date: "2024-06-20",
  },
];

const mockScholarships: InfoItem[] = [
  {
    id: "1",
    title: "2024년 국가장학금 신청",
    content: "국가장학금 신청이 시작됩니다.",
    category: "장학금",
    amount: 675000,
    startDate: "2024-01-15",
    endDate: "2024-02-15",
  },
  {
    id: "2",
    title: "교내 성적우수장학금",
    content: "교내 성적우수장학금 신청 안내입니다.",
    category: "장학금",
    amount: 500000,
    startDate: "2024-01-20",
    endDate: "2024-02-20",
  },
];

const mockNotices: InfoItem[] = [
  {
    id: "1",
    title: "2024년 동아리 신규 모집",
    content: "새로운 동아리 모집이 시작됩니다.",
    category: "공지사항",
    date: "2024-01-15",
  },
  {
    id: "2",
    title: "도서관 이용 시간 변경",
    content: "도서관 이용 시간이 변경되었습니다.",
    category: "공지사항",
    date: "2024-01-14",
  },
];

export default function InfoScreen() {
  const [selectedCategory, setSelectedCategory] =
    useState<Category>("학사일정");
  const [refreshing, setRefreshing] = useState(false);

  const categories: { key: Category; label: string; icon: string }[] = [
    { key: "학사일정", label: "학사일정", icon: "📅" },
    { key: "장학금", label: "장학금", icon: "💰" },
    { key: "공지사항", label: "공지사항", icon: "📢" },
  ];

  const getDataByCategory = (category: Category): InfoItem[] => {
    switch (category) {
      case "학사일정":
        return mockAcademicSchedule;
      case "장학금":
        return mockScholarships;
      case "공지사항":
        return mockNotices;
      default:
        return [];
    }
  };

  const onRefresh = React.useCallback(() => {
    setRefreshing(true);
    // TODO: API 호출로 실제 데이터 가져오기
    setTimeout(() => {
      setRefreshing(false);
    }, 1000);
  }, []);

  const handleItemPress = (item: InfoItem) => {
    // TODO: 상세 페이지로 이동
    console.log("항목 클릭:", item.title);
  };

  return (
    <SafeAreaView className="flex-1 bg-gray-50">
      <ScrollView
        className="flex-1"
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }
        contentContainerStyle={{ paddingTop: 20 }}
      >
        <ScreenHeader
          title="정보 확인"
          subtitle="학사 정보 및 공지사항을 확인하세요"
        />

        <CategoryTab
          categories={categories}
          selectedCategory={selectedCategory}
          onCategoryChange={setSelectedCategory}
        />

        <View className="px-5">
          {getDataByCategory(selectedCategory).map((item) => (
            <InfoItemCard key={item.id} item={item} onPress={handleItemPress} />
          ))}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}
