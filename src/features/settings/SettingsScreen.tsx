import React, { useState } from "react";
import {
  Alert,
  Animated,
  ScrollView,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useAuthStore } from "../../stores/authStore";
import { useInterestStore } from "../../stores/interestStore";

// 설정 섹션 타입 정의
interface SettingSection {
  id: string;
  title: string;
  items: SettingItem[];
}

interface SettingItem {
  id: string;
  title: string;
  subtitle?: string;
  type: "button" | "link";
  onPress?: () => void;
}

export default function SettingsScreen() {
  const { logout } = useAuthStore();
  const { interests, toggleInterest } = useInterestStore();

  // 애니메이션 값들을 저장할 객체
  const [animations] = useState(() => {
    const anims: { [key: string]: Animated.Value } = {};
    interests.forEach((interest) => {
      anims[interest.id] = new Animated.Value(1);
    });
    return anims;
  });

  const handleInterestToggle = (id: string) => {
    // 스케일 애니메이션
    Animated.sequence([
      Animated.timing(animations[id], {
        toValue: 0.95,
        duration: 100,
        useNativeDriver: true,
      }),
      Animated.timing(animations[id], {
        toValue: 1,
        duration: 100,
        useNativeDriver: true,
      }),
    ]).start();

    // 전역 스토어의 toggleInterest 사용
    toggleInterest(id);
  };

  const handleLogout = () => {
    Alert.alert("로그아웃", "정말 로그아웃하시겠습니까?", [
      { text: "취소", style: "cancel" },
      {
        text: "로그아웃",
        style: "destructive",
        onPress: () => {
          logout();
        },
      },
    ]);
  };

  const handleDeleteAccount = () => {
    Alert.alert(
      "계정 탈퇴",
      "정말 계정을 탈퇴하시겠습니까?\n이 작업은 되돌릴 수 없습니다.",
      [
        { text: "취소", style: "cancel" },
        {
          text: "탈퇴",
          style: "destructive",
          onPress: () => {
            // TODO: 계정 탈퇴 로직 구현
            console.log("계정 탈퇴");
          },
        },
      ]
    );
  };

  const settingSections: SettingSection[] = [
    {
      id: "account",
      title: "계정 설정",
      items: [
        {
          id: "profile",
          title: "프로필 수정",
          subtitle: "개인정보 수정",
          type: "link" as const,
          onPress: () => {
            // TODO: 프로필 수정 페이지로 이동
            console.log("프로필 수정");
          },
        },
        {
          id: "password",
          title: "비밀번호 변경",
          subtitle: "비밀번호 변경",
          type: "link" as const,
          onPress: () => {
            // TODO: 비밀번호 변경 페이지로 이동
            console.log("비밀번호 변경");
          },
        },
        {
          id: "privacy",
          title: "개인정보 처리방침",
          subtitle: "개인정보 처리방침 보기",
          type: "link" as const,
          onPress: () => {
            // TODO: 개인정보 처리방침 페이지로 이동
            console.log("개인정보 처리방침");
          },
        },
        {
          id: "logout",
          title: "로그아웃",
          subtitle: "계정에서 로그아웃",
          type: "button" as const,
          onPress: handleLogout,
        },
        {
          id: "delete",
          title: "계정 탈퇴",
          subtitle: "계정을 영구적으로 삭제",
          type: "button" as const,
          onPress: handleDeleteAccount,
        },
      ],
    },
  ];

  return (
    <SafeAreaView
      className="flex-1 bg-gray-50"
      edges={["top", "left", "right"]}
    >
      <ScrollView className="flex-1" contentContainerStyle={{ paddingTop: 20 }}>
        <View className="px-5 mb-6">
          <Text className="text-3xl font-bold text-gray-900 mb-2">설정</Text>
          <Text className="text-lg text-gray-600">
            앱 설정 및 계정을 관리하세요
          </Text>
        </View>

        {/* 관심 분야 태그 선택 섹션 */}
        <View className="mb-6">
          <Text className="text-lg font-bold text-gray-900 mx-5 mb-3">
            관심 분야
          </Text>
          <View
            className="mx-5 bg-white rounded-3xl p-6"
            style={{
              shadowColor: "#000",
              shadowOffset: { width: 0, height: 4 },
              shadowOpacity: 0.1,
              shadowRadius: 12,
              elevation: 8,
            }}
          >
            <View className="flex-row items-center mb-4">
              <View className="w-1 h-3 bg-blue-500 rounded-full mr-3" />
              <Text className="text-xs text-gray-600 flex-1">
                관심 있는 분야를 선택하면 맞춤형 공지사항을 받을 수 있습니다
              </Text>
            </View>
            <View className="flex-row flex-wrap gap-2">
              {interests.map((interest) => (
                <Animated.View
                  key={interest.id}
                  style={{
                    transform: [{ scale: animations[interest.id] }],
                  }}
                >
                  <TouchableOpacity
                    className={`px-3 py-2 rounded-full border-2 ${
                      interest.selected
                        ? "bg-blue-500 border-blue-500"
                        : "bg-white border-gray-200"
                    }`}
                    onPress={() => handleInterestToggle(interest.id)}
                    activeOpacity={0.8}
                    style={{
                      shadowColor: interest.selected ? "#007AFF" : "#000",
                      shadowOffset: { width: 0, height: 2 },
                      shadowOpacity: interest.selected ? 0.3 : 0.1,
                      shadowRadius: 4,
                      elevation: interest.selected ? 4 : 2,
                    }}
                  >
                    <Text
                      className={`text-sm font-semibold ${
                        interest.selected ? "text-white" : "text-gray-700"
                      }`}
                    >
                      {interest.name}
                    </Text>
                  </TouchableOpacity>
                </Animated.View>
              ))}
            </View>
            <View className="mt-5 pt-4 border-t border-gray-100">
              <View className="flex-row items-center justify-between">
                <Text className="text-xs text-gray-500">
                  선택된 분야: {interests.filter((i) => i.selected).length}개
                </Text>
                <View className="flex-row items-center">
                  <View className="w-2 h-2 bg-blue-500 rounded-full mr-1" />
                  <Text className="text-xs text-blue-500 font-medium">
                    선택됨
                  </Text>
                </View>
              </View>
            </View>
          </View>
        </View>

        {settingSections.map((section) => (
          <View key={section.id} className="mb-6">
            <Text className="text-lg font-bold text-gray-900 mx-5 mb-3">
              {section.title}
            </Text>
            <View className="mx-5 bg-white rounded-2xl overflow-hidden shadow-sm">
              {section.items.map((item, index) => (
                <TouchableOpacity
                  key={item.id}
                  className={`flex-row items-center px-5 py-4 ${
                    index !== section.items.length - 1
                      ? "border-b border-gray-100"
                      : ""
                  }`}
                  onPress={item.onPress}
                >
                  <View className="flex-1">
                    <Text className="text-base font-semibold text-gray-900 mb-1">
                      {item.title}
                    </Text>
                    {item.subtitle && (
                      <Text className="text-sm text-gray-600">
                        {item.subtitle}
                      </Text>
                    )}
                  </View>

                  {item.type === "link" && (
                    <Text className="text-base text-blue-500 font-bold">→</Text>
                  )}

                  {item.type === "button" && item.id === "logout" && (
                    <Text className="text-base text-blue-500 font-semibold">
                      로그아웃
                    </Text>
                  )}

                  {item.type === "button" && item.id === "delete" && (
                    <Text className="text-base text-red-500 font-semibold">
                      탈퇴
                    </Text>
                  )}
                </TouchableOpacity>
              ))}
            </View>
          </View>
        ))}
      </ScrollView>
    </SafeAreaView>
  );
}
