import React from "react";
import { CANDataProps } from "types";
import Indicator from "./indicator";
import FaultIndicator from "./faultIndicator";
import LightIndicator from "./lightIndicator";
import { getSeatbeltClass, getTPMSClass } from "./utils";

import "css/overlay.css";

export const TelltaleIndicators = ({ canData }: CANDataProps) => {
  return (
    <>
      <div className="overlay top left">
        <LightIndicator
          leftLight={canData.lights.fogLeft}
          rightLight={canData.lights.fogRight}
          indicator="front-fog"
        />
        <LightIndicator
          leftLight={canData.lights.rearFog}
          rightLight={canData.lights.rearFog}
          indicator="rear-fog"
        />
        <Indicator class={getTPMSClass(canData.tpms, "tpms")} />
        <Indicator class={getSeatbeltClass(canData.seatbelt, "seatbelt")} />
        <Indicator class={canData.airbagLight ? "airbag" : ""} />
      </div>
      <div className="overlay top right">
        <FaultIndicator steady={canData.esp.absFaultLamp} class="abs" />
        <FaultIndicator
          steady={canData.esp.espFaultLamp}
          flash={canData.esp.espLampFlash}
          class="esp"
        />
        <LightIndicator
          leftLight={canData.lights.parkLeft}
          rightLight={canData.lights.parkRight}
          indicator="park-lights"
        />
        <LightIndicator
          leftLight={canData.lights.highBeamLeft}
          rightLight={canData.lights.highBeamRight}
          indicator="high-beam"
        />
        <LightIndicator
          leftLight={canData.lights.lowBeamLeft}
          rightLight={canData.lights.lowBeamRight}
          indicator="low-beam"
        />
      </div>
    </>
  );
};

export default TelltaleIndicators;
