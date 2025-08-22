import { Ionicons } from "@expo/vector-icons";
import React, { useState } from "react";
import {
  Alert,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Button, Input } from "../../shared/components";
import { useAuthStore } from "../../stores/authStore";

interface LoginScreenProps {
  navigation: any;
}

export default function LoginScreen({ navigation }: LoginScreenProps) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const { login, isLoading } = useAuthStore();

  const handleLogin = async () => {
    if (!email.trim() || !password.trim()) {
      Alert.alert("오류", "이메일과 비밀번호를 입력해주세요.");
      return;
    }

    const success = await login(email.trim(), password);
    if (!success) {
      Alert.alert("로그인 실패", "이메일 또는 비밀번호를 확인해주세요.");
    }
  };

  const handleRegister = () => {
    navigation.navigate("Register");
  };

  return (
    <SafeAreaView className="flex-1 bg-white">
      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        className="flex-1"
      >
        <ScrollView
          className="flex-1 px-6"
          contentContainerStyle={{ flexGrow: 1 }}
          showsVerticalScrollIndicator={false}
        >
          {/* 헤더 */}
          <View className="flex-1 justify-center">
            <View className="items-center mb-12">
              <View className="w-20 h-20 bg-blue-500 rounded-2xl items-center justify-center mb-6">
                <Ionicons name="school" size={40} color="white" />
              </View>
              <Text className="text-3xl font-bold text-gray-900 mb-2">
                CNU InforMate
              </Text>
              <Text className="text-lg text-gray-600 text-center">
                충남대학교 정보를 한눈에
              </Text>
            </View>

            {/* 로그인 폼 */}
            <View className="space-y-4">
              <Input
                label="이메일"
                placeholder="이메일을 입력하세요"
                value={email}
                onChangeText={setEmail}
                type="email"
                icon="mail-outline"
              />

              <Input
                label="비밀번호"
                placeholder="비밀번호를 입력하세요"
                value={password}
                onChangeText={setPassword}
                type="password"
                secureTextEntry={!showPassword}
                onToggleSecureText={() => setShowPassword(!showPassword)}
              />

              <Button
                title={isLoading ? "로그인 중..." : "로그인"}
                onPress={handleLogin}
                loading={isLoading}
                className="mt-6"
              />
            </View>

            {/* 회원가입 링크 */}
            <View className="mt-8 items-center">
              <Text className="text-gray-600 mb-2">계정이 없으신가요?</Text>
              <TouchableOpacity onPress={handleRegister}>
                <Text className="text-blue-500 font-semibold text-base">
                  회원가입하기
                </Text>
              </TouchableOpacity>
            </View>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}
