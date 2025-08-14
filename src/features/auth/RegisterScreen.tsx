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

interface RegisterScreenProps {
  navigation: any;
}

export default function RegisterScreen({ navigation }: RegisterScreenProps) {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [studentId, setStudentId] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const { register, isLoading } = useAuthStore();

  const validateForm = () => {
    if (!name.trim()) {
      Alert.alert("오류", "이름을 입력해주세요.");
      return false;
    }
    if (!email.trim()) {
      Alert.alert("오류", "이메일을 입력해주세요.");
      return false;
    }
    if (!email.includes("@")) {
      Alert.alert("오류", "올바른 이메일 형식을 입력해주세요.");
      return false;
    }
    if (!studentId.trim()) {
      Alert.alert("오류", "학번을 입력해주세요.");
      return false;
    }
    if (password.length < 6) {
      Alert.alert("오류", "비밀번호는 6자 이상 입력해주세요.");
      return false;
    }
    if (password !== confirmPassword) {
      Alert.alert("오류", "비밀번호가 일치하지 않습니다.");
      return false;
    }
    return true;
  };

  const handleRegister = async () => {
    if (!validateForm()) return;

    const success = await register(
      email.trim(),
      password,
      name.trim(),
      studentId.trim()
    );

    if (!success) {
      Alert.alert("회원가입 실패", "회원가입 중 오류가 발생했습니다.");
    }
  };

  const handleBackToLogin = () => {
    navigation.goBack();
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
            <View className="items-center mb-8">
              <TouchableOpacity
                className="absolute left-0 top-0 p-2"
                onPress={handleBackToLogin}
              >
                <Ionicons name="arrow-back" size={24} color="#374151" />
              </TouchableOpacity>

              <View className="w-16 h-16 bg-blue-500 rounded-2xl items-center justify-center mb-4">
                <Ionicons name="person-add" size={32} color="white" />
              </View>
              <Text className="text-2xl font-bold text-gray-900 mb-2">
                회원가입
              </Text>
              <Text className="text-base text-gray-600 text-center">
                CNU InfoMate에 가입하고 시작하세요
              </Text>
            </View>

            {/* 회원가입 폼 */}
            <View className="space-y-4">
              <Input
                label="이름"
                placeholder="이름을 입력하세요"
                value={name}
                onChangeText={setName}
                type="text"
                icon="person-outline"
                autoCapitalize="words"
              />

              <Input
                label="이메일"
                placeholder="이메일을 입력하세요"
                value={email}
                onChangeText={setEmail}
                type="email"
                icon="mail-outline"
              />

              <Input
                label="학번"
                placeholder="학번을 입력하세요"
                value={studentId}
                onChangeText={setStudentId}
                type="numeric"
                icon="card-outline"
                maxLength={8}
              />

              <Input
                label="비밀번호"
                placeholder="비밀번호를 입력하세요 (6자 이상)"
                value={password}
                onChangeText={setPassword}
                type="password"
                secureTextEntry={!showPassword}
                onToggleSecureText={() => setShowPassword(!showPassword)}
              />

              <Input
                label="비밀번호 확인"
                placeholder="비밀번호를 다시 입력하세요"
                value={confirmPassword}
                onChangeText={setConfirmPassword}
                type="password"
                secureTextEntry={!showConfirmPassword}
                onToggleSecureText={() =>
                  setShowConfirmPassword(!showConfirmPassword)
                }
              />

              <Button
                title={isLoading ? "가입 중..." : "회원가입"}
                onPress={handleRegister}
                loading={isLoading}
                className="mt-6"
              />
            </View>

            {/* 로그인 링크 */}
            <View className="mt-6 items-center">
              <Text className="text-gray-600 mb-2">
                이미 계정이 있으신가요?
              </Text>
              <TouchableOpacity onPress={handleBackToLogin}>
                <Text className="text-blue-500 font-semibold text-base">
                  로그인하기
                </Text>
              </TouchableOpacity>
            </View>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}
