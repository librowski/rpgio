import { dialog } from "electron";
import { getAudioMetadata } from "./getAudioMetadata";
import { AudioFileData } from "@/player/AudioFile";

export async function openFileDialog({ defaultPath }: OpenFileDialogOptions): Promise<AudioFileData[]> {
	const { canceled, filePaths } = await dialog.showOpenDialog({
		title: "Select audio files",
		filters: [{ name: "Audio files", extensions: ["mp3", "wav", "flac"] }],
		defaultPath,
		properties: ["multiSelections", "openFile"],
	});

	if (canceled) {
		console.error("Something went wrong when opening files");
		return [];
	}

  const fileDataPromises = filePaths.map(async (path): Promise<AudioFileData> => {
	  const { bit_rate: bitRate, tags, duration, format_name: format } = await getAudioMetadata(path);

    return {
      path,
      metadata: {
        bitRate: bitRate ?? 0,
        tags,
        duration: duration ?? 0,
        format: format ?? "unknown",
      }
    }
  })

	return Promise.all(fileDataPromises);
}

export type OpenFileDialogOptions = Pick<
	Electron.OpenDialogOptions,
	"defaultPath"
>;
