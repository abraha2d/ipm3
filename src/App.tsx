import React from "react";

import { CANDataProps, IPM3Selected, SunStatus } from "types";

import GearIndicator from "components/gearIndicator";
import Speedometer from "components/speedometer";
import Range from "components/range";
import TelltaleIndicators from "components/telltaleIndicators";
import Temp from "components/temp";
import Time from "components/time";
import Vehicle from "components/vehicle";

import Clock from "screens/clock";
import Media from "screens/media";
import Energy from "screens/energy";
import Trips from "screens/trips";
import CarStatus from "screens/carStatus";
import Nav from "screens/nav";
import Phone from "screens/phone";

import "css/index.css";

interface AppProps extends CANDataProps {
  onLeftSelect: () => void;
  onRightSelect: () => void;
}

function App({ canData, onLeftSelect, onRightSelect }: AppProps) {
  return (
    <div
      className={`App${canData.ui.isSunUp === SunStatus.UP ? " light" : ""}`}
    >
      <Speedometer canData={canData} />
      <TelltaleIndicators canData={canData} />
      <div className="overlay bottom left">
        <GearIndicator canData={canData} />
        <Time canData={canData} />
      </div>
      <div className="overlay bottom right">
        <Temp canData={canData} />
        <Range canData={canData} />
      </div>
      <Vehicle canData={canData} />
      <div
        className={`overlay screen left ${
          canData.ipm3.selected === IPM3Selected.LEFT ? "selected" : ""
        }`}
        onClick={onLeftSelect}
      >
        <Clock canData={canData} currentScreen={canData.ipm3.leftScreen} />
        <Media canData={canData} currentScreen={canData.ipm3.leftScreen} />
        <Energy canData={canData} currentScreen={canData.ipm3.leftScreen} />
        <Trips canData={canData} currentScreen={canData.ipm3.leftScreen} />
        <CarStatus canData={canData} currentScreen={canData.ipm3.leftScreen} />
        <Nav canData={canData} currentScreen={canData.ipm3.leftScreen} />
      </div>
      <div
        className={`overlay screen right ${
          canData.ipm3.selected === IPM3Selected.RIGHT ? "selected" : ""
        }`}
        onClick={onRightSelect}
      >
        <Clock canData={canData} currentScreen={canData.ipm3.rightScreen} />
        <Media canData={canData} currentScreen={canData.ipm3.rightScreen} />
        <Energy canData={canData} currentScreen={canData.ipm3.rightScreen} />
        <Trips canData={canData} currentScreen={canData.ipm3.rightScreen} />
        <CarStatus canData={canData} currentScreen={canData.ipm3.rightScreen} />
        <Phone canData={canData} currentScreen={canData.ipm3.rightScreen} />
      </div>
    </div>
  );
}

export default App;
