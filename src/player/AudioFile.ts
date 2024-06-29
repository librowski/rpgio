import { EventManager } from "./EventManager";
import { context } from "./globals";

export class AudioFile {
	eventManager = new EventManager<"end">();
	path: string;

	private gainNode: GainNode;
	private audioNodes = new Set<MediaElementAudioSourceNode>();

	constructor(options: AudioFileOptions) {
		this.path = options.path;
		this.gainNode = context.createGain();
		this.gainNode.gain.value = 1;
		this.gainNode.connect(context.destination);
	}

	play() {
		const node = this.createAudioNode();
		node.mediaElement.play();
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
		const audioElement = new Audio(`audio://${this.path}`);
		const audioNode = context.createMediaElementSource(audioElement);

		audioNode.connect(this.gainNode);

		this.audioNodes.add(audioNode);
		audioNode.addEventListener("ended", () => {
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
		this.eventManager.dispatchEvent("end");
	}
}

export type AudioFileOptions = {
	path: string;
};
