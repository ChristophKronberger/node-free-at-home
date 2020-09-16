import { EventEmitter } from 'events';
import StrictEventEmitter from 'strict-event-emitter-types';
import WebSocket from 'ws';
import * as api from "./api";
import nodeFetch from "node-fetch";

import { PairingIds } from "./pairingIds";
import { ParameterIds } from "./parameterIds";
import { VirtualDevice } from './api/virtualDevice';
import { Device } from './api/device';

export { PairingIds, ParameterIds };

export interface Datapoint {
    pairingId: PairingIds,
    value: string
}

export interface Parameter {
    parameterId: ParameterIds,
    value: string
}


export interface IndexedDatapoint {
    index: number,
    value: string
}

export { VirtualDeviceType } from './api';

export enum ConnectionStates {
    connecting,
    open,
    closing,
    closed,
    unknown,
}

interface Events {
    open: FreeAtHomeApi,
    close: (code: number, reason: string) => void,
}

// Typed Event emitter: https://github.com/bterlson/strict-event-emitter-types#usage-with-subclasses
type Emitter = StrictEventEmitter<EventEmitter, Events>;

export class FreeAtHomeApi extends (EventEmitter as { new(): Emitter }) {
    websocketBaseUrl: string;
    authenticationHeader: object;
    websocket: WebSocket | undefined = undefined;
    pingTimer: NodeJS.Timeout;

    virtualDevicesBySerial: Map<string, VirtualDevice> = new Map();
    devicesBySerial: Map<string, Device> = new Map();


    constructor(baseUrl: string, authenticationHeader: object = {}) {
        super();

        this.websocketBaseUrl = baseUrl.replace(/^(http)/, "ws");
        this.authenticationHeader = authenticationHeader;

        api.defaults.baseUrl = baseUrl;

        api.defaults.headers = {
            ...authenticationHeader
        };

        api.defaults.fetch = nodeFetch;

        this.connectWebsocket();

        this.pingTimer = setInterval(() => {
            if (this.websocket !== undefined && this.websocket.OPEN == this.websocket.readyState) {
                this.websocket.ping();
            }
        }, 5000);
    }

    private connectWebsocket() {
        try {
            this.websocket = new WebSocket(this.websocketBaseUrl + "/api/ws", {
                rejectUnauthorized: false,
                headers: {
                    ...this.authenticationHeader
                }
            });

            this.websocket.on('open', this.onOpen.bind(this));
            this.websocket.on('close', this.onClose.bind(this));
            this.websocket.on('error', this.onError.bind(this));

            this.websocket.on('message', this.parseWebsocketData.bind(this));
        }
        catch (error) {
            setTimeout(
                () => {
                    console.log("reconnecting...");
                    this.connectWebsocket();
                }, 10000);
        }
    }

    disconnect() {
        clearInterval(this.pingTimer);
        if (undefined !== this.websocket) {
            this.websocket.removeAllListeners('close');
            this.websocket.close();
        }
    }

    getConnectionState(): ConnectionStates {
        if (undefined === this.websocket)
            return ConnectionStates.closed;
        const state = this.websocket.readyState;
        switch (state) {
            case WebSocket.CONNECTING:
                return ConnectionStates.connecting;
            case WebSocket.OPEN:
                return ConnectionStates.open;
            case WebSocket.CLOSING:
                return ConnectionStates.closing;
            case WebSocket.CLOSED:
                return ConnectionStates.closed;
            default:
                return ConnectionStates.unknown;
        }
    }

    private onOpen() {
        this.emit("open", this);
    }

    private onClose(code: number, reason: string) {
        console.log("try to reconnect in 10 seconds...");
        setTimeout(
            () => {
                console.log("reconnecting...");
                this.connectWebsocket();
            }, 10000);
        this.emit('close', code, reason);
    }

    private onError(err: Error) {
        console.error('❌', err.toString())
    }

    end() {
        if (undefined !== this.websocket) {
            this.websocket.removeAllListeners();
            this.websocket.close();
        }
    }

    private parseWebsocketData(data: WebSocket.Data) {
        const dataObject = JSON.parse(data as string);
        for (const sysApId in dataObject) {
            const datapoints = dataObject[sysApId].datapoints;
            for (const element in datapoints) {
                const value = datapoints[element];
                const pathElements = element.split("/");
                const deviceId = pathElements[0];

                const channel = parseInt(pathElements[1].substring(2), 16);

                const dataPointTypeAndIndex = pathElements[2];

                const dataPointTypeString = dataPointTypeAndIndex.substring(0, 3);

                const dataPointIndex = parseInt(dataPointTypeAndIndex.substring(3), 16);

                const datapointObject: IndexedDatapoint = {
                    index: dataPointIndex,
                    value: value,
                }

                const virtualDevice = this.virtualDevicesBySerial.get(deviceId);
                if (undefined !== virtualDevice) {
                    if (dataPointTypeString === "idp")
                        virtualDevice.onInputDatapointChange(channel, datapointObject);
                }

                const device = this.devicesBySerial.get(deviceId);
                if (undefined !== device) {
                    if (dataPointTypeString === "odp")
                        device.onOutputDatapointChange(channel, datapointObject);
                }
            }
        }
    }

    async setOutputDatapoint(serialNumber: string, channel: number, pairingId: number, value: string) {
        const device = this.virtualDevicesBySerial.get(serialNumber);
        if (undefined !== device) {
            const channelString = channel.toString(16).padStart(6, "ch0000");
            const outputPosition = device.outputPairingToPosition.get(pairingId);
            if (undefined === outputPosition)
                return;
            const datapointString = outputPosition.toString(16).padStart(7, "odp0000")

            channelString + "." + datapointString;
            await api.putdatapoint(
                "00000000-0000-0000-0000-000000000000",
                device.serialNumber + "." + channelString + "." + datapointString,
                value
            );
        }
    }

    async setInputDatapoint(serialNumber: string, channel: number, pairingId: number, value: string) {
        const device = this.virtualDevicesBySerial.get(serialNumber);
        if (undefined !== device) {
            const channelString = channel.toString(16).padStart(6, "ch0000");
            const outputPosition = device.outputPairingToPosition.get(pairingId);
            if (undefined === outputPosition)
                return;
            const datapointString = outputPosition.toString(16).padStart(7, "idp0000")

            channelString + "." + datapointString;
            await api.putdatapoint(
                "00000000-0000-0000-0000-000000000000",
                device.serialNumber + "." + channelString + "." + datapointString,
                value
            );
        }
    }

    async setDeviceToUnresponsive(deviceType: api.VirtualDeviceType, nativeId: string) {
        const res = await api.putApiRestVirtualdeviceBySysapAndSerial(
            "00000000-0000-0000-0000-000000000000",
            nativeId,
            {
                type: deviceType,
                properties: {
                    ttl: "0",
                }
            }
        );
    }

    async setDeviceToResponsive(deviceType: api.VirtualDeviceType, nativeId: string) {
        const res = await api.putApiRestVirtualdeviceBySysapAndSerial(
            "00000000-0000-0000-0000-000000000000",
            nativeId,
            {
                type: deviceType,
                properties: {
                    ttl: "180",
                }
            }
        );
    }

    async createDevice(deviceType: api.VirtualDeviceType, nativeId: string, displayName: string): Promise<VirtualDevice> {
        const res = await api.putApiRestVirtualdeviceBySysapAndSerial(
            "00000000-0000-0000-0000-000000000000",
            nativeId,
            {
                type: deviceType,
                properties: {
                    ttl: "180",
                    displayname: displayName
                }
            }
        );
        if (res.status === 200) {
            const dataObject = res.data;
            for (const sysApId in dataObject) {
                const devices = dataObject[sysApId].devices;
                for (const deviceId in devices) {
                    const responseNativeId = devices[deviceId].serial;
                    if (responseNativeId === nativeId) {
                        console.log("Found device: " + deviceId);
                        const deviceRequest = await api.getdevice(
                            "00000000-0000-0000-0000-000000000000",
                            deviceId
                        );
                        if (deviceRequest.status === 200) {
                            const device = deviceRequest.data?.["00000000-0000-0000-0000-000000000000"]?.devices?.[deviceId];
                            if (device !== undefined) {
                                const deviceObject = this.addDevice(deviceId, nativeId, device, deviceType);
                                return deviceObject;
                            }
                            else {
                                throw new Error("device not found in response");
                            }
                        }
                        else {
                            throw new Error("Could not read device from ata model error code: " + res.status);
                        }
                    }
                }
            }
            throw new Error("data in response not found");
        }
        else {
            throw new Error("Could not create virtual device error code: " + res.status);
        }
    }

    private addDevice(deviceId: string, nativeId: string, apiDevice: api.Device, deviceType: api.VirtualDeviceType): VirtualDevice {
        const device = new VirtualDevice(this, apiDevice, deviceId, deviceType);
        this.virtualDevicesBySerial.set(deviceId, device);
        return device;
    }

    public async getAllDevices() : Promise<IterableIterator<Device>> {
        const configurationRequest = await api.getconfiguration();
        if (configurationRequest.status === 200) {
            const configurationObject = configurationRequest.data;
            for (const sysApId in configurationObject) {
                const devices = configurationObject[sysApId].devices;
                for (const deviceId in devices) {
                    if( false == this.devicesBySerial.has(deviceId))
                    {
                        const device = devices[deviceId];
                        const deviceObject = new Device(this, device, deviceId);
                        this.devicesBySerial.set(deviceId, deviceObject);
                    }
                }
            }
        }
        else {  
            throw new Error("Could not read configuration from data model. Error code: " + configurationRequest.status);
        }
        return this.devicesBySerial.values();
    }
}

