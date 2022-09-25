"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.DefaultSettings = void 0;
const pi_camera_connect_1 = require("pi-camera-connect");
const node_stream_processor_types_1 = require("node-stream-processor-types");
exports.DefaultSettings = {
    width: 640,
    height: 480,
    rotation: 0,
    flip: pi_camera_connect_1.Flip.None,
    bitRate: 17000000,
    fps: 30,
    codec: pi_camera_connect_1.Codec.MJPEG,
    sensorMode: pi_camera_connect_1.SensorMode.AutoSelect,
    shutter: null,
    sharpness: 0,
    contrast: 0,
    brightness: 100,
    saturation: 0,
    iso: null,
    exposureCompensation: 0,
    exposureMode: pi_camera_connect_1.ExposureMode.Auto,
    awbMode: pi_camera_connect_1.AwbMode.Auto,
    analogGain: 0,
    digitalGain: 0,
    quality: 75,
    format: node_stream_processor_types_1.SPEnums.Format.kRGB
};
//# sourceMappingURL=camera_defaults.js.map