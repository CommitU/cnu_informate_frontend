import React, { useCallback, useEffect, useState } from "react";
import {
  ActivityIndicator,
  Alert,
  RefreshControl,
  ScrollView,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

import { ScreenHeader } from "../../shared/components";
import { noticeApiService } from "../../shared/services/api";
import { NavigationProps, Notice } from "../../shared/types";
import { useInterestStore } from "../../stores/interestStore";
import { NoticeCard } from "./components";

// 로딩 상태 타입
type LoadingState = "idle" | "loading" | "success" | "error";

export default function MainScreen({ navigation }: NavigationProps<"Main">) {
  const { interests, getSelectedInterestNames } = useInterestStore();
  const [refreshing, setRefreshing] = useState(false);
  const [notices, setNotices] = useState<Notice[]>([]);
  const [loadingState, setLoadingState] = useState<LoadingState>("idle");
  const [errorMessage, setErrorMessage] = useState<string>("");

  // 공지사항 데이터 로드
  const loadNotices = useCallback(async () => {
    try {
      setLoadingState("loading");
      setErrorMessage("");

      // 선택된 관심분야 가져오기
      const selectedInterests = getSelectedInterestNames();

      if (selectedInterests.length === 0) {
        // 관심분야가 선택되지 않은 경우 최근 공지사항 5개 로드
        const recentNotices = await noticeApiService.getRecentNotices();
        setNotices(recentNotices.slice(0, 5));
      } else {
        // 관심분야 기반 추천 공지사항 5개 로드
        const recommendedNotices = await noticeApiService.getRecommendedNotices(
          selectedInterests,
          5
        );
        setNotices(recommendedNotices);
      }

      setLoadingState("success");
    } catch (error: any) {
      console.error("공지사항 로드 실패:", error);
      setErrorMessage(error.message || "공지사항을 불러오는데 실패했습니다.");
      setLoadingState("error");

      // 사용자에게 에러 알림
      Alert.alert(
        "오류",
        error.message || "공지사항을 불러오는데 실패했습니다.",
        [{ text: "확인" }]
      );
    }
  }, [getSelectedInterestNames]);

  // 컴포넌트 마운트 시 데이터 로드
  useEffect(() => {
    loadNotices();
  }, [loadNotices]);

  // 관심분야 변경 시 자동 새로고침
  useEffect(() => {
    loadNotices();
  }, [interests, loadNotices]);

  // 새로고침 처리
  const onRefresh = useCallback(async () => {
    setRefreshing(true);
    try {
      await loadNotices();
    } finally {
      setRefreshing(false);
    }
  }, [loadNotices]);

  // 공지사항 클릭 처리
  const handleNoticePress = useCallback(
    (notice: Notice) => {
      const detailItem = {
        id: notice.id,
        title: notice.title,
        content: notice.content,
        type: "notice" as const,
        url: notice.url,
        postedAt: notice.postedAt,
        scrapedAt: notice.scrapedAt,
        deadlineAt: notice.deadlineAt,
      };
      navigation.navigate("Detail", { item: detailItem });
    },
    [navigation]
  );

  // 에러 상태 UI
  const renderErrorState = () => (
    <View className="mx-5 bg-red-50 border border-red-200 rounded-2xl p-6">
      <Text className="text-red-600 text-center font-medium mb-2">
        데이터를 불러올 수 없습니다
      </Text>
      <Text className="text-red-500 text-center text-sm mb-4">
        {errorMessage}
      </Text>
      <TouchableOpacity
        className="bg-red-500 rounded-lg py-3 px-6"
        onPress={loadNotices}
      >
        <Text className="text-white text-center font-semibold">다시 시도</Text>
      </TouchableOpacity>
    </View>
  );

  // 로딩 상태 UI
  const renderLoadingState = () => (
    <View className="mx-5 bg-white rounded-2xl p-8 shadow-sm">
      <View className="items-center">
        <ActivityIndicator size="large" color="#007AFF" />
        <Text className="text-gray-600 mt-4 text-center">
          맞춤형 공지사항을 불러오는 중...
        </Text>
      </View>
    </View>
  );

  // 빈 상태 UI
  const renderEmptyState = () => (
    <View className="mx-5 bg-gray-50 border border-gray-200 rounded-2xl p-8">
      <Text className="text-gray-500 text-center font-medium mb-2">
        추천 공지사항이 없습니다
      </Text>
      <Text className="text-gray-400 text-center text-sm">
        설정에서 관심분야를 선택하면 맞춤형 공지사항을 받을 수 있습니다
      </Text>
    </View>
  );

  return (
    <SafeAreaView
      className="flex-1 bg-gray-50"
      edges={["top", "left", "right"]}
    >
      <ScrollView
        className="flex-1"
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }
        contentContainerStyle={{ paddingTop: 10 }}
      >
        <ScreenHeader title="홈" subtitle="맞춤형 공지사항을 확인하세요" />

        <View className="px-5">
          {/* 로딩 상태 */}
          {loadingState === "loading" && renderLoadingState()}

          {/* 에러 상태 */}
          {loadingState === "error" && renderErrorState()}

          {/* 성공 상태 - 공지사항 목록 */}
          {loadingState === "success" && (
            <>
              {notices.length > 0
                ? notices.map((notice) => (
                    <NoticeCard
                      key={notice.id}
                      notice={notice}
                      onPress={handleNoticePress}
                    />
                  ))
                : renderEmptyState()}
            </>
          )}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}
