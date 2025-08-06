import React, { useState } from 'react';
import { View, Text, ScrollView, TouchableOpacity, StyleSheet, RefreshControl } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

// 정보 타입 정의
interface InfoItem {
  id: string;
  title: string;
  content: string;
  category: string;
  date?: string;
  startDate?: string;
  endDate?: string;
  amount?: number;
}

// 임시 데이터
const mockAcademicSchedule: InfoItem[] = [
  {
    id: '1',
    title: '2024학년도 2학기 수강신청',
    content: '2학기 수강신청 기간입니다.',
    category: '학사일정',
    startDate: '2024-02-15',
    endDate: '2024-02-20',
  },
  {
    id: '2',
    title: '2024학년도 1학기 종강',
    content: '1학기 종강일입니다.',
    category: '학사일정',
    date: '2024-06-20',
  },
];

const mockScholarships: InfoItem[] = [
  {
    id: '1',
    title: '2024년 국가장학금 신청',
    content: '국가장학금 신청이 시작됩니다.',
    category: '장학금',
    amount: 675000,
    startDate: '2024-01-15',
    endDate: '2024-02-15',
  },
  {
    id: '2',
    title: '교내 성적우수장학금',
    content: '교내 성적우수장학금 신청 안내입니다.',
    category: '장학금',
    amount: 500000,
    startDate: '2024-01-20',
    endDate: '2024-02-20',
  },
];

const mockNotices: InfoItem[] = [
  {
    id: '1',
    title: '2024년 동아리 신규 모집',
    content: '새로운 동아리 모집이 시작됩니다.',
    category: '공지사항',
    date: '2024-01-15',
  },
  {
    id: '2',
    title: '도서관 이용 시간 변경',
    content: '도서관 이용 시간이 변경되었습니다.',
    category: '공지사항',
    date: '2024-01-14',
  },
];

type Category = '학사일정' | '장학금' | '공지사항';

export default function InfoScreen() {
  const [selectedCategory, setSelectedCategory] = useState<Category>('학사일정');
  const [refreshing, setRefreshing] = useState(false);

  const categories: { key: Category; label: string; icon: string }[] = [
    { key: '학사일정', label: '학사일정', icon: '📅' },
    { key: '장학금', label: '장학금', icon: '💰' },
    { key: '공지사항', label: '공지사항', icon: '📢' },
  ];

  const getDataByCategory = (category: Category): InfoItem[] => {
    switch (category) {
      case '학사일정':
        return mockAcademicSchedule;
      case '장학금':
        return mockScholarships;
      case '공지사항':
        return mockNotices;
      default:
        return [];
    }
  };

  const onRefresh = React.useCallback(() => {
    setRefreshing(true);
    // TODO: API 호출로 실제 데이터 가져오기
    setTimeout(() => {
      setRefreshing(false);
    }, 1000);
  }, []);

  const handleItemPress = (item: InfoItem) => {
    // TODO: 상세 페이지로 이동
    console.log('항목 클릭:', item.title);
  };

  const formatAmount = (amount?: number) => {
    if (!amount) return '';
    return `${amount.toLocaleString()}원`;
  };

  const formatDate = (date?: string) => {
    if (!date) return '';
    return new Date(date).toLocaleDateString('ko-KR');
  };

  const formatDateRange = (startDate?: string, endDate?: string) => {
    if (!startDate || !endDate) return '';
    return `${formatDate(startDate)} ~ ${formatDate(endDate)}`;
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerTitle}>정보 확인</Text>
        <Text style={styles.headerSubtitle}>학사 정보 및 공지사항</Text>
      </View>

      {/* 카테고리 탭 */}
      <View style={styles.categoryTabs}>
        {categories.map((category) => (
          <TouchableOpacity
            key={category.key}
            style={[
              styles.categoryTab,
              selectedCategory === category.key && styles.categoryTabActive,
            ]}
            onPress={() => setSelectedCategory(category.key)}
          >
            <Text style={styles.categoryIcon}>{category.icon}</Text>
            <Text
              style={[
                styles.categoryLabel,
                selectedCategory === category.key && styles.categoryLabelActive,
              ]}
            >
              {category.label}
            </Text>
          </TouchableOpacity>
        ))}
      </View>

      <ScrollView
        style={styles.content}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }
      >
        <View style={styles.itemList}>
          {getDataByCategory(selectedCategory).map((item) => (
            <TouchableOpacity
              key={item.id}
              style={styles.itemCard}
              onPress={() => handleItemPress(item)}
              activeOpacity={0.7}
            >
              <View style={styles.itemHeader}>
                <Text style={styles.itemTitle} numberOfLines={2}>
                  {item.title}
                </Text>
                {item.amount && (
                  <View style={styles.amountContainer}>
                    <Text style={styles.amountText}>
                      {formatAmount(item.amount)}
                    </Text>
                  </View>
                )}
              </View>

              <Text style={styles.itemContent} numberOfLines={3}>
                {item.content}
              </Text>

              <View style={styles.itemFooter}>
                <View style={styles.dateContainer}>
                  {item.date ? (
                    <Text style={styles.dateText}>{formatDate(item.date)}</Text>
                  ) : item.startDate && item.endDate ? (
                    <Text style={styles.dateText}>
                      {formatDateRange(item.startDate, item.endDate)}
                    </Text>
                  ) : null}
                </View>
                <Text style={styles.readMore}>자세히 보기 →</Text>
              </View>
            </TouchableOpacity>
          ))}
        </View>

        {getDataByCategory(selectedCategory).length === 0 && (
          <View style={styles.emptyState}>
            <Text style={styles.emptyStateText}>
              {selectedCategory} 정보가 없습니다.
            </Text>
            <Text style={styles.emptyStateSubtext}>
              나중에 다시 확인해주세요.
            </Text>
          </View>
        )}
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F5F5F5',
  },
  header: {
    padding: 20,
    backgroundColor: '#1976D2',
    paddingTop: 10,
  },
  headerTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#FFFFFF',
    marginBottom: 4,
  },
  headerSubtitle: {
    fontSize: 16,
    color: '#FFFFFF',
    opacity: 0.9,
  },
  categoryTabs: {
    flexDirection: 'row',
    backgroundColor: '#FFFFFF',
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderBottomWidth: 1,
    borderBottomColor: '#E0E0E0',
  },
  categoryTab: {
    flex: 1,
    alignItems: 'center',
    paddingVertical: 12,
    borderRadius: 8,
    marginHorizontal: 4,
  },
  categoryTabActive: {
    backgroundColor: '#E3F2FD',
  },
  categoryIcon: {
    fontSize: 20,
    marginBottom: 4,
  },
  categoryLabel: {
    fontSize: 12,
    color: '#757575',
    fontWeight: '500',
  },
  categoryLabelActive: {
    color: '#1976D2',
    fontWeight: '600',
  },
  content: {
    flex: 1,
  },
  itemList: {
    padding: 16,
  },
  itemCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    padding: 16,
    marginBottom: 12,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 3.84,
    elevation: 5,
  },
  itemHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: 8,
  },
  itemTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#212121',
    flex: 1,
    lineHeight: 22,
  },
  amountContainer: {
    backgroundColor: '#FF6B35',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 12,
    marginLeft: 8,
  },
  amountText: {
    color: '#FFFFFF',
    fontSize: 12,
    fontWeight: '600',
  },
  itemContent: {
    fontSize: 14,
    color: '#757575',
    lineHeight: 20,
    marginBottom: 12,
  },
  itemFooter: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  dateContainer: {
    flex: 1,
  },
  dateText: {
    fontSize: 12,
    color: '#9E9E9E',
  },
  readMore: {
    fontSize: 12,
    color: '#1976D2',
    fontWeight: '600',
  },
  emptyState: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 40,
  },
  emptyStateText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#757575',
    textAlign: 'center',
    marginBottom: 8,
  },
  emptyStateSubtext: {
    fontSize: 14,
    color: '#9E9E9E',
    textAlign: 'center',
    lineHeight: 20,
  },
}); 