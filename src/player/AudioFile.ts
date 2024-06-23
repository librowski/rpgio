import { context } from "./globals";

export class AudioFile {
  path: string;

  constructor(options: Options) {
    this.path = options.path;
  }

  createAudioNode(): MediaElementAudioSourceNode {
    const audio = new Audio(this.path);
    return context.createMediaElementSource(audio);
  }
}

interface Options {
  path: string;
}
