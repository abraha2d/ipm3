export enum LatchStatus {
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

export interface LatchStatusData {
  // ID102VCLEFT_doorStatus
  frontLeft: LatchStatus;
  rearLeft: LatchStatus;

  // ID103VCRIGHT_doorStatus
  frontRight: LatchStatus;
  rearRight: LatchStatus;
  trunk: LatchStatus;

  // ID2E1VCFRONT_status
  frunk: LatchStatus;
}
