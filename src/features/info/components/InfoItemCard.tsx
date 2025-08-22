import React from "react";
import { Text, TouchableOpacity, View } from "react-native";
import { InfoItem, Notice } from "../../../shared/types";
import {
  formatAmount,
  formatDate,
  formatDateRange,
} from "../../../shared/utils/helpers";

interface InfoItemCardProps {
  notice?: Notice;
  item?: InfoItem;
  onPress?: (notice: Notice) => void | ((item: InfoItem) => void);
  variant?: "default" | "compact";
}

export default function InfoItemCard({
  notice,
  item,
  onPress,
  variant = "default",
}: InfoItemCardProps) {
  // Notice 또는 InfoItem 중 하나만 사용
  const data = notice || item;

  if (!data) {
    return null;
  }

  const handlePress = () => {
    if (onPress) {
      if (notice) {
        (onPress as (notice: Notice) => void)(notice);
      } else if (item) {
        (onPress as (item: InfoItem) => void)(item);
      }
    }
  };

  // Notice 타입인지 InfoItem 타입인지 확인
  const isNotice = "sourceId" in data;

  if (variant === "compact") {
    return (
      <TouchableOpacity
        className="bg-white p-4 border-b border-gray-200"
        onPress={handlePress}
        activeOpacity={0.8}
      >
        <View className="flex-row items-center justify-between">
          <View className="flex-1 mr-3">
            <Text
              className="text-base font-semibold text-gray-900 mb-1"
              numberOfLines={1}
            >
              {data.title}
            </Text>
            <Text className="text-xs text-gray-500" numberOfLines={1}>
              {isNotice
                ? data.postedAt || data.scrapedAt
                  ? formatDate(data.postedAt || data.scrapedAt)
                  : "날짜 없음"
                : data.date || (data.startDate && data.endDate)
                  ? data.date
                    ? formatDate(data.date)
                    : formatDateRange(data.startDate!, data.endDate!)
                  : ""}
            </Text>
          </View>
          {!isNotice && data.amount && (
            <Text className="text-sm font-semibold text-green-600">
              {formatAmount(data.amount)}
            </Text>
          )}
        </View>
      </TouchableOpacity>
    );
  }

  return (
    <TouchableOpacity
      className="bg-white p-5 border-b border-gray-200"
      onPress={handlePress}
      activeOpacity={0.8}
    >
      <Text className="text-lg font-bold text-gray-900 mb-2">{data.title}</Text>

      {(!isNotice &&
        (data.amount || data.date || (data.startDate && data.endDate))) ||
      (isNotice && (data.postedAt || data.scrapedAt)) ? (
        <View className="flex-row items-center justify-between">
          <View className="flex-row items-center space-x-4">
            {!isNotice && data.amount && (
              <Text className="text-sm font-semibold text-green-600">
                {formatAmount(data.amount)}
              </Text>
            )}
            {isNotice ? (
              <Text className="text-sm text-gray-500">
                {data.postedAt || data.scrapedAt
                  ? formatDate(data.postedAt || data.scrapedAt)
                  : "날짜 없음"}
              </Text>
            ) : (
              <>
                {data.date && (
                  <Text className="text-sm text-gray-500">
                    {formatDate(data.date)}
                  </Text>
                )}
                {data.startDate && data.endDate && (
                  <Text className="text-sm text-gray-500">
                    {formatDateRange(data.startDate, data.endDate)}
                  </Text>
                )}
              </>
            )}
          </View>
        </View>
      ) : null}
    </TouchableOpacity>
  );
}
