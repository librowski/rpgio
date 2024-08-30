import { EventEmitter } from "./events/EventEmitter";
import { context } from "./globals";

export class AudioFile {
  eventEmitter = new EventEmitter<"end">();
  path: string;
  metadata: AudioMetadata;

  private audioNodes = new Set<MediaElementAudioSourceNode>();

  constructor({ path, metadata }: AudioFileData) {
    this.path = path;
    this.metadata = metadata;
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

  toJson(): AudioFileData {
    return {
      path: this.path,
      metadata: this.metadata,
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

export type AudioFileData = {
  path: string;
  metadata: AudioMetadata;
};

export type AudioMetadata = {
  duration: number;
  bitRate: number;
  format: string;
  tags?: Record<string, string | number>;
};
