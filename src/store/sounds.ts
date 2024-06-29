import type { Sound } from "@/player/Sound";
import { create } from "zustand";

export const useSoundsStore = create<SoundStore>((set) => ({
	sounds: [],
	addSound(suond) {
		set((state) => ({
			sounds: [...state.sounds, suond],
		}));
	},
	loadSounds(sounds) {
		set({ sounds });
	},
}));

type SoundStore = {
	sounds: Sound[];
	addSound(suond: Sound): void;
	loadSounds(sounds: Sound[]): void;
};
