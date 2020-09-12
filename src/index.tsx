import React from "react";
import ReactDOM from "react-dom";
import { get, set } from "lodash";

import App from "./App";
import * as serviceWorker from "./serviceWorker";

import canData from "./initialData";

import "./index.css";
import { GearLeverPosition, SelectedState, SwitchStatus } from "./types";

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
    if (dj.key === "switches.swcLeftPressed" && dj.val === SwitchStatus.ON) {
      canData.ipm3.selected =
        canData.ipm3.selected === SelectedState.NONE
          ? SelectedState.LEFT
          : SelectedState.NONE;
    } else if (dj.key === "switches.swcLeftTiltLeft") {
      if (canData.ipm3.selected !== SelectedState.NONE) {
        canData.ipm3.selected = SelectedState.LEFT;
      }
    } else if (dj.key === "switches.swcLeftTiltRight") {
      if (canData.ipm3.selected !== SelectedState.NONE) {
        canData.ipm3.selected = SelectedState.RIGHT;
      }
    } else if (dj.key === "switches.swcRightScrollTicks") {
      if (canData.ipm3.selected === SelectedState.LEFT) {
        canData.ipm3.leftScreen += dj.val;
      } else if (canData.ipm3.selected === SelectedState.RIGHT) {
        canData.ipm3.rightScreen += dj.val;
      }
    } else if (dj.key === "switches.gearLeverPosition") {
      if (dj.val === GearLeverPosition.HALF_UP) {
        canData.ipm3.selected =
          canData.ipm3.selected === SelectedState.RIGHT
            ? SelectedState.NONE
            : SelectedState.LEFT;
      } else if (dj.val === GearLeverPosition.HALF_DOWN) {
        canData.ipm3.selected =
          canData.ipm3.selected === SelectedState.LEFT
            ? SelectedState.NONE
            : SelectedState.RIGHT;
      }
    } else {
      set(canData, dj.key, dj.val);
    }
    ReactDOM.render(
      <React.StrictMode>
        <App canData={canData} />
      </React.StrictMode>,
      document.getElementById("root")
    );
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
