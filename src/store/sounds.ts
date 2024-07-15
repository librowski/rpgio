import type { Sound } from "@/player/Sound";
import { create } from "zustand";

export const useSoundStore = create<SoundStore>((set, get) => ({
  sounds: [],
  setSounds(sounds) {
    set({ sounds });
  },
  getById(id) {
    return get().sounds.find((sound) => sound.id === id);
  },
  addSound(sound) {
    set((state) => ({
      sounds: [...state.sounds, sound],
    }));
  },
  removeSound(soundId) {
    set((state) => ({
      sounds: state.sounds.filter(({ id }) => id !== soundId),
    }));
  },
  loadSounds(sounds) {
    set({ sounds });
  },
}));

type SoundStore = {
  sounds: Sound[];
  setSounds(sounds: Sound[]): void;
  addSound(suond: Sound): void;
  loadSounds(sounds: Sound[]): void;
  getById(id: string): Sound | undefined;
  removeSound(soundId: string): void;
};
