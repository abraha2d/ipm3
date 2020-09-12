import React from "react";
import ReactDOM from "react-dom";
import { get, set } from "lodash";

import App from "./App";
import * as serviceWorker from "./serviceWorker";

import canData from "./initialData";

import "./index.css";

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
    set(canData, dj.key, dj.val);
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
