import { SceneCard } from "@/app/LeftPanel/Scenes/SceneCard/SceneCard";
import { Scene } from "@/player/Scene";
import { useMemo } from "react";
import { useSceneFormContext } from "./useSceneForm";

export function ScenePreview() {
	const { watch } = useSceneFormContext();
	const sceneOptions = watch();
	const scene = useMemo(
		() => new Scene({ id: "test", ...sceneOptions }),
		[sceneOptions],
	);

	return (
		<div className="flex flex-1 w-full justify-content-center align-items-center">
			<SceneCard scene={scene} previewMode />
		</div>
	);
}
