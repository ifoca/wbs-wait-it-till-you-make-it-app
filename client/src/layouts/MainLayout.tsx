import { Outlet } from 'react-router';

const MainLayout = () => {
  return (
    <div className="flex-1">
      <div className="p-4 text-left">
        <h1 className="text-3xl font-bold px-4">You are finally in the right place</h1>
        <p className="text-sm px-4">
          Find real information for your tram and busses departure times.
        </p>
      </div>

      <div
        className="hero"
        style={{
          backgroundImage: 'url(https://images.pexels.com/photos/196655/pexels-photo-196655.jpeg)',
        }}
      >
        <div className="hero-overlay"></div>
        <div className="hero-content text-neutral-content text-left">
          <div className="max-w-xl">
            <h1 className="mb-5 text-5xl font-bold">Hero image to be replaced</h1>
            <p className="mb-5">
              Some text to be added here: Provident cupiditate voluptatem et in. Quaerat fugiat ut
              assumenda excepturi exercitationem quasi. In deleniti eaque aut repudiandae et a id
              nisi.
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
