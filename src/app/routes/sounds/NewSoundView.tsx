import { EntityView } from "@/components/EntityView/EntityView";
import type { Sound } from "@/player/Sound";
import { useSoundStore } from "@/store/sounds";
import { FormProvider } from "react-hook-form";
import { SoundForm } from "./SoundForm";
import { useSoundForm } from "./useSoundForm";

export function NewSoundView() {
	const methods = useSoundForm();
	const { addSound } = useSoundStore();

	function onAddSound(sound: Sound) {
		addSound(sound);
	}

	return (
		<FormProvider {...methods}>
			<EntityView header="New Sound">
				<SoundForm onSave={onAddSound} confirmText="Create" />
			</EntityView>
		</FormProvider>
	);
}
