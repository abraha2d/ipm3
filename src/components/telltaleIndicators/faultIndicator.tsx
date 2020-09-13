import React from "react";
import { FaultLampState, LampFlashState } from "types";
import Indicator from "./indicator";

type FaultIndicatorProps = {
  steady: FaultLampState;
  flash?: LampFlashState;
  class: string;
};

export const FaultIndicator = (props: FaultIndicatorProps) => {
  return (
    <Indicator
      class={`${props.steady || props.flash ? props.class : ""}${
        props.flash ? " fault" : ""
      }`}
    />
  );
};

export default FaultIndicator;
