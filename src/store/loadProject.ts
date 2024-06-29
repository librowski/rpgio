import { Sound, SoundOptions } from "@/player/Sound";
import type { Project } from "./Project";
import { useSoundStore as soundStore } from "./sounds";
import { useSceneStore as sceneStore } from "./scenes";
import { Scene } from "@/player/Scene";
import { SoundSchedulerOptions } from "@/player/SoundScheduler";

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

	const sounds = projectJson.sounds.map(
		({ filePaths, ...sound }) =>
			new Sound({
				...sound,
				fileOptionsList: filePaths.map((path) => ({ path })),
			}),
	);
	soundStore.setState({
		sounds,
	});

	const scenes = projectJson.scenes.map(({ soundSchedules, ...scene }) => {
		return new Scene({
			...scene,
			soundSchedules: soundSchedules.map(
				({ soundId, ...data }): SoundSchedulerOptions => {
					const sound = soundStore.getState().getById(soundId);

					if (!sound) {
						throw new Error(`Could not find sound with id ${soundId}`);
					}

					return {
						...data,
						soundOptions: {
							fileOptionsList: sound.files.map(({ path }) => ({ path })),
							name: sound.name,
						},
					};
				},
			),
		});
	});
	sceneStore.setState({
		scenes,
	});
}

const EMPTY_PROJECT: Project = {
	name: "",
	sounds: [],
	scenes: [],
};
