import { Text } from "@/components/Text/Text";
import { motion } from "framer-motion";
import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import styles from "./SceneCard.module.scss";
import { useSceneStore } from "@/store/scenes";
import type { Scene } from "@/player/Scene";
import clsx from "clsx";

export function SceneCard({ scene }: Props) {
  const { name, id } = scene;

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

  //console.log(style.transform);

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
      style={style}
    >
      <motion.div className={sceneCardClassName} />
      <div className={clsx("px-2 py-1", styles["scene-card__label"])}>
        <Text color="primary">{name}</Text>
      </div>
    </motion.div>
  );
}

type Props = {
  scene: Scene;
};
