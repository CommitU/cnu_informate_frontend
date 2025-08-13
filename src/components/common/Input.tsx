import React from 'react';
import { View, Text, TextInput, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

interface InputProps {
  label?: string;
  placeholder: string;
  value: string;
  onChangeText: (text: string) => void;
  type?: 'text' | 'email' | 'password' | 'numeric';
  icon?: keyof typeof Ionicons.glyphMap;
  secureTextEntry?: boolean;
  onToggleSecureText?: () => void;
  maxLength?: number;
  autoCapitalize?: 'none' | 'sentences' | 'words' | 'characters';
  autoCorrect?: boolean;
  error?: string;
  className?: string;
}

export default function Input({
  label,
  placeholder,
  value,
  onChangeText,
  type = 'text',
  icon,
  secureTextEntry = false,
  onToggleSecureText,
  maxLength,
  autoCapitalize = 'none',
  autoCorrect = false,
  error,
  className = '',
}: InputProps) {
  const getKeyboardType = () => {
    switch (type) {
      case 'email':
        return 'email-address';
      case 'numeric':
        return 'numeric';
      default:
        return 'default';
    }
  };

  const getSecureTextEntry = () => {
    if (type === 'password') {
      return secureTextEntry;
    }
    return false;
  };

  return (
    <View className={`${className}`}>
      {label && (
        <Text className="text-sm font-semibold text-gray-700 mb-2">
          {label}
        </Text>
      )}
      
      <View className="relative">
        <TextInput
          className={`
            w-full h-14 px-4 
            bg-gray-50 rounded-xl border 
            text-base
            ${error ? 'border-red-300' : 'border-gray-200'}
          `}
          placeholder={placeholder}
          value={value}
          onChangeText={onChangeText}
          keyboardType={getKeyboardType()}
          secureTextEntry={getSecureTextEntry()}
          maxLength={maxLength}
          autoCapitalize={autoCapitalize}
          autoCorrect={autoCorrect}
        />
        
        {/* 아이콘 */}
        {icon && (
          <View className="absolute right-4 top-4">
            <Ionicons name={icon} size={20} color="#9CA3AF" />
          </View>
        )}
        
        {/* 비밀번호 토글 버튼 */}
        {type === 'password' && onToggleSecureText && (
          <TouchableOpacity
            className="absolute right-4 top-4"
            onPress={onToggleSecureText}
          >
            <Ionicons
              name={secureTextEntry ? 'eye-off-outline' : 'eye-outline'}
              size={20}
              color="#9CA3AF"
            />
          </TouchableOpacity>
        )}
      </View>
      
      {/* 에러 메시지 */}
      {error && (
        <Text className="text-red-500 text-sm mt-1">{error}</Text>
      )}
    </View>
  );
}
