import React from "react";
import { CANDataProps, LightState, SpoilerType } from "types";
import { getColorClass, isLightOn, isVehicleParked } from "./utils";

import "./vehicleDrive.css";

export const VehicleDrive = ({ canData }: CANDataProps) => {
  return (
    <div
      className={`vehicle drive ${getColorClass(canData.gtw.exteriorColor)}${
        isVehicleParked(canData.di.gear) ? "" : " visible"
      }`}
    >
      {canData.lights.leftBrake === LightState.ON &&
        canData.lights.rightBrake === LightState.ON && (
          <div className="brake-center" />
        )}
      {canData.lights.leftBrake === LightState.ON && (
        <div className="brake-left" />
      )}
      {canData.lights.rightBrake === LightState.ON && (
        <div className="brake-right" />
      )}
      <div
        className={`headlights${
          isLightOn(canData.lights.lowBeamLeft) ? " left" : ""
        }${isLightOn(canData.lights.lowBeamRight) ? " right" : ""}`}
      />
      {canData.lights.leftTail === LightState.ON && (
        <div className="park-left" />
      )}
      {canData.lights.rightTail === LightState.ON && (
        <div className="park-right" />
      )}
      {canData.gtw.spoilerType === SpoilerType.PASSIVE && (
        <div className="spoiler" />
      )}
      {canData.lights.rearLeftTurnSignal === LightState.ON && (
        <div className="turn-left" />
      )}
      {canData.lights.rearRightTurnSignal === LightState.ON && (
        <div className="turn-right" />
      )}
    </div>
  );
};

export default VehicleDrive;
