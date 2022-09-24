import { StreamOptions, Flip, SensorMode, Codec, ExposureMode, AwbMode } from "pi-camera-connect";
import { SPTypes, SPEnums } from "node-stream-processor-types";

export const DefaultSettings: StreamOptions & SPTypes.RequiredSettings = {
  width: 640,
  height: 480,
  rotation: 0,
  flip: Flip.None,
  bitRate: 17000000,
  fps: 30,
  codec: Codec.MJPEG,
  sensorMode: SensorMode.AutoSelect,
  shutter: null,
  sharpness: 0,
  contrast: 0,
  brightness: 100,
  saturation: 0,
  iso: null,
  exposureCompensation: 0,
  exposureMode: ExposureMode.Auto,
  awbMode: AwbMode.Auto,
  analogGain: 0,
  digitalGain: 0,
  quality: 75,
  format: SPEnums.Format.kRGB
};
