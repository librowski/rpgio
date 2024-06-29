import { Sound } from "./Sound";
import type { SoundOptions } from "./Sound";
import { randomFloat } from "@/utils/random-float";

export class SoundScheduler {
	sound: Sound;
	loop: boolean;
	interval?: [number, number];

	constructor({ soundOptions, loop, interval }: SoundSchedulerOptions) {
		this.sound = new Sound(soundOptions);
		this.loop = loop;
		this.interval = interval;
	}

	start() {
		if (this.loop) {
			this.sound.eventManager.addEventHandler("end", this.onEnd);
		}

		this.sound.play();
	}

	stop() {
		this.sound.mute();
		this.sound.eventManager.removeEventHandler("end", this.onEnd);
	}

	toJson(): SoundSchedulerOptions {
		return {
			soundOptions: this.sound.toJson(),
			loop: this.loop,
			interval: this.interval,
		};
	}

	onEnd = () => {
		const timeout = this.interval ? randomFloat(...this.interval) : 0;

		setTimeout(() => {
			this.sound.play();
		}, timeout);

		this.sound.play();
	};
}

export type SoundSchedulerOptions = {
	soundOptions: SoundOptions;
	loop: boolean;
	interval?: [number, number];
};
