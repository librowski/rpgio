import { Text } from "@/components/Text/Text";
import { useSoundFormContext } from "../useSoundForm";
import { useUserPreferencesStore } from "@/store/userPreferences";
import { SoundFileItem } from "./SoundFileItem";
import styles from "./FileSelect.module.scss";
import { InputWrapper } from "@/components/InputWrapper/InputWrapper";
import clsx from "clsx";

export function FileSelect() {
  const { sounds, update } = useUserPreferencesStore();
  const { setValue, watch } = useSoundFormContext();
  const { filePaths } = watch();

  const isEmpty = filePaths.length === 0;

  async function onSelectFiles() {
    const filePaths = await window.electronApi.openFileDialog({
      defaultPath: sounds.lastOpenPath,
    });

    setValue("filePaths", filePaths);
    update("sounds", { lastOpenPath: filePaths[0] });
  }

  const onClick = isEmpty ? onSelectFiles : undefined;

  const fileListClassName = clsx(
    {
      "justify-content-center": isEmpty,
    },
    styles["file-select"],
  );

  return (
    <div className="flex px-2 gap-2 flex-column">
      <InputWrapper for="files" name="Files">
        <div className={fileListClassName} onClick={onClick}>
          {isEmpty ? (
            <Text className="m-2">Drop files here or click to select them</Text>
          ) : (
            filePaths.map((filePath, index) => (
              <SoundFileItem key={filePath} filePath={filePath} index={index} />
            ))
          )}
        </div>
      </InputWrapper>
    </div>
  );
}
