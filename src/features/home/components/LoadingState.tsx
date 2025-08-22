import React from "react";
import { ActivityIndicator, Text, View } from "react-native";

const LoadingState: React.FC = () => {
  return (
    <View className="mb-6 bg-white rounded-2xl p-8 shadow-sm">
      <View className="items-center">
        <ActivityIndicator size="large" color="#007AFF" />
        <Text className="text-gray-600 mt-4 text-center">
          맞춤형 공지사항을 불러오는 중...
        </Text>
      </View>
    </View>
  );
};

export default LoadingState;
