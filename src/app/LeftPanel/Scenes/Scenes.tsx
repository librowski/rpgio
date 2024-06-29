import { motion } from "framer-motion";
import { DndContext, type DragEndEvent } from "@dnd-kit/core";
import { restrictToParentElement } from "@dnd-kit/modifiers";
import { SortableContext } from "@dnd-kit/sortable";
import { PanelSection } from "../../../components/PanelSection/PanelSection";

import { SceneCard } from "./SceneCard/SceneCard";
import { useState } from "react";
import { reorderBy } from "@/utils/reorderBy";
import { useSceneStore } from "@/store/scenes";

const _FAKE_SCENES = [
  {
    id: "Dark Forest",
    name: "Dark Forest",
    image:
      "https://images.unsplash.com/photo-1656835273774-74f2a82793a5?q=80&w=2574&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  },
  {
    id: "Market Square",
    name: "Market Square",
    image:
      "https://ruralhistoria.com/wp-content/uploads/images/medieval-market-squares.jpeg",
  },
  {
    id: "Deep Cave",
    name: "Deep Cave",
    image:
      "https://images.unsplash.com/photo-1517239320384-e08ad2c24a3e?q=80&w=2670&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  },
];

export function Scenes() {
  const { scenes, setScenes } = useSceneStore();

  function onDragEnd({ active, over }: DragEndEvent) {
    const reorderedScenes = reorderBy(
      scenes,
      { name: "id", value: active?.id.toString() },
      { name: "id", value: over?.id.toString() ?? "" },
    );

    setScenes(reorderedScenes);
  }

  return (
    <PanelSection header="Scenes">
      <motion.div className="flex flex-wrap gap-2 p-0">
        <DndContext onDragEnd={onDragEnd} modifiers={[restrictToParentElement]}>
          <SortableContext items={scenes}>
            {scenes.map((scene) => (
              <SceneCard scene={scene} key={scene.name} />
            ))}
          </SortableContext>
        </DndContext>
      </motion.div>
    </PanelSection>
  );
}
