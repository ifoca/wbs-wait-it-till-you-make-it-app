import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const SearchBar = () => {
  const [city, setCity] = useState('');
  const [station, setStation] = useState('');
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!city || !station) return; // to return error message
    navigate(`/${city}/${station}`);
  };

  return (
    <>
      <h1 className="text-center p-4">Search for your station</h1>
      <form onSubmit={handleSubmit} className="flex flex-col gap-4">
        <label className="input">
          <svg
            className="h-[1em] opacity-50"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
          >
            <g
              strokeLinejoin="round"
              strokeLinecap="round"
              strokeWidth="2.5"
              fill="none"
              stroke="currentColor"
            >
              <circle cx="11" cy="11" r="8"></circle>
              <path d="m21 21-4.3-4.3"></path>
            </g>
          </svg>
          <input
            id="cityName"
            value={city}
            onChange={(e) => setCity(e.target.value)}
            type="text"
            required
            placeholder="City"
          />
        </label>

        <label className="input">
          <svg
            className="h-[1em] opacity-50"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
          >
            <g
              strokeLinejoin="round"
              strokeLinecap="round"
              strokeWidth="2.5"
              fill="none"
              stroke="currentColor"
            >
              <circle cx="11" cy="11" r="8"></circle>
              <path d="m21 21-4.3-4.3"></path>
            </g>
          </svg>
          <input
            id="stationName"
            value={station}
            onChange={(e) => setStation(e.target.value)}
            type="text"
            placeholder="Station name"
          />
        </label>
        <div className="validator-hint hidden">Enter both city and station name</div>
        <button type="submit" className="btn bg-neutral">
          Search
        </button>
      </form>
    </>
  );
};

export default SearchBar;
