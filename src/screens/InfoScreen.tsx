import React, { useState } from "react";
import {
  RefreshControl,
  ScrollView,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

// 정보 타입 정의
interface InfoItem {
  id: string;
  title: string;
  content: string;
  category: string;
  date?: string;
  startDate?: string;
  endDate?: string;
  amount?: number;
}

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

type Category = "학사일정" | "장학금" | "공지사항";

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

  const formatAmount = (amount?: number) => {
    if (!amount) return "";
    return `${amount.toLocaleString()}원`;
  };

  const formatDate = (date?: string) => {
    if (!date) return "";
    return new Date(date).toLocaleDateString("ko-KR");
  };

  const formatDateRange = (startDate?: string, endDate?: string) => {
    if (!startDate || !endDate) return "";
    return `${formatDate(startDate)} ~ ${formatDate(endDate)}`;
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
        <View className="px-5 mb-6">
          <Text className="text-3xl font-bold text-gray-900 mb-2">
            정보 확인
          </Text>
          <Text className="text-lg text-gray-600">
            학사 정보 및 공지사항을 확인하세요
          </Text>
        </View>

        {/* 카테고리 탭 */}
        <View className="px-5 mb-6">
          <View className="flex-row bg-white rounded-2xl p-1 shadow-sm">
            {categories.map((category) => (
              <TouchableOpacity
                key={category.key}
                className={`flex-1 items-center py-3 px-2 rounded-xl ${
                  selectedCategory === category.key ? "bg-blue-500" : ""
                }`}
                onPress={() => setSelectedCategory(category.key)}
              >
                <Text className="text-lg mb-1">{category.icon}</Text>
                <Text
                  className={`text-xs font-semibold ${
                    selectedCategory === category.key
                      ? "text-white"
                      : "text-gray-600"
                  }`}
                >
                  {category.label}
                </Text>
              </TouchableOpacity>
            ))}
          </View>
        </View>

        <View className="px-5">
          {getDataByCategory(selectedCategory).map((item) => (
            <TouchableOpacity
              key={item.id}
              className="bg-white rounded-2xl p-5 mb-4 shadow-sm"
              style={{
                shadowColor: "#000",
                shadowOffset: { width: 0, height: 2 },
                shadowOpacity: 0.1,
                shadowRadius: 8,
                elevation: 3,
              }}
              onPress={() => handleItemPress(item)}
              activeOpacity={0.8}
            >
              <View className="flex-row justify-between items-start mb-3">
                <Text
                  className="text-lg font-bold text-gray-900 flex-1 leading-6"
                  numberOfLines={2}
                >
                  {item.title}
                </Text>
                {item.amount && (
                  <View className="bg-orange-500 px-3 py-1.5 rounded-full ml-3">
                    <Text className="text-white text-xs font-semibold">
                      {formatAmount(item.amount)}
                    </Text>
                  </View>
                )}
              </View>

              <Text
                className="text-sm text-gray-600 leading-5 mb-4"
                numberOfLines={3}
              >
                {item.content}
              </Text>

              <View className="flex-row justify-between items-center">
                <View className="flex-1">
                  {item.date ? (
                    <Text className="text-xs text-gray-500 font-medium">
                      {formatDate(item.date)}
                    </Text>
                  ) : item.startDate && item.endDate ? (
                    <Text className="text-xs text-gray-500 font-medium">
                      {formatDateRange(item.startDate, item.endDate)}
                    </Text>
                  ) : null}
                </View>
                <View className="flex-row items-center">
                  <Text className="text-xs text-blue-500 font-semibold mr-1">
                    자세히 보기
                  </Text>
                  <Text className="text-xs text-blue-500">→</Text>
                </View>
              </View>
            </TouchableOpacity>
          ))}
        </View>

        {getDataByCategory(selectedCategory).length === 0 && (
          <View className="flex-1 justify-center items-center p-10">
            <Text className="text-xl font-bold text-gray-600 text-center mb-3">
              {selectedCategory} 정보가 없습니다
            </Text>
            <Text className="text-base text-gray-500 text-center leading-6">
              나중에 다시 확인해주세요
            </Text>
          </View>
        )}
      </ScrollView>
    </SafeAreaView>
  );
}
