import React from 'react';
import { View, TouchableOpacity } from 'react-native';

interface CardProps {
  children: React.ReactNode;
  onPress?: () => void;
  variant?: 'default' | 'elevated' | 'outlined';
  className?: string;
}

export default function Card({
  children,
  onPress,
  variant = 'default',
  className = '',
}: CardProps) {
  const getVariantClasses = () => {
    switch (variant) {
      case 'default':
        return 'bg-white rounded-2xl shadow-sm';
      case 'elevated':
        return 'bg-white rounded-2xl shadow-lg';
      case 'outlined':
        return 'bg-white rounded-2xl border border-gray-200';
      default:
        return 'bg-white rounded-2xl shadow-sm';
    }
  };

  const CardContainer = onPress ? TouchableOpacity : View;

  return (
    <CardContainer
      className={`${getVariantClasses()} ${className}`}
      onPress={onPress}
      activeOpacity={onPress ? 0.7 : 1}
    >
      {children}
    </CardContainer>
  );
}
