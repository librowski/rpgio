import { Sound } from "./Sound";
import type { SoundOptions } from "./Sound";
import { randomFloat } from "@/utils/random-float";

export class SoundScheduler {
	id: string;
	sound: Sound;
	loop: boolean;
	interval: [number, number];

	constructor({ soundOptions, loop, interval, id }: SoundSchedulerOptions) {
		this.sound = new Sound(soundOptions);
		this.loop = loop;
		this.interval = interval;
		this.id = id;
	}

	start() {
		if (this.loop && this.interval) {
			this.sound.eventEmitter.subscribe("end", this.onEnd);
		}

		this.sound.play();
	}

	stop() {
		this.sound.mute();
		this.sound.eventEmitter.unsubscribe("end", this.onEnd);
	}

	toJson(): SoundSchedulerData {
		return {
			id: this.id,
			soundId: this.sound.id,
			loop: this.loop,
			interval: this.interval,
		};
	}

	onEnd = () => {
		this.sound.eventEmitter.unsubscribe("end", this.onEnd);

		const timeout = this.interval ? randomFloat(...this.interval) : 0;
		const S = 1000;

		setTimeout(() => {
			this.sound.play();
		}, timeout * S);
	};
}

export type SoundSchedulerOptions = {
	id: string;
	soundOptions: SoundOptions;
	loop: boolean;
	interval: [number, number];
};

export type SoundSchedulerData = Omit<SoundSchedulerOptions, "soundOptions"> & {
	soundId: string;
};
