import { AudioFile } from "./AudioFile";
import { context } from "./globals";

export class Sound {
  private files: AudioFile[];
  //  private name: string;

  constructor({ files }: SoundOptions) {
    this.files = files;
    //   this.name = name;
  }

  play() {
    try {
      const audioNode = this.files[0].createAudioNode();
      const gainNode = context.createGain();

      audioNode.connect(gainNode);
      gainNode.gain.value = 0.5;
      gainNode.connect(context.destination);

      audioNode.mediaElement.play();
    } catch (error) {
      console.error(error);
    }
    // audioNode.mediaElement.addEventListener("ended", () => {
    //   audioNode.disconnect();
    // });
  }
}

interface SoundOptions {
  files: AudioFile[];
  name: string;
}
