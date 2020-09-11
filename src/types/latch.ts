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
  frunk: LatchStatus;
  frontLeft: LatchStatus;
  rearLeft: LatchStatus;
  frontRight: LatchStatus;
  rearRight: LatchStatus;
  trunk: LatchStatus;
}
