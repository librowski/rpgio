import type { Scene } from "@/player/Scene";
import { create } from "zustand";

export const useSceneStore = create<SceneStore>((set, get) => ({
  scenes: [],
  activeSceneName: undefined,
  get activeScene() {
    const { scenes, activeSceneName } = get();

    return scenes.find((scene) => scene.name === activeSceneName);
  },
  activateScene(scene: Scene) {
    set({ activeSceneName: scene.name });
  },
  addScene(scene) {
    set((state) => ({
      scenes: [...state.scenes, scene],
    }));
  },
  setScenes(scenes) {
    set({ scenes });
  },
}));

type SceneStore = {
  scenes: Scene[];
  activeScene?: Scene;
  activeSceneName?: string;
  activateScene(scene: Scene): void;
  addScene(scene: Scene): void;
  setScenes(scenes: Scene[]): void;
};
