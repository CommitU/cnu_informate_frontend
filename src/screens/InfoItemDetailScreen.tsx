import { Ionicons } from "@expo/vector-icons";
import React from "react";
import { ScrollView, Text, TouchableOpacity, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

import { InfoItem } from "../types";
import { formatAmount, formatDate, formatDateRange } from "../utils/helpers";

interface InfoItemDetailScreenProps {
  navigation: any;
  route: {
    params: {
      item: InfoItem;
    };
  };
}

export default function InfoItemDetailScreen({
  navigation,
  route,
}: InfoItemDetailScreenProps) {
  const { item } = route.params;

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
        <Text className="text-lg font-semibold text-gray-900">상세 정보</Text>
        <View className="w-10" />
      </View>

      <ScrollView className="flex-1" contentContainerStyle={{ padding: 20 }}>
        {/* 제목 */}
        <Text className="text-2xl font-bold text-gray-900 mb-4">
          {item.title}
        </Text>

        {/* 메타 정보 */}
        <View className="bg-white rounded-2xl p-6 shadow-sm mb-6">
          <View className="space-y-4">
            {/* 카테고리 */}
            <View className="flex-row items-center justify-between">
              <Text className="text-sm font-semibold text-gray-600">
                카테고리
              </Text>
              <Text className="text-sm text-gray-900">{item.category}</Text>
            </View>

            {/* 날짜 정보 */}
            {item.date && (
              <View className="flex-row items-center justify-between">
                <Text className="text-sm font-semibold text-gray-600">
                  날짜
                </Text>
                <Text className="text-sm text-gray-900">
                  {formatDate(item.date)}
                </Text>
              </View>
            )}

            {/* 기간 정보 */}
            {item.startDate && item.endDate && (
              <View className="flex-row items-center justify-between">
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
              <View className="flex-row items-center justify-between">
                <Text className="text-sm font-semibold text-gray-600">
                  금액
                </Text>
                <Text className="text-sm font-semibold text-green-600">
                  {formatAmount(item.amount)}
                </Text>
              </View>
            )}
          </View>
        </View>

        {/* 내용 */}
        <View className="bg-white rounded-2xl p-6 shadow-sm">
          <Text className="text-base leading-6 text-gray-800">
            {item.content}
          </Text>
        </View>

        {/* URL이 있는 경우 링크 표시 */}
        {item.url && (
          <View className="mt-6 bg-white rounded-2xl p-6 shadow-sm">
            <Text className="text-sm font-semibold text-gray-900 mb-2">
              관련 링크
            </Text>
            <TouchableOpacity
              className="flex-row items-center space-x-2"
              activeOpacity={0.7}
            >
              <Ionicons name="link" size={16} color="#3B82F6" />
              <Text className="text-blue-500 underline">{item.url}</Text>
            </TouchableOpacity>
          </View>
        )}
      </ScrollView>
    </SafeAreaView>
  );
}
