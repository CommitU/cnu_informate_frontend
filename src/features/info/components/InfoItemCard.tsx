import React from "react";
import { Text, TouchableOpacity, View } from "react-native";
import { InfoItem } from "../../../shared/types";
import {
  formatAmount,
  formatDate,
  formatDateRange,
} from "../../../shared/utils/helpers";

interface InfoItemCardProps {
  item: InfoItem;
  onPress?: (item: InfoItem) => void;
  variant?: "default" | "compact";
}

export default function InfoItemCard({
  item,
  onPress,
  variant = "default",
}: InfoItemCardProps) {
  const handlePress = () => {
    if (onPress) {
      onPress(item);
    }
  };

  if (variant === "compact") {
    return (
      <TouchableOpacity
        className="bg-white rounded-xl p-4 mb-3 shadow-sm"
        onPress={handlePress}
        activeOpacity={0.8}
      >
        <View className="flex-row items-center justify-between">
          <View className="flex-1 mr-3">
            <Text
              className="text-base font-semibold text-gray-900 mb-1"
              numberOfLines={1}
            >
              {item.title}
            </Text>
            {(item.date || (item.startDate && item.endDate)) && (
              <Text className="text-xs text-gray-500" numberOfLines={1}>
                {item.date
                  ? formatDate(item.date)
                  : item.startDate && item.endDate
                    ? formatDateRange(item.startDate, item.endDate)
                    : ""}
              </Text>
            )}
          </View>
          {item.amount && (
            <Text className="text-sm font-semibold text-green-600">
              {formatAmount(item.amount)}
            </Text>
          )}
        </View>
      </TouchableOpacity>
    );
  }

  return (
    <TouchableOpacity
      className="bg-white rounded-2xl p-5 mb-4 shadow-sm"
      onPress={handlePress}
      activeOpacity={0.8}
    >
      <Text className="text-lg font-bold text-gray-900 mb-2">{item.title}</Text>

      {(item.amount || item.date || (item.startDate && item.endDate)) && (
        <View className="flex-row items-center justify-between">
          <View className="flex-row items-center space-x-4">
            {item.amount && (
              <Text className="text-sm font-semibold text-green-600">
                {formatAmount(item.amount)}
              </Text>
            )}
            {item.date && (
              <Text className="text-sm text-gray-500">
                {formatDate(item.date)}
              </Text>
            )}
            {item.startDate && item.endDate && (
              <Text className="text-sm text-gray-500">
                {formatDateRange(item.startDate, item.endDate)}
              </Text>
            )}
          </View>
        </View>
      )}
    </TouchableOpacity>
  );
}
