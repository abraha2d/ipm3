import React from "react";
import { IPM3Screen } from "types";
import ScreenProps from "screens/props";

import icon_nav from "assets/icons/icon_nav.png";

export const Nav = ({ canData, currentScreen }: ScreenProps) => {
  let upDown = "";
  if (currentScreen < IPM3Screen.NAV_OR_PHONE) {
    upDown = " down";
  } else if (currentScreen > IPM3Screen.NAV_OR_PHONE) {
    upDown = " up";
  }
  return (
    <div className={`nav${upDown}`}>
      <div className="title">
        <img src={icon_nav} alt="Nav" />
        <span>Nav</span>
      </div>
      <span>No active route</span>
    </div>
  );
};

export default Nav;
