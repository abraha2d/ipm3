const express = require("express");
const http = require("http");
const socketcan = require("socketcan");
const ws = require("ws");

const network = socketcan.parseNetworkDescription("Model3CAN.kcd");
const channel = socketcan.createRawChannel("can0");
const db = new socketcan.DatabaseService(channel, network.buses["Model3CAN"]);

const messagesChassis = {
  ID145ESP_status: {
    ESP_absFaultLamp: "esp.absFaultLamp",
    ESP_ebdFaultLamp: "esp.ebdFaultLamp",
    ESP_espFaultLamp: "esp.espFaultLamp",
    ESP_espLampFlash: "esp.espLampFlash",
  },
  ID31FTPMSsensors: {
    TPMSFLpressure31F: "tpms.FLpressure_bar",
    TPMSFRpressure31F: "tpms.FRpressure_bar",
    TPMSRLpressure31F: "tpms.RLpressure_bar",
    TPMSRRpressure31F: "tpms.RRpressure_bar",
    TPMSFLtemp31F: "tpms.FLtemp_C",
    TPMSFRtemp31F: "tpms.FRtemp_C",
    TPMSRLtemp31F: "tpms.RLtemp_C",
    TPMSRRtemp31F: "tpms.RRtemp_C",
  },
  ID336MaxPowerRating: {
    DriveRegenRating336: "power.regenRating_kW",
    DrivePowerRating336: "power.powerRating_kW",
  },
};

const messages = {
  ID04FGPSLatLong: {
    GPSAccuracy04F: "gps.accuracy_m",
    GPSLongitude04F: "gps.longitude_deg",
    GPSLatitude04F: "gps.latitude_deg",
  },
  ID102VCLEFT_doorStatus: {
    VCLEFT_frontLatchStatus: "latches.frontLeft",
    VCLEFT_rearLatchStatus: "latches.rearLeft",
  },
  ID103VCRIGHT_doorStatus: {
    VCRIGHT_frontLatchStatus: "latches.frontRight",
    VCRIGHT_rearLatchStatus: "latches.rearRight",
    VCRIGHT_trunkLatchStatus: "latches.trunk",
  },
  ID118DriveSystemStatus: {
    DI_gear: "di.gear",
    DI_trackModeState: "di.trackModeState",
    DI_tractionControlMode: "di.tractionControlMode",
  },
  ID123UI_alertMatrix1: {
    UI_a013_TPMSHardWarning: "tpms.hardWarning",
    UI_a014_TPMSSoftWarning: "tpms.softWarning",
    UI_a015_TPMSOverPressureWarning: "tpms.overPressureWarning",
    UI_a016_TPMSTemperatureWarning: "tpms.temperatureWarning",
    UI_a017_TPMSSystemFault: "tpms.systemFault",
    UI_a019_ParkBrakeFault: "ui.parkBrakeFault",
  },
  ID229GearLever: {
    GearLeverPosition229: "switches.gearLeverPosition",
    GearLeverButton229: "switches.gearLeverButton",
  },
  ID252BMS_powerAvailable: {
    BMS_maxDischargePower: "power.maxDischarge_kW",
    BMS_maxRegenPower: "power.maxRegen_kW",
  },
  ID257UIspeed: {
    UIspeedUnits257: "ui.speedUnits",
    UIspeed_abs257: "ui.speed",
  },
  ID25DCP_status: {
    CP_chargeCableState: "cp.chargeCableState",
    CP_chargeDoorOpen: "cp.chargeDoorOpen",
  },
  ID266RearInverterPower: {
    RearPowerLimit266: "power.rearLimit_kW",
    RearPower266: "power.rear_kW",
  },
  ID2B6DI_chassisControlStatus: {
    DI_tcTelltaleFlash: "di.tcTelltaleFlash",
    DI_tcTelltaleOn: "di.tcTelltaleOn",
    DI_vdcTelltaleFlash: "di.vdcTelltaleFlash",
    DI_vdcTelltaleOn: "di.vdcTelltaleOn",
    DI_vehicleHoldTelltaleOn: "di.vehicleHoldTelltaleOn",
  },
  ID2D3UI_solarData: {
    UI_isSunUp: "ui.isSunUp",
  },
  ID2E1VCFRONT_status: {
    VCFRONT_frunkLatchStatus: "latches.frunk",
  },
  ID2E5FrontInverterPower: {
    FrontPower2E5: "power.front_kW",
    FrontPowerLimit2E5: "power.frontLimit_kW",
  },
  ID321VCFRONT_sensors: {
    VCFRONT_tempAmbientFiltered: "sensors.tempAmbientFiltered_C",
  },
  ID33AUI_rangeSOC: {
    UI_Range: "ui.range_mi",
    UI_SOC: "ui.SOC_percent",
    UI_ratedWHpM: "ui.ratedWHpM",
  },
  ID3A1VCFRONT_vehicleStatus: {
    VCFRONT_2RowCenterUnbuckled: "seatbelts.secondRowCenter",
    VCFRONT_2RowLeftUnbuckled: "seatbelts.secondRowLeft",
    VCFRONT_2RowRightUnbuckled: "seatbelts.secondRowRight",
    VCFRONT_driverBuckleStatus: "seatbelts.driverBuckle",
    VCFRONT_driverUnbuckled: "seatbelts.driver",
    VCFRONT_passengerUnbuckled: "seatbelts.passenger",
  },
  ID3C2VCLEFT_switchStatus: {
    VCLEFT_swcLeftDoublePress: "switches.swcLeftDoublePress",
    VCLEFT_swcLeftPressed: "switches.swcLeftPressed",
    VCLEFT_swcLeftScrollTicks: "switches.swcLeftScrollTicks",
    VCLEFT_swcLeftTiltLeft: "switches.swcLeftTiltLeft",
    VCLEFT_swcLeftTiltRight: "switches.swcLeftTiltRight",
    VCLEFT_swcRightDoublePress: "switches.swcRightDoublePress",
    VCLEFT_swcRightPressed: "switches.swcRightPressed",
    VCLEFT_swcRightScrollTicks: "switches.swcRightScrollTicks",
    VCLEFT_swcRightTiltLeft: "switches.swcRightTiltLeft",
    VCLEFT_swcRightTiltRight: "switches.swcRightTiltRight",
  },
  ID3D9UI_gpsVehicleSpeed: {
    UI_gpsVehicleHeading: "gps.vehicleHeading_deg",
  },
  ID3E2VCLEFT_lightStatus: {
    VCLEFT_brakeLightStatus: "lights.leftBrake",
    VCLEFT_dynamicBrakeLightStatus: "lights.dynamicBrake",
    VCLEFT_tailLightStatus: "lights.leftTail",
    VCLEFT_turnSignalStatus: "lights.rearLeftTurnSignal",
  },
  ID3E3VCRIGHT_lightStatus: {
    VCRIGHT_brakeLightStatus: "lights.rightBrake",
    VCRIGHT_rearFogLightStatus: "lights.rearFog",
    VCRIGHT_reverseLightStatus: "lights.reverse",
    VCRIGHT_tailLightStatus: "lights.rightTail",
    VCRIGHT_turnSignalStatus: "lights.rearRightTurnSignal",
  },
  ID3F3UI_odo: {
    UI_odometer: "ui.odometer",
  },
  ID3F5VCFRONT_lighting: {
    VCFRONT_DRLLeftStatus: "lights.DRLLeft",
    VCFRONT_DRLRightStatus: "lights.DRLRight",
    VCFRONT_fogLeftStatus: "lights.fogLeft",
    VCFRONT_fogRightStatus: "lights.fogRight",
    VCFRONT_highBeamLeftStatus: "lights.highBeamLeft",
    VCFRONT_highBeamRightStatus: "lights.highBeamRight",
    VCFRONT_indicatorLeftRequest: "lights.indicatorLeftRequest",
    VCFRONT_indicatorRightRequest: "lights.indicatorRightRequest",
    VCFRONT_lowBeamLeftStatus: "lights.lowBeamLeft",
    VCFRONT_lowBeamRightStatus: "lights.lowBeamRight",
    VCFRONT_parkLeftStatus: "lights.parkLeft",
    VCFRONT_parkRightStatus: "lights.parkRight",
    VCFRONT_sideMarkersStatus: "lights.sideMarkers",
    VCFRONT_sideRepeaterLeftStatus: "lights.sideRepeaterLeft",
    VCFRONT_sideRepeaterRightStatus: "lights.sideRepeaterRight",
    VCFRONT_turnSignalLeftStatus: "lights.turnSignalLeft",
    VCFRONT_turnSignalRightStatus: "lights.turnSignalRight",
  },
  ID528UnixTime: {
    UnixTimeSeconds528: "unixTime_s",
  },
  ID7FFcarConfig: {
    GTW_exteriorColor: "gtw.exteriorColor",
    GTW_spoilerType: "gtw.spoilerType",
  },
};

const msgCache = {};

const app = express();

app.get("/", (req, res) => {
  res.send("IPM3: An instrument panel for the Tesla Model 3.");
});

const server = http.createServer(app);
const wss = new ws.Server({ server });

wss.on("connection", (client) => {
  Object.entries(msgCache).forEach(([key, val]) => {
    client.send(JSON.stringify({ key, val }));
  });
});

const broadcastMessage = (key, val) => {
  wss.clients.forEach((client) =>
    client.send(
      JSON.stringify({
        key,
        val,
      })
    )
  );
};

const onChangeListener = (key) => (s) => {
  console.log(Date.now() / 1000, key, s.value);
  msgCache[key] = s.value;
  broadcastMessage(key, s.value);
};

Object.entries(messages).forEach(([message, signals]) => {
  Object.entries(signals).forEach(([signal, key]) => {
    db.messages[message].signals[signal].onChange(onChangeListener(key));
  });
});

channel.start();

server.listen(process.env.PORT || 3001, () => {
  console.log(
    `Example app listening at http://localhost:${server.address().port}`
  );
});
