export enum Gear {
  INVALID,
  P,
  R,
  N,
  D,
  SNA = 7,
}

export enum TrackModeState {
  UNAVAILABLE,
  AVAILABLE,
  ON,
}

export enum TractionControlMode {
  NORMAL,
  SLIP_START,
  DEV_MODE_1,
  DEV_MODE_2,
  ROLLS_MODE,
  DYNO_MODE,
  OFFROAD_ASSIST,
}

export interface DIData {
  // ID118DriveSystemStatus
  gear: Gear;
  trackModeState: TrackModeState;
  tractionControlMode: TractionControlMode;

  // ID2B6DI_chassisControlStatus
  tcTelltaleFlash: boolean;
  tcTelltaleOn: boolean;
  vdcTelltaleFlash: boolean;
  vdcTelltaleOn: boolean;
  vehicleHoldTelltaleOn: boolean;
}
