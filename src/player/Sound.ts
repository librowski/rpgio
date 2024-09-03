import { shuffle } from "@/utils/shuffle";
import { motionValue } from "framer-motion";
import { AudioFile } from "./AudioFile";
import type { AudioFileData } from "./AudioFile";
import { AudioParametersNode } from "./AudioParametersNode";
import { EventEmitterGroup } from "./events/EventEmitterGroup";
import { context } from "./globals";
import { changeInTime } from "@/utils/changeInTime";

export class Sound {
	id: string;
	eventEmitter = new EventEmitterGroup<"end">();
	name: string;
	files: AudioFile[];

	audioParametersNode: AudioParametersNode;

	private fileQueue: AudioFile[];

	progress = motionValue(0);
	progressHandle?: NodeJS.Timeout;

	constructor({
		filesData,
		name,
		id,
		volume,
		playbackRate,
		reverbType,
		reverbLevel,
	}: SoundData) {
		this.id = id;
		this.name = name;

		this.audioParametersNode = new AudioParametersNode({
			volume,
			playbackRate,
			reverbLevel,
			reverbType,
		});

		const files = filesData.map((options) => new AudioFile(options));
		this.files = files;
		this.fileQueue = [...files];
		this.eventEmitter = new EventEmitterGroup(
			...files.map((file) => file.eventEmitter),
		);

		this.audioParametersNode.connect(context.destination);
		this.shuffle();
	}

	play() {
		const file = this.fileQueue.shift();
		if (this.fileQueue.length === 0) {
			this.fileQueue = [...this.files];
		}
		this.shuffle();

		if (!file) {
			return;
		}

		const { duration } = file.metadata;

		clearInterval(this.progressHandle);
		this.progressHandle = changeInTime({
			time: duration,
			startValue: 0,
			endValue: 100,
			update: (value) => this.progress.set(value),
		});

		const fileAudioNode = file.play();
		this.audioParametersNode.plugInto(fileAudioNode);
	}

	mute() {
		clearInterval(this.progressHandle);
		this.progress.set(0);
		this.audioParametersNode.setParameter("volume", 0);

		for (const file of this.files) {
			file.mute();
		}
	}

	toJson(): SoundData {
		const { volume, playbackRate, reverbType, reverbLevel } =
			this.audioParametersNode.parameters;

		return {
			id: this.id,
			name: this.name,
			filesData: this.files,
			volume,
			playbackRate,
			reverbType,
			reverbLevel,
		};
	}

	nextFile() {
		const [next] = this.fileQueue;

		return next;
	}

	private shuffle() {
		this.files = shuffle(this.files);
	}
}

export type SoundData = {
	id: string;
	filesData: AudioFileData[];
	name: string;
	volume: number;
	playbackRate: number;
	reverbType: string;
	reverbLevel: number;
};
