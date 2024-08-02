import clsx from "clsx";
import styles from "./FileSelect.module.scss";
import { Text } from "@/components/Text/Text";
import { SoundFileItem } from "./SoundFileItem";

export function FileList({ filePaths, onSelectFiles }: Props) {
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
        filePaths.map((filePath, index) => (
          <SoundFileItem key={filePath} filePath={filePath} index={index} />
        ))
      )}
    </div>
  );
}

type Props = {
  filePaths: string[];
  onSelectFiles: () => void;
};
