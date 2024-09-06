import { EntityView } from "@/components/EntityView/EntityView";
import { EditingTag } from "@/components/tags/EditingTag";
import { useNavigateBack } from "@/hooks/useNavigateBack";
import type { Sound } from "@/player/Sound";
import { useSoundStore } from "@/store/sounds";
import { FormProvider } from "react-hook-form";
import { useParams } from "react-router";
import { SoundForm } from "./SoundForm";
import { useSoundForm } from "./useSoundForm";

export function EditSoundView() {
	const { id } = useParams();

	const methods = useSoundForm(id);
	const { getValues } = methods;

	const goBack = useNavigateBack();
	if (!id) {
		console.error("No id provided");
		goBack();
	}

	const { name } = getValues();
	const { updateSound } = useSoundStore();
	function onEditSound(sound: Sound) {
		if (!id) {
			return;
		}

		updateSound(id, sound);
		goBack();
	}

	return (
		<FormProvider {...methods}>
			<EntityView
				header={
					<div className="flex gap-2 align-items-center">
						{name}
						<EditingTag />
					</div>
				}
			>
				<SoundForm onSave={onEditSound} confirmText="Save" />
			</EntityView>
		</FormProvider>
	);
}
