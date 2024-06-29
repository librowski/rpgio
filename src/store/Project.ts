import type { SceneOptions } from "@/player/Scene";
import type { SoundOptions } from "@/player/Sound";

export type Project = {
	name: string;
	sounds: SoundOptions[];
	scenes: SceneOptions[];
};
