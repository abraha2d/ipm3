import React from "react";
import { IPM3Screen } from "types";
import ScreenProps from "screens/props";

import icon_phone from "assets/icons/icon_phone.png";

export const Phone = ({ canData, currentScreen }: ScreenProps) => {
  let upDown = "";
  if (currentScreen < IPM3Screen.NAV_OR_PHONE) {
    upDown = " down";
  } else if (currentScreen > IPM3Screen.NAV_OR_PHONE) {
    upDown = " up";
  }
  return (
    <div className={`phone${upDown}`}>
      <div className="title">
        <img src={icon_phone} alt="Phone" />
        <span>Phone</span>
      </div>
      <span>No active call</span>
    </div>
  );
};

export default Phone;
