"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const pi_camera_connect_1 = require("pi-camera-connect");
const events_1 = require("events");
const camera_defaults_1 = require("./camera_defaults");
class RaspiCamera {
    constructor(settings) {
        this.events_ = new events_1.EventEmitter;
        this.options_ = Object.assign(camera_defaults_1.DefaultSettings, settings);
        this.CreateCamera();
    }
    get events() { return this.events_; }
    /**
     * SetCameraSettings() - Sets new camera settings and restarts camera
     * @param settings new settings to set
     */
    SetCameraSettings(settings) {
        this.Stop();
        this.options_ = Object.assign(camera_defaults_1.DefaultSettings, settings);
        this.CreateCamera();
    }
    /**
     * Stop() - Stops camera
     */
    Stop() { this.camera_.stopCapture(); }
    /**
     * CreateCamera() - Creates camera with given settings and emits frame event when frame is recieved
     */
    CreateCamera() {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                this.camera_ = new pi_camera_connect_1.StreamCamera(this.options_);
                yield this.camera_.startCapture();
                this.camera_.on("frame", (frame) => this.events_.emit("frame", frame, Date.now()));
            }
            catch (error) {
                console.error(`Error creating camera, switching to defaults. Error: ${error}`);
                throw error;
            }
        });
    }
}
exports.default = RaspiCamera;
//# sourceMappingURL=raspi_camera.js.map