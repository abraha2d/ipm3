export enum LatchState {
  SNA,
  OPENED,
  CLOSED,
  CLOSING,
  OPENING,
  AJAR,
  TIMEOUT,
  DEFAULT,
  FAULT,
}

export interface LatchData {
  // ID102VCLEFT_doorStatus
  frontLeft: LatchState;
  rearLeft: LatchState;

  // ID103VCRIGHT_doorStatus
  frontRight: LatchState;
  rearRight: LatchState;
  trunk: LatchState;

  // ID2E1VCFRONT_status
  frunk: LatchState;
}
