import { EventEmitter } from "./events/EventEmitter";
import { context } from "./globals";

export class AudioFile {
	eventEmitter = new EventEmitter<"end">();
	path: string;

	private audioNodes = new Set<MediaElementAudioSourceNode>();

	constructor(options: AudioFileOptions) {
		this.path = options.path;
	}

	play() {
		const node = this.createAudioNode();
		node.mediaElement.play();

		return node;
	}

	mute() {
		for (const audioNode of this.audioNodes) {
			this.muteAudioNode(audioNode);
		}
	}

	toJson(): AudioFileOptions {
		return {
			path: this.path,
		};
	}

	private createAudioNode() {
		const path = `media://${this.path}`;
		const audioElement = new Audio(path);
		const audioNode = context.createMediaElementSource(audioElement);

		this.audioNodes.add(audioNode);
		audioNode.mediaElement.addEventListener("ended", () => {
			this.onEnd(audioNode);
		});

		return audioNode;
	}

	private muteAudioNode(audioNode: MediaElementAudioSourceNode) {
		this.audioNodes.delete(audioNode);
		audioNode.disconnect();
	}

	private onEnd(audioNode: MediaElementAudioSourceNode) {
		this.muteAudioNode(audioNode);
		this.eventEmitter.emit("end");
	}
}

export type AudioFileOptions = {
	path: string;
};
