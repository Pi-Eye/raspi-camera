import { StreamCamera, StreamOptions } from "pi-camera-connect";
import { SPTypes } from "node-stream-processor-types";
import { EventEmitter } from "events";
import TypedEventEmitter from "typed-emitter";

import { DefaultSettings } from "./camera_defaults";

type RaspiCameraEvents = {
  frame: (frame: Buffer, timestamp: number) => void;
  error: (error: Error) => void;
}

export default class RaspiCamera {
  private events_ = new EventEmitter as TypedEventEmitter<RaspiCameraEvents>;
  get events() { return this.events_; }

  private camera_: StreamCamera;
  private options_: StreamOptions & SPTypes.RequiredSettings;

  constructor(settings: StreamOptions & SPTypes.RequiredSettings) {
    this.options_ = Object.assign(DefaultSettings, settings);
    this.CreateCamera();
  }

  /**
   * SetCameraSettings() - Sets new camera settings and restarts camera
   * @param settings new settings to set
   */
  SetCameraSettings(settings: StreamOptions & SPTypes.RequiredSettings) {
    this.Stop();
    this.options_ = Object.assign(DefaultSettings, settings);
    this.CreateCamera();
  }

  /**
   * Stop() - Stops camera
   */
  Stop() { this.camera_.stopCapture(); }

  /**
   * CreateCamera() - Creates camera with given settings and emits frame event when frame is recieved
   */
  private async CreateCamera() {
    try {
      this.camera_ = new StreamCamera(this.options_);

      await this.camera_.startCapture();

      this.camera_.on("frame", (frame) => this.events_.emit("frame", frame, Date.now()));
    } catch (error) {
      console.error(`Error creating camera, switching to defaults. Error: ${error}`);
      throw error;
    }
  }
}