import * as React from "react";

const TimeDetails = (props) => {
  return (
    <h4>
      {props.arrivalTime &&
        `Arrival time on ${props.name}:  ${props.arrivalTime}`}
      {props.departureTime &&
        `Departure time on ${props.name}:  ${props.departureTime}`}
    </h4>
  );
};

export default TimeDetails;
