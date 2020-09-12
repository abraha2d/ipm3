export interface TPMSData {
  // ID123UI_alertMatrix1
  hardWarning: boolean;
  softWarning: boolean;
  overPressureWarning: boolean;
  temperatureWarning: boolean;
  systemFault: boolean;

  // Chassis ID31FTPMSsensors
  FLpressure_bar: number;
  FRpressure_bar: number;
  RLpressure_bar: number;
  RRpressure_bar: number;
  FLtemp_C: number;
  FRtemp_C: number;
  RLtemp_C: number;
  RRtemp_C: number;
}
