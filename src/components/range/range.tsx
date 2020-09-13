import React from "react";
import { CANDataProps, DistanceUnits } from "types";

import "./range.css";

export const Range = ({ canData }: CANDataProps) => {
  return (
    <div
      className={`range ${
        canData.ui.distanceUnits === DistanceUnits.KM ? "km" : "mi"
      }`}
    >
      <span className="value">
        {Math.round(
          canData.ui.range_mi *
            (canData.ui.distanceUnits === DistanceUnits.KM ? 1.609 : 1)
        )}
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
