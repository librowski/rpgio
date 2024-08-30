import { shuffle } from "@/utils/shuffle";
import { animate, motionValue, type MotionValue } from "framer-motion";
import { AudioFile } from "./AudioFile";
import type { AudioFileData } from "./AudioFile";
import { AudioParametersNode } from "./AudioParametersNode";
import { EventEmitterGroup } from "./events/EventEmitterGroup";
import { context } from "./globals";

export class Sound {
  id: string;
  eventEmitter = new EventEmitterGroup<"end">();
  name: string;
  files: AudioFile[];

  audioParametersNode: AudioParametersNode;

  private fileQueue: AudioFile[];

  progress = motionValue(0);

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

    const { duration } = file.metadata;

    this.progress.set(0);
    animate(this.progress, 100, { duration }).then(() => this.progress.set(0));

    const fileAudioNode = file.play();
    this.audioParametersNode.plugInto(fileAudioNode);
  }

  mute() {
    this.progress.stop();
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
