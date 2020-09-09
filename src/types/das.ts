export enum ALCState {
  ALC_UNAVAILABLE_DISABLED,
  ALC_UNAVAILABLE_NO_LANES,
  ALC_UNAVAILABLE_SONICS_INVALID,
  ALC_UNAVAILABLE_TP_FOLLOW,
  ALC_UNAVAILABLE_EXITING_HIGHWAY,
  ALC_UNAVAILABLE_VEHICLE_SPEED,
  ALC_AVAILABLE_ONLY_L,
  ALC_AVAILABLE_ONLY_R,
  ALC_AVAILABLE_BOTH,
  ALC_IN_PROGRESS_L,
  ALC_IN_PROGRESS_R,
  ALC_WAITING_FOR_SIDE_OBST_TO_PASS_L,
  ALC_WAITING_FOR_SIDE_OBST_TO_PASS_R,
  ALC_WAITING_FOR_FWD_OBST_TO_PASS_L,
  ALC_WAITING_FOR_FWD_OBST_TO_PASS_R,
  ALC_ABORT_SIDE_OBSTACLE_PRESENT_L,
  ALC_ABORT_SIDE_OBSTACLE_PRESENT_R,
  ALC_ABORT_POOR_VIEW_RANGE,
  ALC_ABORT_LC_HEALTH_BAD,
  ALC_ABORT_BLINKER_TURNED_OFF,
  ALC_ABORT_OTHER_REASON,
  ALC_UNAVAILABLE_SOLID_LANE_LINE,
  ALC_BLOCKED_VEH_TTC_L,
  ALC_BLOCKED_VEH_TTC_AND_USS_L,
  ALC_BLOCKED_VEH_TTC_R,
  ALC_BLOCKED_VEH_TTC_AND_USS_R,
  ALC_BLOCKED_LANE_TYPE_L,
  ALC_BLOCKED_LANE_TYPE_R,
  ALC_WAITING_HANDS_ON,
  ALC_ABORT_TIMEOUT,
  ALC_ABORT_MISSION_PLAN_INVALID,
  ALC_SNA,
}

export enum AutopilotState {
  DISABLED,
  UNAVAILABLE,
  AVAILABLE,
  ACTIVE_NOMINAL,
  ACTIVE_RESTRICTED,
  ACTIVE_NAV,
  ABORTING = 8,
  ABORTED,
  FAULT = 14,
  SNA,
}

export enum BSWState {
  NO_WARNING,
  WARNING_LEVEL_1,
  WARNING_LEVEL_32,
  SNA,
}

export enum FCWState {
  NONE,
  FORWARD_COLLISION_WARNING,
  SNA = 3,
}

export enum LCHandsOnState {
  NOT_REQD,
  REQD_DETECTED,
  REQD_NOT_DETECTED,
  REQD_VISUAL,
  REQD_CHIME_1,
  REQD_CHIME_2,
  REQD_SLOWING,
  REQD_STRUCK_OUT,
  SUSPENDED,
  REQD_ESCALATED_CHIME_1,
  REQD_ESCALATED_CHIME_2,
  SNA = 15,
}

export enum LDWState {
  NONE,
  LEFT_WARNING,
  RIGHT_WARNING,
  LEFT_WARNING_SEVERE,
  RIGHT_WARNING_SEVERE,
  SNA,
}

export enum LSSState {
  FAULT,
  LDW,
  LKA,
  ELK,
  MONITOR,
  BLINDSPOT,
  ABORT,
  OFF,
}

export enum SCAState {
  NONE,
  AVOID_LEFT,
  AVOID_RIGHT,
  SNA,
}

export enum SCIState {
  NO_INHIBIT,
  INHIBIT,
}

export enum SCWState {
  NONE,
  WARN_LEFT,
  WARN_RIGHT,
  WARN_LEFT_RIGHT,
}

export interface DASData {
  autoLaneChangeState: ALCState;
  autopilotHandsOnState: LCHandsOnState;
  autopilotState: AutopilotState;
  blindSpotRearLeft: BSWState;
  blindSpotRearRight: BSWState;
  forwardCollisionWarning: FCWState;
  laneDepartureWarning: LDWState;
  lssState: LSSState;
  sideCollisionAvoid: SCAState;
  sideCollisionInhibit: SCIState;
  sideCollisionWarning: SCWState;
}
