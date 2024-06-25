import { PrimeReactProvider } from "primereact/api";

export function MainProvider({ children }: ProviderProps) {
	return <PrimeReactProvider>{children}</PrimeReactProvider>;
}

type ProviderProps = {
	children: React.ReactNode;
};
