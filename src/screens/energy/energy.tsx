import React from "react";
import * as d3 from "d3";
import { IPM3Screen } from "types";
import ScreenProps from "screens/props";

import "./energy.css";
import icon_energy from "assets/icons/icon_energy.png";

export const Energy = ({ canData, currentScreen }: ScreenProps) => {
  let upDown = "";
  if (currentScreen < IPM3Screen.ENERGY) {
    upDown = " down";
  } else if (currentScreen > IPM3Screen.ENERGY) {
    upDown = " up";
  }
  const totalPower = canData.power.rear_kW + canData.power.front_kW;
  return (
    <div className={`energy${upDown}`}>
      <div className="title">
        <img src={icon_energy} alt="Energy" />
        <span>Energy</span>
      </div>
      <svg width={250} height={250}>
        <g transform="translate(125, 125)">
          <path
            className="power-line"
            d={
              d3.arc()({
                innerRadius: 100,
                outerRadius: 102,
                startAngle: (-90 * Math.PI) / 180,
                endAngle: (45 * Math.PI) / 180,
              }) as any
            }
          />
          <path
            className="regen-line"
            d={
              d3.arc()({
                innerRadius: 100,
                outerRadius: 102,
                startAngle: (-90 * Math.PI) / 180,
                endAngle: (-135 * Math.PI) / 180,
              }) as any
            }
          />
          <path
            className={`actual-line ${totalPower < 0 ? "regen" : "power"}`}
            d={
              d3.arc()({
                innerRadius: 95,
                outerRadius: 100,
                startAngle: (-90 * Math.PI) / 180,
                endAngle: ((-90 + totalPower / 3) * Math.PI) / 180,
              }) as any
            }
          />
        </g>
        <g transform="translate(120, 130)">
          <text className="value">{Math.round(totalPower)}</text>
          <text className="units">&nbsp;kW</text>
        </g>
      </svg>
    </div>
  );
};

export default Energy;
