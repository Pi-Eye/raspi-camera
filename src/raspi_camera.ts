import fs from "fs";
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

  private config_file_loc_: string;

  constructor(config_file_loc: string) {
    this.ReadConfigFile(config_file_loc);
    this.CreateCamera();
  }

  /**
   * SetCameraSettings() - Sets new camera settings and restarts camera
   * @param settings new settings to set
   */
  SetCameraSettings(settings: StreamOptions & SPTypes.RequiredSettings) {
    try {
      fs.writeFileSync(this.config_file_loc_, JSON.stringify(settings));
    } catch (error) {
      console.warn(`Error writing new camera settings. Error: ${error}`);
      return;
    }
    this.Stop();
    this.ReadConfigFile(this.config_file_loc_);
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

  /**
   * ReadConfigFile() - Reads JSON config file and sets this.options_
   * @param config_file_loc location of file
   */
  private ReadConfigFile(config_file_loc: string) {
    this.config_file_loc_ = config_file_loc;
    const file = fs.readFileSync(config_file_loc);
    const options = JSON.parse(file.toString());
    this.options_ = Object.assign(DefaultSettings, options);
  }
}