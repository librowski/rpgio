import { Text } from "@/components/Text/Text";
import { motion } from "framer-motion";
import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import styles from "./SceneCard.module.scss";
import { useSceneStore } from "@/store/scenes";
import type { Scene } from "@/player/Scene";
import clsx from "clsx";
import { useRef } from "react";
import type { ContextMenu } from "primereact/contextmenu";
import { SceneCardContextMenu } from "./SceneCardContextMenu";

export function SceneCard({ scene }: Props) {
  const { name, id } = scene;
  const contextMenuRef = useRef<ContextMenu>(null);

  function onContextMenu(event: React.MouseEvent) {
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
        "flex flex-column list-none overflow-hidden border-round-sm",
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
      <SceneCardContextMenu sceneId={id} ref={contextMenuRef} />
    </motion.div>
  );
}

type Props = {
  scene: Scene;
};
