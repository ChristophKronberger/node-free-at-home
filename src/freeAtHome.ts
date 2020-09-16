import { EventEmitter } from 'events';
import { FreeAtHomeApi, VirtualDeviceType, Datapoint, Parameter } from './freeAtHomeApi';

import { BlindActuatorChannel } from './channels/blindActuatorChannel';
import { DimActuatorChannel } from './channels/dimActuatorChannel'
import { WindowActuatorChannel } from './channels/windowActuatorChannel';
import { SwitchingActuatorChannel } from './channels/switchingActuatorChannel';
import { RawChannel } from './channels/rawChannel';

import { WeatherBrightnessSensorChannel } from './channels/weatherBrightnessSensorChannel';
import { WeatherTemperatureSensorChannel } from './channels/weatherTemperatureSensorChannel';
import { WeatherRainSensorChannel } from './channels/weatherRainSensorChannel';
import { WeatherWindSensorChannel } from './channels/weatherWindSensorChannel'
import { WindowSensorChannel } from './channels/windowSensorChannel';
import { SwitchSensorChannel } from './channels/switchSensor';

import { MediaPlayerChannel } from '.'

import { StrictEventEmitter } from 'strict-event-emitter-types';
import { Device } from './api/device';

interface Events {
    open(): void,
    close(reason: string): void,
}

type Emitter = StrictEventEmitter<EventEmitter, Events>;

export class FreeAtHome extends (EventEmitter as { new(): Emitter }) {
    freeAtHomeApi: FreeAtHomeApi;

    constructor(baseUrlIn: string | undefined = undefined) {
        super();

        const baseUrl = baseUrlIn || process.env.FREEATHOME_API_BASE_URL || "http://localhost/fhapi/v1";
        const username: string = process.env.FREEATHOME_API_USERNAME || "installer";
        const password: string = process.env.FREEATHOME_API_PASSWORD || "12345";
        const authenticationHeader = {
            Authorization: 'Basic ' + Buffer.from(username + ':' + password).toString('base64')
        };

        this.freeAtHomeApi = new FreeAtHomeApi(baseUrl, authenticationHeader);

        this.freeAtHomeApi.on('close', this.onClose.bind(this));
        this.freeAtHomeApi.on('open', this.onOpen.bind(this));
    }

    disconnectFreeAtHomeApi() {
        this.freeAtHomeApi.removeAllListeners('close');
        this.freeAtHomeApi.disconnect();
    }

    private onClose(code: number, reason: string) {
        this.emit("close", reason);
    }

    private onOpen() {
        this.emit("open");
    }

    async createBlindDevice(nativeId: string, name: string): Promise<BlindActuatorChannel> {
        const device = await this.freeAtHomeApi.createDevice("BlindActuator", nativeId, name);
        return new BlindActuatorChannel(device, 0);
    }

    async createDimActuatorDevice(nativeId: string, name: string): Promise<DimActuatorChannel> {
        const device = await this.freeAtHomeApi.createDevice("DimActuator", nativeId, name);
        return new DimActuatorChannel(device, 0);
    }

    async createWindowDevice(nativeId: string, name: string): Promise<WindowActuatorChannel> {
        const device = await this.freeAtHomeApi.createDevice("WindowActuator", nativeId, name);
        return new WindowActuatorChannel(device, 0);
    }

    async createSwitchingActuatorDevice(nativeId: string, name: string): Promise<SwitchingActuatorChannel> {
        const device = await this.freeAtHomeApi.createDevice("SwitchingActuator", nativeId, name);
        return new SwitchingActuatorChannel(device, 0);
    }

    async createRawDevice(nativeId: string, name: string, deviceType: VirtualDeviceType): Promise<RawChannel> {
        const device = await this.freeAtHomeApi.createDevice(deviceType, nativeId, name);
        return new RawChannel(device, 0);
    }

    async createWeatherBrightnessSensorDevice(nativeId: string, name: string): Promise<WeatherBrightnessSensorChannel> {
        const device = await this.freeAtHomeApi.createDevice("Weather-BrightnessSensor", nativeId, name);
        return new WeatherBrightnessSensorChannel(device, 0);
    }

    async createWeatherTemperatureSensorDevice(nativeId: string, name: string): Promise<WeatherTemperatureSensorChannel> {
        const device = await this.freeAtHomeApi.createDevice("Weather-TemperatureSensor", nativeId, name);
        return new WeatherTemperatureSensorChannel(device, 0);
    }

    async createWeatherRainSensorDevice(nativeId: string, name: string): Promise<WeatherRainSensorChannel> {
        const device = await this.freeAtHomeApi.createDevice("Weather-RainSensor", nativeId, name);
        return new WeatherRainSensorChannel(device, 0);
    }

    async createWeatherWindSensorDevice(nativeId: string, name: string): Promise<WeatherWindSensorChannel> {
        const device = await this.freeAtHomeApi.createDevice("Weather-WindSensor", nativeId, name);
        return new WeatherWindSensorChannel(device, 0);
    }

    async createWindowSensorDevice(nativeId: string, name: string): Promise<WindowSensorChannel> {
        const device = await this.freeAtHomeApi.createDevice("WindowSensor", nativeId, name);
        return new WindowSensorChannel(device, 0);
    }

    async createSwitchSensorDevice(nativeId: string, name: string): Promise<SwitchSensorChannel> {
        const device = await this.freeAtHomeApi.createDevice("KNX-SwitchSensor", nativeId, name);
        return new SwitchSensorChannel(device, 0);
    }

    async createMediaPlayerDevice(nativeId: string, name: string): Promise<MediaPlayerChannel> {
        const device = await this.freeAtHomeApi.createDevice("MediaPlayer", nativeId, name);
        return new MediaPlayerChannel(device, 0);
    }

    public async getAllDevices() : Promise<IterableIterator<Device>> {
        return this.freeAtHomeApi.getAllDevices();
    }
}
