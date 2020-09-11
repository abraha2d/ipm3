export enum ChargeCableState {
  UNKNOWN_SNA,
  NOT_CONNECTED,
  CONNECTED,
}

export interface ChargePortStatus {
  chargeCableState: ChargeCableState;
  chargeDoorOpen: boolean;
}
