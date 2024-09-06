import { createBrowserRouter } from "react-router-dom";
import { AnimatedLayout } from "../AnimatedLayout/AnimatedLayout";
import { MainView } from "./main/MainView";
import { EditSceneView } from "./scenes/EditSceneView";
import { NewSceneView } from "./scenes/NewSceneView";
import { EditSoundView } from "./sounds/EditSoundView";
import { NewSoundView } from "./sounds/NewSoundView";

export const ROUTES = {
	ROOT: "/",
	SOUNDS_NEW: "/sounds/new",
	SOUNDS_EDIT: "/sounds/edit/:id",
	SCENES_NEW: "/scenes/new",
	SCENES_EDIT: "/scenes/edit/:id",
};

export const router = createBrowserRouter([
	{
		path: ROUTES.ROOT,
		element: <AnimatedLayout />,
		children: [
			{
				path: "",
				element: <MainView />,
			},
			{
				path: ROUTES.SOUNDS_EDIT,
				element: <EditSoundView />,
			},
			{
				path: ROUTES.SOUNDS_NEW,
				element: <NewSoundView />,
			},
			{
				path: ROUTES.SCENES_EDIT,
				element: <EditSceneView />,
			},
			{
				path: ROUTES.SCENES_NEW,
				element: <NewSceneView />,
			},
		],
	},
]);
