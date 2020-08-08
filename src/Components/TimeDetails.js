import { Statistic } from 'antd';
import * as React from 'react';

const TimeDetails = (props) => {
  return (
    <>
      <h4>{props.name}</h4>
      {props.arrivalTime && (
        <Statistic title='Arrival Time' value={props.arrivalTime} />
      )}
      {props.departureTime && (
        <Statistic title='Departure Time' value={props.departureTime} />
      )}
    </>
  );
};

export default TimeDetails;
