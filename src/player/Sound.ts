import { shuffle } from "@/utils/shuffle";
import { AudioFile } from "./AudioFile";
import type { AudioFileOptions } from "./AudioFile";
import { EventEmitterGroup } from "./events/EventEmitterGroup";

export class Sound {
  id: string;
  eventEmitter = new EventEmitterGroup<"end">();
  name: string;
  files: AudioFile[];
  sceneIds: string[] = [];

  private fileQueue: AudioFile[];

  constructor({ fileOptionsList, name, id, sceneIds }: SoundOptions) {
    this.id = id;
    this.name = name;
    this.sceneIds = sceneIds;

    const files = fileOptionsList.map((options) => new AudioFile(options));
    this.files = files;
    this.fileQueue = [...files];
    this.eventEmitter = new EventEmitterGroup(
      ...files.map((file) => file.eventEmitter),
    );
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
    file.play();
  }

  mute() {
    for (const file of this.files) {
      file.mute();
    }
  }

  toJson(): SoundData {
    return {
      id: this.id,
      name: this.name,
      filePaths: this.files.map(({ path }) => path),
      sceneIds: this.sceneIds,
    };
  }

  private shuffle() {
    this.files = shuffle(this.files);
  }
}

export type SoundOptions = {
  id: string;
  fileOptionsList: AudioFileOptions[];
  sceneIds: string[];
  name: string;
};

export type SoundData = Omit<SoundOptions, "fileOptionsList"> & {
  filePaths: string[];
};
