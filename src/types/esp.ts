export enum FaultLampStatus {
  OFF,
  ON,
}

export enum LampFlashStatus {
  OFF,
  FLASH,
}

export interface ESPData {
  // Chassis ID145ESP_status
  absFaultLamp: FaultLampStatus;
  ebdFaultLamp: FaultLampStatus;
  espFaultLamp: FaultLampStatus;
  espLampFlash: LampFlashStatus;
}
