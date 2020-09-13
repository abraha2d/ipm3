import React from "react";
import { IPM3Screen } from "types";
import ScreenProps from "screens/props";

import "./clock.css";
import icon_clock from "assets/icons/icon_clock.png";

const renderNotches = () => {
  const notches = [];
  for (let i = 0; i < 60; i++) {
    notches.push(
      <span
        key={i}
        className={`tick ${i % 5 === 0 ? "large" : "small"}`}
        style={{
          transform: `rotate(${i * 6}deg)`,
        }}
      />
    );
  }
  return notches;
};

export const Clock = ({ canData, currentScreen }: ScreenProps) => {
  let upDown = "";
  if (currentScreen < IPM3Screen.CLOCK) {
    upDown = " down";
  } else if (currentScreen > IPM3Screen.CLOCK) {
    upDown = " up";
  }

  const date = new Date(canData.unixTime_s * 1000);
  const hour = 180 + date.getHours() * 30;
  const minute = 180 + date.getMinutes() * 6;
  const second = 180 + date.getSeconds() * 6;

  return (
    <div className={`clock${upDown}`}>
      <div className="title">
        <img src={icon_clock} alt="Clock" />
        <span>Clock</span>
      </div>
      <div className="clock-base">
        <div
          className="hand second"
          style={{ transform: `rotate(${second}deg)` }}
        />
        <div
          className="hand minute"
          style={{ transform: `rotate(${minute}deg)` }}
        />
        <div
          className="hand hour"
          style={{ transform: `rotate(${hour}deg)` }}
        />
        <div className="center" />
        {renderNotches()}
      </div>
    </div>
  );
};

export default Clock;
