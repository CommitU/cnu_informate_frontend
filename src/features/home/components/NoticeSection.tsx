import React from "react";
import { Text, View } from "react-native";

import { Notice } from "../../../shared/types";
import EmptyState from "./EmptyState";
import NoticeCard from "./NoticeCard";

interface NoticeSectionProps {
  notices: Notice[];
  selectedInterestsCount: number;
  onNoticePress: (notice: Notice) => void;
}

const NoticeSection: React.FC<NoticeSectionProps> = ({
  notices,
  selectedInterestsCount,
  onNoticePress,
}) => {
  return (
    <View className="mb-6">
      <Text className="text-gray-900 font-semibold text-lg mb-4">
        {selectedInterestsCount > 0 ? "나를 위한 추천" : "최근 공지사항"}
      </Text>
      {notices.length > 0 ? (
        notices.map((notice) => (
          <NoticeCard key={notice.id} notice={notice} onPress={onNoticePress} />
        ))
      ) : (
        <EmptyState />
      )}
    </View>
  );
};

export default NoticeSection;
