import { Ionicons } from "@expo/vector-icons";
import React from "react";
import { ScrollView, Text, TouchableOpacity, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

import { Notice } from "../../shared/types";
import {
  formatDate,
  getCategoryColor,
  getImportanceStars,
} from "../../shared/utils/helpers";

interface NoticeDetailScreenProps {
  navigation: any;
  route: {
    params: {
      notice: Notice;
    };
  };
}

export default function NoticeDetailScreen({
  navigation,
  route,
}: NoticeDetailScreenProps) {
  const { notice } = route.params;

  const handleBackPress = () => {
    navigation.goBack();
  };

  return (
    <SafeAreaView className="flex-1 bg-gray-50">
      {/* 헤더 */}
      <View className="flex-row items-center justify-between px-5 py-4 bg-white border-b border-gray-200">
        <TouchableOpacity
          onPress={handleBackPress}
          className="p-2 -ml-2"
          activeOpacity={0.7}
        >
          <Ionicons name="arrow-back" size={24} color="#000" />
        </TouchableOpacity>
        <Text className="text-lg font-semibold text-gray-900">공지사항</Text>
        <View className="w-10" />
      </View>

      <ScrollView className="flex-1" contentContainerStyle={{ padding: 20 }}>
        {/* 제목 */}
        <Text className="text-2xl font-bold text-gray-900 mb-4">
          {notice.title}
        </Text>

        {/* 메타 정보 */}
        <View className="flex-row items-center justify-between mb-6">
          <View className="flex-row items-center space-x-3">
            {/* 카테고리 태그 */}
            <View
              className="px-3 py-1 rounded-full"
              style={{
                backgroundColor: getCategoryColor(notice.category) + "20",
              }}
            >
              <Text
                className="text-sm font-semibold"
                style={{ color: getCategoryColor(notice.category) }}
              >
                {notice.category}
              </Text>
            </View>

            {/* 중요도 별점 */}
            <Text className="text-sm text-yellow-500">
              {getImportanceStars(notice.importance)}
            </Text>
          </View>

          {/* 날짜 */}
          <Text className="text-sm text-gray-500">
            {formatDate(notice.created_at)}
          </Text>
        </View>

        {/* 내용 */}
        <View className="bg-white rounded-2xl p-6 shadow-sm">
          <Text className="text-base leading-6 text-gray-800">
            {notice.content}
          </Text>
        </View>

        {/* URL이 있는 경우 링크 표시 */}
        {notice.url && (
          <View className="mt-6 bg-white rounded-2xl p-6 shadow-sm">
            <Text className="text-sm font-semibold text-gray-900 mb-2">
              관련 링크
            </Text>
            <TouchableOpacity
              className="flex-row items-center space-x-2"
              activeOpacity={0.7}
            >
              <Ionicons name="link" size={16} color="#3B82F6" />
              <Text className="text-blue-500 underline">{notice.url}</Text>
            </TouchableOpacity>
          </View>
        )}
      </ScrollView>
    </SafeAreaView>
  );
}
