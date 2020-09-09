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
  gear: Gear;
  trackModeState: TrackModeState;
  tractionControlMode: TractionControlMode;

  tcTelltaleOn: boolean;
  tcTelltaleFlash: boolean;
  vdcTelltaleOn: boolean;
  vdcTelltaleFlash: boolean;
  vehicleHoldTelltaleOn: boolean;
}
