const socketcan = require("socketcan");

const express = require("express");
const http = require("http");
const ws = require("ws");

const network = socketcan.parseNetworkDescription("Model3CAN.kcd");
const channel = socketcan.createRawChannel("can0");
const db = new socketcan.DatabaseService(channel, network.buses["Model3CAN"]);

const messages = {
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
  ID145ESP_status: {
    ESP_absFaultLamp: "esp.absFaultLamp",
    ESP_ebdFaultLamp: "esp.ebdFaultLamp",
    ESP_espFaultLamp: "esp.espFaultLamp",
    ESP_espLampFlash: "esp.espLampFlash",
  },
  ID257UIspeed: {
    UIspeedUnits257: "ui.speedUnits",
    UIspeed_abs257: "ui.speed",
  },
  ID25DCP_status: {
    CP_chargeCableState: "chargePort.chargeCableState",
    CP_chargeDoorOpen: "chargePort.chargeDoorOpen",
  },
  ID266RearInverterPower: {
    RearPowerLimit266: "power.rearLimit_kW",
    RearHeatPower266: "power.rearHeat_kW",
    RearPower266: "power.rear_kW",
  },
  ID268SystemPower: {
    SystemRegenPowerMax268: "power.systemRegenMax_kW",
    SystemHeatPowerMax268: "power.systemHeatMax_kW",
    SystemHeatPower268: "power.systemHeat_kW",
    SystemDrivePowerMax268: "power.systemDriveMax_kW",
  },
  ID2B6DI_chassisControlStatus: {
    DI_tcTelltaleOn: "di.tcTelltaleOn",
    DI_tcTelltaleFlash: "di.tcTelltaleFlash",
    DI_vdcTelltaleOn: "di.vdcTelltaleOn",
    DI_vdcTelltaleFlash: "di.vdcTelltaleFlash",
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
    FrontHeatPower2E5: "power.frontHeat_kW",
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
  ID321VCFRONT_sensors: {
    VCFRONT_tempAmbientFiltered: "sensors.tempAmbientFiltered_C",
  },
  ID334UI_powertrainControl: {
    UI_systemPowerLimit: "ui.systemPowerLimit_kW",
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
    UI_gpsVehicleHeading: "gps.vehicleHeading",
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

Object.entries(messages).forEach(([message, signals]) => {
  Object.entries(signals).forEach(([signal, key]) => {
    db.messages[message].signals[signal].onUpdate((s) => {
      console.log(key, s.value);
      wss.clients.forEach((client) =>
        client.send(
          JSON.stringify({
            key,
            val: s.value,
          })
        )
      );
    });
  });
});

channel.start();

const app = express();

app.get("/", (req, res) => {
  res.send("IPM3: An instrument panel for the Tesla Model 3.");
});

const server = http.createServer(app);
const wss = new ws.Server({ server });

// wss.on("connection", (ws) => ws.send("IPM3"));

server.listen(process.env.PORT || 3001, () => {
  console.log(
    `Example app listening at http://localhost:${server.address().port}`
  );
});
