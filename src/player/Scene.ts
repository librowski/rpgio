import { SoundScheduler } from "./SoundScheduler";
import type {
	SoundSchedulerData,
	SoundSchedulerOptions,
} from "./SoundScheduler";
import { useSceneStore } from "@/store/scenes";

export class Scene {
	id: string;
	name: string;
	image: string;
	soundSchedulers: SoundScheduler[] = [];

	constructor({
		id,
		name,
		image,
		soundSchedules: automatedSounds,
	}: SceneOptions) {
		this.id = id;
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

	toJson(): SceneData {
		return {
			id: this.id,
			name: this.name,
			image: this.image,
			soundSchedules: this.soundSchedulers.map((soundScheduler) =>
				soundScheduler.toJson(),
			),
		};
	}
}

export type SceneOptions = {
	id: string;
	name: string;
	image: string;
	soundSchedules: SoundSchedulerOptions[];
};

export type SceneData = Omit<SceneOptions, "soundSchedules"> & {
	soundSchedules: SoundSchedulerData[];
};
