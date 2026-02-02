import { useEffect, useState } from 'react';
import { TimetableItem } from '../components';

import { useParams } from 'react-router-dom';

const Results = () => {
  const [stations, setStations] = useState(null);
  const [loading, setLoading] = useState(true);

  const { city, station } = useParams();
  console.log(city, station);

  const fetchResults = async () => {
    setLoading(true);
    try {
      const res = await fetch(`https://vrrf.finalrewind.org/${city}/${station}.json`);
      if (!res.ok) {
        throw new Error(`Could not fetch the results`);
      }
      const data = await res.json();
      const rawData = data.raw;
      setStations(rawData);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchResults();
  }, []);

  return (
    <>
      <h1 className="text-center m-2 p-2">Your results for S+U Alexanderplatz Bhf: </h1>
      {stations || !loading ? (
        <div className="overflow-x-auto h-96 w-96">
          <table className="table table-xs table-pin-rows table-pin-cols">
            <thead>
              <tr>
                <td>Platform</td>
                <td>Line</td>
                <td>Direction</td>
                <td>Arriving</td>
                <td>Delay</td>
              </tr>
            </thead>
            <tbody>
              {stations.map((station) => (
                <TimetableItem key={station.key} station={station} />
              ))}
            </tbody>
            <tfoot>
              <tr>
                <td>Platform</td>
                <td>Line</td>
                <td>Direction</td>
                <td>Arriving</td>
                <td>Delay</td>
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
