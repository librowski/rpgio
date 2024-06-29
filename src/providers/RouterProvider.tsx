import { RouterProvider as ReactRouterProvider } from "react-router-dom";
import type { ProviderProps } from "./ProviderProps";
import { router } from "@/app/routes/routes";

export function RouterProvider({ children }: ProviderProps) {
	return (
		<>
			{children}
			<ReactRouterProvider router={router} />
		</>
	);
}
