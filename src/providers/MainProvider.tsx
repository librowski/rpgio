import { PrimeReactProvider } from 'primereact/api';

export function MainProvider({ children }: ProviderProps) {
  return (
    <PrimeReactProvider>
      {children}
    </PrimeReactProvider>
  );
}

interface ProviderProps {
  children: React.ReactNode;
}
