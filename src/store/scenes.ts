import type { Scene } from "@/player/Scene";
import { create } from "zustand";

export const useSceneStore = create<SceneStore>((set, get) => ({
	scenes: [],
	activeSceneId: undefined,
	getById(id) {
		const { scenes } = get();
		return scenes.find((scene) => scene.id === id) ?? null;
	},
	getActiveScene() {
		const { getById, activeSceneId } = get();

		if (!activeSceneId) {
			return null;
		}

		return getById(activeSceneId);
	},
	deactiveateScene() {
		set({ activeSceneId: undefined });
	},
	activateScene(scene: Scene) {
		const currentScene = get().getActiveScene();

		if (scene === currentScene) {
			return;
		}

		currentScene?.stop();

		set({ activeSceneId: scene.id });

		scene.play();
	},
	addScene(scene) {
		set((state) => ({
			scenes: [...state.scenes, scene],
		}));
	},
	updateScene(id, updatedScene) {
		set(({ scenes }) => ({
			scenes: scenes.map((scene) => (scene.id === id ? updatedScene : scene)),
		}));
	},
	removeScene(sceneId) {
		set((state) => ({
			scenes: state.scenes.filter(({ id }) => id !== sceneId),
		}));
	},
	setScenes(scenes) {
		set({ scenes });
	},
}));

type SceneStore = {
	scenes: Scene[];
	activeSceneId?: string;
	getActiveScene(): Scene | null;
	getById(id: string): Scene | null;
	activateScene(scene: Scene): void;
	deactiveateScene(): void;
	addScene(scene: Scene): void;
	setScenes(scenes: Scene[]): void;
	removeScene(sceneId: string): void;
	updateScene(sceneId: string, updatedScene: Scene): void;
};
