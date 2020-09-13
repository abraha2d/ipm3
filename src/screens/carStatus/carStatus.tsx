import React from "react";
import { IPM3Screen } from "types";
import ScreenProps from "screens/props";

import icon_car_status from "assets/icons/icon_car_status.png";

export const CarStatus = ({ canData, currentScreen }: ScreenProps) => {
  let upDown = "";
  if (currentScreen < IPM3Screen.CAR_STATUS) {
    upDown = " down";
  } else if (currentScreen > IPM3Screen.CAR_STATUS) {
    upDown = " up";
  }
  return (
    <div className={`car-status${upDown}`}>
      <div className="title">
        <img src={icon_car_status} alt="Car Status" />
        <span>Car Status</span>
      </div>
      <span>Car Status</span>
    </div>
  );
};

export default CarStatus;
