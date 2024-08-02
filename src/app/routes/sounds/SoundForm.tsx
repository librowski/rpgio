import { Button } from "primereact/button";
import { InputText } from "primereact/inputtext";
import { FileSelect } from "./FileSelect/FileSelect";
import { useSoundFormContext } from "./useSoundForm";
import { useNavigateBack } from "@/hooks/useNavigateBack";
import { Sound } from "@/player/Sound";
import type { AudioFileOptions } from "@/player/AudioFile";
import { uuid } from "@/utils/uuid";
import { InputWrapper } from "@/components/inputs/InputWrapper/InputWrapper";
import { AudioSettings } from "./AudioSettings";

export function SoundForm({ onSave, confirmText }: Props) {
	const { register, getValues } = useSoundFormContext();
	const goBack = useNavigateBack();

	function onClick() {
		const { filePaths, ...soundOptions } = getValues();

		const fileOptionsList: AudioFileOptions[] = filePaths.map((path) => ({
			path,
		}));

		const sound = new Sound({
			fileOptionsList,
			id: uuid(),
			...soundOptions,
		});

		onSave(sound);
		goBack();
	}

	return (
		<>
			<div className="flex gap-2 px-2 align-items-end">
				<InputWrapper for="name" name="Name">
					<InputText id="name" {...register("name")} />
				</InputWrapper>
				<InputWrapper for="shortcut" name="Shortcut">
					<Button label="Choose Key" />
				</InputWrapper>
			</div>
			<FileSelect />
			<AudioSettings />
			<div className="flex gap-2 mt-8 px-2 justify-content-end">
				<Button label="Cancel" severity="secondary" onClick={goBack} />
				<Button label={confirmText} onClick={onClick} />
			</div>
		</>
	);
}

type Props = {
	onSave: (sound: Sound) => void;
	confirmText: string;
};
