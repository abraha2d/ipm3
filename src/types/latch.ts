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
  VCFRONT_frunk: LatchStatus;
  VCLEFT_front: LatchStatus;
  VCLEFT_rear: LatchStatus;
  VCRIGHT_front: LatchStatus;
  VCRIGHT_rear: LatchStatus;
  VCRIGHT_trunk: LatchStatus;
}
