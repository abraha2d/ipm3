import { CPData } from "./cp";
// import { DASData } from "./das";
import { DIData } from "./di";
import { ESPData } from "./esp";
import { GPSData } from "./gps";
import { GTWData } from "./gtw";
import { LightStatusData } from "./light";
import { LatchStatusData } from "./latch";
import { PowerData } from "./power";
import { SeatbeltStatusData } from "./seatbelt";
import { SwitchStatusData } from "./switch";
import { TPMSData } from "./tpms";
import { UIData } from "./ui";

export * from "./cp";
// export * from "./das";
export * from "./di";
export * from "./esp";
export * from "./gps";
export * from "./gtw";
export * from "./latch";
export * from "./light";
export * from "./power";
export * from "./seatbelt";
export * from "./switch";
export * from "./tpms";
export * from "./ui";

export interface CANData {
  airbagLight: boolean;
  cp: CPData;
  // das: DASData;
  di: DIData;
  esp: ESPData;
  gps: GPSData;
  gtw: GTWData;
  latches: LatchStatusData;
  lights: LightStatusData;
  power: PowerData;
  seatbelts: SeatbeltStatusData;
  sensors: {
    // ID321VCFRONT_sensors
    tempAmbientFiltered_C: number;
  };
  switches: SwitchStatusData;
  tpms: TPMSData;
  ui: UIData;
  // ID528UnixTime
  unixTime_s: number;
}
