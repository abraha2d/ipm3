import React from "react";
import { CANDataProps } from "types";
import CssFilters from "./cssFilters";
import VehicleDrive from "./vehicleDrive";
import VehiclePark from "./vehiclePark";

import "./vehicle.css";

export const Vehicle = ({ canData }: CANDataProps) => {
  return (
    <>
      <CssFilters />
      <VehicleDrive canData={canData} />
      <VehiclePark canData={canData} />
    </>
  );
};

export default Vehicle;
