import { createContext } from "react";

interface AppStateContextType {
  isLoading: boolean;
  setIsLoading: (loading: boolean) => void;
  error: string | undefined;
  setError: (error: string | undefined) => void;
}

export const AppStateContext = createContext<AppStateContextType | undefined>(
  undefined
);
