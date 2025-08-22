import { Ionicons } from "@expo/vector-icons";
import React, { useCallback, useEffect, useState } from "react";
import {
  ActivityIndicator,
  Alert,
  RefreshControl,
  ScrollView,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

import {
  ALL_CATEGORIES,
  Category,
  getCategoryIdByName,
} from "../../shared/constants/categories";
import { noticeApiService } from "../../shared/services/api";
import { NavigationProps, Notice } from "../../shared/types";
import { CategoryTab, InfoItemCard } from "./components";

// 로딩 상태 타입
type LoadingState = "idle" | "loading" | "success" | "error";

// 카테고리 정보 타입
interface CategoryInfo {
  key: Category | "전체";
  label: string;
  count: number;
  id?: number;
}

export default function InfoScreen({ navigation }: NavigationProps) {
  const [selectedCategory, setSelectedCategory] = useState<Category | "전체">(
    "전체"
  );
  const [refreshing, setRefreshing] = useState(false);
  const [notices, setNotices] = useState<Notice[]>([]);
  const [filteredNotices, setFilteredNotices] = useState<Notice[]>([]);
  const [categories, setCategories] = useState<CategoryInfo[]>([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [loadingState, setLoadingState] = useState<LoadingState>("idle");
  const [errorMessage, setErrorMessage] = useState<string>("");
  const [searchLoading, setSearchLoading] = useState(false);
  const [categoryLoading, setCategoryLoading] = useState(false);

  // 데이터 로드
  const loadData = useCallback(async () => {
    try {
      setLoadingState("loading");
      setErrorMessage("");

      // 카테고리 목록과 공지사항 개수 로드
      const categoryData = await noticeApiService.getNoticeCategories();

      // 카테고리 정보 구성
      const categoryInfos: CategoryInfo[] = [
        {
          key: "전체" as const,
          label: "전체",
          count: Object.values(categoryData).reduce(
            (sum, cat) => sum + cat.count,
            0
          ),
        },
        ...ALL_CATEGORIES.map((category) => {
          const categoryId = getCategoryIdByName(category);
          const categoryInfo = categoryData[categoryId.toString()];
          return {
            key: category,
            label: category,
            count: categoryInfo ? categoryInfo.count : 0,
            id: categoryId,
          };
        }),
      ];

      setCategories(categoryInfos);

      // 전체 공지사항 로드
      const allNotices = await noticeApiService.getAllNotices();
      setNotices(allNotices);
      setFilteredNotices(allNotices);
      setLoadingState("success");
    } catch (error: any) {
      console.error("데이터 로드 실패:", error);
      setErrorMessage(error.message || "데이터를 불러오는데 실패했습니다.");
      setLoadingState("error");

      Alert.alert(
        "오류",
        error.message || "데이터를 불러오는데 실패했습니다.",
        [{ text: "확인" }]
      );
    }
  }, []);

  // 카테고리 변경 시 해당 카테고리의 공지사항만 로드
  const handleCategoryChange = useCallback(
    async (category: Category | "전체") => {
      setSelectedCategory(category);

      try {
        setCategoryLoading(true);

        if (category === "전체") {
          // 전체 공지사항 표시
          setFilteredNotices(notices);
        } else {
          // 선택된 카테고리의 공지사항만 로드
          const categoryId = getCategoryIdByName(category);
          const categoryNotices =
            await noticeApiService.getNoticesByCategory(categoryId);
          setFilteredNotices(categoryNotices);
        }
      } catch (error: any) {
        console.error("카테고리별 공지사항 로드 실패:", error);
        // 에러 발생 시 전체 공지사항에서 필터링
        if (category === "전체") {
          setFilteredNotices(notices);
        } else {
          // 로컬에서 카테고리별 필터링 (fallback)
          setFilteredNotices(notices);
        }
      } finally {
        setCategoryLoading(false);
      }
    },
    [notices]
  );

  // 검색 기능
  const handleSearch = useCallback(
    async (query: string) => {
      setSearchQuery(query);

      if (query.trim() === "") {
        if (selectedCategory === "전체") {
          setFilteredNotices(notices);
        } else {
          // 카테고리별 필터링 적용
          handleCategoryChange(selectedCategory);
        }
      } else {
        try {
          setSearchLoading(true);
          // API를 통한 제목 검색
          const searchResults =
            await noticeApiService.searchNoticesByTitle(query);

          // 선택된 카테고리가 "전체"가 아닌 경우 검색 결과를 카테고리별로 필터링
          if (selectedCategory !== "전체") {
            const categoryId = getCategoryIdByName(selectedCategory);
            const categoryNotices =
              await noticeApiService.getNoticesByCategory(categoryId);
            // 검색 결과와 카테고리 결과의 교집합 찾기
            const searchResultIds = new Set(searchResults.map((n) => n.id));
            const filteredResults = categoryNotices.filter((n) =>
              searchResultIds.has(n.id)
            );
            setFilteredNotices(filteredResults);
          } else {
            setFilteredNotices(searchResults);
          }
        } catch (error: any) {
          console.error("검색 실패:", error);
          // API 검색 실패 시 로컬 필터링으로 fallback
          const filtered = notices.filter(
            (item) =>
              item.title.toLowerCase().includes(query.toLowerCase()) ||
              (item.content &&
                item.content.toLowerCase().includes(query.toLowerCase()))
          );
          setFilteredNotices(filtered);
        } finally {
          setSearchLoading(false);
        }
      }
    },
    [notices, selectedCategory, handleCategoryChange]
  );

  // 컴포넌트 마운트 시 데이터 로드
  useEffect(() => {
    loadData();
  }, [loadData]);

  // 새로고침 처리
  const onRefresh = useCallback(async () => {
    setRefreshing(true);
    try {
      await loadData();
    } finally {
      setRefreshing(false);
    }
  }, [loadData]);

  // 공지사항 클릭 처리
  const handleItemPress = useCallback(
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
        onPress={loadData}
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
          데이터를 불러오는 중...
        </Text>
      </View>
    </View>
  );

  // 빈 상태 UI
  const renderEmptyState = () => (
    <View className="mx-5 bg-gray-50 border border-gray-200 rounded-2xl p-8">
      <Text className="text-gray-500 text-center font-medium mb-2">
        {searchQuery
          ? "검색 결과가 없습니다"
          : selectedCategory === "전체"
            ? "공지사항이 없습니다"
            : `${selectedCategory} 카테고리에 공지사항이 없습니다`}
      </Text>
      <Text className="text-gray-400 text-center text-sm">
        {searchQuery
          ? "다른 검색어를 시도해보세요"
          : "새로운 공지사항이 등록되면 여기에 표시됩니다"}
      </Text>
    </View>
  );

  return (
    <SafeAreaView className="flex-1 bg-white" edges={["top", "left", "right"]}>
      {/* 고정 헤더 영역 */}
      <View className="pt-5">
        {/* 검색창 */}
        <View className="px-4 py-4">
          <View className="flex-row items-center bg-gray-100 rounded-xl px-4 py-3">
            <Ionicons name="search" size={20} color="#6B7280" />
            <TextInput
              className="flex-1 ml-3 text-base text-gray-900"
              placeholder="제목, 내용으로 검색"
              placeholderTextColor="#9CA3AF"
              value={searchQuery}
              onChangeText={handleSearch}
            />
            {searchLoading ? (
              <ActivityIndicator size="small" color="#6B7280" />
            ) : searchQuery.length > 0 ? (
              <TouchableOpacity onPress={() => handleSearch("")}>
                <Ionicons name="close-circle" size={20} color="#6B7280" />
              </TouchableOpacity>
            ) : null}
          </View>
        </View>

        <CategoryTab
          categories={categories}
          selectedCategory={selectedCategory}
          onCategoryChange={handleCategoryChange}
          variant="pills"
        />
      </View>

      {/* 스크롤 가능한 내용 영역 */}
      <ScrollView
        className="flex-1"
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }
      >
        <View className="px-2">
          {/* 로딩 상태 */}
          {loadingState === "loading" && renderLoadingState()}

          {/* 에러 상태 */}
          {loadingState === "error" && renderErrorState()}

          {/* 성공 상태 - 공지사항 목록 */}
          {loadingState === "success" && (
            <>
              {searchLoading || categoryLoading ? (
                <View className="mx-5 bg-white rounded-2xl p-8 shadow-sm">
                  <View className="items-center">
                    <ActivityIndicator size="large" color="#007AFF" />
                    <Text className="text-gray-600 mt-4 text-center">
                      {searchLoading
                        ? "검색 중..."
                        : "카테고리별 공지사항을 불러오는 중..."}
                    </Text>
                  </View>
                </View>
              ) : filteredNotices.length > 0 ? (
                filteredNotices.map((notice) => (
                  <InfoItemCard
                    key={notice.id}
                    notice={notice}
                    onPress={handleItemPress}
                    variant="compact"
                  />
                ))
              ) : (
                renderEmptyState()
              )}
            </>
          )}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}
