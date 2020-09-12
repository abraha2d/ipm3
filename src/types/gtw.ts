export enum ExteriorColor {
  RED_MULTICOAT,
  SOLID_BLACK,
  SILVER_METALLIC,
  MIDNIGHT_SILVER,
  DEEP_BLUE = 5,
  PEARL_WHITE,
}

export enum SpoilerType {
  NOT_INSTALLED,
  PASSIVE,
}

export interface GTWData {
  // ID7FFcarConfig
  exteriorColor: ExteriorColor;
  spoilerType: SpoilerType;
}
