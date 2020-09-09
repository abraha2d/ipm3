import { ConfigData } from "./config";
import { DASData } from "./das";
import { DIData } from "./di";
import { ESPData } from "./esp";
import { GPSData } from "./gps";
import { LightStatusData } from "./light";
import { LatchStatusData } from "./latch";
import { PowerData } from "./power";
import { SeatbeltStatusData } from "./seatbelt";
import { SwitchStatusData } from "./switch";
import { TPMSData } from "./tpms";

export * from "./config";
export * from "./das";
export * from "./di";
export * from "./esp";
export * from "./gps";
export * from "./latch";
export * from "./light";
export * from "./power";
export * from "./seatbelt";
export * from "./switch";
export * from "./tpms";

export enum SunStatus {
  DOWN,
  UP,
  SNA = 3,
}

export interface CANData {
  airbagLight: boolean;
  config: ConfigData;
  das: DASData;
  di: DIData;
  esp: ESPData;
  gps: GPSData;
  isSunUp: SunStatus;
  latchStatus: LatchStatusData;
  lightStatus: LightStatusData;
  parkBrakeFault: boolean;
  power: PowerData;
  seatbeltStatus: SeatbeltStatusData;
  switchStatus: SwitchStatusData;
  tempAmbientFiltered_C: number;
  tpms: TPMSData;
  unixTimeSeconds: number;
}
