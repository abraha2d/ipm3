export interface PowerData {
  // ID252BMS_powerAvailable
  maxDischarge_kW: number;
  maxRegen_kW: number;

  // ID266RearInverterPower
  rearLimit_kW: number;
  rear_kW: number;

  // ID2E5FrontInverterPower
  front_kW: number;
  frontLimit_kW: number;

  // Chassis ID336MaxPowerRating
  regenRating_kW: number;
  powerRating_kW: number;
}
