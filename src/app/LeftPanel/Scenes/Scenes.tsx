import { Reorder } from "framer-motion";
import { PanelSection } from "../../../components/PanelSection/PanelSection";

import { SceneCard } from "./SceneCard/SceneCard";
import { useState } from "react";

const _FAKE_SCENES = [
	{
		name: "Dark Forest",
		image:
			"https://images.unsplash.com/photo-1656835273774-74f2a82793a5?q=80&w=2574&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
	},
	{
		name: "Market Square",
		image:
			"https://ruralhistoria.com/wp-content/uploads/images/medieval-market-squares.jpeg",
	},
	{
		name: "Deep Cave",
		image:
			"https://images.unsplash.com/photo-1517239320384-e08ad2c24a3e?q=80&w=2670&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
	},
];

export function Scenes() {
	const [scenes, setScenes] = useState(_FAKE_SCENES);

	return (
		<PanelSection header="Scenes">
			<Reorder.Group
				axis="x"
				values={scenes}
				onReorder={(scenes) => setScenes(scenes)}
				className="flex gap-2 p-0"
			>
				{scenes.map((scene) => (
					<SceneCard scene={scene} key={scene.name} />
				))}
			</Reorder.Group>
		</PanelSection>
	);
}
