import { InputWrapper } from "@/components/inputs/InputWrapper/InputWrapper";
import { Scene } from "@/player/Scene";
import type { SoundSchedulerOptions } from "@/player/SoundScheduler";
import { useSoundStore } from "@/store/sounds";
import { uuid } from "@/utils/uuid";
import { Upload } from "@phosphor-icons/react";
import { Button } from "primereact/button";
import { InputText } from "primereact/inputtext";
import { ScenePreview } from "./ScenePreview";
import { SoundSchedules } from "./SoundSchedules/SoundSchedules";
import { useSceneFormContext } from "./useSceneForm";

export function SceneForm({ onSave, confirmText }: Props) {
	const { getById: getSoundById } = useSoundStore();
	const methods = useSceneFormContext();
	const { register, getValues } = methods;

	function onClick() {
		const { soundSchedules } = getValues();

		const soundSchedulesOptions: SoundSchedulerOptions[] = soundSchedules.map(
			({ soundId, ...data }) => {
				const sound = getSoundById(soundId);

				const fileOptionsList = sound?.files.map(({ path }) => ({ path }));

				return {
					soundOptions: {
						fileOptionsList,
					},
					...data,
					soundId,
				};
			},
		);

		const scene = new Scene({
			...getValues(),
			id: uuid(),
			soundSchedules: soundSchedulesOptions,
		});

		onSave(scene);
	}

	return (
		<>
			<ScenePreview />
			<div className="flex gap-2 align-items-end">
				<InputWrapper for="name" name="Name">
					<InputText id="name" {...register("name")} />
				</InputWrapper>
				<InputWrapper for="image" name="Scene background">
					<div className="p-inputgroup flex-1">
						<InputText
							placeholder="Image URL"
							id="url"
							{...register("image")}
						/>
						<Button icon={() => <Upload />} />
					</div>
				</InputWrapper>
				<InputWrapper for="shortcut" name="Shortcut">
					<Button className="flex-1" label="Choose Key" />
				</InputWrapper>
			</div>
			<SoundSchedules />
			<Button label={confirmText} onClick={onClick} />
		</>
	);
}

type Props = {
	onSave: (scene: Scene) => void;
	confirmText: string;
};
