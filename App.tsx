import { Ionicons } from "@expo/vector-icons";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import { StatusBar } from "expo-status-bar";
import React from "react";
import { Text, View } from "react-native";
import { SafeAreaProvider } from "react-native-safe-area-context";

import { LoginScreen, RegisterScreen } from "./src/features/auth";
import { CalendarScreen } from "./src/features/calendar";
import { MainScreen } from "./src/features/home";
import { InfoScreen } from "./src/features/info";
import { SettingsScreen } from "./src/features/settings";
import { DetailScreen } from "./src/features/shared";
import { useAuthStore } from "./src/stores/authStore";

import "./global.css";

const Tab = createBottomTabNavigator();
const Stack = createStackNavigator();

// 로딩 화면 컴포넌트
function LoadingScreen() {
  const { isInitialized } = useAuthStore();

  return (
    <View className="flex-1 justify-center items-center bg-white">
      <Text className="text-lg text-gray-600 mb-2">
        {isInitialized ? "로딩 중..." : "초기화 중..."}
      </Text>
      <Text className="text-sm text-gray-400">잠시만 기다려주세요</Text>
    </View>
  );
}

// 메인 스택 네비게이터
function MainStackNavigator() {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="MainScreen" component={MainScreen} />
      <Stack.Screen name="Detail" component={DetailScreen} />
    </Stack.Navigator>
  );
}

// 정보 스택 네비게이터
function InfoStackNavigator() {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="InfoScreen" component={InfoScreen} />
      <Stack.Screen name="Detail" component={DetailScreen} />
    </Stack.Navigator>
  );
}

// 메인 탭 네비게이터
function MainTabNavigator() {
  return (
    <Tab.Navigator
      screenOptions={{
        headerShown: false,
        tabBarActiveTintColor: "#000000",
        tabBarInactiveTintColor: "#8E8E93",
        tabBarStyle: {
          backgroundColor: "#FFFFFF",
          borderTopWidth: 0,
          elevation: 8,
          shadowOpacity: 0.07,
          shadowRadius: 8,
          shadowOffset: { width: 0, height: -2 },
          height: 88,
          paddingBottom: 20,
          paddingTop: 8,
        },
        tabBarLabelStyle: {
          fontSize: 12,
          fontWeight: "600",
          marginTop: 4,
        },
      }}
    >
      <Tab.Screen
        name="Main"
        component={MainStackNavigator}
        options={{
          title: "홈",
          tabBarIcon: ({ color, size }) => (
            <TabBarIcon name="home" color={color} size={size} />
          ),
        }}
      />
      <Tab.Screen
        name="Calendar"
        component={CalendarScreen}
        options={{
          title: "일정",
          tabBarIcon: ({ color, size }) => (
            <TabBarIcon name="calendar" color={color} size={size} />
          ),
        }}
      />
      <Tab.Screen
        name="Info"
        component={InfoStackNavigator}
        options={{
          title: "정보",
          tabBarIcon: ({ color, size }) => (
            <TabBarIcon name="info" color={color} size={size} />
          ),
        }}
      />
      <Tab.Screen
        name="Settings"
        component={SettingsScreen}
        options={{
          title: "설정",
          tabBarIcon: ({ color, size }) => (
            <TabBarIcon name="settings" color={color} size={size} />
          ),
        }}
      />
    </Tab.Navigator>
  );
}

// 인증 스택 네비게이터
function AuthStackNavigator() {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="Login" component={LoginScreen} />
      <Stack.Screen name="Register" component={RegisterScreen} />
    </Stack.Navigator>
  );
}

export default function App() {
  const { isAuthenticated, isLoading, isInitialized } = useAuthStore();

  // 초기화가 완료되지 않았거나 로딩 중일 때 로딩 화면 표시
  if (!isInitialized || isLoading) {
    return (
      <SafeAreaProvider>
        <StatusBar style="dark" />
        <LoadingScreen />
      </SafeAreaProvider>
    );
  }

  return (
    <SafeAreaProvider>
      <NavigationContainer>
        {isAuthenticated ? <MainTabNavigator /> : <AuthStackNavigator />}
      </NavigationContainer>
      <StatusBar style="dark" />
    </SafeAreaProvider>
  );
}

// 깔끔한 Vector Icons 기반 탭바 아이콘 컴포넌트
function TabBarIcon({
  name,
  color,
  size,
}: {
  name: string;
  color: string;
  size: number;
}) {
  const icons: { [key: string]: keyof typeof Ionicons.glyphMap } = {
    home: "home-outline",
    calendar: "calendar-outline",
    info: "information-circle-outline",
    settings: "settings-outline",
  };

  const iconName = icons[name] || "ellipse-outline";

  return <Ionicons name={iconName} size={size} color={color} />;
}
