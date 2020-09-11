import React from "react";
import ReactDOM from "react-dom";
import { get, set } from "lodash";

import App from "./App";
import canData from "./sampleData";
import * as serviceWorker from "./serviceWorker";

import "./index.css";

ReactDOM.render(
  <React.StrictMode>
    <App canData={canData} />
  </React.StrictMode>,
  document.getElementById("root")
);

const webSocket = new WebSocket("ws://localhost:3001");
webSocket.onmessage = (event) => {
  const dj = JSON.parse(event.data);
  if (get(canData, dj.key) === undefined) {
    console.error("ERROR:", dj.key, "did not exist!");
  }
  set(canData, dj.key, dj.val);
  ReactDOM.render(
    <React.StrictMode>
      <App canData={canData} />
    </React.StrictMode>,
    document.getElementById("root")
  );
};

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
