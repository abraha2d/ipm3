export interface GPSData {
  // ID04FGPSLatLong
  accuracy_m: number;
  longitude_deg: number;
  latitude_deg: number;

  // ID3D9UI_gpsVehicleSpeed
  vehicleHeading_deg: number;
}
