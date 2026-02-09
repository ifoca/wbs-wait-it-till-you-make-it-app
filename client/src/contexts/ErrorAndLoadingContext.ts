import { createContext, use } from 'react';

export type ErrorAndLoadingContextType = {
  error: string | null;
  setError: React.Dispatch<React.SetStateAction<string | null>>;
  loading: boolean;
  setLoading: React.Dispatch<React.SetStateAction<boolean>>;
};

export const ErrorAndLoadingContext = createContext<ErrorAndLoadingContextType | undefined>(
  undefined,
);

const useErrorAndLoadingState = () => {
  const context = use(ErrorAndLoadingContext);
  if (!context) {
    throw new Error('ErrorAndLoadingContext does not exist in this component');
  }
  return context;
};

export default useErrorAndLoadingState;
