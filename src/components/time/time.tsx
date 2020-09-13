import React from "react";
import { CANDataProps } from "types";
import { getAMPM, getTime } from "./utils";

import "./time.css";

export const Time = ({ canData }: CANDataProps) => {
  return (
    <div className={`time ${getAMPM(canData.unixTime_s)}`}>
      {getTime(canData.unixTime_s)}
    </div>
  );
};

export default Time;
