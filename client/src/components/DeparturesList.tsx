import { useEffect, useRef, useState } from 'react';
import { useParams } from 'react-router-dom';
import { ErrorMessage, LoadingMessage, TimetableItem } from '../components';
import { type Departures } from '../types/index';
import { useAuthState, useErrorAndLoadingState, useFavoritesState } from '../contexts/index';

function DeparturesList() {
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
        <div className="flex flex-col gap-4 items-center">
          <ErrorMessage error={error} />
        </div>
      </>
    );
  }

  return (
    <>
      <div className="flex-1 bg-base-100">
        <h3 ref={resultsRef} className="font-semibold text-center m-2 p-2">
          Departures for {cityName}, {stationName}:{' '}
        </h3>
        <dialog id="departures_modal" className="modal ">
          <div className="modal-box w-screen max-w-none h-5/6 bg-base-300">
            <form method="dialog">
              <button className="btn btn-xl btn-circle btn-ghost absolute right-2 top-2">✕</button>
            </form>

            <h3 className="font-bold text-2xl mb-4">All Departures</h3>

            <div className="overflow-auto h-full ">
              <table className="table table-xs table-pin-rows">
                <thead>
                  <tr className="text-center text-sm">
                    <td className="w-12">Line</td>
                    <td className="min-w-32">Destination</td>
                    <td className="w-16">Departs</td>
                    <td className="w-16">In</td>
                  </tr>
                </thead>
                <tbody>
                  {stations.map((station) => (
                    <TimetableItem key={station.key + station.countdown} station={station} />
                  ))}
                </tbody>
                <tfoot>
                  <tr className="text-center text-sm">
                    <td className="w-12">Line</td>
                    <td className="min-w-32">Destination</td>
                    <td className="w-16">Departs</td>
                    <td className="w-16">In</td>
                  </tr>
                </tfoot>
              </table>
            </div>
          </div>
        </dialog>

        {stations || !loading ? (
          <div className="overflow-x-auto w-full mx-auto border rounded-box border-base-content/5 bg-base-300">
            <table className="table table-xs table-pin-rows table-pin-cols">
              <thead>
                <tr className="text-center text-sm">
                  <td className="w-12">Line</td>
                  <td className="min-w-32">Destination</td>
                  <td className="w-16">Departs</td>
                  <td className="w-16">In</td>
                </tr>
              </thead>
              <tbody>
                {stations.slice(0, 10).map((station) => (
                  <TimetableItem key={station.key + station.countdown} station={station} />
                ))}
              </tbody>
            </table>
          </div>
        ) : (
          <div className="w-2/3 items-center m-auto">
            <p className="text-center text-lg p-2 mt-4">No departures could be displayed.</p>
          </div>
        )}

        <div className="mt-4 flex justify-between items-center">
          {authToken && isAlreadySaved && (
            <button className="btn btn-sm" disabled>
              Already saved
            </button>
          )}
          {authToken && !isAlreadySaved && (
            <button
              onClick={() => {
                addFavorite(cityName, stationName);
              }}
              className="btn btn-sm"
            >
              Save station
            </button>
          )}
          <button
            className="btn btn-sm ml-auto"
            onClick={() =>
              (document.getElementById('departures_modal') as HTMLDialogElement)?.showModal()
            }
          >
            Show All {stations.length} departures
          </button>
        </div>
      </div>
    </>
  );
}

export default DeparturesList;
