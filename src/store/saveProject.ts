import type { Project } from "./Project";
import { useSceneStore as sceneStore } from "./scenes";
import { useSoundStore as soundStore } from "./sounds";
import { debounce } from "@/utils/debounce";

export const saveProject = debounce(() => {
	const { sounds } = soundStore.getState();
	const { scenes } = sceneStore.getState();

	const projectJson: Project = {
		name: "Some project",
		sounds: sounds.map((sound) => sound.toJson()),
		scenes: scenes.map((scene) => scene.toJson()),
	};

	console.log("Saving project", projectJson);

	try {
		const projectString = JSON.stringify(projectJson);
		localStorage.setItem("project", projectString);
	} catch (error) {
		console.error("Couldnt't parse project json", error);
	}
}, 1000);
