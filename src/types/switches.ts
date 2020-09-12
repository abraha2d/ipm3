export enum GearLeverPosition {
  CENTER,
  HALF_UP,
  FULL_UP,
  HALF_DOWN,
  FULL_DOWN,
}

export enum SwitchStatus {
  SNA,
  OFF,
  ON,
  FAULT,
}

export interface SwitchData {
  // ID229GearLever
  gearLeverPosition: GearLeverPosition;
  gearLeverButton: boolean;

  // ID3C2VCLEFT_switchStatus
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
