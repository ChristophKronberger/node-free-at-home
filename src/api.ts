/**
 * free@home API
 * v1
 * DO NOT MODIFY - This file has been generated using oazapfts.
 * See https://www.npmjs.com/package/oazapfts
 */
 import * as Oazapfts from "@busch-jaeger/oazapfts_runtime/lib/runtime";
 import * as QS from "@busch-jaeger/oazapfts_runtime/lib/runtime/query";
export const defaults: Oazapfts.RequestOpts = {
    baseUrl: "https://192.168.2.1/fhapi/v1",
};
const oazapfts = Oazapfts.runtime(defaults);
export const servers = {
    server1: ({ hostname = "192.168.2.1" }: {
        hostname: string | number | boolean;
    }) => `https://${hostname}/fhapi/v1`
};
export type InOutPut = {
    pairingID?: number;
    value?: string;
};
export type Channel = {
    displayName?: string;
    functionID?: string;
    room?: string;
    floor?: string;
    inputs?: {
        [key: string]: InOutPut;
    };
    outputs?: {
        [key: string]: InOutPut;
    };
    parameters?: {
        [key: string]: string;
    };
    "type"?: string;
};
export type Device = {
    displayName?: string;
    room?: string;
    floor?: string;
    "interface"?: string;
    nativeId?: string;
    channels?: {
        [key: string]: Channel;
    };
    parameters?: {
        [key: string]: string;
    };
};
export type Devices = {
    [key: string]: Device;
};
export type Rooms = {
    [key: string]: {
        name?: string;
    };
};
export type Floors = {
    [key: string]: {
        name?: string;
        rooms?: Rooms;
    };
};
export type Users = {
    [key: string]: {
        enabled?: boolean;
        flags?: string[];
        grantedPermissions?: string[];
        jid?: string;
        name?: string;
        requestedPermissions?: string[];
        role?: string;
    };
};
export type Error = {
    code?: string;
    detail?: string;
    title?: string;
} | null;
export type SysAp = {
    devices?: Devices;
    floorplan?: {
        floors?: Floors;
    };
    sysapName?: string;
    users?: Users;
    error?: Error;
};
export type Configuration = {
    [key: string]: SysAp;
};
export type Devicelist = {
    [key: string]: string[];
};
export type SysapUuid = string;
export type DeviceSerial = string;
export type ApiRestDeviceSysapDeviceGet200ApplicationJsonResponse = {
    [key: string]: {
        devices?: Devices;
    };
};
export type ApiRestDeviceSysapSerialPatchRequest = {
    displayName?: string;
};
export type ChannelSerial = string;
export type DatapointSerial = string;
export type ApiRestDatapointSysapSerialGet200ApplicationJsonResponse = {
    [key: string]: {
        values?: string[];
    };
};
export type ApiRestDatapointSysapSerialPut200TextPlainResponse = object;
export type AuxilaryDataId = number;
export type ApiRestAuxiliarydata = string[];
export type ScenesTriggered = {
    [key: string]: {
        channels: {
            [key: string]: {
                outputs: {
                    [key: string]: {
                        value: string;
                        pairingID: number;
                    };
                };
            };
        };
    };
};
export type WebsocketMessage = {
    [key: string]: {
        datapoints: {
            [key: string]: string;
        };
        devices: {
            [key: string]: Devices;
        };
        devicesAdded: string[];
        devicesRemoved: string[];
        scenesTriggered: ScenesTriggered;
        parameters?: {
            [key: string]: string;
        };
    };
};
export type NativeSerial = string;
export type VirtualDeviceType = "BinarySensor" |
    "BlindActuator" |
    "SwitchingActuator" |
    "CeilingFanActuator" |
    "RTC" |
    "DimActuator" |
    "evcharging" |
    "WindowSensor" |
    "simple_doorlock" |
    "ShutterActuator" |
    "WeatherStation" |
    "Weather-TemperatureSensor" |
    "Weather-WindSensor" |
    "Weather-BrightnessSensor" |
    "Weather-RainSensor" |
    "WindowActuator" |
    "CODetector" |
    "FireDetector" |
    "KNX-SwitchSensor" |
    "MediaPlayer" |
    "EnergyBattery" |
    "EnergyInverter" |
    "EnergyMeter" |
    "EnergyInverterBattery" |
    "EnergyInverterMeter" |
    "EnergyInverterMeterBattery" |
    "EnergyMeterBattery" |
    "AirQualityCO2" |
    "AirQualityCO" |
    "AirQualityFull" |
    "AirQualityHumidity" |
    "AirQualityNO2" |
    "AirQualityO3" |
    "AirQualityPM10" |
    "AirQualityPM25" |
    "AirQualityPressure" |
    "AirQualityTemperature" |
    "AirQualityVOC" |
    "EnergyMeterv2" |
    "HomeAppliance-Laundry" |
    "HVAC" |
    "SplitUnit";
export type VirtualDevice = {
    "type": VirtualDeviceType;
    properties?: {
        ttl?: string;
        displayname?: string;
        flavor?: string;
        capabilities?: number[];
    };
};
export type VirtualDevicesSuccess = {
    [key: string]: {
        devices?: {
            [key: string]: {
                serial?: string;
            };
        };
    };
};
export type NotificationContentEntry = {
    title?: string;
    body?: string;
};
export type Notification = {
    formatVersion: number;
    topicId: string;
    timeoutMinutes: number;
    displayHints?: ("styleInfo" | "styleWarn" | "styleAlert" | "modal" | "fixed" | "hideIfAnswered")[];
    retention: number;
    terminals: ("ui" | "panel" | "push-notification")[];
	subjectResource?: string;
	senderResource?: string;
	auxId?: string;
    content: {
        utf8?: {
            en?: NotificationContentEntry;
            es?: NotificationContentEntry;
            fr?: NotificationContentEntry;
            it?: NotificationContentEntry;
            nl?: NotificationContentEntry;
            de?: NotificationContentEntry;
            zh?: NotificationContentEntry;
            da?: NotificationContentEntry;
            fi?: NotificationContentEntry;
            nb?: NotificationContentEntry;
            pl?: NotificationContentEntry;
            pt?: NotificationContentEntry;
            ru?: NotificationContentEntry;
            sv?: NotificationContentEntry;
            el?: NotificationContentEntry;
            cs?: NotificationContentEntry;
            tr?: NotificationContentEntry;
        };
    };
};
export type DeviceClass = "doorring" | "pushbutton" | "smokedetector" | "temperaturesensor";
/**
 * Get configuration
 */
export function getconfiguration(opts?: Oazapfts.RequestOpts) {
    return oazapfts.fetchJson<{
        status: 200;
        data: Configuration;
    } | {
        status: 401;
        data: string;
    } | {
        status: 502;
        data: string;
    }>("/api/rest/configuration", {
        ...opts
    });
}
/**
 * Get devicelist
 */
export function getdevicelist(opts?: Oazapfts.RequestOpts) {
    return oazapfts.fetchJson<{
        status: 200;
        data: Devicelist;
    } | {
        status: 401;
        data: string;
    } | {
        status: 502;
        data: string;
    }>("/api/rest/devicelist", {
        ...opts
    });
}
/**
 * Get device
 */
export function getdevice(sysap: SysapUuid, device: DeviceSerial, opts?: Oazapfts.RequestOpts) {
    return oazapfts.fetchJson<{
        status: 200;
        data: ApiRestDeviceSysapDeviceGet200ApplicationJsonResponse;
    } | {
        status: 401;
        data: string;
    } | {
        status: 404;
        data: string;
    } | {
        status: 502;
        data: string;
    }>(`/api/rest/device/${sysap}/${device}`, {
        ...opts
    });
}
/**
 * Modify device properties
 */
export function patchDevice(sysap: SysapUuid, device: DeviceSerial, apiRestDeviceSysapSerialPatchRequest: ApiRestDeviceSysapSerialPatchRequest, opts?: Oazapfts.RequestOpts) {
    return oazapfts.fetchJson<{
        status: 200;
        data: ApiRestDeviceSysapDeviceGet200ApplicationJsonResponse;
    } | {
        status: 401;
        data: string;
    } | {
        status: 502;
        data: string;
    }>(`/api/rest/device/${sysap}/${device}`, oazapfts.json({
        ...opts,
        method: "POST",
        body: apiRestDeviceSysapSerialPatchRequest
    }));
}
/**
 * Get datapoint value
 */
export function getdatapoint(sysap: SysapUuid, device: DeviceSerial, channel: ChannelSerial, datapoint: DatapointSerial, opts?: Oazapfts.RequestOpts) {
    return oazapfts.fetchJson<{
        status: 200;
        data: ApiRestDatapointSysapSerialGet200ApplicationJsonResponse;
    } | {
        status: 401;
        data: string;
    }>(`/api/rest/datapoint/${sysap}/${device}.${channel}.${datapoint}`, {
        ...opts
    });
}
/**
 * Set datapoint value
 */
export function putdatapoint(sysap: SysapUuid, device: DeviceSerial, channel: ChannelSerial, datapoint: DatapointSerial, body?: string, opts?: Oazapfts.RequestOpts) {
    return oazapfts.fetchJson<{
        status: 200;
        data: ApiRestDatapointSysapSerialPut200TextPlainResponse;
    } | {
        status: 401;
        data: string;
    } | {
        status: 502;
        data: string;
    }>(`/api/rest/datapoint/${sysap}/${device}.${channel}.${datapoint}`, {
        ...opts,
        method: "PUT",
        body
    });
}
/**
 * Set auxiliary data for a channel
 */
export function putAuxiliaryData(sysap: SysapUuid, device: DeviceSerial, channel: ChannelSerial, index: AuxilaryDataId, apiRestAuxiliarydata: ApiRestAuxiliarydata, opts?: Oazapfts.RequestOpts) {
    return oazapfts.fetchText(`/api/rest/auxiliarydata/${sysap}/${device}/${channel}/${index}`, oazapfts.json({
        ...opts,
        method: "PUT",
        body: apiRestAuxiliarydata
    }));
}
/**
 * Websocket connection
 */
export function ws(opts?: Oazapfts.RequestOpts) {
    return oazapfts.fetchJson<{
        status: 101;
    } | {
        status: 401;
        data: string;
    } | {
        status: 418;
        data: WebsocketMessage;
    }>("/api/ws", {
        ...opts
    });
}
/**
 * Create virtual device
 */
export function putApiRestVirtualdeviceBySysapAndSerial(sysap: SysapUuid, serial: NativeSerial, virtualDevice: VirtualDevice, opts?: Oazapfts.RequestOpts) {
    return oazapfts.fetchJson<{
        status: 200;
        data: VirtualDevicesSuccess;
    } | {
        status: 400;
        data: string;
    } | {
        status: 401;
        data: string;
    } | {
        status: 502;
        data: string;
    }>(`/api/rest/virtualdevice/${sysap}/${serial}`, oazapfts.json({
        ...opts,
        method: "PUT",
        body: virtualDevice
    }));
}
/**
 * Post a notification
 */
export function postnotification(notification: Notification, opts?: Oazapfts.RequestOpts) {
    return oazapfts.fetchJson<{
        status: 200;
        data: object;
    } | {
        status: 401;
        data: string;
    } | {
        status: 502;
        data: string;
    }>("/api/rest/notification", oazapfts.json({
        ...opts,
        method: "POST",
        body: notification
    }));
}
/**
 * Trigger proxy device
 */
export function proxydevice(sysap: SysapUuid, deviceClass: DeviceClass, device: NativeSerial, action: "shortpress" | "doublepress", opts?: Oazapfts.RequestOpts) {
    return oazapfts.fetchJson<{
        status: 200;
        data: ApiRestDeviceSysapDeviceGet200ApplicationJsonResponse;
    } | {
        status: 401;
        data: string;
    } | {
        status: 502;
        data: string;
    }>(`/api/rest/proxydevice/${sysap}/${deviceClass}/${device}/action/${action}`, {
        ...opts
    });
}
/**
 * Set proxy device value
 */
export function proxydeviceValue(sysap: SysapUuid, deviceClass: DeviceClass, device: NativeSerial, value: "temperature" | "alarm", opts?: Oazapfts.RequestOpts) {
    return oazapfts.fetchJson<{
        status: 200;
        data: ApiRestDeviceSysapDeviceGet200ApplicationJsonResponse;
    } | {
        status: 401;
        data: string;
    } | {
        status: 502;
        data: string;
    }>(`/api/rest/proxydevice/${sysap}/${deviceClass}/${device}/value/${value}`, {
        ...opts,
        method: "PUT"
    });
}
