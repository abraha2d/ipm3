import React from "react";
import { CANDataProps, DistanceUnits } from "types";

import "./temp.css";

export const Temp = ({ canData }: CANDataProps) => {
  const isMetric = canData.ui.distanceUnits === DistanceUnits.KM;
  return (
    <div className={`temp ${isMetric ? "C" : "F"}`}>
      {Math.round(
        isMetric
          ? canData.sensors.tempAmbientFiltered_C
          : canData.sensors.tempAmbientFiltered_C * (9 / 5) + 32
      )}
    </div>
  );
};

export default Temp;
