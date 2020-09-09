export enum SwitchStatus {
  SNA,
  OFF,
  ON,
  FAULT,
}

export interface SwitchStatusData {
  swcLeftDoublePress: boolean;
  swcLeftPressed: SwitchStatus;
  swcLeftScrollTicks: number;
  swcLeftTiltLeft: SwitchStatus;
  swcLeftTiltRight: SwitchStatus;
  swcRightDoublePress: boolean;
  swcRightPressed: SwitchStatus;
  swcRightScrollTicks: number;
  swcRightTiltLeft: SwitchStatus;
  swcRightTiltRight: SwitchStatus;
}
