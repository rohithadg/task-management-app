import { ReactNode, useState } from "react";
import { AppStateContext } from "./AppStateContext";

interface AppStateProviderProps {
  children: ReactNode;
}

export const AppStateProvider = ({ children }: AppStateProviderProps) => {
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | undefined>(undefined);

  return (
    <AppStateContext.Provider value={{ isLoading, setIsLoading, error, setError }}>
      {children}
    </AppStateContext.Provider>
  );
};