import type { Sound } from "@/player/Sound";
import { create } from "zustand";

export const useSoundsStore = create<SoundStore>((set) => ({
  sounds: [],
  loadSounds: (sounds: Sound[]) => {
    set({ sounds });
  },
}));

type SoundStore = {
  sounds: Sound[];
};
