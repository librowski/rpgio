import type { Scene } from "@/player/Scene";
import { create } from "zustand";

export const useSceneStore = create<SceneStore>((set, get) => ({
  scenes: [],
  activeSceneId: undefined,
  getActiveScene() {
    const { scenes, activeSceneId } = get();

    console.log(scenes);
    console.log(activeSceneId);

    return scenes.find((scene) => scene.id === activeSceneId);
  },
  activateScene(scene: Scene) {
    const currentScene = get().getActiveScene();
    currentScene?.stop();

    set({ activeSceneId: scene.id });

    scene.play();
  },
  addScene(scene) {
    set((state) => ({
      scenes: [...state.scenes, scene],
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
  getActiveScene(): Scene | undefined;
  activateScene(scene: Scene): void;
  addScene(scene: Scene): void;
  setScenes(scenes: Scene[]): void;
  removeScene(sceneId: string): void;
};
