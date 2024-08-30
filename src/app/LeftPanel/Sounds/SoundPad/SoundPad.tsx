import { Button } from "primereact/button";
import { SoundPadContextMenu } from "./SoundPadContextMenu";
import { useSoundStore } from "@/store/sounds";
import { useRef } from "react";
import type { ContextMenu } from "primereact/contextmenu";
import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import { motion, useTransform } from "framer-motion";

export function SoundPad({ soundId }: Props) {
  const { getById } = useSoundStore();
  const sound = getById(soundId);
  const contextMenuRef = useRef<ContextMenu>(null);

  if (!sound) {
    console.error("Sound not found");
    return null;
  }

  const { name } = sound;

  function onClick() {
    sound?.play();
  }

  function onContextMenu(event: React.MouseEvent) {
    contextMenuRef?.current?.show(event);
  }

  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging,
  } = useSortable({
    id: soundId,
  });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
    cursor: isDragging ? "grabbing" : "pointer",
    zIndex: isDragging ? 1 : 0,
    overflow: "hidden",
  };

  const progressTransform = useTransform(
    sound.progress,
    (progress) =>
      `translateX(${-progress}%) scaleX(${progress !== 0 ? 100 - progress : 0}%)`,
  );

  return (
    <div
      className="relative overflow-hidden border-round"
      style={style}
      {...listeners}
      {...attributes}
      ref={setNodeRef}
    >
      <Button
        className="w-12rem text-center text-overflow-ellipsis white-space-nowrap"
        rounded
        onClick={onClick}
        onContextMenu={onContextMenu}
        label={name}
      />
      <motion.div
        style={{ transform: progressTransform }}
        className="pointer-events-none left-0 top-0 absolute w-full h-full bg-white-alpha-10"
      />
      <SoundPadContextMenu soundId={soundId} ref={contextMenuRef} />
    </div>
  );
}

type Props = {
  soundId: string;
};
