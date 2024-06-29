import type { SceneData } from "@/player/Scene";
import type { SoundData } from "@/player/Sound";

export type Project = {
	name: string;
	sounds: SoundData[];
	scenes: SceneData[];
};
