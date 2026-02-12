import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { ErrorMessage, LoadingMessage, TimetableItem } from '../components';
import { type Departures } from '../types/index';
import { useAuthState, useErrorAndLoadingState, useFavoritesState } from '../contexts/index';

const Results = () => {
  const { cityName, stationName } = useParams<{ cityName?: string; stationName?: string }>();
  const [stations, setStations] = useState<Departures[]>([]);
  const { error, setError, loading, setLoading } = useErrorAndLoadingState();
  const { authToken } = useAuthState();
  const { isFavorite, addFavorite } = useFavoritesState();

  useEffect(() => {
    if (!cityName || !stationName) return;
    fetchResults();
  }, [cityName, stationName]);

  if (!cityName || !stationName) {
    return <ErrorMessage error="Missing route parameters: city or station" />;
  }

  const fetchResults = async () => {
    setLoading(true);
    setError(null);
    const baseURL = import.meta.env.VITE_SERVER_API_URL;
    try {
      const res = await fetch(`${baseURL}/locations/${cityName}/${stationName}/departures`);
      if (!res.ok) {
        const errorData = await res.json();
        throw new Error(errorData.error || `Could not fetch departures`);
      }

      const data = await res.json();
      setStations(data);
    } catch (err: unknown) {
      setError(
        err instanceof Error
          ? `Could not fetch departures for "${stationName}" : ` + err.message
          : `Could not fetch departures for: "${stationName}" `,
      );
    } finally {
      setLoading(false);
    }
  };

  const isAlreadySaved = isFavorite(cityName, stationName);

  if (loading) {
    return <LoadingMessage />;
  }

  if (error) {
    return <ErrorMessage error={error} />;
  }

  return (
    <>
      <h1 className="text-center m-2 p-2">
        Your results for {cityName}, {stationName}:{' '}
      </h1>
      {stations || !loading ? (
        <div className="overflow-x-auto h-96 w-96">
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

      {authToken && !isAlreadySaved && cityName && stationName && (
        <button onClick={() => addFavorite(cityName, stationName)} className="btn btn-xs mt-4">
          Save to favorite
        </button>
      )}
    </>
  );
};

export default Results;
