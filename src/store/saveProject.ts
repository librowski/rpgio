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

  window.electronApi.saveProject(projectJson);
}, 1000);
