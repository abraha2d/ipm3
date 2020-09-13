import React from "react";
import ReactDOM from "react-dom";
import { get, set } from "lodash";

import App from "./App";
import * as serviceWorker from "./serviceWorker";

import {
  canData,
  GearLeverPosition,
  IPM3Screen,
  IPM3Selected,
  SwitchStatus,
} from "types";

let exponentialBackoff = 1;
let stalenessTimeout: NodeJS.Timeout | undefined = undefined;

const refreshTimeout = (webSocket: WebSocket) => {
  if (stalenessTimeout) clearTimeout(stalenessTimeout);
  stalenessTimeout = setTimeout(() => {
    console.log("Refreshing...");
    webSocket.close();
    establishConnection(false);
  }, 5000);
};

const setSelected = (selected: IPM3Selected) => () => {
  if (canData.ipm3.selected === selected) {
    canData.ipm3.selected = IPM3Selected.NONE;
  } else {
    canData.ipm3.selected = selected;
  }
  renderApp();
};

const scrollSelected = (numTicks: number) => {
  if (canData.ipm3.selected === IPM3Selected.LEFT) {
    canData.ipm3.leftScreen += numTicks;
    canData.ipm3.leftScreen = Math.min(
      Math.max(canData.ipm3.leftScreen, 0),
      IPM3Screen.NAV_OR_PHONE
    );
  } else if (canData.ipm3.selected === IPM3Selected.RIGHT) {
    canData.ipm3.rightScreen += numTicks;
    canData.ipm3.rightScreen = Math.min(
      Math.max(canData.ipm3.rightScreen, 0),
      IPM3Screen.NAV_OR_PHONE
    );
  }
  renderApp();
};

document.addEventListener("keydown", (event) => {
  if (event.key === "ArrowLeft") {
    setSelected(IPM3Selected.LEFT)();
  } else if (event.key === "ArrowRight") {
    setSelected(IPM3Selected.RIGHT)();
  } else if (event.key === "ArrowUp") {
    scrollSelected(-1);
  } else if (event.key === "ArrowDown") {
    scrollSelected(1);
  }
});

const renderApp = () => {
  ReactDOM.render(
    <React.StrictMode>
      <App
        canData={canData}
        onLeftSelect={setSelected(IPM3Selected.LEFT)}
        onRightSelect={setSelected(IPM3Selected.RIGHT)}
      />
    </React.StrictMode>,
    document.getElementById("root")
  );
};

const establishConnection = (firstTime: boolean) => {
  if (firstTime)
    ReactDOM.render(
      <span>Connecting...</span>,
      document.getElementById("root")
    );

  const webSocket = new WebSocket("ws://localhost:3001");

  webSocket.onopen = () => {
    if (firstTime)
      ReactDOM.render(
        <span>Connected. Waiting for data...</span>,
        document.getElementById("root")
      );
    refreshTimeout(webSocket);
  };

  webSocket.onmessage = (event) => {
    exponentialBackoff = 1;
    refreshTimeout(webSocket);

    const dj = JSON.parse(event.data);
    if (get(canData, dj.key) === undefined) {
      console.error("Unknown key:", dj.key, "(value", dj.val, ")");
    }

    set(canData, dj.key, dj.val);

    if (
      (dj.key === "switches.gearLeverPosition" &&
        dj.val === GearLeverPosition.HALF_UP) ||
      (dj.key === "switches.swcLeftTiltLeft" && dj.val === SwitchStatus.ON)
    ) {
      setSelected(IPM3Selected.LEFT)();
    } else if (
      (dj.key === "switches.gearLeverPosition" &&
        dj.val === GearLeverPosition.HALF_DOWN) ||
      (dj.key === "switches.swcLeftTiltRight" && dj.val === SwitchStatus.ON)
    ) {
      setSelected(IPM3Selected.RIGHT)();
    } else if (dj.key === "switches.swcRightScrollTicks") {
      scrollSelected(dj.val);
    } else {
      renderApp();
    }
  };

  webSocket.onerror = (event) => {
    console.error(event);
    ReactDOM.render(
      <span>
        An error occurred. See the console for details.
        <br />
        Reconnecting in {exponentialBackoff} second
        {exponentialBackoff === 1 ? "" : "s"}...
      </span>,
      document.getElementById("root")
    );
    setTimeout(establishConnection, exponentialBackoff * 1000, true);
    exponentialBackoff = Math.min(10, exponentialBackoff * 2);
  };
};

establishConnection(true);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
