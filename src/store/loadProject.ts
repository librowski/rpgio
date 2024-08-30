import { Sound } from "@/player/Sound";
import type { Project } from "./Project";
import { useSoundStore as soundStore } from "./sounds";
import { useSceneStore as sceneStore } from "./scenes";
import { Scene } from "@/player/Scene";
import type { SoundSchedulerOptions } from "@/player/SoundScheduler";

export async function loadProject() {
	const projectJson = (await window.electronApi.loadProject()) ?? EMPTY_PROJECT;

	const sounds = projectJson.sounds.map(
		({ filesData, ...sound }) =>
			new Sound({
				...sound,
				filesData,
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
					return {
						...data,
						soundId,
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
