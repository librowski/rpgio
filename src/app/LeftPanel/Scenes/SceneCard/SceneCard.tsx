import { Text } from "@/components/Text/Text";
import { motion } from "framer-motion";
import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import styles from "./SceneCard.module.scss";
import { useSceneStore } from "@/store/scenes";

export function SceneCard({ scene }: Props) {
  const { name, image } = scene;

  const { activateScene } = useSceneStore();

  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging,
  } = useSortable({ id: name });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition: transition,
    cursor: isDragging ? "grabbing" : "pointer",
    zIndex: isDragging ? 1 : 0,
  };

  const className = `list-none ${styles["with-shadow"]} ${isDragging ? styles.dragging : ""}`;

  function onClick() {
    activateScene(scene);
  }

  return (
    <motion.div
      key={name}
      {...attributes}
      {...listeners}
      ref={setNodeRef}
      className={className}
      initial="initial"
      whileHover="hover"
      onClick={onClick}
      style={style}
    >
      <motion.div
        className="w-15rem h-8rem flex flex-column bg-gray-900 overflow-hidden border-round-sm"
        variants={{ hover: { opacity: 1 }, initial: { opacity: 0.8 } }}
      >
        <div
          className="flex-1 bg-no-repeat bg-cover bg-center"
          style={{ backgroundImage: `url(${image})` }}
        />
        <div className="px-2 py-1">
          <Text>{name}</Text>
        </div>
      </motion.div>
    </motion.div>
  );
}

type Props = {
  scene: Scene;
};
