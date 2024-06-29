import { IconButton } from "@/components/IconButton/IconButton";
import { Text } from "@/components/Text/Text";
import { ArrowLeft, Plus } from "@phosphor-icons/react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { InputText } from "primereact/inputtext";
import styles from "./NewScene.module.scss";
import { Button } from "primereact/button";
import { useState } from "react";
import { SoundSchedule } from "./SoundSchedule";

export function NewScene() {
	const [name, setName] = useState("");

	return (
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
					<InputText
						id="name"
						value={name}
						onChange={(e) => setName(e.target.value)}
					/>
				</div>
				<Button className="flex-1" label="Choose Key" />
			</div>
			<SoundSchedule />
			<IconButton icon={Plus} />
		</motion.div>
	);
}
