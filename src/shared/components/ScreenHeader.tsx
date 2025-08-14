import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

interface ScreenHeaderProps {
  title: string;
  subtitle?: string;
  onBack?: () => void;
  rightAction?: {
    icon: keyof typeof Ionicons.glyphMap;
    onPress: () => void;
  };
  className?: string;
}

export default function ScreenHeader({
  title,
  subtitle,
  onBack,
  rightAction,
  className = '',
}: ScreenHeaderProps) {
  return (
    <View className={`px-5 mb-6 ${className}`}>
      <View className="flex-row items-center justify-between mb-2">
        {onBack && (
          <TouchableOpacity
            className="p-2 -ml-2"
            onPress={onBack}
          >
            <Ionicons name="arrow-back" size={24} color="#374151" />
          </TouchableOpacity>
        )}
        
        <View className="flex-1">
          <Text className="text-3xl font-bold text-gray-900 mb-2">
            {title}
          </Text>
          {subtitle && (
            <Text className="text-lg text-gray-600">
              {subtitle}
            </Text>
          )}
        </View>

        {rightAction && (
          <TouchableOpacity
            className="p-2"
            onPress={rightAction.onPress}
          >
            <Ionicons name={rightAction.icon} size={24} color="#374151" />
          </TouchableOpacity>
        )}
      </View>
    </View>
  );
}
