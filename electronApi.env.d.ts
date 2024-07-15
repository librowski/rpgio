import type { Project } from "@/store/Project";

export type { };

declare global {
  interface Window {
    electronApi: {
      loadProject(): Promise<Project>;
      saveProject(project: Project): Promise<void>;
    }
  }
}
