import { Sound } from "@/player/Sound";
import type { Project } from "./Project";
import { useSoundsStore } from "./sounds";

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
  useSoundsStore.setState({
    sounds,
  });
}

const EMPTY_PROJECT: Project = {
  name: "",
  sounds: [],
};
