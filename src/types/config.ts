export enum ExteriorColor {
  RED_MULTICOAT,
  SOLID_BLACK,
  SILVER_METALLIC,
  MIDNIGHT_SILVER,
  DEEP_BLUE = 5,
  PEARL_WHITE,
}

export interface ConfigData {
  exteriorColor: ExteriorColor;
}
