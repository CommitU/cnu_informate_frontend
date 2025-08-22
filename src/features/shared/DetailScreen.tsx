import { Ionicons } from "@expo/vector-icons";
import React from "react";
import {
  Alert,
  Linking,
  ScrollView,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

import { getCategoryColor } from "../../shared/constants/categories";
import { DetailItem } from "../../shared/types";
import {
  formatAmount,
  formatDate,
  formatDateRange,
} from "../../shared/utils/helpers";

interface DetailScreenProps {
  navigation: any;
  route: {
    params: {
      item: DetailItem;
    };
  };
}

export default function DetailScreen({ navigation, route }: DetailScreenProps) {
  const { item } = route.params;

  const handleBackPress = () => {
    navigation.goBack();
  };

  const getScreenTitle = () => {
    return "상세 정보";
  };

  const renderMetaInfo = () => {
    return (
      <View className="flex-row items-center justify-between mb-6">
        <View className="flex-row items-center space-x-3">
          {/* 카테고리 태그 */}
          {item.category && (
            <View
              className="px-3 py-1 rounded-full"
              style={{
                backgroundColor: getCategoryColor(item.category) + "20",
              }}
            >
              <Text
                className="text-sm font-semibold"
                style={{ color: getCategoryColor(item.category) }}
              >
                {item.category}
              </Text>
            </View>
          )}
        </View>

        {/* 날짜 정보 */}
        <Text className="text-sm text-gray-500">
          {item.created_at && formatDate(item.created_at)}
          {item.date && formatDate(item.date)}
        </Text>
      </View>
    );
  };

  const handleUrlPress = async () => {
    if (!item.url) return;

    try {
      // URL이 유효한지 확인
      const supported = await Linking.canOpenURL(item.url);

      if (supported) {
        await Linking.openURL(item.url);
      } else {
        Alert.alert("링크 열기 실패", "이 링크를 열 수 없습니다.", [
          { text: "확인", style: "default" },
        ]);
      }
    } catch (error) {
      Alert.alert("오류 발생", "링크를 여는 중 오류가 발생했습니다.", [
        { text: "확인", style: "default" },
      ]);
    }
  };

  return (
    <SafeAreaView className="flex-1 bg-white" edges={["top", "left", "right"]}>
      {/* 헤더 */}
      <View className="flex-row items-center justify-between px-5 py-4 bg-white border-b border-gray-200">
        <TouchableOpacity
          onPress={handleBackPress}
          className="p-2 -ml-2"
          activeOpacity={0.7}
        >
          <Ionicons name="arrow-back" size={24} color="#000" />
        </TouchableOpacity>
        <Text className="text-lg font-semibold text-gray-900">
          {getScreenTitle()}
        </Text>
        <View className="w-10" />
      </View>

      {/* 스크롤 가능한 콘텐츠 영역 */}
      <ScrollView
        className="flex-1"
        contentContainerStyle={{
          padding: 20,
          paddingBottom: item.url ? 100 : 20,
        }}
      >
        {/* 제목 */}
        <Text className="text-2xl font-bold text-gray-900 mb-4">
          {item.title}
        </Text>

        {/* 메타 정보 */}
        {renderMetaInfo()}

        {/* 내용 */}
        <View className="mb-6">
          <Text className="text-base leading-7 text-gray-800">
            {item.content}
          </Text>
        </View>

        {/* 추가 정보 (정보 아이템인 경우에만) */}
        {item.type === "info" && (
          <View className="mb-6">
            {/* 기간 정보 */}
            {item.startDate && item.endDate && (
              <View className="flex-row items-center justify-between py-2 border-b border-gray-100">
                <Text className="text-sm font-semibold text-gray-600">
                  기간
                </Text>
                <Text className="text-sm text-gray-900">
                  {formatDateRange(item.startDate, item.endDate)}
                </Text>
              </View>
            )}

            {/* 금액 정보 */}
            {item.amount && (
              <View className="flex-row items-center justify-between py-2 border-b border-gray-100">
                <Text className="text-sm font-semibold text-gray-600">
                  금액
                </Text>
                <Text className="text-sm font-semibold text-green-600">
                  {formatAmount(item.amount)}
                </Text>
              </View>
            )}
          </View>
        )}
        {item.url && (
          <View className="absolute bottom-4 left-4 right-4">
            <View className="flex-row justify-end">
              <TouchableOpacity
                className="flex-row items-center"
                activeOpacity={0.7}
                onPress={handleUrlPress}
              >
                <Ionicons name="link" size={16} color="#3B82F6" />
                <Text className="text-blue-500 underline pl-2 pr-4 text-sm font-medium">
                  글 링크 열기
                </Text>
              </TouchableOpacity>
            </View>
          </View>
        )}
      </ScrollView>
    </SafeAreaView>
  );
}
