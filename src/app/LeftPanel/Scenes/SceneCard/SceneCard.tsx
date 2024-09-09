import { Text } from "@/components/Text/Text";
import { PreviewTag } from "@/components/tags/PreviewTag";
import type { Scene } from "@/player/Scene";
import { useSceneStore } from "@/store/scenes";
import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import clsx from "clsx";
import { motion } from "framer-motion";
import type { ContextMenu } from "primereact/contextmenu";
import { useRef } from "react";
import styles from "./SceneCard.module.scss";
import { SceneCardContextMenu } from "./SceneCardContextMenu";

export function SceneCard({ scene, previewMode }: Props) {
	const { image, name, id } = scene;
	const contextMenuRef = useRef<ContextMenu>(null);

	function onContextMenu(event: React.MouseEvent) {
		if (previewMode) {
			return;
		}

		contextMenuRef?.current?.show(event);
	}

	const { activateScene, activeSceneId } = useSceneStore();
	const isActive = activeSceneId === id;

	const {
		attributes,
		listeners,
		setNodeRef,
		transform,
		transition,
		isDragging,
	} = useSortable({ id });

	const style = {
		"--url": `url(${image})`,
		transform: CSS.Transform.toString(transform),
		transition: transition,
		cursor: isDragging ? "grabbing" : "pointer",
		zIndex: isDragging ? 1 : 0,
	};

	const sceneCardClassName = clsx("flex-1", styles["scene-card"]);

	function onClick() {
		activateScene(scene);
	}

	return (
		<motion.div
			key={id}
			{...attributes}
			{...listeners}
			ref={setNodeRef}
			className={clsx(
				"relative flex flex-column list-none overflow-hidden border-round-sm",
				styles.container,
				{
					[styles.active]: isActive,
				},
			)}
			initial="initial"
			whileHover="hover"
			onClick={onClick}
			onContextMenu={onContextMenu}
			style={style}
		>
			<motion.div className={sceneCardClassName} />
			<div className={clsx("px-2 py-1", styles["scene-card__label"])}>
				<Text color="primary">{name}</Text>
			</div>
			{previewMode && (
				<div className="absolute opacity-80 top-0 right-0 m-1">
					<PreviewTag />
				</div>
			)}
			<SceneCardContextMenu sceneId={id} ref={contextMenuRef} />
		</motion.div>
	);
}

type Props = {
	scene: Scene;
	previewMode?: boolean;
};
