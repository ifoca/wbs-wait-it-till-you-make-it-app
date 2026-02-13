import { Outlet } from 'react-router';

const MainLayout = () => {
  return (
    <div className="flex-1 bg-base-100">
      <div
        className="hero"
        style={{
          backgroundImage: 'url(https://images.pexels.com/photos/196655/pexels-photo-196655.jpeg)',
        }}
      >
        <div className="hero-overlay"></div>
        <div className="hero-content text-left">
          <div className="max-w-xl">
            <h1 className="mb-5 text-5xl font-bold">You are finally in the right place</h1>
            <p className="mb-5">
              Find real time schedules for trams and buses in your area, all over Germany. Maybe
              some more text to be inserted here{' '}
            </p>
          </div>
        </div>
      </div>
      <div className="p-4">
        <Outlet />
      </div>
    </div>
  );
};

export default MainLayout;
