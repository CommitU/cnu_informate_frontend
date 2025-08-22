import React, { useCallback, useEffect, useState } from "react";
import { Alert, RefreshControl, ScrollView, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

import { noticeApiService } from "../../shared/services/api";
import { NavigationProps, Notice } from "../../shared/types";
import { useInterestStore } from "../../stores/interestStore";
import {
  ErrorState,
  InterestSummaryCard,
  LoadingState,
  NoticeSection,
} from "./components";

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
      >
        <View className="mx-5">
          {/* 기본 정보 (항상 표시) */}

          {/* 로딩 상태 */}
          {loadingState === "loading" && <LoadingState />}

          {/* 에러 상태 */}
          {loadingState === "error" && (
            <>
              <InterestSummaryCard
                selectedInterests={getSelectedInterestNames()}
              />
              <ErrorState errorMessage={errorMessage} onRetry={loadNotices} />
            </>
          )}

          {/* 성공 상태 - 공지사항 목록 */}
          {loadingState === "success" && (
            <>
              <InterestSummaryCard
                selectedInterests={getSelectedInterestNames()}
              />
              <NoticeSection
                notices={notices}
                selectedInterestsCount={getSelectedInterestNames().length}
                onNoticePress={handleNoticePress}
              />
            </>
          )}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}
