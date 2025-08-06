import React from "react";
import {
    RefreshControl,
    ScrollView,
    StyleSheet,
    Text,
    TouchableOpacity,
    View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

// 공지사항 타입 정의
interface Notice {
    id: string;
    title: string;
    content: string;
    category: string;
    importance: number;
    created_at: string;
    url?: string;
}

// 임시 데이터 (나중에 API로 교체)
const mockNotices: Notice[] = [
    {
        id: "1",
        title: "2024학년도 2학기 수강신청 안내",
        content:
            "2024학년도 2학기 수강신청이 시작됩니다. 수강신청 기간과 방법을 확인하세요.",
        category: "학사/수업",
        importance: 5,
        created_at: "2024-01-15",
    },
    {
        id: "2",
        title: "2024년 국가장학금 신청 안내",
        content:
            "2024년 국가장학금 신청이 시작됩니다. 지원 자격과 신청 방법을 확인하세요.",
        category: "장학금",
        importance: 4,
        created_at: "2024-01-14",
    },
    {
        id: "3",
        title: "IT 취업 특강 안내",
        content:
            "IT 업계 전문가를 초빙한 취업 특강이 개최됩니다. 많은 참여 바랍니다.",
        category: "취업/인턴십",
        importance: 3,
        created_at: "2024-01-13",
    },
    {
        id: "4",
        title: "2024년 동아리 신규 모집",
        content:
            "2024년 새로운 동아리 모집이 시작됩니다. 관심 있는 학생들의 많은 참여 바랍니다.",
        category: "동아리/모임",
        importance: 2,
        created_at: "2024-01-12",
    },
];

export default function MainScreen() {
    const [refreshing, setRefreshing] = React.useState(false);
    const [notices, setNotices] = React.useState<Notice[]>(mockNotices);

    const onRefresh = React.useCallback(() => {
        setRefreshing(true);
        // TODO: API 호출로 실제 데이터 가져오기
        setTimeout(() => {
            setRefreshing(false);
        }, 1000);
    }, []);

    const getCategoryColor = (category: string) => {
        const colors: { [key: string]: string } = {
            "학사/수업": "#1976D2",
            장학금: "#FF6B35",
            "취업/인턴십": "#4CAF50",
            "IT/개발": "#9C27B0",
            "특강/세미나": "#FF9800",
            "마케팅/홍보": "#E91E63",
            "동아리/모임": "#607D8B",
            기타: "#757575",
        };
        return colors[category] || "#757575";
    };

    const getImportanceStars = (importance: number) => {
        return "★".repeat(importance) + "☆".repeat(5 - importance);
    };

    const handleNoticePress = (notice: Notice) => {
        // TODO: 공지 상세 페이지로 이동
        console.log("공지 클릭:", notice.title);
    };

    return (
        <SafeAreaView style={styles.container}>
            <View style={styles.header}>
                <Text style={styles.headerTitle}>CNU InfoMate</Text>
                <Text style={styles.headerSubtitle}>맞춤형 공지사항</Text>
            </View>

            <ScrollView
                style={styles.content}
                refreshControl={
                    <RefreshControl
                        refreshing={refreshing}
                        onRefresh={onRefresh}
                    />
                }
            >
                <View style={styles.noticeList}>
                    {notices.map((notice) => (
                        <TouchableOpacity
                            key={notice.id}
                            style={styles.noticeCard}
                            onPress={() => handleNoticePress(notice)}
                            activeOpacity={0.7}
                        >
                            <View style={styles.noticeHeader}>
                                <View style={styles.categoryContainer}>
                                    <View
                                        style={[
                                            styles.categoryTag,
                                            {
                                                backgroundColor:
                                                    getCategoryColor(
                                                        notice.category
                                                    ),
                                            },
                                        ]}
                                    >
                                        <Text style={styles.categoryText}>
                                            {notice.category}
                                        </Text>
                                    </View>
                                </View>
                                <View style={styles.importanceContainer}>
                                    <Text style={styles.importanceText}>
                                        {getImportanceStars(notice.importance)}
                                    </Text>
                                </View>
                            </View>

                            <Text style={styles.noticeTitle} numberOfLines={2}>
                                {notice.title}
                            </Text>

                            <Text
                                style={styles.noticeContent}
                                numberOfLines={3}
                            >
                                {notice.content}
                            </Text>

                            <View style={styles.noticeFooter}>
                                <Text style={styles.noticeDate}>
                                    {notice.created_at}
                                </Text>
                                <Text style={styles.readMore}>
                                    자세히 보기 →
                                </Text>
                            </View>
                        </TouchableOpacity>
                    ))}
                </View>

                {notices.length === 0 && (
                    <View style={styles.emptyState}>
                        <Text style={styles.emptyStateText}>
                            추천할 공지사항이 없습니다.
                        </Text>
                        <Text style={styles.emptyStateSubtext}>
                            관심 분야를 설정하거나 나중에 다시 시도해주세요.
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
        backgroundColor: "#F5F5F5",
    },
    header: {
        padding: 20,
        backgroundColor: "#1976D2",
        paddingTop: 10,
    },
    headerTitle: {
        fontSize: 24,
        fontWeight: "bold",
        color: "#FFFFFF",
        marginBottom: 4,
    },
    headerSubtitle: {
        fontSize: 16,
        color: "#FFFFFF",
        opacity: 0.9,
    },
    content: {
        flex: 1,
    },
    noticeList: {
        padding: 16,
    },
    noticeCard: {
        backgroundColor: "#FFFFFF",
        borderRadius: 12,
        padding: 16,
        marginBottom: 12,
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.1,
        shadowRadius: 3.84,
        elevation: 5,
    },
    noticeHeader: {
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        marginBottom: 8,
    },
    categoryContainer: {
        flex: 1,
    },
    categoryTag: {
        paddingHorizontal: 8,
        paddingVertical: 4,
        borderRadius: 12,
        alignSelf: "flex-start",
    },
    categoryText: {
        color: "#FFFFFF",
        fontSize: 12,
        fontWeight: "600",
    },
    importanceContainer: {
        marginLeft: 8,
    },
    importanceText: {
        fontSize: 14,
        color: "#FFD700",
    },
    noticeTitle: {
        fontSize: 16,
        fontWeight: "bold",
        color: "#212121",
        marginBottom: 8,
        lineHeight: 22,
    },
    noticeContent: {
        fontSize: 14,
        color: "#757575",
        lineHeight: 20,
        marginBottom: 12,
    },
    noticeFooter: {
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
    },
    noticeDate: {
        fontSize: 12,
        color: "#9E9E9E",
    },
    readMore: {
        fontSize: 12,
        color: "#1976D2",
        fontWeight: "600",
    },
    emptyState: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        padding: 40,
    },
    emptyStateText: {
        fontSize: 18,
        fontWeight: "bold",
        color: "#757575",
        textAlign: "center",
        marginBottom: 8,
    },
    emptyStateSubtext: {
        fontSize: 14,
        color: "#9E9E9E",
        textAlign: "center",
        lineHeight: 20,
    },
});
