import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { ErrorMessage, LoadingMessage, TimetableItem } from '../components';
import useErrorAndLoadingState from '../contexts/ErrorAndLoadingContext';
import { type Departures } from '../types/index';
import { useAuthState } from '../contexts';

const Results = () => {
  const [stations, setStations] = useState<Departures[]>([]);
  const { error, setError, loading, setLoading } = useErrorAndLoadingState();
  const { authToken, user } = useAuthState();

  const { city, station } = useParams();

  const fetchResults = async () => {
    setLoading(true);
    setError(null);

    const baseURL = import.meta.env.VITE_SERVER_API_URL;
    try {
      const res = await fetch(`${baseURL}/locations/${city}/${station}/departures`);
      if (!res.ok) {
        const errorData = await res.json();
        throw new Error(errorData.error || `Could not fetch departures`);
      }

      const data = await res.json();
      console.log(data);
      setStations(data);
    } catch (err: unknown) {
      setError(
        err instanceof Error
          ? `Could not fetch departures for "${station}" : ` + err.message
          : `Could not fetch departures for: "${station}" `,
      );
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchResults();
  }, [city, station]);

  if (loading) {
    return <LoadingMessage />;
  }

  if (error) {
    return <ErrorMessage error={error} />;
  }

  return (
    <>
      <h1 className="text-center m-2 p-2">
        Your results for {city}, {station}:{' '}
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
      {authToken && <button className="btn btn-xs mt-4">Save to favorite</button>}
    </>
  );
};

export default Results;
