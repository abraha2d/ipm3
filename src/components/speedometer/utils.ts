import { LightRequest } from "types";

export const getTurnSignalClass = (l: LightRequest) =>
  l !== LightRequest.OFF
    ? `active ${l === LightRequest.ACTIVE_HIGH ? "high" : "low"}`
    : "";
