import React from "react";
import * as d3 from "d3";

import {
  CANData,
  ExteriorColor,
  FaultLampStatus,
  Gear,
  LightRequest,
  LightStatus,
  SeatbeltChimeStatus,
  SeatbeltStatusData,
  SpoilerType,
  TPMSData,
} from "./types";

import "./App.css";
import "./css/daytime.css";
import blank from "./assets/blank.png";

const isLightOn = (l: LightStatus) =>
  l === LightStatus.ON || l === LightStatus.FAULT;

const isLightsOff = (left: LightStatus, right: LightStatus) =>
  (left === LightStatus.OFF && right === LightStatus.OFF) ||
  (left === LightStatus.SNA && right === LightStatus.SNA);

const isLightsFault = (left: LightStatus, right: LightStatus) =>
  left !== right || left === LightStatus.FAULT || right === LightStatus.FAULT;

const getLightsClass = (l: LightStatus, r: LightStatus, c: string) =>
  `${!isLightsOff(l, r) ? c : ""}${isLightsFault(l, r) ? " fault" : ""}`;

const getTurnSignalClass = (l: LightRequest) =>
  l !== LightRequest.OFF
    ? `active ${l === LightRequest.ACTIVE_HIGH ? "high" : "low"}`
    : "";

const getColorClass = (c: ExteriorColor) => {
  switch (c) {
    case ExteriorColor.RED_MULTICOAT:
      return "red";
    case ExteriorColor.SOLID_BLACK:
      return "black";
    case ExteriorColor.SILVER_METALLIC:
      return "silver";
    case ExteriorColor.DEEP_BLUE:
      return "blue";
    case ExteriorColor.PEARL_WHITE:
      return "white";
    case ExteriorColor.MIDNIGHT_SILVER:
    default:
      return "midnight";
  }
};

const getTPMSClass = (t: TPMSData, c: string) =>
  `${
    t.hardWarning ||
    t.softWarning ||
    t.overPressureWarning ||
    t.temperatureWarning ||
    t.systemFault
      ? c
      : ""
  }${t.systemFault ? " fault" : ""}`;

const isSeatbeltBuckled = (s: SeatbeltStatusData) =>
  s.secondRowCenter === SeatbeltChimeStatus.NONE ||
  s.secondRowLeft === SeatbeltChimeStatus.NONE ||
  s.secondRowRight === SeatbeltChimeStatus.NONE ||
  s.driver === SeatbeltChimeStatus.NONE ||
  s.passenger === SeatbeltChimeStatus.NONE;

const isSeatbeltFault = (s: SeatbeltStatusData) =>
  s.secondRowCenter === SeatbeltChimeStatus.SNA ||
  s.secondRowLeft === SeatbeltChimeStatus.SNA ||
  s.secondRowRight === SeatbeltChimeStatus.SNA ||
  s.driver === SeatbeltChimeStatus.SNA ||
  s.passenger === SeatbeltChimeStatus.SNA;

const getSeatbeltClass = (s: SeatbeltStatusData, c: string) =>
  `${!isSeatbeltBuckled(s) ? c : ""}${isSeatbeltFault(s) ? " fault" : ""}`;

type AppProps = {
  canData: CANData;
};

function App({ canData }: AppProps) {
  return (
    <div className="App">
      <svg height="0" width="0">
        <defs>
          <filter id="red" colorInterpolationFilters="sRGB">
            <feColorMatrix
              type="matrix"
              values="2 0 0 0 0 0 0.25 0 0 0 0 0 0.25 0 0 0 0 0 1 0"
            />
          </filter>
          <filter id="blue" colorInterpolationFilters="sRGB">
            <feColorMatrix
              type="matrix"
              values="0.5 0 0 0 0 0 0.5 0 0 0 0 0 2 0 0 0 0 0 1 0"
            />
          </filter>
        </defs>
      </svg>
      <div className="overlay top center">
        <div
          className={`turn-signal ${getTurnSignalClass(
            canData.lights.indicatorLeftRequest
          )} left`}
        />
        <div className="speed">
          <span className="value">{Math.round(canData.ui.speed)}</span>
          <span className="units">
            {canData.ui.speedUnits ? "KM/H" : "MPH"}
          </span>
        </div>
        <div
          className={`turn-signal ${getTurnSignalClass(
            canData.lights.indicatorRightRequest
          )} right`}
        />
      </div>
      <div className="overlay top left">
        <img
          src={blank}
          className={`telltale ${getLightsClass(
            canData.lights.fogLeft,
            canData.lights.fogRight,
            "front-fog"
          )}`}
          alt=""
        />
        <img
          src={blank}
          className={`telltale ${getLightsClass(
            canData.lights.rearFog,
            canData.lights.rearFog,
            "rear-fog"
          )}`}
          alt=""
        />
        <img
          src={blank}
          className={`telltale ${getTPMSClass(canData.tpms, "tpms")}`}
          alt=""
        />
        <img
          src={blank}
          className={`telltale ${getSeatbeltClass(
            canData.seatbelts,
            "seatbelt"
          )}`}
          alt=""
        />
        <img
          src={blank}
          className={`telltale ${canData.airbagLight ? "airbag" : ""}`}
          alt=""
        />
      </div>
      <div className="overlay top right">
        <div className="telltale-container">
          <img
            src={blank}
            className={`telltale ${
              canData.esp.absFaultLamp === FaultLampStatus.ON ? "abs" : ""
            }`}
            alt=""
          />
          <img
            src={blank}
            className={`telltale ${canData.esp.espFaultLamp ? "esp" : ""} ${
              canData.esp.espLampFlash ? "fault" : ""
            }`}
            alt=""
          />
          <img
            src={blank}
            className={`telltale ${getLightsClass(
              canData.lights.parkLeft,
              canData.lights.parkRight,
              "park-lights"
            )}`}
            alt=""
          />
          <img
            src={blank}
            className={`telltale ${getLightsClass(
              canData.lights.highBeamLeft,
              canData.lights.highBeamRight,
              "high-beam"
            )}`}
            alt=""
          />
          <img
            src={blank}
            className={`telltale ${getLightsClass(
              canData.lights.lowBeamLeft,
              canData.lights.lowBeamRight,
              "low-beam"
            )}`}
            alt=""
          />
        </div>
      </div>
      <div className="overlay bottom left">
        <div
          className={`gear-indicator ${
            canData.di.gear === Gear.INVALID ? "fault" : ""
          }`}
        >
          <span className={canData.di.gear === Gear.P ? "selected" : ""}>
            P
          </span>
          <span className={canData.di.gear === Gear.R ? "selected" : ""}>
            R
          </span>
          <span className={canData.di.gear === Gear.N ? "selected" : ""}>
            N
          </span>
          <span className={canData.di.gear === Gear.D ? "selected" : ""}>
            D
          </span>
        </div>
        <div
          className={`current-time ${
            new Date(canData.unixTime_s * 1000).getHours() > 12 ? "pm" : "am"
          }`}
        >
          {
            new Date(canData.unixTime_s * 1000)
              .toLocaleTimeString("en-US", {
                hour: "numeric",
                minute: "numeric",
              })
              .split(" ")[0]
          }
        </div>
      </div>
      <div className="overlay bottom right">
        <div className="ambient-temperature C">
          {Math.round(canData.sensors.tempAmbientFiltered_C)}
        </div>
        <div className="range mi">
          <span className="value">{canData.ui.range_mi}</span>
          <div className="icon">
            <img
              src={blank}
              className={`sprite ${canData.ui.SOC_percent < 10 ? "very-" : ""}${
                canData.ui.SOC_percent < 20 ? "low" : ""
              }`}
              style={{ width: (60 * canData.ui.SOC_percent) / 100 }}
              alt=""
            />
          </div>
        </div>
      </div>
      <div className={`vehicle ${getColorClass(canData.gtw.exteriorColor)}`}>
        {canData.lights.leftBrake === LightStatus.ON &&
          canData.lights.rightBrake === LightStatus.ON && (
            <div className="brake-center" />
          )}
        {canData.lights.leftBrake === LightStatus.ON && (
          <div className="brake-left" />
        )}
        {canData.lights.rightBrake === LightStatus.ON && (
          <div className="brake-right" />
        )}
        <div
          className={`${getLightsClass(
            canData.lights.lowBeamLeft,
            canData.lights.lowBeamRight,
            "headlights"
          )}${isLightOn(canData.lights.lowBeamLeft) ? " left" : ""}${
            isLightOn(canData.lights.lowBeamRight) ? " right" : ""
          }`}
        />
        {canData.lights.leftTail === LightStatus.ON && (
          <div className="park-left" />
        )}
        {canData.lights.rightTail === LightStatus.ON && (
          <div className="park-right" />
        )}
        {canData.gtw.spoilerType === SpoilerType.PASSIVE && (
          <div className="spoiler" />
        )}
        {canData.lights.rearLeftTurnSignal === LightStatus.ON && (
          <div className="turn-left" />
        )}
        {canData.lights.rearRightTurnSignal === LightStatus.ON && (
          <div className="turn-right" />
        )}
      </div>
      <div className="regen-gauge">
        <svg width={250} height={250}>
          <g transform="translate(125, 125)">
            <path
              className="power-line"
              d={
                d3.arc()({
                  innerRadius: 100,
                  outerRadius: 101,
                  startAngle: (-90 * Math.PI) / 180,
                  endAngle: (45 * Math.PI) / 180,
                }) as any
              }
            />
            <path
              className="regen-line"
              d={
                d3.arc()({
                  innerRadius: 100,
                  outerRadius: 101,
                  startAngle: (-90 * Math.PI) / 180,
                  endAngle: (-135 * Math.PI) / 180,
                }) as any
              }
            />
            <path
              className={`actual-line ${
                canData.power.rear_kW + canData.power.front_kW < 0
                  ? "regen"
                  : ""
              }`}
              d={
                d3.arc()({
                  innerRadius: 95,
                  outerRadius: 100,
                  startAngle: (-90 * Math.PI) / 180,
                  endAngle:
                    ((-90 +
                      (canData.power.rear_kW + canData.power.front_kW) / 3) *
                      Math.PI) /
                    180,
                }) as any
              }
            />
            <text className="value">
              {Math.round(canData.power.rear_kW + canData.power.front_kW)}
            </text>
            <text className="units">kW</text>
          </g>
        </svg>
      </div>
    </div>
  );
}

export default App;
