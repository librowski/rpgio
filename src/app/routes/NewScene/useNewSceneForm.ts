import type { SceneData } from "@/player/Scene";
import { useForm, useFormContext } from "react-hook-form";

export function useNewSceneForm() {
	return useForm<FormData>({
		defaultValues: {
			name: "New scene",
			soundSchedules: [
				{
					loop: true,
					interval: [0, 0],
				},
			],
		},
	});
}

export function useNewSceneFormContext() {
	return useFormContext<FormData>();
}

type FormData = Omit<SceneData, "id">;
