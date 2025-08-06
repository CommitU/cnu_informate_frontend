import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { NavigationContainer } from '@react-navigation/native';
import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { Text } from 'react-native';
import { SafeAreaProvider } from 'react-native-safe-area-context';

import InfoScreen from './src/screens/InfoScreen';
import MainScreen from './src/screens/MainScreen';
import SettingsScreen from './src/screens/SettingsScreen';

import './global.css';

const Tab = createBottomTabNavigator();

export default function App() {
  return (
    <SafeAreaProvider>
      <NavigationContainer>
        <Tab.Navigator
          screenOptions={{
            headerShown: false,
            tabBarActiveTintColor: '#1976D2',
            tabBarInactiveTintColor: '#757575',
            tabBarStyle: {
              backgroundColor: '#FFFFFF',
              borderTopWidth: 1,
              borderTopColor: '#E0E0E0',
            },
          }}
        >
          <Tab.Screen 
            name="Main" 
            component={MainScreen}
            options={{
              title: '메인',
              tabBarIcon: ({ color, size }) => (
                <TabBarIcon name="house" color={color} size={size} />
              ),
            }}
          />
          <Tab.Screen 
            name="Info" 
            component={InfoScreen}
            options={{
              title: '정보',
              tabBarIcon: ({ color, size }) => (
                <TabBarIcon name="doc-text" color={color} size={size} />
              ),
            }}
          />
          <Tab.Screen 
            name="Settings" 
            component={SettingsScreen}
            options={{
              title: '설정',
              tabBarIcon: ({ color, size }) => (
                <TabBarIcon name="settings" color={color} size={size} />
              ),
            }}
          />
        </Tab.Navigator>
      </NavigationContainer>
      <StatusBar style="auto" />
    </SafeAreaProvider>
  );
}

// 간단한 탭바 아이콘 컴포넌트
function TabBarIcon({ name, color, size }: { name: string; color: string; size: number }) {
  return (
    <Text className="text-center" style={{ fontSize: size, color }}>
      {name === 'house' && '🏠'}
      {name === 'doc-text' && '📄'}
      {name === 'settings' && '⚙️'}
    </Text>
  );
} 