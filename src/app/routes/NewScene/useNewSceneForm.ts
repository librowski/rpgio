import type { SceneData } from "@/player/Scene";
import { useForm, useFormContext } from "react-hook-form";
import { defaultSoundScheduleOptions } from "./SoundSchedules/defaultSoundSchedule";

export function useNewSceneForm() {
	return useForm<NewSceneFormData>({
		defaultValues: {
			name: "New scene",
			soundSchedules: [
				{
					scheduleOptions: defaultSoundScheduleOptions(),
				},
			],
		},
	});
}

export function useNewSceneFormContext() {
	return useFormContext<NewSceneFormData>();
}

export type NewSceneFormData = Omit<SceneData, "id">;
