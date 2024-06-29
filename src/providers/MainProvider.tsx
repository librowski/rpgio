import { PrimeReactProvider } from "primereact/api";
import type { ProviderProps } from "./ProviderProps";
import { RouterProvider } from "./RouterProvider";

export function MainProvider({ children }: ProviderProps) {
  return (
    <PrimeReactProvider>
      <RouterProvider>{children}</RouterProvider>
    </PrimeReactProvider>
  );
}
