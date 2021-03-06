import { ExteriorColor, Gear, LatchState, LightState } from "types";

export const getColorClass = (c: ExteriorColor) => {
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

export const getOpen = (l: LatchState) => (isLatchClosed(l) ? "" : "open");

const isLatchClosed = (l: LatchState) => l === LatchState.CLOSED;

export const isLightOn = (l: LightState) =>
  l === LightState.ON || l === LightState.FAULT;

export const isVehicleParked = (gear: Gear) => {
  return gear === Gear.P || gear === Gear.SNA || gear === Gear.INVALID;
};
