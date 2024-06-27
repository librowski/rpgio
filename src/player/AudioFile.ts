import { context } from "./globals";

export class AudioFile {
  private path: string;
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
      this.audioNodes.delete(audioNode);
      audioNode.disconnect();
    });

    return audioNode;
  }
}

export type AudioFileOptions = {
  path: string;
};
