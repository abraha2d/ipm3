export enum IPM3Selected {
  NONE,
  LEFT,
  RIGHT,
}
export enum IPM3Screen {
  CLOCK,
  MEDIA,
  ENERGY,
  TRIPS,
  CAR_STATUS,
  NAV_OR_PHONE,
}

export interface IPM3Data {
  leftScreen: IPM3Screen;
  rightScreen: IPM3Screen;
  selected: IPM3Selected;
}
