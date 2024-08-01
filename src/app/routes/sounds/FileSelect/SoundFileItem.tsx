import { IconButton } from "@/components/IconButton/IconButton";
import { Text } from "@/components/Text/Text";
import { filePathToName } from "@/utils/filePathToName";
import { Waveform } from "@phosphor-icons/react";
import { X } from "@phosphor-icons/react/dist/ssr";
import { motion } from "framer-motion";
import { useSoundFormContext } from "../useSoundForm";
import { remove } from "@/utils/remove";

export function SoundFileItem({ filePath, index }: Props) {
  const backgroundClassName = index % 2 ? "surface-100" : "surface-50";
  const className = `flex px-2 py-2 gap-2 w-full max-h-3rem justify-content-between align-items-center ${backgroundClassName}`;

  const fileName = filePathToName(filePath);

  const { setValue, getValues } = useSoundFormContext();

  function onRemoveFile() {
    const { filePaths } = getValues();
    const newFilePaths = remove(filePaths, filePaths.indexOf(filePath));
    setValue("filePaths", newFilePaths);
  }

  return (
    <motion.div className={className}>
      <div className="flex align-items-center gap-1">
        <Waveform size="1rem" className="flex-shrink-0" />
        <Text
          weight="thin"
          size="small"
          className="text-overflow-ellipsis white-space-nowrap overflow-hidden"
        >
          {fileName}
        </Text>
      </div>
      <IconButton onClick={onRemoveFile} icon={X} />
    </motion.div>
  );
}

type Props = {
  index: number;
  filePath: string;
};
