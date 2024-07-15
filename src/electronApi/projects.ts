import type { Project } from "@/store/Project";
import { app } from "electron";
import { writeFile, readFile } from "node:fs/promises";

export function saveProject(project: Project) {
  try {
    const filePath = getRpgioDataPath();
    const projectString = JSON.stringify(project);
    writeFile(filePath, projectString);
  } catch (error) {
    console.error("Couldnt't save project json", error);
  }
}

export async function loadProject(): Promise<Project | undefined> {
  try {
    const filePath = getRpgioDataPath();
    const projectBuffer = await readFile(filePath);

    if (!projectBuffer) {
      return;
    }

    const projectString = projectBuffer?.toString();
    const project = JSON.parse(projectString) as Project;

    return project;
  } catch (error) {
    console.error("Couldnt't load project json", error);
  }
}

function getRpgioDataPath() {
  const userDataPath = app.getPath("userData");
  return `${userDataPath}/project.json`;
}
