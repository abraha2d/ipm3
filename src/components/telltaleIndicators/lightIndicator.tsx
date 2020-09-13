import React from "react";
import { LightState } from "types";
import Indicator from "./indicator";
import { getLightClass } from "./utils";

type LightIndicatorProps = {
  leftLight: LightState;
  rightLight: LightState;
  indicator: string;
};

export const LightIndicator = (props: LightIndicatorProps) => {
  return (
    <Indicator
      class={getLightClass(props.leftLight, props.rightLight, props.indicator)}
    />
  );
};

export default LightIndicator;
