import React from "react";
import { CANDataProps } from "types";

import "./range.css";

export const Range = ({ canData }: CANDataProps) => {
  return (
    <div className={`range ${canData.ui.speedUnits ? "km" : "mi"}`}>
      <span className="value">
        {canData.ui.range_mi * (canData.ui.speedUnits ? 1.609 : 1)}
      </span>
      <div className="icon">
        <div
          className={`sprite${
            canData.ui.SOC_percent < 20
              ? ` ${canData.ui.SOC_percent < 10 ? "very-" : ""}low`
              : ""
          }`}
          style={{ width: 60 * (canData.ui.SOC_percent / 100) }}
        />
      </div>
    </div>
  );
};

export default Range;
