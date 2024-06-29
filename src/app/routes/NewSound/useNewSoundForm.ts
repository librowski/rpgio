import { useForm, useFormContext } from "react-hook-form";

export function useNewSoundForm() {
	return useForm<FormData>({
		defaultValues: {
			name: "New sound",
			sceneIds: [],
			filePaths: [],
		},
	});
}

export function useNewSoundFormContext() {
	return useFormContext<FormData>();
}

type FormData = {
	name: string;
	sceneIds: string[];
	filePaths: string[];
};
