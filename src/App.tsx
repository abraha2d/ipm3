import React from "react";

import { Gear, LightRequest, LightStatus } from "./types";
import canData from "./sampleData";

import "./App.css";
import blank from "./assets/blank.png";

const isLightOn = (left: LightStatus, right: LightStatus) =>
  left === LightStatus.ON && right === LightStatus.ON;

const isLightOff = (left: LightStatus, right: LightStatus) =>
  left === LightStatus.OFF && right === LightStatus.OFF;

const isLightFault = (left: LightStatus, right: LightStatus) =>
  !(isLightOn(left, right) || isLightOff(left, right));

const getLightClass = (l: LightStatus, r: LightStatus, c: string) =>
  `${!isLightOff(l, r) ? c : ""}${isLightFault(l, r) ? " fault" : ""}`;

const getTurnSignalClass = (l: LightRequest) =>
  l !== LightRequest.OFF
    ? `active ${l === LightRequest.ACTIVE_HIGH ? "high" : "low"}`
    : "";

function App() {
  return (
    <div className="App">
      <div className="overlay top left">
        <div className="telltale-container">
          <img
            src={blank}
            className={`telltale ${getLightClass(
              canData.lightStatus.VCFRONT_fogLeft,
              canData.lightStatus.VCFRONT_fogRight,
              "front-fog"
            )}`}
            alt=""
          />
          <img
            src={blank}
            className={`telltale ${getLightClass(
              canData.lightStatus.VCRIGHT_rearFog,
              canData.lightStatus.VCRIGHT_rearFog,
              "rear-fog"
            )}`}
            alt=""
          />
          <img
            src={blank}
            className={`telltale ${true ? "tpms" : "empty"}`}
            alt=""
          />
          <img
            src={blank}
            className={`telltale ${true ? "seatbelt" : "empty"}`}
            alt=""
          />
          <img
            src={blank}
            className={`telltale ${true ? "airbag" : "empty"}`}
            alt=""
          />
        </div>
      </div>
      <div className="overlay top right">
        <div className="telltale-container">
          <img
            src={blank}
            className={`telltale ${true ? "abs" : "empty"}`}
            alt=""
          />
          <img
            src={blank}
            className={`telltale ${true ? "esp" : "empty"}`}
            alt=""
          />
          <img
            src={blank}
            className={`telltale ${getLightClass(
              canData.lightStatus.VCFRONT_parkLeft,
              canData.lightStatus.VCFRONT_parkRight,
              "park-lights"
            )}`}
            alt=""
          />
          <img
            src={blank}
            className={`telltale ${getLightClass(
              canData.lightStatus.VCFRONT_highBeamLeft,
              canData.lightStatus.VCFRONT_highBeamRight,
              "high-beam"
            )}`}
            alt=""
          />
          <img
            src={blank}
            className={`telltale ${getLightClass(
              canData.lightStatus.VCFRONT_lowBeamLeft,
              canData.lightStatus.VCFRONT_lowBeamRight,
              "low-beam"
            )}`}
            alt=""
          />
        </div>
      </div>
      <div className="overlay bottom left">
        <div className="gear-container">
          <span className={canData.di.gear == Gear.P ? "selected" : ""}>P</span>
          <span className={canData.di.gear == Gear.R ? "selected" : ""}>R</span>
          <span className={canData.di.gear == Gear.N ? "selected" : ""}>N</span>
          <span className={canData.di.gear == Gear.D ? "selected" : ""}>D</span>
        </div>
      </div>
      <div className="overlay bottom right">
        <div className="range">
          <span className="value">{canData.power.range_mi} mi</span>
          <div className="icon">
            <img
              src={blank}
              className={`sprite ${
                canData.power.SOC_percent < 10 ? "very-" : ""
              }${canData.power.SOC_percent < 20 ? "low" : ""}`}
              style={{ width: (60 * canData.power.SOC_percent) / 100 }}
              alt=""
            />
          </div>
        </div>
      </div>
      <div className="overlay top center">
        <div
          className={`turn-signal ${getTurnSignalClass(
            canData.lightStatus.VCFRONT_indicatorRight
          )} left`}
        />
        <div className="speed">
          <span className="value">
            {canData.esp.vehicleSpeed_kph === 1023
              ? "N/A"
              : Math.round(canData.esp.vehicleSpeed_kph / 1.609)}
          </span>
          <span className="units">MPH</span>
        </div>
        <div
          className={`turn-signal ${getTurnSignalClass(
            canData.lightStatus.VCFRONT_indicatorRight
          )} right`}
        />
      </div>
    </div>
  );
}

export default App;
