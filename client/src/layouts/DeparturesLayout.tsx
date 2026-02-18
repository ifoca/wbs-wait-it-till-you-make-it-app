import { Outlet } from 'react-router-dom';
import { SearchBar } from '../components';

const DeparturesLayout = () => {
  return (
    <div className="flex-1 bg-base-100 text-neutral-content">
      <div className="p-4 text-center">
        <h1 className="text-3xl font-bold px-4">Departures</h1>
        <p className="text-sm px-4">
          Live departure times from your selected station. Plan your journey before you leave
        </p>
      </div>

      <div className="flex flex-col gap-8 p-4">
        <div className="bg-base-300 rounded-box">
          <SearchBar />
        </div>
        <div>
          <Outlet />
        </div>
      </div>
    </div>
  );
};

export default DeparturesLayout;
