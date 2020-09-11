export enum FaultLampStatus {
  OFF,
  ON,
}

export enum LampFlashStatus {
  OFF,
  FLASH,
}

export interface ESPData {
  absFaultLamp: FaultLampStatus;
  ebdFaultLamp: FaultLampStatus;
  espFaultLamp: FaultLampStatus;
  espLampFlash: LampFlashStatus;
}
