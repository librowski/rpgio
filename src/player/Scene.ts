import { log } from "@/utils/log";
import { SoundScheduler } from "./SoundScheduler";
import type { SoundSchedulerOptions } from "./SoundScheduler";

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
		log({ message: `url: ${image}` });
		this.id = id;
		this.name = name;
		this.image =
			image ??
			"https://ruralhistoria.com/wp-content/uploads/images/medieval-market-squares.jpeg";

		this.soundSchedulers = automatedSounds.map(
			(options) => new SoundScheduler(options),
		);
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
	soundSchedules: SoundSchedulerOptions[];
};
