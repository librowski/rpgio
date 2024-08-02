import { changeInTime } from "@/utils/changeInTime";
import { context } from "./globals";
import { ReverbNode } from "./ReverbNode";

export class AudioParametersNode {
	private gainNode = context.createGain();
	private reverbNode = new ReverbNode();

	private connectedNodes = new Set<AudioNode>();

	startNode = context.createGain();
	endNode = context.createGain();

	constructor(private options: AudioParameters) {
		this.startNode.connect(this.gainNode);
		this.gainNode.connect(this.reverbNode.startNode);
		this.reverbNode.connect(this.endNode);
		this.setup(options);
	}

	async setParameter<T extends keyof AudioParameters>(
		parameter: T,
		value: AudioParameters[T],
		options?: SetParameterOptions,
	) {
		const { time } = options ?? { time: 0 };

		if (parameter === "volume") {
			const scaledGain = (value as number) / 100;
			this.gainNode.gain.linearRampToValueAtTime(scaledGain, time);
		}

		if (parameter === "playbackRate") {
			for (const node of this.connectedNodes) {
				if (node instanceof MediaElementAudioSourceNode) {
					const { mediaElement } = node;
					const scaledPlaybackRate = (value as number) / 100;

					changeInTime({
						time,
						startValue: mediaElement.playbackRate,
						endValue: scaledPlaybackRate,
						update: (value) => {
							mediaElement.playbackRate = value;
						},
					});
				}
			}
		}

		if (parameter === "reverbType") {
			this.reverbNode.setType(value as string);
		}

		if (parameter === "reverbLevel") {
			this.reverbNode.setLevel(value as number);
		}
	}

	plugInto(node: AudioNode) {
		node.connect(this.startNode);
		this.connectedNodes.add(node);

		this.setup(this.options);
	}

	connect(node: AudioNode) {
		this.endNode.connect(node);
	}

	private setup(parameters: AudioParameters) {
		for (const [key, value] of Object.entries(parameters)) {
			this.setParameter(key as keyof AudioParameters, value);
		}
	}
}

type AudioParameters = {
	volume: number;
	playbackRate: number;
	reverbType: string;
	reverbLevel: number;
};

type SetParameterOptions = {
	time: number;
};
