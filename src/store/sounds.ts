import type { Sound } from "@/player/Sound";
import { create } from "zustand";

export const useSoundStore = create<SoundStore>((set) => ({
	sounds: [],
	getById(id) {
		return this.sounds.find((sound) => sound.id === id);
	},
	addSound(sound) {
		set((state) => ({
			sounds: [...state.sounds, sound],
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
	getById(id: string): Sound | undefined;
};
