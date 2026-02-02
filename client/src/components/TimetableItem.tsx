const TimetableItem = ({ station }) => {
  console.log(station);
  return (
    <>
      <tr>
        <td>{station.platform}</td>
        <td>{station.line}</td>
        <td>{station.destination}</td>
        <td>{station.sched_time}</td>
        {station.delay ? <td>{station.delay}</td> : <td>0</td>}
      </tr>
    </>
  );
};

export default TimetableItem;
