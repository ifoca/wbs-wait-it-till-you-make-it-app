import { Outlet } from 'react-router';

const MainLayout = () => {
  return (
    <div className="flex-1 bg-base-100">
      <div
        className="hero"
        style={{
          backgroundImage: 'url("/assets/hero2.jpg")',
        }}
      >
        <div className="hero-overlay"></div>
        <div className="hero-content text-left">
          <div className="max-w-xl">
            <h1 className="mb-5 text-4xl font-bold">Stop guessing. Start timing.</h1>
            <p className="mb-5 font-light text-balance">
              Check live tram and bus departures across Germany before you leave the house. No more
              rushing, no more waiting{' '}
            </p>
          </div>
        </div>
      </div>
      <div className="flex flex-col gap-8 p-4 mt-8 mb-8">
        <Outlet />
      </div>
    </div>
  );
};

export default MainLayout;
