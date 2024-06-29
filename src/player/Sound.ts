import { shuffle } from "@/utils/shuffle";
import { AudioFile } from "./AudioFile";
import type { AudioFileOptions } from "./AudioFile";
import { EventManager } from "./EventManager";
import { uuid } from "@/utils/uuid";

export class Sound {
	id = uuid();
	eventManager = new EventManager<"end">();
	name: string;

	private files: AudioFile[];
	private fileQueue: AudioFile[];

	constructor({ fileOptionsList, name }: SoundOptions) {
		this.name = name;

		const files = fileOptionsList.map((options) => new AudioFile(options));
		this.files = files;
		this.fileQueue = [...files];
	}

	play() {
		if (this.fileQueue.length === 0) {
			this.fileQueue = [...this.files];
		}

		this.shuffle();
		const file = this.fileQueue.shift();

		if (!file) {
			return;
		}

		file.eventManager.addEventHandler("end", () => {
			this.eventManager.dispatchEvent("end");
		});
		file.play();
	}

	mute() {
		for (const file of this.files) {
			file.mute();
		}
	}

	toJson(): SoundOptions {
		return {
			name: this.name,
			fileOptionsList: this.files.map((file) => file.toJson()),
		};
	}

	private shuffle() {
		this.files = shuffle(this.files);
	}
}

export type SoundOptions = {
	fileOptionsList: AudioFileOptions[];
	name: string;
};
