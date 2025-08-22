import { Ionicons } from "@expo/vector-icons";
import React from "react";
import { Text, View } from "react-native";

import { getCategoryColor } from "../../../shared/constants/categories";

interface InterestSummaryCardProps {
  selectedInterests: string[];
}

const InterestSummaryCard: React.FC<InterestSummaryCardProps> = ({
  selectedInterests,
}) => {
  if (selectedInterests.length === 0) {
    return (
      <View className="mb-6 bg-yellow-50 border border-yellow-200 rounded-2xl p-4">
        <View className="flex-row items-center">
          <Ionicons name="warning" size={20} color="#F59E0B" />
          <Text className="text-yellow-800 ml-2 text-sm font-medium">
            관심분야를 선택해주세요
          </Text>
        </View>
        <Text className="text-yellow-600 text-xs mt-1 ml-6">
          맞춤형 공지사항을 받으려면 설정에서 관심분야를 선택하세요
        </Text>
      </View>
    );
  }

  return (
    <View className="mb-6 bg-white rounded-2xl p-5 shadow-sm border border-gray-100">
      <View className="flex-row items-center justify-between mb-3">
        <Text className="text-gray-900 font-semibold text-lg">내 관심분야</Text>
        <Text className="text-blue-600 text-sm font-medium">
          {selectedInterests.length}개 선택됨
        </Text>
      </View>
      <View className="flex-row flex-wrap gap-2">
        {selectedInterests.slice(0, 4).map((interest, index) => (
          <View
            key={index}
            className="px-3 py-2 rounded-full"
            style={{
              backgroundColor: getCategoryColor(interest) + "20",
            }}
          >
            <Text
              className="text-xs font-medium"
              style={{ color: getCategoryColor(interest) }}
            >
              {interest}
            </Text>
          </View>
        ))}
        {selectedInterests.length > 4 && (
          <View className="px-3 py-2 rounded-full bg-gray-100">
            <Text className="text-xs font-medium text-gray-600">
              +{selectedInterests.length - 4}
            </Text>
          </View>
        )}
      </View>
    </View>
  );
};

export default InterestSummaryCard;
