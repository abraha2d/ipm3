export interface PowerData {
  front_kW: number;
  frontHeat_kW: number;
  frontLimit_kW: number;

  rear_kW: number;
  rearHeat_kW: number;
  rearLimit_kW: number;

  systemRegenMax_kW: number;
  systemHeatMax_kW: number;
  systemHeat_kW: number;
  systemDriveMax_kW: number;
}
