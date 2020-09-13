import React from "react";
import { CANDataProps, Gear } from "types";
import { getTurnSignalClass } from "./utils";

import "css/overlay.css";
import "./speedometer.css";

export const Speedometer = ({ canData }: CANDataProps) => {
  return (
    <div className="overlay top center">
      <div
        className={`turn-signal ${getTurnSignalClass(
          canData.lights.indicatorLeftRequest
        )} left`}
      />
      <div className="speed">
        <span className="value">
          {canData.di.gear === Gear.SNA ? "P" : Math.round(canData.ui.speed)}
        </span>
        {canData.di.gear === Gear.SNA || (
          <span className="units">
            {canData.ui.speedUnits ? "KM/H" : "MPH"}
          </span>
        )}
      </div>
      <div
        className={`turn-signal ${getTurnSignalClass(
          canData.lights.indicatorRightRequest
        )} right`}
      />
    </div>
  );
};

export default Speedometer;
