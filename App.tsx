import { Ionicons } from "@expo/vector-icons";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { NavigationContainer } from "@react-navigation/native";
import { StatusBar } from "expo-status-bar";
import React from "react";
import { SafeAreaProvider } from "react-native-safe-area-context";

import CalendarScreen from "./src/screens/CalendarScreen";
import InfoScreen from "./src/screens/InfoScreen";
import MainScreen from "./src/screens/MainScreen";
import SettingsScreen from "./src/screens/SettingsScreen";

import "./global.css";

const Tab = createBottomTabNavigator();

export default function App() {
  return (
    <SafeAreaProvider>
      <NavigationContainer>
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
