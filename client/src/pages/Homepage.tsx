import { useNavigate } from 'react-router-dom';
import { SearchBar } from '../components';
import { useAuthState } from '../contexts';
const Homepage = () => {
  const navigate = useNavigate();
  const { authToken } = useAuthState();

  return (
    <>
      <div className="bg-base-300 rounded-box">
        <SearchBar />
      </div>
      {authToken ? (
        <div> I am logged in </div>
      ) : (
        <div className="flex justify-between items-center rounded-box bg-base-300 text-neutral-content p-4 gap-2">
          {' '}
          <div>
            <p>Log in to access saved stations.</p>
          </div>
          <div>
            <button
              onClick={() => navigate('/user')}
              className="btn btn-sm bg-base-100 hover:bg-neutral"
            >
              Log in
            </button>
          </div>
        </div>
      )}
      <div className="flex flex-col rounded-box bg-base-300 text-neutral-content p-4 gap-4">
        <div className="flex justify-between items-center">
          <h3 className="text-xl font-semibold">Why we built this</h3>
          <img src="/assets/logo.svg" alt="Logo" className="w-12 h-12" />
        </div>
        <p className="text-balance text-sm">
          Wait Till You Make It was born out of one too many sprints to the tram stop. We wanted a
          simple, no-fuss way to check real-time departures before leaving the house — no app
          downloads, no accounts required. Just type your city and station, and go. Works across all
          German transit networks, updates in real time, and looks great on the screen in your
          office kitchen too.
        </p>
      </div>
    </>
  );
};

export default Homepage;
