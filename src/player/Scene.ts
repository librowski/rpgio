import { uuid } from "@/utils/uuid";
import { SoundScheduler } from "./SoundScheduler";
import type { SoundSchedulerOptions } from "./SoundScheduler";
import { useSceneStore } from "@/store/scenes";

export class Scene {
	id = uuid();
	name: string;
	image: string;
	soundSchedulers: SoundScheduler[] = [];

	constructor({ name, image, soundSchedules: automatedSounds }: SceneOptions) {
		this.name = name;
		this.image = image;

		this.soundSchedulers = automatedSounds.map(
			(options) => new SoundScheduler(options),
		);
	}

	get isActive() {
		return useSceneStore.getState().activeScene === this;
	}

	play() {
		for (const soundScheduler of this.soundSchedulers) {
			soundScheduler.start();
		}
	}

	stop() {
		for (const soundScheduler of this.soundSchedulers) {
			soundScheduler.stop();
		}
	}

	toJson(): SceneOptions {
		return {
			name: this.name,
			image: this.image,
			soundSchedules: this.soundSchedulers.map((soundScheduler) =>
				soundScheduler.toJson(),
			),
		};
	}
}

export type SceneOptions = {
	name: string;
	image: string;
	soundSchedules: SoundSchedulerOptions[];
};
