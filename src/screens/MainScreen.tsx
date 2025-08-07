import React from "react";
import {
  RefreshControl,
  ScrollView,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

// 공지사항 타입 정의
interface Notice {
  id: string;
  title: string;
  content: string;
  category: string;
  importance: number;
  created_at: string;
  url?: string;
}

// 임시 데이터 (나중에 API로 교체)
const mockNotices: Notice[] = [
  {
    id: "1",
    title: "2024학년도 2학기 수강신청 안내",
    content:
      "2024학년도 2학기 수강신청이 시작됩니다. 수강신청 기간과 방법을 확인하세요.",
    category: "학사/수업",
    importance: 5,
    created_at: "2024-01-15",
  },
  {
    id: "2",
    title: "2024년 국가장학금 신청 안내",
    content:
      "2024년 국가장학금 신청이 시작됩니다. 지원 자격과 신청 방법을 확인하세요.",
    category: "장학금",
    importance: 4,
    created_at: "2024-01-14",
  },
  {
    id: "3",
    title: "IT 취업 특강 안내",
    content:
      "IT 업계 전문가를 초빙한 취업 특강이 개최됩니다. 많은 참여 바랍니다.",
    category: "취업/인턴십",
    importance: 3,
    created_at: "2024-01-13",
  },
  {
    id: "4",
    title: "2024년 동아리 신규 모집",
    content:
      "2024년 새로운 동아리 모집이 시작됩니다. 관심 있는 학생들의 많은 참여 바랍니다.",
    category: "동아리/모임",
    importance: 2,
    created_at: "2024-01-12",
  },
];

export default function MainScreen() {
  const [refreshing, setRefreshing] = React.useState(false);
  const [notices, setNotices] = React.useState<Notice[]>(mockNotices);

  const onRefresh = React.useCallback(() => {
    setRefreshing(true);
    // TODO: API 호출로 실제 데이터 가져오기
    setTimeout(() => {
      setRefreshing(false);
    }, 1000);
  }, []);

  const getCategoryColor = (category: string) => {
    const colors: { [key: string]: string } = {
      "학사/수업": "#007AFF",
      장학금: "#FF9500",
      "취업/인턴십": "#34C759",
      "IT/개발": "#AF52DE",
      "특강/세미나": "#FF3B30",
      "마케팅/홍보": "#FF2D92",
      "동아리/모임": "#5AC8FA",
      기타: "#8E8E93",
    };
    return colors[category] || "#8E8E93";
  };

  const getImportanceStars = (importance: number) => {
    return "★".repeat(importance) + "☆".repeat(5 - importance);
  };

  const handleNoticePress = (notice: Notice) => {
    // TODO: 공지 상세 페이지로 이동
    console.log("공지 클릭:", notice.title);
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
            안녕하세요 👋
          </Text>
          <Text className="text-lg text-gray-600">
            오늘의 추천 공지사항을 확인해보세요
          </Text>
        </View>

        <View className="px-5">
          {notices.map((notice) => (
            <TouchableOpacity
              key={notice.id}
              className="bg-white rounded-2xl p-5 mb-4 shadow-sm"
              style={{
                shadowColor: "#000",
                shadowOffset: { width: 0, height: 2 },
                shadowOpacity: 0.1,
                shadowRadius: 8,
                elevation: 3,
              }}
              onPress={() => handleNoticePress(notice)}
              activeOpacity={0.8}
            >
              <View className="flex-row justify-between items-start mb-3">
                <View className="flex-1">
                  <View
                    className="px-3 py-1.5 rounded-full self-start"
                    style={{
                      backgroundColor: getCategoryColor(notice.category),
                    }}
                  >
                    <Text className="text-white text-xs font-semibold">
                      {notice.category}
                    </Text>
                  </View>
                </View>
                <View className="ml-3">
                  <Text className="text-sm text-yellow-500 font-medium">
                    {getImportanceStars(notice.importance)}
                  </Text>
                </View>
              </View>

              <Text
                className="text-lg font-bold text-gray-900 mb-3 leading-6"
                numberOfLines={2}
              >
                {notice.title}
              </Text>

              <Text
                className="text-sm text-gray-600 leading-5 mb-4"
                numberOfLines={3}
              >
                {notice.content}
              </Text>

              <View className="flex-row justify-between items-center">
                <Text className="text-xs text-gray-500 font-medium">
                  {notice.created_at}
                </Text>
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

        {notices.length === 0 && (
          <View className="flex-1 justify-center items-center p-10">
            <Text className="text-xl font-bold text-gray-600 text-center mb-3">
              추천할 공지사항이 없습니다
            </Text>
            <Text className="text-base text-gray-500 text-center leading-6">
              관심 분야를 설정하거나 나중에 다시 시도해주세요
            </Text>
          </View>
        )}
      </ScrollView>
    </SafeAreaView>
  );
}
