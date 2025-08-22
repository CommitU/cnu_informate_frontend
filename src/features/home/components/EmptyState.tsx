import React from "react";
import { Text, View } from "react-native";

const EmptyState: React.FC = () => {
  return (
    <View className="bg-gray-50 border border-gray-200 rounded-2xl p-8">
      <Text className="text-gray-500 text-center font-medium mb-2">
        추천 공지사항이 없습니다
      </Text>
      <Text className="text-gray-400 text-center text-sm">
        설정에서 관심분야를 선택하면 맞춤형 공지사항을 받을 수 있습니다
      </Text>
    </View>
  );
};

export default EmptyState;
