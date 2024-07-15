import { useSoundStore } from "@/store/sounds";
import { reorderBy } from "@/utils/reorderBy";
import { MouseSensor, useSensor, useSensors } from "@dnd-kit/core";
import type { DragEndEvent } from "@dnd-kit/core";
import { PanelSection } from "../../../components/PanelSection/PanelSection";
import { SoundPad } from "./SoundPad/SoundPad";
import { restrictToParentElement } from "@dnd-kit/modifiers";
import { SortableContext } from "@dnd-kit/sortable";
import { DndContext } from "@dnd-kit/core";
import { motion } from "framer-motion";

export function Sounds() {
  const { sounds, setSounds } = useSoundStore();

  const mouseSensor = useSensor(MouseSensor, {
    activationConstraint: {
      delay: 100,
      distance: 0,
      tolerance: 10,
    },
  });

  const sensors = useSensors(mouseSensor);

  function onDragEnd({ active, over }: DragEndEvent) {
    if (active?.id === over?.id) {
      return;
    }

    const reorderedSounds = reorderBy(
      sounds,
      { name: "id", value: active?.id.toString() },
      { name: "id", value: over?.id.toString() ?? "" },
    );

    setSounds(reorderedSounds);
  }

  return (
    <PanelSection header="Sounds">
      <motion.div className="flex flex-wrap gap-2 p-0">
        <DndContext
          onDragEnd={onDragEnd}
          modifiers={[restrictToParentElement]}
          sensors={sensors}
        >
          <SortableContext items={sounds}>
            {sounds.map(({ id }) => {
              return <SoundPad key={id} soundId={id} />;
            })}
          </SortableContext>
        </DndContext>
      </motion.div>
    </PanelSection>
  );
}
