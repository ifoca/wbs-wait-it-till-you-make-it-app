import { type Departures } from '../types/index';

type TimetableItemProps = {
  station: Departures;
};

const TimetableItem = ({ station }: TimetableItemProps) => {
  const getMinutesFromTime = (timeStr: string) => {
    const [hours, minutes] = timeStr.split(':').map(Number);
    return hours * 60 + minutes;
  };

  const getCurrentMinutes = () => {
    const now = new Date();
    return now.getHours() * 60 + now.getMinutes();
  };

  const departureTime = getMinutesFromTime(station.time);
  const currentMinutes = getCurrentMinutes();
  const minutesUntil = departureTime - currentMinutes;

  const onTime = Number(station.delay) === 0 || station.delay === null;
  const cancelled = station.is_cancelled === 1;
  const isProblem = !onTime || cancelled;

  return (
    <>
      <tr
        className={`text-center text-sm ${isProblem ? 'text-red-400' : 'text-green-400'} hover:bg-base-100`}
      >
        <td className="p-2">{station.line}</td>
        <td className="whitespace-normal break-words flex-wrap p-2">{station.destination}</td>
        <td className="p-2">{onTime ? station.sched_time : station.time}</td>
        <td className="p-2">
          {cancelled ? 'Off' : minutesUntil === 0 ? 'Now' : `${minutesUntil} min`}
        </td>
      </tr>
    </>
  );
};

export default TimetableItem;
