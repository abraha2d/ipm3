import React from "react";
import { CANDataProps, LightState, SpoilerType } from "types";
import CssFilters from "./cssFilters";
import { getColorClass, isLightOn } from "./utils";

import "./vehicle.css";

export const Vehicle = ({ canData }: CANDataProps) => {
  return (
    <>
      <CssFilters />
      <div className={`vehicle ${getColorClass(canData.gtw.exteriorColor)}`}>
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
    </>
  );
};

export default Vehicle;
