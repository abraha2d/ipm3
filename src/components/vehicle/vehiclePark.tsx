import React from "react";
import { CANDataProps } from "types";
import { getColorClass, getOpen, isVehicleParked } from "./utils";

import "./vehiclePark.css";

export const VehiclePark = ({ canData }: CANDataProps) => {
  return (
    <div
      className={`vehicle park ${getColorClass(canData.gtw.exteriorColor)}${
        isVehicleParked(canData.di.gear) ? " visible" : ""
      }`}
    >
      <div className={`frunk ${getOpen(canData.latches.frunk)}`} />
      <div className={`left-front ${getOpen(canData.latches.frontLeft)}`} />
      <div className={`left-rear ${getOpen(canData.latches.rearLeft)}`} />
      <div className={`right-front ${getOpen(canData.latches.frontRight)}`} />
      <div className={`right-rear ${getOpen(canData.latches.rearRight)}`} />
      <div className={`trunk ${getOpen(canData.latches.trunk)}`} />
    </div>
  );
};

export default VehiclePark;
