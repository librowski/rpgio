import type { SoundData } from "@/player/Sound";
import { useSoundStore } from "@/store/sounds";
import { omit } from "@/utils/omit";
import { useForm, useFormContext } from "react-hook-form";

export function useSoundForm(soundId?: string) {
  const { getById } = useSoundStore();
  const editedSound = soundId ? getById(soundId) : null;

  const defaultValues = editedSound
    ? omit(editedSound.toJson(), "id")
    : EMPTY_FORM;

  return useForm<FormData>({
    defaultValues,
  });
}

const EMPTY_FORM: FormData = {
  name: "New sound",
  sceneIds: [],
  filePaths: [],
};

export function useSoundFormContext() {
  return useFormContext<FormData>();
}

type FormData = Omit<SoundData, "id">;
