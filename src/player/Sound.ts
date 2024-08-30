import { shuffle } from "@/utils/shuffle";
import { AudioFile } from "./AudioFile";
import type { AudioFileData } from "./AudioFile";
import { EventEmitterGroup } from "./events/EventEmitterGroup";
import { AudioParametersNode } from "./AudioParametersNode";
import { context } from "./globals";

export class Sound {
	id: string;
	eventEmitter = new EventEmitterGroup<"end">();
	name: string;
	files: AudioFile[];
	volume: number;
	playbackRate: number;
	reverbType: string;
	reverbLevel: number;

	audioParametersNode: AudioParametersNode;

	private fileQueue: AudioFile[];

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
		this.volume = volume;
		this.playbackRate = playbackRate;
		this.reverbLevel = reverbLevel;
		this.reverbType = reverbType;

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

		const fileAudioNode = file.play();
		this.audioParametersNode.plugInto(fileAudioNode);
	}

	mute() {
		for (const file of this.files) {
			file.mute();
		}
	}

	toJson(): SoundData {
		return {
			id: this.id,
			name: this.name,
			filesData: this.files,
			volume: this.volume,
			playbackRate: this.playbackRate,
			reverbType: this.reverbType,
			reverbLevel: this.reverbLevel,
		};
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
