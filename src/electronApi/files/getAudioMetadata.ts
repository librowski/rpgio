import type { FfprobeFormat } from "fluent-ffmpeg";
import FfmpegCommand from "fluent-ffmpeg";

export async function getAudioMetadata(path: string): Promise<FfprobeFormat> {
	return new Promise((resolve, reject) => {
		const command = FfmpegCommand(path);

		command.ffprobe((error, { format }) => {
			if (error) {
				reject(error);
			}

			resolve(format);
		});
	});
}
