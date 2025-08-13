import React from 'react';
import { TouchableOpacity, Text, ActivityIndicator } from 'react-native';

interface ButtonProps {
  title: string;
  onPress: () => void;
  variant?: 'primary' | 'secondary' | 'outline' | 'danger';
  size?: 'small' | 'medium' | 'large';
  disabled?: boolean;
  loading?: boolean;
  className?: string;
}

export default function Button({
  title,
  onPress,
  variant = 'primary',
  size = 'medium',
  disabled = false,
  loading = false,
  className = '',
}: ButtonProps) {
  const getVariantClasses = () => {
    switch (variant) {
      case 'primary':
        return 'bg-blue-500';
      case 'secondary':
        return 'bg-gray-500';
      case 'outline':
        return 'bg-transparent border border-blue-500';
      case 'danger':
        return 'bg-red-500';
      default:
        return 'bg-blue-500';
    }
  };

  const getSizeClasses = () => {
    switch (size) {
      case 'small':
        return 'h-10 px-4';
      case 'medium':
        return 'h-14 px-6';
      case 'large':
        return 'h-16 px-8';
      default:
        return 'h-14 px-6';
    }
  };

  const getTextClasses = () => {
    const baseClasses = 'font-semibold text-center';
    const sizeClasses = size === 'small' ? 'text-sm' : 'text-base';
    const colorClasses = variant === 'outline' ? 'text-blue-500' : 'text-white';
    
    return `${baseClasses} ${sizeClasses} ${colorClasses}`;
  };

  const isDisabled = disabled || loading;

  return (
    <TouchableOpacity
      className={`
        ${getVariantClasses()}
        ${getSizeClasses()}
        rounded-xl
        items-center
        justify-center
        ${isDisabled ? 'opacity-50' : ''}
        ${className}
      `}
      onPress={onPress}
      disabled={isDisabled}
    >
      {loading ? (
        <ActivityIndicator color={variant === 'outline' ? '#3B82F6' : '#FFFFFF'} />
      ) : (
        <Text className={getTextClasses()}>{title}</Text>
      )}
    </TouchableOpacity>
  );
}
