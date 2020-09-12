export enum SeatbeltBuckleStatus {
  UNBUCKLED,
  BUCKLED,
}

export enum SeatbeltChimeStatus {
  NONE,
  OCCUPIED_AND_UNBUCKLED,
  SNA,
}

export interface SeatbeltStatusData {
  // ID3A1VCFRONT_vehicleStatus
  secondRowCenter: SeatbeltChimeStatus;
  secondRowLeft: SeatbeltChimeStatus;
  secondRowRight: SeatbeltChimeStatus;
  driverBuckle: SeatbeltBuckleStatus;
  driver: SeatbeltChimeStatus;
  passenger: SeatbeltChimeStatus;
}
