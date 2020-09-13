import React from "react";
import { IPM3Screen } from "types";
import ScreenProps from "screens/props";

import icon_trips from "assets/icons/icon_trips.png";

export const Trips = ({ canData, currentScreen }: ScreenProps) => {
  let upDown = "";
  if (currentScreen < IPM3Screen.TRIPS) {
    upDown = " down";
  } else if (currentScreen > IPM3Screen.TRIPS) {
    upDown = " up";
  }
  return (
    <div className={`trips${upDown}`}>
      <div className="title">
        <img src={icon_trips} alt="Trips" />
        <span>Trips</span>
      </div>
      <span>Trips</span>
    </div>
  );
};

export default Trips;
