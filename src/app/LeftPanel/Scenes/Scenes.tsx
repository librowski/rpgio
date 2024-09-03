import { DndContext, MouseSensor, useSensor, useSensors } from "@dnd-kit/core";
import type { DragEndEvent } from "@dnd-kit/core";
import { restrictToParentElement } from "@dnd-kit/modifiers";
import { SortableContext } from "@dnd-kit/sortable";
import { motion } from "framer-motion";
import { PanelSection } from "../../../components/PanelSection/PanelSection";

import { useSceneStore } from "@/store/scenes";
import { reorderBy } from "@/utils/reorderBy";
import { SceneCard } from "./SceneCard/SceneCard";

export function Scenes() {
	const { scenes, setScenes } = useSceneStore();
	const mouseSensor = useSensor(MouseSensor, {
		activationConstraint: {
			delay: 100,
			distance: 10,
			tolerance: 10,
		},
	});

	const sensors = useSensors(mouseSensor);

	function onDragEnd({ active, over }: DragEndEvent) {
		if (active?.id === over?.id) {
			return;
		}

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
				<DndContext
					onDragEnd={onDragEnd}
					modifiers={[restrictToParentElement]}
					sensors={sensors}
				>
					<SortableContext items={scenes}>
						{scenes.map((scene) => (
							<SceneCard scene={scene} key={scene.id} />
						))}
					</SortableContext>
				</DndContext>
			</motion.div>
		</PanelSection>
	);
}
