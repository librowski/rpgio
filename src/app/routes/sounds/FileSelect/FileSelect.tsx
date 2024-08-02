import { useSoundFormContext } from "../useSoundForm";
import { useUserPreferencesStore } from "@/store/userPreferences";
import { InputWrapper } from "@/components/inputs/InputWrapper/InputWrapper";
import { FileList } from "./FileList";
import clsx from "clsx";
import styles from "./FileSelect.module.scss";
import { IconButton } from "@/components/IconButton/IconButton";
import { PlusCircle } from "@phosphor-icons/react";
import { unique } from "@/utils/unique";

export function FileSelect() {
  const { sounds, update } = useUserPreferencesStore();
  const { setValue, watch } = useSoundFormContext();
  const { filePaths } = watch();
  const isEmpty = filePaths.length === 0;

  async function onSelectFiles() {
    const addedFiles = await window.electronApi.openFileDialog({
      defaultPath: sounds.lastOpenPath,
    });

    const newFilePaths = unique([...filePaths, ...addedFiles]);
    if (newFilePaths.length === filePaths.length) {
      return;
    }

    setValue("filePaths", newFilePaths);
    update("sounds", { lastOpenPath: newFilePaths[0] });
  }

  const buttonClassName = clsx({
    [styles["floating-add-button"]]: !isEmpty,
  });

  return (
    <InputWrapper className="mx-2 relative" for="files" name="Files">
      <div className="flex flex-column relative">
        <FileList onSelectFiles={onSelectFiles} filePaths={filePaths} />
        {!isEmpty && (
          <IconButton
            variant="fill"
            className={buttonClassName}
            icon={PlusCircle}
            onClick={onSelectFiles}
          />
        )}
      </div>
    </InputWrapper>
  );
}
