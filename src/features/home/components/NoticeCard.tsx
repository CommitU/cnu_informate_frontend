import React from "react";
import { Text, View } from "react-native";
import { Card } from "../../../shared/components";
import { getCategoryColor } from "../../../shared/constants/categories";
import { Notice } from "../../../shared/types";
import { formatDate } from "../../../shared/utils/helpers";

interface NoticeCardProps {
  notice: Notice;
  onPress?: (notice: Notice) => void;
  variant?: "default" | "compact";
}

export default function NoticeCard({
  notice,
  onPress,
  variant = "default",
}: NoticeCardProps) {
  const handlePress = () => {
    if (onPress) {
      onPress(notice);
    }
  };

  if (variant === "compact") {
    return (
      <Card onPress={handlePress} className="mb-3 p-4">
        <View className="flex-row items-center justify-between">
          <View className="flex-1 mr-3">
            <Text
              className="text-base font-semibold text-gray-900 mb-1"
              numberOfLines={1}
            >
              {notice.title}
            </Text>
            <Text className="text-xs text-gray-500" numberOfLines={1}>
              {formatDate(notice.created_at)}
            </Text>
          </View>
          <View
            className="px-2 py-1 rounded-full"
            style={{
              backgroundColor: getCategoryColor(notice.category) + "20",
            }}
          >
            <Text
              className="text-xs font-semibold"
              style={{ color: getCategoryColor(notice.category) }}
            >
              {notice.category}
            </Text>
          </View>
        </View>
      </Card>
    );
  }

  return (
    <Card onPress={handlePress} className="mb-4 p-5">
      <View className="flex-row items-start justify-between mb-3">
        <View className="flex-1 mr-3">
          <Text
            className="text-lg font-bold text-gray-900 mb-2"
            numberOfLines={2}
          >
            {notice.title}
          </Text>
          <Text className="text-sm text-gray-600 mb-3" numberOfLines={3}>
            {notice.content}
          </Text>
        </View>
      </View>

      <View className="flex-row items-center justify-between">
        <View className="flex-row items-center space-x-3">
          {/* 카테고리 태그 */}
          <View
            className="px-3 py-1 rounded-full"
            style={{
              backgroundColor: getCategoryColor(notice.category) + "20",
            }}
          >
            <Text
              className="text-xs font-semibold"
              style={{ color: getCategoryColor(notice.category) }}
            >
              {notice.category}
            </Text>
          </View>
        </View>

        {/* 날짜 */}
        <Text className="text-xs text-gray-500">
          {formatDate(notice.created_at)}
        </Text>
      </View>
    </Card>
  );
}
