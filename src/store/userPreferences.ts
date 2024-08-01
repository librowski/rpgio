import { create } from "zustand";
import { persist } from "zustand/middleware";

export const useUserPreferencesStore = create(
  persist<UserPreferencesStore>(
    (set) => ({
      sounds: {
        lastOpenPath: "gowno",
      },
      update: (key, value) => {
        set((state) => ({ [key]: { ...state[key], ...value } }));
      },
    }),
    {
      name: "user-preferences",
    },
  ),
);

type SoundPreferences = {
  lastOpenPath: string;
};

type UserPreferencesStore = {
  sounds: SoundPreferences;
  update<T extends keyof Omit<UserPreferencesStore, "update">>(
    key: T,
    value: Partial<UserPreferencesStore[T]>,
  ): void;
};
