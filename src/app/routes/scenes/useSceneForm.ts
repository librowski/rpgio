import type { SceneData } from "@/player/Scene";
import { useForm, useFormContext } from "react-hook-form";
import { defaultSoundScheduleOptions } from "./SoundSchedules/defaultSoundSchedule";
import { useSceneStore } from "@/store/scenes";
import { omit } from "@/utils/omit";
import { uuid } from "@/utils/uuid";
import { useSoundStore } from "@/store/sounds";

export function useSceneForm(sceneId?: string) {
  const { getById } = useSceneStore();
  const {
    sounds: [{ id: firstSoundId }],
  } = useSoundStore();

  const editedScene = sceneId ? getById(sceneId) : null;

  const EMPTY_FORM: SceneFormData = {
    image: "",
    name: "New scene",
    soundSchedules: [
      {
        id: uuid(),
        soundId: firstSoundId,
        scheduleOptions: defaultSoundScheduleOptions(),
      },
    ],
  };

  const defaultValues = editedScene
    ? omit(editedScene.toJson(), "id")
    : EMPTY_FORM;

  return useForm<SceneFormData>({ defaultValues });
}

export function useSceneFormContext() {
  return useFormContext<SceneFormData>();
}

export type SceneFormData = Omit<SceneData, "id">;
