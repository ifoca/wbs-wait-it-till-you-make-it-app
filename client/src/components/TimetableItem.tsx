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

  const schedMinutes = getMinutesFromTime(station.time);
  const currentMinutes = getCurrentMinutes();
  const minutesUntil = schedMinutes - currentMinutes;

  const onTime = Number(station.delay) === 0 || station.delay === null;
  const cancelled = station.is_cancelled === 1;
  const isProblem = !onTime || cancelled;

  return (
    <>
      <tr className={`text-center ${isProblem ? 'text-red-400' : 'text-green-400'}`}>
        <td>{station.platform}</td>
        <td>{station.line}</td>
        <td className="whitespace-normal break-words">{station.destination}</td>
        <td>{onTime ? station.sched_time : station.time}</td>
        <td>{cancelled ? 'Off' : minutesUntil === 0 ? 'Now' : `${minutesUntil} min`}</td>
      </tr>
    </>
  );
};

export default TimetableItem;
