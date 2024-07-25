import { IconButton } from "@/components/IconButton/IconButton";
import { Text } from "@/components/Text/Text";
import { ArrowLeft } from "@phosphor-icons/react";
import { motion } from "framer-motion";
import { InputText } from "primereact/inputtext";
import styles from "./NewScene.module.scss";
import { Button } from "primereact/button";
import { SoundSchedules } from "./SoundSchedules/SoundSchedules";
import { useNewSceneForm } from "./useNewSceneForm";
import { FormProvider } from "react-hook-form";
import { Scene } from "@/player/Scene";
import { uuid } from "@/utils/uuid";
import type { SoundSchedulerOptions } from "@/player/SoundScheduler";
import { useSoundStore } from "@/store/sounds";
import { useSceneStore } from "@/store/scenes";
import { useNavigateBack } from "@/hooks/useNavigateBack";

export function NewScene() {
	const methods = useNewSceneForm();
	const { getById: getSoundById } = useSoundStore();
	const { addScene } = useSceneStore();
	const { register, getValues } = methods;
	const goBack = useNavigateBack();

	function onAddScene() {
		const { name, soundSchedules } = getValues();

		const soundSchedulesOptions: SoundSchedulerOptions[] = soundSchedules.map(
			({ soundId, ...data }) => {
				const { name, files } = getSoundById(soundId) ?? {
					name: "",
					files: [],
				};

				return {
					soundOptions: {
						id: soundId,
						name: name,
						fileOptionsList: files?.map(({ path }) => ({ path })),
					},
					...data,
				};
			},
		);

		const scene = new Scene({
			name,
			id: uuid(),
			soundSchedules: soundSchedulesOptions,
			image: "",
		});

		addScene(scene);
		goBack();
	}

	return (
		<FormProvider {...methods}>
			<motion.div
				animate
				className={`flex gap-4 flex-column ${styles.container}`}
			>
				<div className="flex align-items-center gap-2 relative">
					<IconButton
						icon={ArrowLeft}
						className={styles["back-button"]}
						onClick={goBack}
					/>
					<Text size="extra-large" weight="bold">
						New Scene
					</Text>
				</div>

				<div className="flex gap-2 align-items-end">
					<div className="flex flex-1 flex-column gap-1">
						<Text<"label"> tag="label" htmlFor="name">
							Name
						</Text>
						<InputText id="name" {...register("name")} />
					</div>
					<Button className="flex-1" label="Choose Key" />
				</div>
				<SoundSchedules />
				<Button label="Create" onClick={onAddScene} />
			</motion.div>
		</FormProvider>
	);
}
