import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Alert,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import { useAuthStore } from '../stores/authStore';

interface LoginScreenProps {
  navigation: any;
}

export default function LoginScreen({ navigation }: LoginScreenProps) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  
  const { login, isLoading } = useAuthStore();

  const handleLogin = async () => {
    if (!email.trim() || !password.trim()) {
      Alert.alert('오류', '이메일과 비밀번호를 입력해주세요.');
      return;
    }

    const success = await login(email.trim(), password);
    if (!success) {
      Alert.alert('로그인 실패', '이메일 또는 비밀번호를 확인해주세요.');
    }
  };

  const handleRegister = () => {
    navigation.navigate('Register');
  };

  return (
    <SafeAreaView className="flex-1 bg-white">
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
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
                CNU InfoMate
              </Text>
              <Text className="text-lg text-gray-600 text-center">
                충남대학교 정보를 한눈에
              </Text>
            </View>

            {/* 로그인 폼 */}
            <View className="space-y-4">
              <View>
                <Text className="text-sm font-semibold text-gray-700 mb-2">
                  이메일
                </Text>
                <View className="relative">
                  <TextInput
                    className="w-full h-14 px-4 bg-gray-50 rounded-xl border border-gray-200 text-base"
                    placeholder="이메일을 입력하세요"
                    value={email}
                    onChangeText={setEmail}
                    keyboardType="email-address"
                    autoCapitalize="none"
                    autoCorrect={false}
                  />
                  <View className="absolute right-4 top-4">
                    <Ionicons name="mail-outline" size={20} color="#9CA3AF" />
                  </View>
                </View>
              </View>

              <View>
                <Text className="text-sm font-semibold text-gray-700 mb-2">
                  비밀번호
                </Text>
                <View className="relative">
                  <TextInput
                    className="w-full h-14 px-4 bg-gray-50 rounded-xl border border-gray-200 text-base"
                    placeholder="비밀번호를 입력하세요"
                    value={password}
                    onChangeText={setPassword}
                    secureTextEntry={!showPassword}
                    autoCapitalize="none"
                  />
                  <TouchableOpacity
                    className="absolute right-4 top-4"
                    onPress={() => setShowPassword(!showPassword)}
                  >
                    <Ionicons
                      name={showPassword ? 'eye-off-outline' : 'eye-outline'}
                      size={20}
                      color="#9CA3AF"
                    />
                  </TouchableOpacity>
                </View>
              </View>

              <TouchableOpacity
                className={`w-full h-14 rounded-xl items-center justify-center mt-6 ${
                  isLoading ? 'bg-gray-300' : 'bg-blue-500'
                }`}
                onPress={handleLogin}
                disabled={isLoading}
              >
                {isLoading ? (
                  <Text className="text-white font-semibold text-base">
                    로그인 중...
                  </Text>
                ) : (
                  <Text className="text-white font-semibold text-base">
                    로그인
                  </Text>
                )}
              </TouchableOpacity>
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
