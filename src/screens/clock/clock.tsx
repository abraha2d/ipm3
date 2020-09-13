import React from "react";
import { IPM3Screen } from "types";
import ScreenProps from "screens/props";

import icon_clock from "assets/icons/icon_clock.png";

export const Clock = ({ canData, currentScreen }: ScreenProps) => {
  let upDown = "";
  if (currentScreen < IPM3Screen.CLOCK) {
    upDown = " down";
  } else if (currentScreen > IPM3Screen.CLOCK) {
    upDown = " up";
  }
  return (
    <div className={`clock${upDown}`}>
      <div className="title">
        <img src={icon_clock} alt="Clock" />
        <span>Clock</span>
      </div>
      <span>Clock</span>
    </div>
  );
};

export default Clock;
