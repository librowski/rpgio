import clsx from "clsx";
import styles from "./FileSelect.module.scss";
import { Text } from "@/components/Text/Text";
import { SoundFileItem } from "./SoundFileItem";
import { AudioFileData } from "@/player/AudioFile";

export function FileList({ filesData: filePaths, onSelectFiles }: Props) {
  const isEmpty = filePaths.length === 0;
  const onClick = isEmpty ? onSelectFiles : undefined;

  const className = clsx(
    {
      "justify-content-center": isEmpty,
    },
    styles["file-list"],
  );

  return (
    <div className={className} onClick={onClick}>
      {isEmpty ? (
        <Text className="m-2">Drop files here or click to select them</Text>
      ) : (
        filePaths.map((fileData, index) => (
          <SoundFileItem key={fileData.path} fileData={fileData} index={index} />
        ))
      )}
    </div>
  );
}

type Props = {
  filesData: AudioFileData[];
  onSelectFiles: () => void;
};
