export enum ChargeCableState {
  UNKNOWN_SNA,
  NOT_CONNECTED,
  CONNECTED,
}

export interface PowerData {
  range_mi: number;
  SOC_percent: number;
  ratedWHpM: number;
  systemPowerLimit_kW: number;

  FrontPower_kW: number;
  FrontHeatPower_kW: number;
  FrontPowerLimit_kW: number;

  RearPower_kW: number;
  RearHeatPower_kW: number;
  RearPowerLimit_kW: number;

  SystemRegenPowerMax_kW: number;
  SystemHeatPowerMax_kW: number;
  SystemHeatPower_kW: number;
  SystemDrivePowerMax_kW: number;

  chargeCableState: ChargeCableState;
  chargeDoorOpen: boolean;
}
