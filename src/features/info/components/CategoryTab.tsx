import React from "react";
import { ScrollView, Text, TouchableOpacity, View } from "react-native";

interface CategoryTabProps {
  categories: { key: string; label: string; icon?: string; count?: number }[];
  selectedCategory: string;
  onCategoryChange: (category: any) => void;
  className?: string;
  variant?: "default" | "pills";
}

export default function CategoryTab({
  categories,
  selectedCategory,
  onCategoryChange,
  className = "",
  variant = "default",
}: CategoryTabProps) {
  if (variant === "pills") {
    return (
      <View className={`px-5 mb-6 ${className}`}>
        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          // contentContainerStyle={{ paddingLeft: 0 }}
        >
          {categories.map((category) => (
            <TouchableOpacity
              key={category.key}
              className={`px-4 py-2 rounded-full mr-3 ${
                selectedCategory === category.key
                  ? "bg-blue-500"
                  : "bg-gray-100"
              }`}
              onPress={() => onCategoryChange(category.key)}
            >
              <Text
                className={`text-sm font-semibold ${
                  selectedCategory === category.key
                    ? "text-white"
                    : "text-gray-600"
                }`}
              >
                {category.label}
                {category.count !== undefined && ` (${category.count})`}
              </Text>
            </TouchableOpacity>
          ))}
        </ScrollView>
      </View>
    );
  }

  return (
    <View className={`px-5 mb-6 ${className}`}>
      <View className="flex-row bg-white rounded-2xl p-1 shadow-sm">
        {categories.map((category) => (
          <TouchableOpacity
            key={category.key}
            className={`flex-1 items-center py-3 px-2 rounded-xl ${
              selectedCategory === category.key ? "bg-blue-500" : ""
            }`}
            onPress={() => onCategoryChange(category.key)}
          >
            {category.icon && (
              <Text className="text-lg mb-1">{category.icon}</Text>
            )}
            <Text
              className={`text-xs font-semibold text-center ${
                selectedCategory === category.key
                  ? "text-white"
                  : "text-gray-600"
              }`}
            >
              {category.label}
              {category.count !== undefined && (
                <Text className="text-xs opacity-75">
                  {"\n"}({category.count})
                </Text>
              )}
            </Text>
          </TouchableOpacity>
        ))}
      </View>
    </View>
  );
}
