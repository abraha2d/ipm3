export enum ChargeCableState {
  UNKNOWN_SNA,
  NOT_CONNECTED,
  CONNECTED,
}

export interface CPData {
  // ID25DCP_status
  chargeCableState: ChargeCableState;
  chargeDoorOpen: boolean;
}
