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
  MAP_OR_CALL,
}

export interface IPM3Data {
  leftScreen: IPM3Screen;
  rightScreen: IPM3Screen;
  selected: IPM3Selected;
}
