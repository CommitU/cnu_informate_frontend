import React, { useState } from "react";
import {
  Alert,
  ScrollView,
  Switch,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

// 관심 분야 타입 정의
interface Interest {
  id: string;
  name: string;
  selected: boolean;
}

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
  type: "toggle" | "button" | "link";
  value?: boolean;
  onPress?: () => void;
  onToggle?: (value: boolean) => void;
}

export default function SettingsScreen() {
  const [interests, setInterests] = useState<Interest[]>([
    { id: "1", name: "특강/세미나", selected: true },
    { id: "2", name: "마케팅/홍보", selected: false },
    { id: "3", name: "취업/인턴십", selected: true },
    { id: "4", name: "IT/개발", selected: true },
    { id: "5", name: "학사/수업", selected: true },
    { id: "6", name: "장학금", selected: true },
    { id: "7", name: "동아리/모임", selected: false },
    { id: "8", name: "기타", selected: false },
  ]);

  const [notificationSettings, setNotificationSettings] = useState({
    allNotifications: true,
    academicNotifications: true,
    scholarshipNotifications: true,
    jobNotifications: true,
    eventNotifications: false,
  });

  const handleInterestToggle = (id: string) => {
    setInterests((prev) =>
      prev.map((interest) =>
        interest.id === id
          ? { ...interest, selected: !interest.selected }
          : interest
      )
    );
  };

  const handleNotificationToggle = (key: keyof typeof notificationSettings) => {
    setNotificationSettings((prev) => ({
      ...prev,
      [key]: !prev[key],
    }));
  };

  const handleLogout = () => {
    Alert.alert("로그아웃", "정말 로그아웃하시겠습니까?", [
      { text: "취소", style: "cancel" },
      {
        text: "로그아웃",
        style: "destructive",
        onPress: () => {
          // TODO: 로그아웃 로직 구현
          console.log("로그아웃");
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
      id: "interests",
      title: "관심 분야",
      items: interests.map((interest) => ({
        id: interest.id,
        title: interest.name,
        type: "toggle" as const,
        value: interest.selected,
        onToggle: () => handleInterestToggle(interest.id),
      })),
    },
    {
      id: "notifications",
      title: "알림 설정",
      items: [
        {
          id: "all",
          title: "전체 알림",
          subtitle: "모든 알림을 받습니다",
          type: "toggle" as const,
          value: notificationSettings.allNotifications,
          onToggle: () => handleNotificationToggle("allNotifications"),
        },
        {
          id: "academic",
          title: "학사 알림",
          subtitle: "학사 관련 공지사항 알림",
          type: "toggle" as const,
          value: notificationSettings.academicNotifications,
          onToggle: () => handleNotificationToggle("academicNotifications"),
        },
        {
          id: "scholarship",
          title: "장학금 알림",
          subtitle: "장학금 관련 공지사항 알림",
          type: "toggle" as const,
          value: notificationSettings.scholarshipNotifications,
          onToggle: () => handleNotificationToggle("scholarshipNotifications"),
        },
        {
          id: "job",
          title: "취업 알림",
          subtitle: "취업/인턴십 관련 공지사항 알림",
          type: "toggle" as const,
          value: notificationSettings.jobNotifications,
          onToggle: () => handleNotificationToggle("jobNotifications"),
        },
        {
          id: "event",
          title: "행사 알림",
          subtitle: "특강/세미나 등 행사 알림",
          type: "toggle" as const,
          value: notificationSettings.eventNotifications,
          onToggle: () => handleNotificationToggle("eventNotifications"),
        },
      ],
    },
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
    <SafeAreaView className="flex-1 bg-gray-50">
      <ScrollView className="flex-1" contentContainerStyle={{ paddingTop: 20 }}>
        <View className="px-5 mb-6">
          <Text className="text-3xl font-bold text-gray-900 mb-2">설정</Text>
          <Text className="text-lg text-gray-600">
            앱 설정 및 계정을 관리하세요
          </Text>
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
                  disabled={item.type === "toggle"}
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

                  {item.type === "toggle" && (
                    <Switch
                      value={item.value}
                      onValueChange={item.onToggle}
                      trackColor={{ false: "#E5E5EA", true: "#007AFF" }}
                      thumbColor={item.value ? "#FFFFFF" : "#FFFFFF"}
                    />
                  )}

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
