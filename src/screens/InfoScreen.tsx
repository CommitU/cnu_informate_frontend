import React, { useState, useEffect } from "react";
import { RefreshControl, ScrollView, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

import { CategoryTab, InfoItemCard } from "../components";
import { ScreenHeader } from "../components/common";
import { Category, InfoItem } from "../types";
import { getNoticesByCategory, getAvailableCategories } from "../utils/csvReader";


export default function InfoScreen() {
  const [selectedCategory, setSelectedCategory] =
    useState<Category>("전체");
  const [refreshing, setRefreshing] = useState(false);
  const [notices, setNotices] = useState<InfoItem[]>([]);
  const [categories, setCategories] = useState<{ key: Category; label: string; icon: string; count: number }[]>([]);
  const [, setLoading] = useState(true);

  // 카테고리별 아이콘 매핑
  const getCategoryIcon = (categoryName: string): string => {
    const categoryIcons: { [key: string]: string } = {
      '특강': '🎓',
      '기획/마케팅': '📊',
      '취업/인턴십': '💼',
      '봉사 활동': '🤝',
      'IT/SW': '💻',
      '스터디': '📚',
      '디자인': '🎨',
      '창업': '🚀',
      '영상/콘텐츠': '📹',
      '서포터즈/기자단': '📰',
      '전체': '📋'
    };
    return categoryIcons[categoryName] || '📄';
  };

  // 데이터 로드
  const loadData = async () => {
    try {
      setLoading(true);
      
      // 카테고리 목록 로드
      const availableCategories = await getAvailableCategories();
      const allCategoryNames = ["전체", ...availableCategories];
      
      // 각 카테고리별로 데이터 개수 계산
      const categoryData = await Promise.all(
        allCategoryNames.map(async (categoryName) => {
          const categoryNotices = await getNoticesByCategory(categoryName, 0, 100);
          return {
            key: categoryName as Category,
            label: categoryName,
            icon: getCategoryIcon(categoryName),
            count: categoryNotices.length
          };
        })
      );
      
      setCategories(categoryData);
      
      // 현재 선택된 카테고리의 공지사항 로드
      const currentNotices = await getNoticesByCategory(selectedCategory, 0, 100);
      setNotices(currentNotices);
      
    } catch (error) {
      console.error('데이터 로드 실패:', error);
    } finally {
      setLoading(false);
    }
  };

  // 카테고리 변경 시 해당 카테고리의 공지사항만 다시 로드
  const handleCategoryChange = async (category: Category) => {
    setSelectedCategory(category);
    try {
      const categoryNotices = await getNoticesByCategory(category, 0, 100);
      setNotices(categoryNotices);
    } catch (error) {
      console.error('카테고리 데이터 로드 실패:', error);
    }
  };

  useEffect(() => {
    loadData();
  }, []); // loadData는 컴포넌트 내부에서 정의되므로 의존성에서 제외

  useEffect(() => {
    if (selectedCategory) {
      handleCategoryChange(selectedCategory);
    }
  }, [selectedCategory]);

  const onRefresh = React.useCallback(async () => {
    setRefreshing(true);
    try {
      await loadData();
    } finally {
      setRefreshing(false);
    }
  }, []); // loadData는 컴포넌트 내부에서 정의되므로 의존성에서 제외

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
          onCategoryChange={handleCategoryChange}
          variant="pills"
        />

        <View className="px-5">
          {notices.map((item) => (
            <InfoItemCard key={item.id} item={item} onPress={handleItemPress} />
          ))}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}
