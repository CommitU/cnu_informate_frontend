import React from "react";
import { Text, TouchableOpacity, View } from "react-native";

interface ErrorStateProps {
  errorMessage: string;
  onRetry: () => void;
}

const ErrorState: React.FC<ErrorStateProps> = ({ errorMessage, onRetry }) => {
  return (
    <View className="bg-red-50 border border-red-200 rounded-2xl p-6">
      <Text className="text-red-600 text-center font-medium mb-2">
        데이터를 불러올 수 없습니다
      </Text>
      <Text className="text-red-500 text-center text-sm mb-4">
        {errorMessage}
      </Text>
      <TouchableOpacity
        className="bg-red-500 rounded-lg py-3 px-6"
        onPress={onRetry}
      >
        <Text className="text-white text-center font-semibold">다시 시도</Text>
      </TouchableOpacity>
    </View>
  );
};

export default ErrorState;
