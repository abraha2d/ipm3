export enum ABSEvent {
  NOT_ACTIVE,
  ACTIVE_FRONT_REAR,
  ACTIVE_FRONT,
  ACTIVE_REAR,
}

export enum FaultLampStatus {
  OFF,
  ON,
}

export enum LampFlashStatus {
  OFF,
  FLASH,
}

export interface ESPData {
  absBrakeEvent: ABSEvent;
  absFaultLamp: FaultLampStatus;
  ebdFaultLamp: FaultLampStatus;
  espFaultLamp: FaultLampStatus;
  espLampFlash: LampFlashStatus;
  vehicleSpeed_kph: number;
}
