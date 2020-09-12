import { ChargeCableState, CPData } from "./cp";
import { DIData, Gear, TrackModeState, TractionControlMode } from "./di";
import { ESPData, FaultLampState, LampFlashState } from "./esp";
import { GPSData } from "./gps";
import { ExteriorColor, GTWData, SpoilerType } from "./gtw";
import { IPM3Data, IPM3Screen, IPM3Selected } from "./ipm3";
import { LatchData, LatchState } from "./latches";
import { LightData, LightRequest, LightState } from "./lights";
import { PowerData } from "./power";
import {
  SeatbeltBuckleState,
  SeatbeltChimeState,
  SeatbeltData,
} from "./seatbelt";
import { SensorData } from "./sensors";
import { GearLeverPosition, SwitchData, SwitchStatus } from "./switches";
import { TPMSData } from "./tpms";
import { SpeedUnits, SunStatus, UIData } from "./ui";

export interface CANData {
  airbagLight: boolean;
  cp: CPData;
  di: DIData;
  esp: ESPData;
  gps: GPSData;
  gtw: GTWData;
  ipm3: IPM3Data;
  latches: LatchData;
  lights: LightData;
  power: PowerData;
  seatbelt: SeatbeltData;
  sensors: SensorData;
  switches: SwitchData;
  tpms: TPMSData;
  ui: UIData;
  // ID528UnixTime
  unixTime_s: number;
}

export let canData: CANData = {
  airbagLight: false,
  cp: {
    chargeCableState: ChargeCableState.UNKNOWN_SNA,
    chargeDoorOpen: false,
  },
  di: {
    gear: Gear.SNA,
    trackModeState: TrackModeState.UNAVAILABLE,
    tractionControlMode: TractionControlMode.NORMAL,
    tcTelltaleFlash: false,
    tcTelltaleOn: false,
    vdcTelltaleFlash: false,
    vdcTelltaleOn: false,
    vehicleHoldTelltaleOn: false,
  },
  esp: {
    absFaultLamp: FaultLampState.OFF,
    ebdFaultLamp: FaultLampState.OFF,
    espFaultLamp: FaultLampState.OFF,
    espLampFlash: LampFlashState.OFF,
  },
  gps: {
    accuracy_m: 0,
    latitude_deg: 0,
    longitude_deg: 0,
    vehicleHeading_deg: 0,
  },
  gtw: {
    exteriorColor: ExteriorColor.MIDNIGHT_SILVER,
    spoilerType: SpoilerType.NOT_INSTALLED,
  },
  ipm3: {
    leftScreen: IPM3Screen.MAP_OR_CALL,
    rightScreen: IPM3Screen.ENERGY,
    selected: IPM3Selected.NONE,
  },
  latches: {
    frontLeft: LatchState.SNA,
    rearLeft: LatchState.SNA,
    frontRight: LatchState.SNA,
    rearRight: LatchState.SNA,
    trunk: LatchState.SNA,
    frunk: LatchState.SNA,
  },
  lights: {
    leftBrake: LightState.SNA,
    dynamicBrake: LightRequest.OFF,
    leftTail: LightState.SNA,
    rearLeftTurnSignal: LightState.SNA,
    rightBrake: LightState.SNA,
    rearFog: LightState.SNA,
    reverse: LightState.SNA,
    rightTail: LightState.SNA,
    rearRightTurnSignal: LightState.SNA,
    DRLLeft: LightState.SNA,
    DRLRight: LightState.SNA,
    fogLeft: LightState.SNA,
    fogRight: LightState.SNA,
    highBeamLeft: LightState.SNA,
    highBeamRight: LightState.SNA,
    indicatorLeftRequest: LightRequest.OFF,
    indicatorRightRequest: LightRequest.OFF,
    lowBeamLeft: LightState.SNA,
    lowBeamRight: LightState.SNA,
    parkLeft: LightState.SNA,
    parkRight: LightState.SNA,
    sideMarkers: LightState.SNA,
    sideRepeaterLeft: LightState.SNA,
    sideRepeaterRight: LightState.SNA,
    turnSignalLeft: LightState.SNA,
    turnSignalRight: LightState.SNA,
  },
  power: {
    maxDischarge_kW: 0,
    maxRegen_kW: 0,
    rearLimit_kW: 0,
    rear_kW: 0,
    front_kW: 0,
    frontLimit_kW: 0,
    regenRating_kW: 0,
    powerRating_kW: 0,
  },
  seatbelt: {
    secondRowCenter: SeatbeltChimeState.SNA,
    secondRowLeft: SeatbeltChimeState.SNA,
    secondRowRight: SeatbeltChimeState.SNA,
    driverBuckle: SeatbeltBuckleState.UNBUCKLED,
    driver: SeatbeltChimeState.SNA,
    passenger: SeatbeltChimeState.SNA,
  },
  sensors: {
    tempAmbientFiltered_C: 0,
  },
  switches: {
    gearLeverPosition: GearLeverPosition.CENTER,
    gearLeverButton: false,
    swcLeftDoublePress: false,
    swcLeftPressed: SwitchStatus.SNA,
    swcLeftScrollTicks: 0,
    swcLeftTiltLeft: SwitchStatus.SNA,
    swcLeftTiltRight: SwitchStatus.SNA,
    swcRightDoublePress: false,
    swcRightPressed: SwitchStatus.SNA,
    swcRightScrollTicks: 0,
    swcRightTiltLeft: SwitchStatus.SNA,
    swcRightTiltRight: SwitchStatus.SNA,
  },
  tpms: {
    hardWarning: false,
    softWarning: false,
    overPressureWarning: false,
    temperatureWarning: false,
    systemFault: false,
    FLpressure_bar: 0,
    FRpressure_bar: 0,
    RLpressure_bar: 0,
    RRpressure_bar: 0,
    FLtemp_C: 0,
    FRtemp_C: 0,
    RLtemp_C: 0,
    RRtemp_C: 0,
  },
  ui: {
    parkBrakeFault: false,
    speedUnits: SpeedUnits.MPH,
    speed: 0,
    isSunUp: SunStatus.SNA,
    range_mi: 0,
    SOC_percent: 0,
    ratedWHpM: 0,
    odometer: 0,
  },
  unixTime_s: 0,
};
