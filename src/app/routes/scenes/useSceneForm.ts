import type { SceneData } from "@/player/Scene";
import { useSceneStore } from "@/store/scenes";
import { useSoundStore } from "@/store/sounds";
import { omit } from "@/utils/omit";
import { uuid } from "@/utils/uuid";
import { useForm, useFormContext } from "react-hook-form";
import { defaultSoundScheduleOptions } from "./SoundSchedules/defaultSoundSchedule";

export function useSceneForm(sceneId?: string) {
	const { getById } = useSceneStore();
	const {
		sounds: [firstSound],
	} = useSoundStore();

	const soundSchedules = firstSound
		? [
				{
					id: uuid(),
					soundId: firstSound.id,
					scheduleOptions: defaultSoundScheduleOptions(),
				},
			]
		: [];

	const editedScene = sceneId ? getById(sceneId) : null;

	const EMPTY_FORM: SceneFormData = {
		image: "",
		name: "New scene",
		soundSchedules,
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
