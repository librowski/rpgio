import { InputWrapper } from "@/components/inputs/InputWrapper/InputWrapper";
import { Scene } from "@/player/Scene";
import type { SoundSchedulerOptions } from "@/player/SoundScheduler";
import { useSoundStore } from "@/store/sounds";
import { uuid } from "@/utils/uuid";
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
		const { name, soundSchedules } = getValues();

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
			name,
			id: uuid(),
			soundSchedules: soundSchedulesOptions,
			image: "",
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
