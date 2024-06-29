import type { SoundSchedulerData } from "@/player/SoundScheduler";
import { useForm, useFormContext } from "react-hook-form";

export function useNewSceneForm() {
	return useForm<FormData>({
		defaultValues: {
			name: "New scene",
      soundSchedules: [{
        loop: true,
      }]
		},
	});
}

export function useNewSceneFormContext() {
	return useFormContext<FormData>();
}

type FormData = {
	name: string;
	soundSchedules: SoundSchedulerData[];
};
