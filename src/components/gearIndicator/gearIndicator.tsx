import React from "react";
import { CANDataProps, Gear } from "types";

import "./gearIndicator.css";

export const GearIndicator = ({ canData }: CANDataProps) => {
  return (
    <div
      className={`gear-indicator ${
        canData.di.gear === Gear.INVALID ? "fault" : ""
      }`}
    >
      <span className={canData.di.gear === Gear.P ? "selected" : ""}>P</span>
      <span className={canData.di.gear === Gear.R ? "selected" : ""}>R</span>
      <span className={canData.di.gear === Gear.N ? "selected" : ""}>N</span>
      <span className={canData.di.gear === Gear.D ? "selected" : ""}>D</span>
    </div>
  );
};

export default GearIndicator;
