import { dialog } from "electron";

export async function openFileDialog({ defaultPath }: OpenFileDialogOptions) {
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

  return filePaths;
}

export type OpenFileDialogOptions = Pick<
  Electron.OpenDialogOptions,
  "defaultPath"
>;
