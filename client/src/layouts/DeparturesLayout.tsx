import { Outlet } from 'react-router-dom';
import { SearchBar } from '../components';

const DeparturesLayout = () => {
  return (
    <div className="flex-1 bg-base-100 text-neutral-content">
      <div className="p-4 text-center">
        <h1 className="text-3xl font-bold px-4">Departures page</h1>
        <p className="text-sm px-4">Here we are going to add some text related to the search.</p>
      </div>

      <div className="p-4">
        <div className="bg-base-300 rounded-box">
          <SearchBar />
        </div>
        <Outlet />
      </div>
    </div>
  );
};

export default DeparturesLayout;
