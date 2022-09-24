import CameraInterface, { AllSettings, CameraEvents } from "camera-interface";
import { EventEmitter } from "stream";
import TypedEventEmitter from "typed-emitter";

class RaspiCamera implements CameraInterface {
  private events_ = new EventEmitter as TypedEventEmitter<CameraEvents>
  get events() { return this.events_; }

  private all_settings_: AllSettings;

  constructor(config_file_loc: string) {
    //
  }

  SetCombinedSettings(settings: AllSettings): void {
    // 
  }
  GetCombinedSettings(): AllSettings { return this.all_settings_; }
}