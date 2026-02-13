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
      <div className="p-4 text-center">
        <h1 className="text-3xl font-bold px-4">User page</h1>
        <p className="text-sm px-4">
          Here we are going to implement the user authentication and profile management.
        </p>
      </div>
      <div className="p-4">
        <Outlet />
      </div>
    </div>
  );
};

export default UserLayout;
