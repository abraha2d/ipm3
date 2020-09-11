export enum LightRequest {
  OFF,
  ACTIVE_LOW,
  ACTIVE_HIGH,
}

export enum LightStatus {
  OFF,
  ON,
  FAULT,
  SNA,
}

export interface LightStatusData {
  DRLLeft: LightStatus;
  DRLRight: LightStatus;
  fogLeft: LightStatus;
  fogRight: LightStatus;
  highBeamLeft: LightStatus;
  highBeamRight: LightStatus;
  indicatorLeftRequest: LightRequest;
  indicatorRightRequest: LightRequest;
  lowBeamLeft: LightStatus;
  lowBeamRight: LightStatus;
  parkLeft: LightStatus;
  parkRight: LightStatus;
  sideMarkers: LightStatus;
  sideRepeaterLeft: LightStatus;
  sideRepeaterRight: LightStatus;
  turnSignalLeft: LightStatus;
  turnSignalRight: LightStatus;

  leftBrake: LightStatus;
  dynamicBrake: LightRequest;
  leftTail: LightStatus;
  rearLeftTurnSignal: LightStatus;

  rightBrake: LightStatus;
  rearFog: LightStatus;
  reverse: LightStatus;
  rightTail: LightStatus;
  rearRightTurnSignal: LightStatus;
}
