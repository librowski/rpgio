import { useEffect } from "react";
import { saveProject } from "./saveProject";
import { useSceneStore as sceneStore } from "./scenes";
import { useSoundStore as soundStore } from "./sounds";
import { loadProject } from "./loadProject";

export function useAutosave() {
  useEffect(() => {
    (async () => {
      await loadProject();

      sceneStore.subscribe(saveProject);
      soundStore.subscribe(saveProject);
    })();
  }, []);
}
