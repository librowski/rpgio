import type { Project } from "./Project";
import { useSoundsStore } from "./sounds";

export function saveProject() {
  const { sounds } = useSoundsStore.getState();

  const projectJson: Project = {
    name: "Some project",
    sounds: sounds.map((sound) => sound.toJson()),
  };

  try {
    const projectString = JSON.stringify(projectJson);
    localStorage.setItem("project", projectString);
  } catch (error) {
    console.error("Couldnt't parse project json", error);
  }
}
