import { useState } from 'react';
import { ErrorAndLoadingContext } from './ErrorAndLoadingContext';

function ErrorAndLoadingState({ children }: { children: React.ReactNode }) {
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);
  return (
    <ErrorAndLoadingContext.Provider value={{ error, setError, loading, setLoading }}>
      {children}
    </ErrorAndLoadingContext.Provider>
  );
}

export default ErrorAndLoadingState;
