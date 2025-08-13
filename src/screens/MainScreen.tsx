import React from "react";
import { RefreshControl, ScrollView, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

import { NoticeCard } from "../components";
import { ScreenHeader } from "../components/common";
import { Notice } from "../types";

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
        <ScreenHeader title="홈" subtitle="추천 공지사항을 확인하세요" />

        <View className="px-5">
          {notices.map((notice) => (
            <NoticeCard
              key={notice.id}
              notice={notice}
              onPress={handleNoticePress}
            />
          ))}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}
