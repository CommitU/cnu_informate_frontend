import { Ionicons } from "@expo/vector-icons";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { createStackNavigator } from "@react-navigation/stack";
import { NavigationContainer } from "@react-navigation/native";
import { StatusBar } from "expo-status-bar";
import React, { useEffect } from "react";
import { SafeAreaProvider } from "react-native-safe-area-context";

import CalendarScreen from "./src/screens/CalendarScreen";
import InfoScreen from "./src/screens/InfoScreen";
import LoginScreen from "./src/screens/LoginScreen";
import MainScreen from "./src/screens/MainScreen";
import RegisterScreen from "./src/screens/RegisterScreen";
import SettingsScreen from "./src/screens/SettingsScreen";
import { useAuthStore } from "./src/stores/authStore";

import "./global.css";

const Tab = createBottomTabNavigator();
const Stack = createStackNavigator();

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
          elevation: 0,
          shadowOpacity: 0,
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
        component={MainScreen}
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
        component={InfoScreen}
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
  const { isAuthenticated, isLoading } = useAuthStore();

  // 로딩 중일 때 스플래시 화면 표시
  if (isLoading) {
    return (
      <SafeAreaProvider>
        <StatusBar style="dark" />
        {/* TODO: 스플래시 화면 컴포넌트 추가 */}
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
