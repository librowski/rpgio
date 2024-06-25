import { context } from "./globals";

export class AudioFile {
  private path: string;
  private gainNode: GainNode;
  private audioNodes = new Set<MediaElementAudioSourceNode>();

  constructor(options: Options) {
    this.path = options.path;
    this.gainNode = context.createGain();
    this.gainNode.gain.value = 1;
    this.gainNode.connect(context.destination);
  }

  play() {
    const node = this.createAudioNode();
    node.mediaElement.play();
  }

  private createAudioNode() {
    const audioElement = new Audio(`audio://${this.path}`);
    const audioNode = context.createMediaElementSource(audioElement);

    audioNode.connect(this.gainNode);
    this.audioNodes.add(audioNode);
    audioNode.addEventListener("ended", () => {
      this.audioNodes.delete(audioNode);
      audioNode.disconnect();
    });

    return audioNode;
  }
}

type Options = {
  path: string;
};
