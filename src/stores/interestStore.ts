import AsyncStorage from "@react-native-async-storage/async-storage";
import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";

export interface Interest {
  id: string;
  name: string;
  selected: boolean;
}

interface InterestState {
  interests: Interest[];
  setInterests: (interests: Interest[]) => void;
  toggleInterest: (id: string) => void;
  getSelectedInterests: () => string[];
  getSelectedInterestNames: () => string[];
}

export const useInterestStore = create<InterestState>()(
  persist(
    (set, get) => ({
      interests: [
        { id: "1", name: "특강/세미나", selected: true },
        { id: "2", name: "마케팅/홍보", selected: false },
        { id: "3", name: "취업/인턴십", selected: true },
        { id: "4", name: "IT/개발", selected: true },
        { id: "5", name: "학사/수업", selected: true },
        { id: "6", name: "장학금", selected: true },
        { id: "7", name: "동아리/모임", selected: false },
        { id: "8", name: "기타", selected: false },
      ],

      setInterests: (interests: Interest[]) => {
        set({ interests });
      },

      toggleInterest: (id: string) => {
        set((state) => ({
          interests: state.interests.map((interest) =>
            interest.id === id
              ? { ...interest, selected: !interest.selected }
              : interest
          ),
        }));
      },

      getSelectedInterests: () => {
        const state = get();
        return state.interests
          .filter((interest) => interest.selected)
          .map((interest) => interest.name);
      },

      getSelectedInterestNames: () => {
        const state = get();
        return state.interests
          .filter((interest) => interest.selected)
          .map((interest) => interest.name);
      },
    }),
    {
      name: "interest-storage",
      storage: createJSONStorage(() => AsyncStorage),
    }
  )
);
