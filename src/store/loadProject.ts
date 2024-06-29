import { Sound } from "@/player/Sound";
import type { Project } from "./Project";
import { useSoundStore as soundStore } from "./sounds";
import { useSceneStore as sceneStore } from "./scenes";
import { Scene } from "@/player/Scene";

export function loadProject() {
	let projectJson: Project = EMPTY_PROJECT;

	try {
		const projectString = localStorage.getItem("project");
		if (!projectString) {
			throw new Error("No project found.");
		}

		projectJson = JSON.parse(projectString);
	} catch (error) {
		console.error("Couldnt't parse project json", error);
	}

	const sounds = projectJson.sounds.map((sound) => new Sound(sound));
	soundStore.setState({
		sounds,
	});

	const scenes = projectJson.scenes.map((scene) => new Scene(scene));
	sceneStore.setState({
		scenes,
	});
}

const EMPTY_PROJECT: Project = {
	name: "",
	sounds: [],
	scenes: [],
};
