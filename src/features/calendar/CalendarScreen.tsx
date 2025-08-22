import React, { useEffect, useState } from "react";
import { Alert, ScrollView, Text, TouchableOpacity, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useEventStore } from "../../stores/eventStore";

// 일정 타입 정의
interface Event {
  id: string;
  title: string;
  description: string;
  date: string;
  time?: string;
  category: string;
  color: string;
}

// 임시 일정 데이터
const mockEvents: Event[] = [
  {
    id: "1",
    title: "2024학년도 2학기 수강신청",
    description:
      "2학기 수강신청 기간입니다. 수강신청 기간과 방법을 확인하세요.",
    date: "2024-02-15",
    time: "09:00",
    category: "학사안내",

    color: "#4285F4",
  },
  {
    id: "2",
    title: "2024년 국가장학금 신청",
    description:
      "국가장학금 신청이 시작됩니다. 지원 자격과 신청 방법을 확인하세요.",
    date: "2024-01-15",
    time: "10:00",
    category: "학사안내",

    color: "#EA4335",
  },
  {
    id: "3",
    title: "IT 취업 특강",
    description: "IT 업계 전문가를 초빙한 취업 특강이 개최됩니다.",
    date: "2024-01-20",
    time: "14:00",
    category: "특강",

    color: "#FBBC04",
  },
  {
    id: "4",
    title: "2024년 동아리 신규 모집",
    description: "새로운 동아리 모집이 시작됩니다.",
    date: "2024-01-25",
    time: "16:00",
    category: "스터디",

    color: "#34A853",
  },
];

export default function CalendarScreen() {
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [currentMonth, setCurrentMonth] = useState(new Date());
  const { userEvents, fetchUserEvents, getAllEventsForDate, isLoading } =
    useEventStore();

  // 현재 월의 일정 가져오기
  const getEventsForMonth = (date: Date) => {
    const year = date.getFullYear();
    const month = date.getMonth();
    return mockEvents.filter((event) => {
      const eventDate = new Date(event.date);
      return eventDate.getFullYear() === year && eventDate.getMonth() === month;
    });
  };

  // 선택된 날짜의 일정 가져오기
  const getEventsForDate = (date: Date) => {
    const dateString = date.toISOString().split("T")[0];
    return mockEvents.filter((event) => event.date === dateString);
  };

  // 특정 날짜의 일정 가져오기 (기본 일정 + 모든 일정)
  const getEventsForDay = (date: Date) => {
    const dateString = date.toISOString().split("T")[0];
    const mockEventsForDay = mockEvents.filter(
      (event) => event.date === dateString
    );
    const allEventsForDay = getAllEventsForDate(dateString);

    return [
      ...mockEventsForDay,
      ...allEventsForDay.map((event) => ({
        id: event.id,
        title: event.title,
        description:
          event.source === "local"
            ? `등록된 일정: ${event.originalItemTitle}`
            : event.originalItemTitle,
        date: event.date,
        category: event.source === "local" ? "내 일정" : "API 일정",
        color: event.source === "local" ? "#3B82F6" : "#10B981",
      })),
    ];
  };

  // 월 이동
  const changeMonth = (direction: "prev" | "next") => {
    const newMonth = new Date(currentMonth);
    if (direction === "prev") {
      newMonth.setMonth(newMonth.getMonth() - 1);
    } else {
      newMonth.setMonth(newMonth.getMonth() + 1);
    }
    setCurrentMonth(newMonth);
  };

  // 달력 날짜 생성
  const generateCalendarDays = (date: Date) => {
    const year = date.getFullYear();
    const month = date.getMonth();
    const firstDay = new Date(year, month, 1);
    const lastDay = new Date(year, month + 1, 0);
    const startDate = new Date(firstDay);
    startDate.setDate(startDate.getDate() - firstDay.getDay());

    const days = [];
    for (let i = 0; i < 42; i++) {
      const day = new Date(startDate);
      day.setDate(startDate.getDate() + i);
      days.push(day);
    }
    return days;
  };

  // 날짜 포맷팅
  const formatDate = (date: Date) => {
    return date.toLocaleDateString("ko-KR", { month: "long", year: "numeric" });
  };

  // 요일 헤더
  const weekDays = ["일", "월", "화", "수", "목", "금", "토"];

  // API에서 일정 불러오기
  useEffect(() => {
    // TODO: 실제 사용자 ID로 교체 필요
    fetchUserEvents(1);
  }, [fetchUserEvents]);

  const calendarDays = generateCalendarDays(currentMonth);
  const monthEvents = getEventsForMonth(currentMonth);
  const selectedDateEvents = getAllEventsForDate(
    selectedDate.toISOString().split("T")[0]
  );

  return (
    <SafeAreaView
      className="flex-1 bg-gray-50"
      edges={["top", "left", "right"]}
    >
      <ScrollView className="flex-1" contentContainerStyle={{ paddingTop: 20 }}>
        <View className="px-5 mb-6">
          <Text className="text-3xl font-bold text-gray-900 mb-2">일정</Text>
          <Text className="text-lg text-gray-600">
            학사 일정을 달력으로 확인하세요
          </Text>
        </View>

        {/* 달력 컨테이너 */}
        <View className="mx-5 mb-6">
          <View
            className="bg-white rounded-3xl p-6"
            style={{
              shadowColor: "#000",
              shadowOffset: { width: 0, height: 4 },
              shadowOpacity: 0.1,
              shadowRadius: 12,
              elevation: 8,
            }}
          >
            {/* 월 네비게이션 */}
            <View className="flex-row items-center justify-between mb-6">
              <TouchableOpacity
                onPress={() => changeMonth("prev")}
                className="w-10 h-10 rounded-full bg-gray-100 items-center justify-center"
                activeOpacity={0.7}
              >
                <Text className="text-lg">‹</Text>
              </TouchableOpacity>
              <Text className="text-xl font-bold text-gray-900">
                {formatDate(currentMonth)}
              </Text>
              <TouchableOpacity
                onPress={() => changeMonth("next")}
                className="w-10 h-10 rounded-full bg-gray-100 items-center justify-center"
                activeOpacity={0.7}
              >
                <Text className="text-lg">›</Text>
              </TouchableOpacity>
            </View>

            {/* 요일 헤더 */}
            <View className="flex-row mb-2">
              {weekDays.map((day, index) => (
                <View key={day} className="flex-1 items-center py-2">
                  <Text
                    className={`text-xs font-semibold ${
                      index === 0 ? "text-red-500" : "text-gray-600"
                    }`}
                  >
                    {day}
                  </Text>
                </View>
              ))}
            </View>

            {/* 달력 그리드 */}
            <View>
              {Array.from({ length: 6 }, (_, weekIndex) => (
                <View key={weekIndex} className="flex-row">
                  {calendarDays
                    .slice(weekIndex * 7, (weekIndex + 1) * 7)
                    .map((day, dayIndex) => {
                      const isCurrentMonth =
                        day.getMonth() === currentMonth.getMonth();
                      const isSelected =
                        day.toDateString() === selectedDate.toDateString();
                      const isToday =
                        day.toDateString() === new Date().toDateString();
                      const dayEvents = getEventsForDay(day);

                      return (
                        <TouchableOpacity
                          key={dayIndex}
                          className={`flex-1 h-16 items-center justify-start pt-1 ${
                            isSelected
                              ? "bg-blue-500 rounded-lg"
                              : isToday
                                ? "bg-blue-50 rounded-lg"
                                : ""
                          }`}
                          onPress={() => setSelectedDate(day)}
                          disabled={!isCurrentMonth}
                        >
                          <View className="w-full h-full items-center">
                            {/* 날짜 표시 - 맨 위 */}
                            <Text
                              className={`text-sm font-medium mb-1 ${
                                !isCurrentMonth
                                  ? "text-gray-300"
                                  : isSelected
                                    ? "text-white"
                                    : isToday
                                      ? "text-blue-600"
                                      : "text-gray-700"
                              }`}
                            >
                              {day.getDate()}
                            </Text>

                            {/* 일정 표시 - 간단한 점으로 */}
                            {dayEvents.length > 0 && (
                              <View className="flex-row justify-center">
                                {dayEvents.slice(0, 3).map((event, index) => (
                                  <View
                                    key={event.id}
                                    className="w-1.5 h-1.5 rounded-full mx-0.5"
                                    style={{
                                      backgroundColor: isSelected
                                        ? "rgba(255, 255, 255, 0.8)"
                                        : event.color,
                                    }}
                                  />
                                ))}
                                {dayEvents.length > 3 && (
                                  <Text
                                    className={`text-xs ${
                                      isSelected
                                        ? "text-white"
                                        : "text-gray-500"
                                    }`}
                                  >
                                    +{dayEvents.length - 3}
                                  </Text>
                                )}
                              </View>
                            )}
                          </View>
                        </TouchableOpacity>
                      );
                    })}
                </View>
              ))}
            </View>
          </View>
        </View>

        {/* 선택된 날짜의 일정 */}
        <View className="mb-6">
          <Text className="text-lg font-bold text-gray-900 mx-5 mb-3">
            {selectedDate.toLocaleDateString("ko-KR", {
              month: "long",
              day: "numeric",
              weekday: "long",
            })}
          </Text>
          <View className="mx-5">
            {selectedDateEvents.length > 0 ? (
              selectedDateEvents.map((event) => (
                <TouchableOpacity
                  key={event.id}
                  className="bg-white rounded-2xl p-5 mb-3"
                  style={{
                    shadowColor: "#000",
                    shadowOffset: { width: 0, height: 2 },
                    shadowOpacity: 0.1,
                    shadowRadius: 8,
                    elevation: 3,
                  }}
                  activeOpacity={0.8}
                  onPress={() => {
                    Alert.alert(
                      event.title,
                      event.description || event.originalItemTitle
                    );
                  }}
                >
                  <View className="flex-row justify-between items-start mb-2">
                    <View className="flex-1">
                      <View className="flex-row items-center mb-2">
                        <View
                          className="w-3 h-3 rounded-full mr-2"
                          style={{ backgroundColor: event.color || "#3B82F6" }}
                        />
                        <Text className="text-sm text-gray-600 font-semibold">
                          {event.source === "local" ? "내 일정" : "내 일정"}
                        </Text>
                      </View>
                      <Text className="text-lg font-bold text-gray-900 mb-1">
                        {event.title}
                      </Text>
                      {event.source === "api" &&
                        event.originalItemTitle !== event.title && (
                          <Text className="text-sm text-gray-500 mb-2 italic">
                            📋 {event.originalItemTitle}
                          </Text>
                        )}
                      <Text className="text-sm text-gray-600 leading-5">
                        {event.description || event.originalItemTitle}
                      </Text>
                    </View>
                    {event.time && (
                      <View className="bg-gray-100 px-3 py-1 rounded-full">
                        <Text className="text-xs text-gray-600 font-medium">
                          {event.time}
                        </Text>
                      </View>
                    )}
                  </View>
                  <View className="flex-row items-center justify-between">
                    <Text className="text-xs text-blue-500 font-semibold">
                      자세히 보기 →
                    </Text>
                  </View>
                </TouchableOpacity>
              ))
            ) : (
              <View className="bg-white rounded-2xl p-8 items-center">
                <Text className="text-lg font-bold text-gray-600 mb-2">
                  일정이 없습니다
                </Text>
                <Text className="text-sm text-gray-500 text-center">
                  글 상세화면에서 + 버튼을 눌러 일정을 등록해보세요
                </Text>
              </View>
            )}
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}
