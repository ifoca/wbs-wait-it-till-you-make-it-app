import { useEffect, useRef, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { ErrorMessage, LoadingMessage, TimetableItem } from '../components';
import { type Departures } from '../types/index';
import { useAuthState, useErrorAndLoadingState, useFavoritesState } from '../contexts/index';

function DeparturesList() {
  {
    const navigate = useNavigate();
    const resultsRef = useRef<HTMLDivElement>(null);

    const { cityName, stationName } = useParams<{ cityName: string; stationName: string }>();
    const [stations, setStations] = useState<Departures[]>([]);
    const { error, setError, loading, setLoading } = useErrorAndLoadingState();
    const { authToken } = useAuthState();
    const { favorites, isFavorite, addFavorite } = useFavoritesState();

    useEffect(() => {
      if (!cityName || !stationName) return;

      const fetchResults = async () => {
        const apiBaseURL = import.meta.env.VITE_SERVER_API_URL;
        try {
          setLoading(true);
          setError(null);
          // Get departures for city / station
          const res = await fetch(`${apiBaseURL}/locations/${cityName}/${stationName}/departures`);
          if (!res.ok) {
            const errorData = await res.json();
            throw new Error(errorData.error || `Could not fetch departures.`);
          }

          const data = await res.json();
          setStations(data);

          setTimeout(() => {
            resultsRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' });
          }, 100);

          // If we get results, we have a valid city and station
          // Save these to the database
          await fetch(`${apiBaseURL}/locations/add`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
              cityName,
              stationName,
            }),
          });
        } catch (err: unknown) {
          setError(
            err instanceof Error
              ? `Could not fetch departures for "${cityName}, ${stationName}".`
              : `Could not fetch departures for: "${cityName}, ${stationName}".`,
          );
        } finally {
          setLoading(false);
        }
      };

      fetchResults();
    }, [cityName, stationName, favorites]);

    if (!cityName || !stationName) {
      return (
        <>
          <ErrorMessage error="Missing route parameters: city or station" />
          <button
            onClick={() => {
              setError(null);
              navigate('/search');
            }}
            className="btn w-1/3 bg-base-300 text-neutral-content hover:bg-neutral"
          >
            Search again
          </button>
        </>
      );
    }

    const isAlreadySaved = isFavorite(cityName, stationName);

    if (loading) {
      return <LoadingMessage />;
    }

    if (error) {
      return (
        <>
          <div ref={resultsRef} className="flex flex-col gap-4 items-center">
            <ErrorMessage error={error} />
          </div>
        </>
      );
    }

    return (
      <>
        <div className="flex-1 bg-base-100">
          <h1 className="text-center m-2 p-2">
            Your results for {cityName}, {stationName}:{' '}
          </h1>
          {stations || !loading ? (
            <div ref={resultsRef} className="overflow-x-auto h-96 w-96">
              <table className="table table-xs table-pin-rows table-pin-cols">
                <thead>
                  <tr>
                    <td>Pl.</td>
                    <td>Line</td>
                    <td>To</td>
                    <td>Planned</td>
                    <td>New</td>
                    <td>+/-</td>
                  </tr>
                </thead>
                <tbody>
                  {stations.map((station) => (
                    <TimetableItem key={station.key + station.countdown} station={station} />
                  ))}
                </tbody>
                <tfoot>
                  <tr>
                    <td>Pl.</td>
                    <td>Line</td>
                    <td>To</td>
                    <td>Planned</td>
                    <td>New</td>
                    <td>+/-</td>
                  </tr>
                </tfoot>
              </table>
            </div>
          ) : (
            <div className="w-2/3 items-center m-auto">
              <p className="text-center text-lg p-2 mt-4">No results to be shown</p>
            </div>
          )}

          {authToken && isAlreadySaved && (
            <button className="btn btn-xs mt-4" disabled>
              Already saved
            </button>
          )}

          {authToken && !isAlreadySaved && (
            <button
              onClick={() => {
                addFavorite(cityName, stationName);
              }}
              className="btn btn-xs mt-4"
            >
              Save to favorite
            </button>
          )}
        </div>
      </>
    );
  }
}

export default DeparturesList;
