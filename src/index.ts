export { FreeAtHome } from './freeAtHome';
export { FreeAtHomeApi, VirtualDeviceType, Datapoint, Parameter } from './freeAtHomeApi';
export { NodeState } from './freeAtHomeDeviceInterface';

export { Channel } from './channel'

export { BlindActuatorChannel as FreeAtHomeBlindActuatorChannel } from './virtualChannels/blindActuatorChannel';
export { DimActuatorChannel as FreeAtHomeDimActuatorChannel } from './virtualChannels/dimActuatorChannel'
export { WindowActuatorChannel as FreeAtHomeWindowActuatorChannel } from './virtualChannels/windowActuatorChannel';
export { SwitchingActuatorChannel as FreeAtHomeOnOffChannel } from './virtualChannels/switchingActuatorChannel';
export { RawChannel as FreeAtHomeRawChannel } from './virtualChannels/rawChannel';

export { WeatherBrightnessSensorChannel as FreeAtHomeWeatherBrightnessSensorChannel } from './virtualChannels/weatherBrightnessSensorChannel';
export { WeatherTemperatureSensorChannel as FreeAtHomeWeatherTemperatureSensorChannel } from './virtualChannels/weatherTemperatureSensorChannel';
export { WeatherRainSensorChannel as freeAtHomeWeatherRainSensorChannel } from './virtualChannels/weatherRainSensorChannel';
export { WeatherWindSensorChannel as FreeAtHomeWeatherWindSensorChannel } from './virtualChannels/weatherWindSensorChannel'
export { WindowSensorChannel as FreeAtHomeWindowSensorChannel } from './virtualChannels/windowSensorChannel';
export { SwitchSensorChannel as FreeAtHomeSwitchSensorChannel } from './virtualChannels/switchSensor';

export { WeatherStationChannels } from './freeAtHome';

export { MediaPlayerChannel } from './virtualChannels/mediaPlayerChannel';

export { EnergyBatteryChannel } from './virtualChannels/energyBatteryChannel';
export { EnergyInverterChannel } from './virtualChannels/energyInverterChannel';
export { EnergyMeterChannel } from './virtualChannels/energyMeterChannel';

export { AirCO2Channel } from './virtualChannels/airCO2Channel';
export { AirCOChannel } from './virtualChannels/airCOChannel';
export { AirHumidityChannel } from './virtualChannels/airHumidityChannel';
export { AirNO2Channel } from './virtualChannels/airNO2Channel';
export { AirO3Channel } from './virtualChannels/airO3Channel';
export { AirPM10Channel } from './virtualChannels/airPM10Channel';
export { AirPM25Channel } from './virtualChannels/airPM25Channel';
export { AirPressureChannel } from './virtualChannels/airPressureChannel';
export { AirTemperatureChannel } from './virtualChannels/airTemperatureChannel';
export { AirVOCChannel } from './virtualChannels/airVOCChannel';
export { EvChargerChannel } from './virtualChannels/evCharger';
export { BinarySensorChannel } from './virtualChannels/binarySensorChannel'

export { EnergyTwoWayMeterV2Channel } from './virtualChannels/energyTwoWayMeterV2Channel';
export { EnergyOneWayMeterV2Channel } from './virtualChannels/energyOneWayMeterV2Channel';
export { EnergyInverterV2Channel } from './virtualChannels/energyInverterV2Channel';
export { EnergyBatteryV2Channel } from './virtualChannels/energyBatteryV2Channel';
export { HVACChannel } from './virtualChannels/hvacChannel';
export { HVAC2Channel } from './virtualChannels/hvac2Channel';

export { WaterMeterChannel } from './virtualChannels/waterMeterChannel';
export { GasMeterChannel } from './virtualChannels/gasMeterChannel';

export { EnergyMeterBatteryChannels } from './freeAtHome';
export { EnergyInverterMeterBatteryChannels } from './freeAtHome';
export { EnergyInverterMeterChannels } from './freeAtHome';

export { AirQualityKaiterraChannels } from './freeAtHome';

export { CeilingFanChannel } from './virtualChannels/ceilingFanChannel';


export { ApiVirtualChannel } from "./api/apiVirtualChannel";

export { ParameterIds } from './parameterIds';
export { PairingIds } from './pairingIds';
export { FunctionIds } from './functionIds';
export { Capabilities } from './capabilities';

export { ApiDevice } from './api/apiDevice';
export { ApiChannel } from './api/apiChannel';

export * as Utilities from './virtualChannels/utilities/colorSpaceConversion';

/**
 * @deprecated use AddOn instead
 */
export * as ScriptingHost from './addon'
export * as AddOn from  './addon'

export * as ScriptingAPI from './scriptingApi'

export * as RPC from "./rpcWebsocket";

export * as Serial from "./serialWebsocket";
