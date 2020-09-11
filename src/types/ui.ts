export enum SpeedUnits {
  MPH,
  KPH,
}

export enum SunStatus {
  DOWN,
  UP,
  SNA = 3,
}

export interface UIData {
  isSunUp: SunStatus;
  parkBrakeFault: boolean;
  range_mi: number;
  ratedWHpM: number;
  SOC_percent: number;
  speed: number;
  speedUnits: SpeedUnits;
  systemPowerLimit_kW: number;
}
