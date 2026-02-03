import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { ErrorMessage, LoadingMessage, TimetableItem } from '../components';
import useErrorAndLoadingState from '../contexts/ErrorAndLoadingContext';

const Results = () => {
  const [stations, setStations] = useState(
    [] as Array<{
      key: string;
      is_cancelled: number;
      platform: string;
      line: string;
      destination: string;
      sched_time: string;
      delay: string | null;
      type: string; // could be used to add icons, e.g. Tram, bus etc
    }>,
  );
  const { error, setError, loading, setLoading } = useErrorAndLoadingState();

  const { city, station } = useParams();
  console.log(city, station);

  const fetchResults = async () => {
    setLoading(true);
    setError(null);
    try {
      const res = await fetch(`https://vrrf.finalrewind.org/${city}/${station}.json`);
      if (!res.ok) {
        throw new Error(`Could not fetch the results`);
      }
      const data = await res.json();
      if (data.error !== null) {
        throw new Error(data.error);
      }

      const rawData = data.raw;
      setStations(rawData);
    } catch (err: unknown) {
      setError(
        err instanceof Error ? err.message : `Could not fetch timetable for station: ${station}`,
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
                <TimetableItem key={station.key} station={station} />
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
    </>
  );
};

export default Results;
