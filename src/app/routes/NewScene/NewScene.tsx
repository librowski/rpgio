import { IconButton } from "@/components/IconButton/IconButton";
import { Text } from "@/components/Text/Text";
import { ArrowLeft, Plus } from "@phosphor-icons/react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { InputText } from "primereact/inputtext";
import styles from "./NewScene.module.scss";
import { Button } from "primereact/button";
import { SoundSchedules } from "./SoundSchedules";
import { useNewSceneForm } from "./useNewSceneForm";
import { FormProvider } from "react-hook-form";

export function NewScene() {
	const methods = useNewSceneForm();
	const { register } = methods;

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
						New Scene
					</Text>
				</div>

				<div className="flex gap-2 px-2 align-items-end">
					<div className="flex flex-1 flex-column gap-1">
						<Text<"label"> tag="label" htmlFor="name">
							Name
						</Text>
						<InputText id="name" {...register("name")} />
					</div>
					<Button className="flex-1" label="Choose Key" />
				</div>
				<SoundSchedules />
			</motion.div>
		</FormProvider>
	);
}
