# CNU Informate - 개발 가이드

## 📋 목차

1. [개발 환경 설정](#개발-환경-설정)
2. [프로젝트 구조](#프로젝트-구조)
3. [코딩 컨벤션](#코딩-컨벤션)
4. [컴포넌트 개발 가이드](#컴포넌트-개발-가이드)
5. [상태 관리](#상태-관리)
6. [API 연동](#api-연동)
7. [테스팅](#테스팅)
8. [배포](#배포)

---

## 🛠️ 개발 환경 설정

### 필수 요구사항

- **Node.js**: 18.x 이상
- **React Native CLI**: 최신 버전
- **Xcode**: 15.x 이상 (iOS 개발용)
- **Android Studio**: 최신 버전 (Android 개발용)
- **CocoaPods**: iOS 의존성 관리

### 설치 가이드

```bash
# 1. Node.js 설치 확인
node --version
npm --version

# 2. React Native CLI 설치
npm install -g @react-native-community/cli

# 3. 프로젝트 의존성 설치
npm install

# 4. iOS 의존성 설치
cd ios && pod install && cd ..
```

### 개발 도구 설정

#### VS Code 확장 프로그램

- React Native Tools
- TypeScript and JavaScript Language Features
- ESLint
- Prettier
- Auto Rename Tag

#### 환경 변수 설정

```bash
# .env 파일 생성
cp .env.example .env

# 환경 변수 설정
REACT_NATIVE_API_URL=https://api.cnu-informate.com
REACT_NATIVE_ENV=development
```

---

## 📁 프로젝트 구조

```
cnu_informate_frontend/
├── src/
│   ├── components/          # 재사용 가능한 컴포넌트
│   │   ├── common/         # 공통 컴포넌트
│   │   ├── auth/          # 인증 관련 컴포넌트
│   │   ├── notice/        # 공지사항 관련 컴포넌트
│   │   └── settings/      # 설정 관련 컴포넌트
│   ├── screens/           # 화면 컴포넌트
│   │   ├── auth/         # 인증 화면
│   │   ├── main/         # 메인 화면
│   │   ├── info/         # 정보 화면
│   │   └── settings/     # 설정 화면
│   ├── navigation/        # 네비게이션 설정
│   ├── services/         # API 서비스
│   ├── store/            # 상태 관리
│   ├── utils/            # 유틸리티 함수
│   ├── types/            # TypeScript 타입 정의
│   └── constants/        # 상수 정의
├── android/              # Android 네이티브 코드
├── ios/                  # iOS 네이티브 코드
├── docs/                 # 문서
└── __tests__/           # 테스트 파일
```

---

## 📝 코딩 컨벤션

### 파일 명명 규칙

- **컴포넌트**: PascalCase (예: `NoticeCard.tsx`)
- **파일**: kebab-case (예: `notice-card.tsx`)
- **폴더**: kebab-case (예: `notice-components/`)
- **상수**: UPPER_SNAKE_CASE (예: `API_BASE_URL`)
- **함수/변수**: camelCase (예: `getNoticeList`)

### TypeScript 사용 규칙

```typescript
// 인터페이스 정의
interface Notice {
  id: string;
  title: string;
  content: string;
  category: string;
  importance: number;
  created_at: string;
  url?: string;
}

// 타입 정의
type NoticeCategory = "academic" | "scholarship" | "event" | "general";

// 함수 타입 정의
type ApiResponse<T> = {
  data: T;
  message: string;
  success: boolean;
};
```

### 컴포넌트 작성 규칙

```typescript
import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

interface NoticeCardProps {
  notice: Notice;
  onPress: (notice: Notice) => void;
}

export const NoticeCard: React.FC<NoticeCardProps> = ({ notice, onPress }) => {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>{notice.title}</Text>
      <Text style={styles.content}>{notice.content}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 16,
    backgroundColor: '#fff',
    borderRadius: 8,
    marginBottom: 8,
  },
  title: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 8,
  },
  content: {
    fontSize: 14,
    color: '#666',
  },
});
```

---

## 🧩 컴포넌트 개발 가이드

### 컴포넌트 구조

```typescript
// 1. Props 인터페이스 정의
interface ComponentProps {
  // 필수 props
  requiredProp: string;
  // 선택적 props
  optionalProp?: number;
  // 함수 props
  onPress?: () => void;
}

// 2. 컴포넌트 정의
export const Component: React.FC<ComponentProps> = ({
  requiredProp,
  optionalProp,
  onPress,
}) => {
  // 3. 상태 관리
  const [state, setState] = useState<string>('');

  // 4. 이벤트 핸들러
  const handlePress = () => {
    onPress?.();
  };

  // 5. 렌더링
  return (
    <View style={styles.container}>
      <Text>{requiredProp}</Text>
    </View>
  );
};

// 6. 스타일 정의
const styles = StyleSheet.create({
  container: {
    // 스타일 정의
  },
});
```

### 공통 컴포넌트 예시

#### Button 컴포넌트

```typescript
interface ButtonProps {
  title: string;
  onPress: () => void;
  variant?: 'primary' | 'secondary' | 'outline';
  disabled?: boolean;
  loading?: boolean;
}

export const Button: React.FC<ButtonProps> = ({
  title,
  onPress,
  variant = 'primary',
  disabled = false,
  loading = false,
}) => {
  return (
    <TouchableOpacity
      style={[styles.button, styles[variant], disabled && styles.disabled]}
      onPress={onPress}
      disabled={disabled || loading}
    >
      {loading ? (
        <ActivityIndicator color="#fff" />
      ) : (
        <Text style={[styles.text, styles[`${variant}Text`]]}>{title}</Text>
      )}
    </TouchableOpacity>
  );
};
```

#### Input 컴포넌트

```typescript
interface InputProps {
  label: string;
  value: string;
  onChangeText: (text: string) => void;
  placeholder?: string;
  secureTextEntry?: boolean;
  error?: string;
}

export const Input: React.FC<InputProps> = ({
  label,
  value,
  onChangeText,
  placeholder,
  secureTextEntry = false,
  error,
}) => {
  return (
    <View style={styles.container}>
      <Text style={styles.label}>{label}</Text>
      <TextInput
        style={[styles.input, error && styles.inputError]}
        value={value}
        onChangeText={onChangeText}
        placeholder={placeholder}
        secureTextEntry={secureTextEntry}
      />
      {error && <Text style={styles.errorText}>{error}</Text>}
    </View>
  );
};
```

---

## 🔄 상태 관리

### Redux Toolkit 사용

```typescript
// store/slices/noticeSlice.ts
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

interface NoticeState {
  notices: Notice[];
  loading: boolean;
  error: string | null;
}

const initialState: NoticeState = {
  notices: [],
  loading: false,
  error: null,
};

// Async thunk
export const fetchNotices = createAsyncThunk(
  "notice/fetchNotices",
  async () => {
    const response = await api.getNotices();
    return response.data;
  }
);

const noticeSlice = createSlice({
  name: "notice",
  initialState,
  reducers: {
    clearNotices: (state) => {
      state.notices = [];
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchNotices.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchNotices.fulfilled, (state, action) => {
        state.loading = false;
        state.notices = action.payload;
      })
      .addCase(fetchNotices.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || "Failed to fetch notices";
      });
  },
});

export const { clearNotices } = noticeSlice.actions;
export default noticeSlice.reducer;
```

### 컴포넌트에서 상태 사용

```typescript
import { useSelector, useDispatch } from 'react-redux';
import { fetchNotices } from '../store/slices/noticeSlice';

export const NoticeList: React.FC = () => {
  const dispatch = useDispatch();
  const { notices, loading, error } = useSelector(
    (state: RootState) => state.notice,
  );

  useEffect(() => {
    dispatch(fetchNotices());
  }, [dispatch]);

  if (loading) return <LoadingSpinner />;
  if (error) return <ErrorMessage message={error} />;

  return (
    <FlatList
      data={notices}
      renderItem={({ item }) => <NoticeCard notice={item} />}
      keyExtractor={item => item.id}
    />
  );
};
```

---

## 🌐 API 연동

### API 서비스 구조

```typescript
// services/api.ts
import axios from "axios";

const API_BASE_URL =
  process.env.REACT_NATIVE_API_URL || "http://localhost:3000";

const api = axios.create({
  baseURL: API_BASE_URL,
  timeout: 10000,
  headers: {
    "Content-Type": "application/json",
  },
});

// 요청 인터셉터
api.interceptors.request.use(
  (config) => {
    const token = getToken();
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// 응답 인터셉터
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      // 토큰 만료 처리
      logout();
    }
    return Promise.reject(error);
  }
);

export default api;
```

### API 함수 정의

```typescript
// services/noticeService.ts
import api from "./api";
import { Notice, ApiResponse } from "../types";

export const noticeService = {
  // 추천 공지 조회
  getRecommendedNotices: async (): Promise<ApiResponse<Notice[]>> => {
    const response = await api.get("/notices/recommended");
    return response.data;
  },

  // 카테고리별 공지 조회
  getNoticesByCategory: async (
    category: string
  ): Promise<ApiResponse<Notice[]>> => {
    const response = await api.get(`/notices/${category}`);
    return response.data;
  },

  // 공지 상세 조회
  getNoticeById: async (id: string): Promise<ApiResponse<Notice>> => {
    const response = await api.get(`/notices/${id}`);
    return response.data;
  },
};
```

### 커스텀 훅 사용

```typescript
// hooks/useApi.ts
import { useState, useEffect } from "react";

interface UseApiOptions<T> {
  onSuccess?: (data: T) => void;
  onError?: (error: string) => void;
  dependencies?: any[];
}

export const useApi = <T>(
  apiCall: () => Promise<T>,
  options: UseApiOptions<T> = {}
) => {
  const [data, setData] = useState<T | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const { onSuccess, onError, dependencies = [] } = options;

  const fetchData = async () => {
    try {
      setLoading(true);
      setError(null);
      const result = await apiCall();
      setData(result);
      onSuccess?.(result);
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : "Unknown error";
      setError(errorMessage);
      onError?.(errorMessage);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, dependencies);

  return { data, loading, error, refetch: fetchData };
};
```

---

## 🧪 테스팅

### Jest 설정

```javascript
// jest.config.js
module.exports = {
  preset: "react-native",
  moduleFileExtensions: ["ts", "tsx", "js", "jsx", "json", "node"],
  setupFilesAfterEnv: ["<rootDir>/jest.setup.js"],
  transformIgnorePatterns: [
    "node_modules/(?!(react-native|@react-native|@react-navigation)/)",
  ],
  testMatch: ["**/__tests__/**/*.test.(ts|tsx|js)"],
  collectCoverageFrom: [
    "src/**/*.{ts,tsx}",
    "!src/**/*.d.ts",
    "!src/**/index.ts",
  ],
};
```

### 컴포넌트 테스트 예시

```typescript
// __tests__/components/NoticeCard.test.tsx
import React from 'react';
import { render, fireEvent } from '@testing-library/react-native';
import { NoticeCard } from '../../src/components/NoticeCard';

const mockNotice = {
  id: '1',
  title: 'Test Notice',
  content: 'Test content',
  category: 'academic',
  importance: 1,
  created_at: '2024-01-01T00:00:00Z',
};

describe('NoticeCard', () => {
  it('renders notice title and content', () => {
    const { getByText } = render(
      <NoticeCard notice={mockNotice} onPress={() => {}} />,
    );

    expect(getByText('Test Notice')).toBeTruthy();
    expect(getByText('Test content')).toBeTruthy();
  });

  it('calls onPress when pressed', () => {
    const onPressMock = jest.fn();
    const { getByTestId } = render(
      <NoticeCard notice={mockNotice} onPress={onPressMock} />,
    );

    fireEvent.press(getByTestId('notice-card'));
    expect(onPressMock).toHaveBeenCalledWith(mockNotice);
  });
});
```

### API 테스트 예시

```typescript
// __tests__/services/noticeService.test.ts
import { noticeService } from "../../src/services/noticeService";
import api from "../../src/services/api";

jest.mock("../../src/services/api");

describe("noticeService", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("fetches recommended notices successfully", async () => {
    const mockResponse = {
      data: {
        success: true,
        data: [{ id: "1", title: "Test" }],
        message: "Success",
      },
    };

    (api.get as jest.Mock).mockResolvedValue(mockResponse);

    const result = await noticeService.getRecommendedNotices();

    expect(api.get).toHaveBeenCalledWith("/notices/recommended");
    expect(result).toEqual(mockResponse.data);
  });
});
```

---

## 🚀 배포

### Android 배포

```bash
# 1. 릴리즈 빌드 생성
cd android
./gradlew assembleRelease

# 2. APK 파일 위치
# android/app/build/outputs/apk/release/app-release.apk

# 3. 서명된 APK 생성 (키스토어 필요)
./gradlew bundleRelease
```

### iOS 배포

```bash
# 1. Xcode에서 Archive 생성
# Product > Archive

# 2. App Store Connect에 업로드
# Organizer에서 Distribute App 선택
```

### 환경별 설정

```typescript
// config/environment.ts
interface Environment {
  apiUrl: string;
  environment: "development" | "staging" | "production";
}

const environments: Record<string, Environment> = {
  development: {
    apiUrl: "http://localhost:3000",
    environment: "development",
  },
  staging: {
    apiUrl: "https://staging-api.cnu-informate.com",
    environment: "staging",
  },
  production: {
    apiUrl: "https://api.cnu-informate.com",
    environment: "production",
  },
};

export const getEnvironment = (): Environment => {
  const env = process.env.REACT_NATIVE_ENV || "development";
  return environments[env];
};
```

---

## 📚 추가 리소스

### 유용한 라이브러리

- **네비게이션**: `@react-navigation/native`
- **상태 관리**: `@reduxjs/toolkit`
- **UI 컴포넌트**: `react-native-elements`
- **아이콘**: `react-native-vector-icons`
- **이미지**: `react-native-fast-image`
- **폼**: `react-hook-form`
- **날짜**: `date-fns`
- **유효성 검사**: `yup`

### 디버깅 도구

- **React Native Debugger**
- **Flipper**
- **Reactotron**

### 성능 최적화

- **React Native Performance Monitor**
- **Flipper Performance Plugin**
- **React Native Reanimated**

---

**문서 버전**: 1.0  
**최종 수정일**: 2024년  
**작성자**: 개발팀
