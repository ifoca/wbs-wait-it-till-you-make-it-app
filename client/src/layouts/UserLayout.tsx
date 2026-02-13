import { Outlet } from 'react-router';

const UserLayout = () => {
  return (
    <div className="flex-1 bg-base-200">
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
