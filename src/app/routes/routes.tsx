import { createBrowserRouter } from "react-router-dom";
import { MainView } from "./MainView/MainView";
import { NewSound } from "./NewSound/NewSound";
import { AnimatedLayout } from "../AnimatedLayout/AnimatedLayout";

export const ROUTES = {
	ROOT: "/",
	MAIN: "",
	NEW_SOUND: "/new-sound",
};

export const router = createBrowserRouter([
	{
		path: ROUTES.ROOT,
		element: <AnimatedLayout />,
		children: [
			{
				path: ROUTES.MAIN,
				element: <MainView />,
			},
			{
				path: ROUTES.NEW_SOUND,
				element: <NewSound />,
			},
		],
	},
]);
