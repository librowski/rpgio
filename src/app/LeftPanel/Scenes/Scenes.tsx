import { motion } from "framer-motion";
import { DndContext, type DragEndEvent } from "@dnd-kit/core";
import { restrictToParentElement } from "@dnd-kit/modifiers";
import { SortableContext } from "@dnd-kit/sortable";
import { PanelSection } from "../../../components/PanelSection/PanelSection";

import { SceneCard } from "./SceneCard/SceneCard";
import { reorderBy } from "@/utils/reorderBy";
import { useSceneStore } from "@/store/scenes";

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
