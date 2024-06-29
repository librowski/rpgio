import { IconButton } from "@/components/IconButton/IconButton";
import { Text } from "@/components/Text/Text";
import { ArrowLeft } from "@phosphor-icons/react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { InputText } from "primereact/inputtext";
import styles from "./NewSound.module.scss";
import { Button } from "primereact/button";
import { FileSelect } from "./FileSelect";
import { SceneSelect } from "./SceneSelect";
import { useNewSoundForm } from "./useNewSoundForm";
import { FormProvider } from "react-hook-form";
import type { AudioFileOptions } from "@/player/AudioFile";
import { useSoundStore } from "@/store/sounds";
import { Sound } from "@/player/Sound";

export function NewSound() {
	const methods = useNewSoundForm();
	const { addSound } = useSoundStore();
	const { register, getValues } = methods;

	function onAddSound() {
		const { filePaths, name } = getValues();
		const fileOptionsList: AudioFileOptions[] = filePaths.map((path) => ({
			path,
		}));

		addSound(new Sound({ fileOptionsList, name }));
	}

	return (
		<FormProvider {...methods}>
			<motion.div
				animate
				className={`flex gap-4 flex-column ${styles.container}`}
			>
				<div className="flex align-items-center gap-2 relative">
					<Link to={".."}>
						<IconButton icon={ArrowLeft} className={styles["back-button"]} />
					</Link>
					<Text size="extra-large" weight="bold">
						New Sound
					</Text>
				</div>

				<div className="flex gap-2 px-2 align-items-end">
					<div className="flex flex-1 flex-column gap-1">
						<Text<"label"> tag="label" htmlFor="name">
							Name
						</Text>
						<InputText id="name" {...register("name")} />
					</div>
					<SceneSelect />
					<Button className="flex-1" label="Choose Key" />
				</div>
				<FileSelect />

				<div className="flex gap-2 px-2 justify-content-end">
					<Link to={".."}>
						<Button label="Cancel" severity="secondary" />
					</Link>
					<Link to={".."}>
						<Button label="Create" onClick={onAddSound} />
					</Link>
				</div>
			</motion.div>
		</FormProvider>
	);
}
