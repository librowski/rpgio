import { context } from "@/player/globals";
import { getImpulseResponse } from "./impulseResponses";

export class ReverbNode {
	private convolverNode = context.createConvolver();

	private wetGainNode = context.createGain();
	private dryGainNode = context.createGain();

	startNode = context.createGain();
	private endNode = context.createGain();

	async setType(type: string) {
		const audioBuffer = await getImpulseResponse(type);

		if (!audioBuffer) {
			this.setLevel(100);
			return;
		}

		this.convolverNode.buffer = audioBuffer;
	}

	async setLevel(level: number) {
		this.wetGainNode.gain.value = level / 100;
		this.dryGainNode.gain.value = (100 - level) / 100;
	}

	constructor() {
		this.startNode.gain.value = 1;
		this.endNode.gain.value = 1;

		this.startNode.connect(this.dryGainNode);
		this.startNode.connect(this.convolverNode);
		this.convolverNode.connect(this.wetGainNode);

		this.dryGainNode.connect(this.endNode);
		this.wetGainNode.connect(this.endNode);
	}

	connect(node: AudioNode) {
		this.endNode.connect(node);
	}
}
