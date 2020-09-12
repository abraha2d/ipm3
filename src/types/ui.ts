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
  // ID123UI_alertMatrix1
  parkBrakeFault: boolean;

  // ID257UIspeed
  speedUnits: SpeedUnits;
  speed: number;

  // ID2D3UI_solarData
  isSunUp: SunStatus;

  // ID33AUI_rangeSOC
  range_mi: number;
  SOC_percent: number;
  ratedWHpM: number;

  // ID3F3UI_odo
  odometer: number;
}
