import { shuffle } from "@/utils/shuffle";
import type { AudioFile } from "./AudioFile";

export class Sound {
  private files: AudioFile[];
  private fileQueue: AudioFile[];

  constructor({ files }: SoundOptions) {
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

  private shuffle() {
    this.files = shuffle(this.files);
  }
}

type SoundOptions = {
  files: AudioFile[];
  name: string;
};
