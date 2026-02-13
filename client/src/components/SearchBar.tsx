import { useState, type FormEvent } from 'react';
import { useNavigate } from 'react-router-dom';

const SearchBar = () => {
  const [city, setCity] = useState('');
  const [station, setStation] = useState('');
  const navigate = useNavigate();

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    navigate(`/search/${city}/${station}`);
  };

  const isDisabled = !city || !station;

  return (
    <>
      <form
        onSubmit={handleSubmit}
        className="flex items-center flex-col gap-4 p-4 text-neutral-content"
      >
        <h1 className="text-xl font-semibold">Search for your station</h1>

        <label className="input w-96">
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
            placeholder="City"
            required
          />
        </label>

        <label className="input w-96">
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
            required
          />
        </label>
        <button
          type="submit"
          className={`w-24 btn ${!isDisabled ? 'bg-base-100' : ''} hover:bg-neutral`}
          disabled={isDisabled}
        >
          Search
        </button>
      </form>
    </>
  );
};

export default SearchBar;
