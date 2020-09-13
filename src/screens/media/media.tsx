import React from "react";
import { IPM3Screen } from "types";
import ScreenProps from "screens/props";

import icon_media from "assets/icons/icon_media.png";

export const Media = ({ canData, currentScreen }: ScreenProps) => {
  let upDown = "";
  if (currentScreen < IPM3Screen.MEDIA) {
    upDown = " down";
  } else if (currentScreen > IPM3Screen.MEDIA) {
    upDown = " up";
  }
  return (
    <div className={`media${upDown}`}>
      <div className="title">
        <img src={icon_media} alt="Media" />
        <span>Media</span>
      </div>
      <span>Media</span>
    </div>
  );
};

export default Media;
