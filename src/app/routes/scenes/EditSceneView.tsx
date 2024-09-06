import { EntityView } from "@/components/EntityView/EntityView";
import { EditingTag } from "@/components/tags/EditingTag";
import { useNavigateBack } from "@/hooks/useNavigateBack";
import type { Scene } from "@/player/Scene";
import { useSceneStore } from "@/store/scenes";
import { FormProvider } from "react-hook-form";
import { useParams } from "react-router-dom";
import { SceneForm } from "./SceneForm";
import { useSceneForm } from "./useSceneForm";

export function EditSceneView() {
	const { id } = useParams();

	const goBack = useNavigateBack();
	if (!id) {
		console.error("No id provided");
		goBack();
	}

	const methods = useSceneForm(id);
	const { getValues } = methods;
	const { updateScene } = useSceneStore();
	const { name } = getValues();

	function onEditScene(scene: Scene) {
		if (!id) {
			return;
		}

		updateScene(id, scene);
		goBack();
	}

	return (
		<FormProvider {...methods}>
			<EntityView
				header={
					<div className="flex gap-2 align-items-center">
						{name}
						<EditingTag />
					</div>
				}
			>
				<SceneForm onSave={onEditScene} confirmText={"Save"} />
			</EntityView>
		</FormProvider>
	);
}
