import { create } from "zustand";
import { ApiEvent, EventsApi } from "../shared/services/eventsApi";

export interface UserEvent {
  id: string;
  title: string;
  date: string;
  originalItemTitle: string;
  createdAt: string;
}

interface EventStore {
  userEvents: UserEvent[];
  apiEvents: ApiEvent[];
  isLoading: boolean;
  error: string | null;
  addEvent: (event: Omit<UserEvent, "id" | "createdAt">) => void;
  removeEvent: (id: string) => void;
  getEventsForDate: (date: string) => UserEvent[];
  fetchEventsInRange: (
    userId: number,
    start: string,
    end: string
  ) => Promise<void>;
  fetchUserEvents: (userId: number) => Promise<void>;
  createEventFromNotice: (
    userId: number,
    noticeId: number,
    date: string,
    title?: string
  ) => Promise<void>;
  getAllEventsForDate: (
    date: string
  ) => (UserEvent & { source: "local" | "api" })[];
}

export const useEventStore = create<EventStore>((set, get) => ({
  userEvents: [
    {
      id: "1",
      title: "프로젝트 발표 준비",
      date: "2025-08-25",
      originalItemTitle: "2024학년도 2학기 수강신청",
      createdAt: "2025-08-22T10:00:00.000Z",
    },
    {
      id: "2",
      title: "기말고사 공부",
      date: "2025-08-30",
      originalItemTitle: "IT 취업 특강",
      createdAt: "2025-08-22T11:00:00.000Z",
    },
    {
      id: "3",
      title: "동아리 회의",
      date: "2025-09-01",
      originalItemTitle: "2024년 동아리 신규 모집",
      createdAt: "2025-08-22T12:00:00.000Z",
    },
  ],
  apiEvents: [],
  isLoading: false,
  error: null,

  addEvent: (event) => {
    const newEvent: UserEvent = {
      ...event,
      id: Date.now().toString(),
      createdAt: new Date().toISOString(),
    };

    set((state) => ({
      userEvents: [...state.userEvents, newEvent],
    }));
  },

  removeEvent: (id) => {
    set((state) => ({
      userEvents: state.userEvents.filter((event) => event.id !== id),
    }));
  },

  getEventsForDate: (date) => {
    const { userEvents } = get();
    return userEvents.filter((event) => event.date === date);
  },

  fetchEventsInRange: async (userId: number, start: string, end: string) => {
    set({ isLoading: true, error: null });
    try {
      const events = await EventsApi.getEventsInRange(userId, start, end);
      set({ apiEvents: events, isLoading: false });
    } catch (error) {
      console.error("Failed to fetch events:", error);
      set({ error: "Failed to fetch events", isLoading: false });
    }
  },

  fetchUserEvents: async (userId: number) => {
    set({ isLoading: true, error: null });
    try {
      const events = await EventsApi.getUserEvents(userId);
      set({ apiEvents: events, isLoading: false });
    } catch (error) {
      console.error("Failed to fetch user events:", error);
      set({ error: "Failed to fetch user events", isLoading: false });
    }
  },

  createEventFromNotice: async (
    userId: number,
    noticeId: number,
    date: string,
    title?: string
  ) => {
    set({ isLoading: true, error: null });
    try {
      const newEvent = await EventsApi.createFromNotice({
        userId,
        noticeId,
        date,
        title,
      });
      set((state) => ({
        apiEvents: [...state.apiEvents, newEvent],
        isLoading: false,
      }));
    } catch (error) {
      console.error("Failed to create event from notice:", error);
      set({ error: "Failed to create event", isLoading: false });
    }
  },

  getAllEventsForDate: (date) => {
    const { userEvents, apiEvents } = get();
    const localEvents = userEvents
      .filter((event) => event.date === date)
      .map((event) => ({ ...event, source: "local" as const }));

    const apiEventsForDate = apiEvents
      .filter((event) => event.date === date)
      .map((event) => ({
        id: event.id.toString(),
        title: event.title,
        date: event.date,
        originalItemTitle: event.notice?.title || event.title,
        createdAt: event.date,
        source: "api" as const,
        color: "#10B981",
      }));

    return [...localEvents, ...apiEventsForDate];
  },
}));
