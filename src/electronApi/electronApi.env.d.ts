import type { OpenFileDialogOptions } from "@/electronApi/files/openFileDialog";
import { AudioFileData } from "@/player/AudioFile";
import type { Project } from "@/store/Project";
import type { LogOptions } from "@/utils/log";

declare global {
	interface Window {
		electronApi: {
			loadProject(): Promise<Project>;
			saveProject(project: Project): Promise<void>;
			openFileDialog(options: OpenFileDialogOptions): Promise<AudioFileData[]>;
			addLogListener(listener: (options: LogOptions) => void): void;
		};
		env: "development" | "production";
	}
}
