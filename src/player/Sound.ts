import { shuffle } from "@/utils/shuffle";
import { AudioFile } from "./AudioFile";
import type { AudioFileOptions } from "./AudioFile";

export class Sound {
  private name: string;
  private files: AudioFile[];
  private fileQueue: AudioFile[];

  constructor({ fileOptionsList, name }: SoundOptions) {
    this.name = name;

    const files = fileOptionsList.map((options) => new AudioFile(options));
    this.files = files;
    this.fileQueue = [...files];
  }

  play() {
    if (this.fileQueue.length === 0) {
      this.fileQueue = [...this.files];
    }

    this.shuffle();
    const file = this.fileQueue.shift();

    file?.play();
  }

  toJson(): SoundOptions {
    return {
      name: this.name,
      fileOptionsList: this.files.map((file) => file.toJson()),
    };
  }

  private shuffle() {
    this.files = shuffle(this.files);
  }
}

export type SoundOptions = {
  fileOptionsList: AudioFileOptions[];
  name: string;
};
