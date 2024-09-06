import { EntityView } from "@/components/EntityView/EntityView";
import { useNavigateBack } from "@/hooks/useNavigateBack";
import type { Scene } from "@/player/Scene";
import { useSceneStore } from "@/store/scenes";
import { FormProvider } from "react-hook-form";
import { SceneForm } from "./SceneForm";
import { useSceneForm } from "./useSceneForm";

export function NewSceneView() {
	const methods = useSceneForm();
	const { addScene } = useSceneStore();
	const goBack = useNavigateBack();

	function onAddScene(scene: Scene) {
		addScene(scene);
		goBack();
	}

	return (
		<FormProvider {...methods}>
			<EntityView header="New scene">
				<SceneForm onSave={onAddScene} confirmText={"Create"} />
			</EntityView>
		</FormProvider>
	);
}
