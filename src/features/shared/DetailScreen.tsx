import { Ionicons } from "@expo/vector-icons";
import DateTimePicker from "@react-native-community/datetimepicker";
import React, { useState } from "react";
import {
  Alert,
  Dimensions,
  Linking,
  Modal,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

import { getCategoryColor } from "../../shared/constants/categories";
import { DetailItem } from "../../shared/types";
import {
  formatAmount,
  formatDate,
  formatDateRange,
} from "../../shared/utils/helpers";
import { useEventStore } from "../../stores/eventStore";

interface DetailScreenProps {
  navigation: any;
  route: {
    params: {
      item: DetailItem;
    };
  };
}

export default function DetailScreen({ navigation, route }: DetailScreenProps) {
  const { item } = route.params;
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [eventTitle, setEventTitle] = useState("");
  const { addEvent, createEventFromNotice } = useEventStore();

  const handleBackPress = () => {
    navigation.goBack();
  };

  const getScreenTitle = () => {
    return "상세 정보";
  };

  const renderMetaInfo = () => {
    return (
      <View className="flex-row items-center justify-between mb-6">
        <View className="flex-row items-center space-x-3">
          {/* 카테고리 태그 */}
          {item.category && (
            <View
              className="px-3 py-1 rounded-full"
              style={{
                backgroundColor: getCategoryColor(item.category) + "20",
              }}
            >
              <Text
                className="text-sm font-semibold"
                style={{ color: getCategoryColor(item.category) }}
              >
                {item.category}
              </Text>
            </View>
          )}
        </View>

        {/* 날짜 정보 */}
        <Text className="text-sm text-gray-500">
          {item.created_at && formatDate(item.created_at)}
          {item.date && formatDate(item.date)}
        </Text>
      </View>
    );
  };

  const handleUrlPress = async () => {
    if (!item.url) return;

    try {
      // URL이 유효한지 확인
      const supported = await Linking.canOpenURL(item.url);

      if (supported) {
        await Linking.openURL(item.url);
      } else {
        Alert.alert("링크 열기 실패", "이 링크를 열 수 없습니다.", [
          { text: "확인", style: "default" },
        ]);
      }
    } catch (error) {
      Alert.alert("오류 발생", "링크를 여는 중 오류가 발생했습니다.", [
        { text: "확인", style: "default" },
      ]);
    }
  };

  const handleAddEvent = () => {
    setIsModalVisible(true);
  };

  const handleCreateEvent = async () => {
    const finalTitle = eventTitle.trim() || item.title;
    const eventDate = selectedDate.toISOString().split("T")[0];

    try {
      // API로 일정 생성 (공지사항인 경우)
      if (item.type === "notice" && typeof item.id === "number") {
        await createEventFromNotice(1, item.id, eventDate, finalTitle); // TODO: 실제 사용자 ID로 교체
        Alert.alert(
          "일정 등록 완료 (API)",
          `제목: ${finalTitle}\n날짜: ${selectedDate.toLocaleDateString("ko-KR")}`,
          [{ text: "확인", style: "default" }]
        );
      } else {
        // 로컬 스토어에 일정 추가
        addEvent({
          title: finalTitle,
          date: eventDate,
          originalItemTitle: item.title,
        });
        Alert.alert(
          "일정 등록 완료 (로컬)",
          `제목: ${finalTitle}\n날짜: ${selectedDate.toLocaleDateString("ko-KR")}`,
          [{ text: "확인", style: "default" }]
        );
      }

      console.log("일정 등록:", {
        title: finalTitle,
        date: eventDate,
        originalItem: item.title,
        userInput: eventTitle,
        type: item.type,
        method:
          item.type === "notice" && typeof item.id === "number"
            ? "API"
            : "Local",
      });
    } catch (error) {
      console.error("일정 등록 실패:", error);
      Alert.alert("일정 등록 실패", "일정 등록 중 오류가 발생했습니다.", [
        { text: "확인", style: "default" },
      ]);
    }

    setIsModalVisible(false);
    setEventTitle("");
    setSelectedDate(new Date());
  };

  const handleModalClose = () => {
    setIsModalVisible(false);
    setEventTitle("");
    setSelectedDate(new Date());
  };

  return (
    <SafeAreaView className="flex-1 bg-white" edges={["top", "left", "right"]}>
      {/* 헤더 */}
      <View className="flex-row items-center justify-between px-5 py-4 bg-white border-b border-gray-200">
        <TouchableOpacity
          onPress={handleBackPress}
          className="p-2 -ml-2"
          activeOpacity={0.7}
        >
          <Ionicons name="arrow-back" size={24} color="#000" />
        </TouchableOpacity>
        <Text className="text-lg font-semibold text-gray-900">
          {getScreenTitle()}
        </Text>
        <View className="w-10" />
      </View>

      {/* 스크롤 가능한 콘텐츠 영역 */}
      <ScrollView
        className="flex-1"
        contentContainerStyle={{
          padding: 20,
          paddingBottom: item.url ? 100 : 20,
        }}
      >
        {/* 제목 */}
        <Text className="text-2xl font-bold text-gray-900 mb-4">
          {item.title}
        </Text>

        {/* 메타 정보 */}
        {renderMetaInfo()}

        {/* 내용 */}
        <View className="mb-6">
          <Text className="text-base leading-7 text-gray-800">
            {item.content}
          </Text>
        </View>

        {/* 추가 정보 (정보 아이템인 경우에만) */}
        {item.type === "info" && (
          <View className="mb-6">
            {/* 기간 정보 */}
            {item.startDate && item.endDate && (
              <View className="flex-row items-center justify-between py-2 border-b border-gray-100">
                <Text className="text-sm font-semibold text-gray-600">
                  기간
                </Text>
                <Text className="text-sm text-gray-900">
                  {formatDateRange(item.startDate, item.endDate)}
                </Text>
              </View>
            )}

            {/* 금액 정보 */}
            {item.amount && (
              <View className="flex-row items-center justify-between py-2 border-b border-gray-100">
                <Text className="text-sm font-semibold text-gray-600">
                  금액
                </Text>
                <Text className="text-sm font-semibold text-green-600">
                  {formatAmount(item.amount)}
                </Text>
              </View>
            )}
          </View>
        )}
        {item.url && (
          <View className="absolute bottom-4 left-4 right-4">
            <View className="flex-row justify-end">
              <TouchableOpacity
                className="flex-row items-center"
                activeOpacity={0.7}
                onPress={handleUrlPress}
              >
                <Ionicons name="link" size={16} color="#3B82F6" />
                <Text className="text-blue-500 underline pl-2 pr-4 text-sm font-medium">
                  글 링크 열기
                </Text>
              </TouchableOpacity>
            </View>
          </View>
        )}
      </ScrollView>

      {/* 우측 하단 + 버튼 */}
      <TouchableOpacity
        style={styles.floatingButton}
        onPress={handleAddEvent}
        activeOpacity={0.8}
      >
        <Ionicons name="add" size={24} color="white" />
      </TouchableOpacity>

      {/* 일정 등록 모달 */}
      <Modal
        visible={isModalVisible}
        transparent={true}
        animationType="slide"
        onRequestClose={handleModalClose}
      >
        <View style={styles.modalOverlay}>
          <View style={styles.modalContent}>
            <View style={styles.modalHeader}>
              <TouchableOpacity onPress={handleModalClose}>
                <Text style={styles.cancelButton}>취소</Text>
              </TouchableOpacity>
              <Text style={styles.modalTitle}>일정 등록</Text>
              <TouchableOpacity onPress={handleCreateEvent}>
                <Text style={styles.confirmButton}>완료</Text>
              </TouchableOpacity>
            </View>

            <View style={styles.inputSection}>
              <Text style={styles.inputLabel}>제목</Text>
              <TextInput
                style={styles.textInput}
                value={eventTitle}
                onChangeText={setEventTitle}
                placeholder={item.title}
                placeholderTextColor="#999"
              />
            </View>

            <View style={styles.dateSection}>
              <Text style={styles.inputLabel}>날짜</Text>
              <View style={styles.datePickerContainer}>
                <DateTimePicker
                  value={selectedDate}
                  mode="date"
                  display="spinner"
                  onChange={(event: any, date?: Date) => {
                    if (date) setSelectedDate(date);
                  }}
                  style={styles.datePicker}
                  locale="ko-KR"
                />
              </View>
            </View>
          </View>
        </View>
      </Modal>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  floatingButton: {
    position: "absolute",
    bottom: 30,
    right: 20,
    width: 56,
    height: 56,
    borderRadius: 28,
    backgroundColor: "#3B82F6",
    justifyContent: "center",
    alignItems: "center",
    elevation: 8,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: "rgba(0, 0, 0, 0.5)",
    justifyContent: "flex-end",
  },
  modalContent: {
    backgroundColor: "white",
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    paddingTop: 20,
    paddingBottom: 40,
    paddingHorizontal: 20,
    maxHeight: Dimensions.get("window").height * 0.7,
  },
  modalHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingBottom: 20,
    borderBottomWidth: 1,
    borderBottomColor: "#f0f0f0",
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#000",
  },
  cancelButton: {
    fontSize: 16,
    color: "#999",
  },
  confirmButton: {
    fontSize: 16,
    color: "#3B82F6",
    fontWeight: "600",
  },
  inputSection: {
    marginTop: 20,
    marginBottom: 20,
  },
  inputLabel: {
    fontSize: 16,
    fontWeight: "600",
    color: "#000",
    marginBottom: 10,
  },
  textInput: {
    borderWidth: 1,
    borderColor: "#e0e0e0",
    borderRadius: 8,
    padding: 12,
    fontSize: 16,
    backgroundColor: "#f9f9f9",
  },
  dateSection: {
    marginBottom: 20,
  },
  datePickerContainer: {
    alignItems: "center",
    justifyContent: "center",
  },
  datePicker: {
    height: 200,
    width: "100%",
  },
});
