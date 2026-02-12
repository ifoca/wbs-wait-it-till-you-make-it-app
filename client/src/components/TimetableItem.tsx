import { type Departures } from '../types/index';

type TimetableItemProps = {
  station: Departures;
};

const TimetableItem = ({ station }: TimetableItemProps) => {
  // TO do: add condition to render `cancelled` in the Delay column
  // if we have in the response: station.is_cancelled === 1
  return (
    <>
      <tr>
        <td>{station.platform}</td>
        <td>{station.line}</td>
        <td>{station.destination}</td>
        <td>{station.sched_time}</td>
        {station.delay === '0' || station.delay === null ? (
          <td className="text-green-400">{station.sched_time}</td>
        ) : (
          <td className="text-red-400">{station.time}</td>
        )}
        {station.delay === '0' || station.delay === null ? (
          <td className="text-green-400">0</td>
        ) : (
          <td className="text-red-400">+{station.delay}</td>
        )}
      </tr>
    </>
  );
};

export default TimetableItem;
