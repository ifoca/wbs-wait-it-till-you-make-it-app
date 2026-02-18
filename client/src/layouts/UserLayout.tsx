import { Outlet, useLocation } from 'react-router';
import { useErrorAndLoadingState } from '../contexts';
import { useEffect } from 'react';

const UserLayout = () => {
  const { setError } = useErrorAndLoadingState();
  const location = useLocation();

  useEffect(() => {
    setError(null);
  }, [location.pathname]);

  return (
    <div className="flex-1 bg-base-100 text-neutral-content">
      <div className="flex flex-col gap-8 p-4">
        <Outlet />
      </div>
    </div>
  );
};

export default UserLayout;
