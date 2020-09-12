export enum FaultLampState {
  OFF,
  ON,
}

export enum LampFlashState {
  OFF,
  FLASH,
}

export interface ESPData {
  // Chassis ID145ESP_status
  absFaultLamp: FaultLampState;
  ebdFaultLamp: FaultLampState;
  espFaultLamp: FaultLampState;
  espLampFlash: LampFlashState;
}
