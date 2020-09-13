import {
  FaultLampState,
  LampFlashState,
  LightState,
  SeatbeltChimeState,
  SeatbeltData,
  TPMSData,
} from "types";

// FaultIndicator

export const isFaultLamp = (faultLamp: FaultLampState | boolean) => {
  if (typeof faultLamp === "boolean") {
    return faultLamp;
  } else {
    return faultLamp === FaultLampState.ON;
  }
};

export const isLampFlash = (lampFlash?: LampFlashState | boolean) => {
  if (typeof lampFlash === "boolean") {
    return lampFlash;
  } else {
    return lampFlash === LampFlashState.FLASH;
  }
};

// Lights

const isLightOff = (left: LightState, right: LightState) =>
  (left === LightState.OFF && right === LightState.OFF) ||
  (left === LightState.SNA && right === LightState.SNA);

const isLightFault = (left: LightState, right: LightState) =>
  left !== right || left === LightState.FAULT || right === LightState.FAULT;

export const getLightClass = (l: LightState, r: LightState, c: string) =>
  `${!isLightOff(l, r) ? c : ""}${isLightFault(l, r) ? " fault" : ""}`;

// Seatbelt

const isSeatbeltBuckled = (s: SeatbeltData) =>
  s.secondRowCenter === SeatbeltChimeState.NONE &&
  s.secondRowLeft === SeatbeltChimeState.NONE &&
  s.secondRowRight === SeatbeltChimeState.NONE &&
  s.driver === SeatbeltChimeState.NONE &&
  s.passenger === SeatbeltChimeState.NONE;

const isSeatbeltFault = (s: SeatbeltData) =>
  s.secondRowCenter === SeatbeltChimeState.SNA ||
  s.secondRowLeft === SeatbeltChimeState.SNA ||
  s.secondRowRight === SeatbeltChimeState.SNA ||
  s.driver === SeatbeltChimeState.SNA ||
  s.passenger === SeatbeltChimeState.SNA;

export const getSeatbeltClass = (s: SeatbeltData, c: string) =>
  `${!isSeatbeltBuckled(s) ? c : ""}${isSeatbeltFault(s) ? " fault" : ""}`;

// TPMS

export const getTPMSClass = (t: TPMSData, c: string) =>
  `${
    t.hardWarning ||
    t.softWarning ||
    t.overPressureWarning ||
    t.temperatureWarning ||
    t.systemFault
      ? c
      : ""
  }${t.systemFault ? " fault" : ""}`;
