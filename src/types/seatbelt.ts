export enum SeatbeltBuckleState {
  UNBUCKLED,
  BUCKLED,
}

export enum SeatbeltChimeState {
  NONE,
  OCCUPIED_AND_UNBUCKLED,
  SNA,
}

export interface SeatbeltData {
  // ID3A1VCFRONT_vehicleStatus
  secondRowCenter: SeatbeltChimeState;
  secondRowLeft: SeatbeltChimeState;
  secondRowRight: SeatbeltChimeState;
  driverBuckle: SeatbeltBuckleState;
  driver: SeatbeltChimeState;
  passenger: SeatbeltChimeState;
}
