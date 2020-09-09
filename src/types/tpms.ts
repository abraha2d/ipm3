export interface TPMSData {
  HardWarning: boolean;
  SoftWarning: boolean;
  OverPressureWarning: boolean;
  TemperatureWarning: boolean;
  SystemFault: boolean;

  FLpressure_bar: number;
  FRpressure_bar: number;
  RLpressure_bar: number;
  RRpressure_bar: number;

  FLtemp_degC: number;
  FRtemp_degC: number;
  RLtemp_degC: number;
  RRtemp_degC: number;
}
