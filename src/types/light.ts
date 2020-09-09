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
  VCFRONT_DRLLeft: LightStatus;
  VCFRONT_DRLRight: LightStatus;
  VCFRONT_fogLeft: LightStatus;
  VCFRONT_fogRight: LightStatus;
  VCFRONT_highBeamLeft: LightStatus;
  VCFRONT_highBeamRight: LightStatus;
  VCFRONT_indicatorLeft: LightRequest;
  VCFRONT_indicatorRight: LightRequest;
  VCFRONT_lowBeamLeft: LightStatus;
  VCFRONT_lowBeamRight: LightStatus;
  VCFRONT_parkLeft: LightStatus;
  VCFRONT_parkRight: LightStatus;
  VCFRONT_sideMarkers: LightStatus;
  VCFRONT_sideRepeaterLeft: LightStatus;
  VCFRONT_sideRepeaterRight: LightStatus;
  VCFRONT_turnSignalLeft: LightStatus;
  VCFRONT_turnSignalRight: LightStatus;

  VCLEFT_brake: LightStatus;
  VCLEFT_dynamicBrake: LightRequest;
  VCLEFT_tail: LightStatus;
  VCLEFT_turnSignal: LightStatus;

  VCRIGHT_brake: LightStatus;
  VCRIGHT_rearFog: LightStatus;
  VCRIGHT_reverse: LightStatus;
  VCRIGHT_tail: LightStatus;
  VCRIGHT_turnSignal: LightStatus;
}
