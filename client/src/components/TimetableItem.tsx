import { type Departures } from '../types/index';

type TimetableItemProps = {
  station: Departures;
};

const TimetableItem = ({ station }: TimetableItemProps) => {
  // TO do: add condition to render `cancelled` in the Delay column
  // if we have in the response: station.is_cancelled === 1
  const getMinutesFromTime = (timeStr: string) => {
    const [hours, minutes] = timeStr.split(':').map(Number);
    return hours * 60 + minutes;
  };

  const getCurrentMinutes = () => {
    const now = new Date();
    return now.getHours() * 60 + now.getMinutes();
  };

  const schedMinutes = getMinutesFromTime(station.sched_time);
  const currentMinutes = getCurrentMinutes();
  const minutesUntil = schedMinutes - currentMinutes;

  return (
    <>
      <tr className="text-center">
        <td>{station.platform}</td>
        <td>{station.line}</td>
        <td className="whitespace-normal break-words">{station.destination}</td>
        {station.delay === '0' || station.delay === null ? (
          <td className="text-green-400">{station.sched_time}</td>
        ) : (
          <td className="text-red-400">{station.time}</td>
        )}
        {minutesUntil === 0 ? <td>Now</td> : <td>{minutesUntil} min</td>}
      </tr>
    </>
  );
};

export default TimetableItem;
