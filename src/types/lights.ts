export enum LightRequest {
  OFF,
  ACTIVE_LOW,
  ACTIVE_HIGH,
}

export enum LightState {
  OFF,
  ON,
  FAULT,
  SNA,
}

export interface LightData {
  // ID3E2VCLEFT_lightStatus
  leftBrake: LightState;
  dynamicBrake: LightRequest;
  leftTail: LightState;
  rearLeftTurnSignal: LightState;

  // ID3E3VCRIGHT_lightStatus
  rightBrake: LightState;
  rearFog: LightState;
  reverse: LightState;
  rightTail: LightState;
  rearRightTurnSignal: LightState;

  // ID3F5VCFRONT_lighting
  DRLLeft: LightState;
  DRLRight: LightState;
  fogLeft: LightState;
  fogRight: LightState;
  highBeamLeft: LightState;
  highBeamRight: LightState;
  indicatorLeftRequest: LightRequest;
  indicatorRightRequest: LightRequest;
  lowBeamLeft: LightState;
  lowBeamRight: LightState;
  parkLeft: LightState;
  parkRight: LightState;
  sideMarkers: LightState;
  sideRepeaterLeft: LightState;
  sideRepeaterRight: LightState;
  turnSignalLeft: LightState;
  turnSignalRight: LightState;
}
