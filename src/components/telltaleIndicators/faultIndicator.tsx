import React from "react";
import { FaultLampState, LampFlashState } from "types";
import Indicator from "./indicator";
import { isFaultLamp, isLampFlash } from "./utils";

type FaultIndicatorProps = {
  steady: FaultLampState | boolean;
  flash?: LampFlashState | boolean;
  class: string;
};

export const FaultIndicator = (props: FaultIndicatorProps) => {
  return (
    <Indicator
      class={`${
        isFaultLamp(props.steady) || isLampFlash(props.flash) ? props.class : ""
      }${isLampFlash(props.flash) ? " fault" : ""}`}
    />
  );
};

export default FaultIndicator;
