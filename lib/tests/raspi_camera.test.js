"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const chai_1 = require("chai");
(0, chai_1.should)();
const raspi_camera_1 = __importDefault(require("../src/raspi_camera"));
const camera_defaults_1 = require("../src/camera_defaults");
describe("Raspi Camera", () => {
    it("should stop taking frames when stop is called", (done) => {
        const camera = new raspi_camera_1.default(camera_defaults_1.DefaultSettings);
        camera.events.once("frame", () => {
            camera.Stop();
            camera.events.on("frame", () => {
                done(false);
            });
            setTimeout(() => { done(); }, 1000);
        });
    });
    it("should start taking frames and emit them with timestamps", (done) => {
        const start = Date.now();
        const camera = new raspi_camera_1.default(camera_defaults_1.DefaultSettings);
        camera.events.once("frame", (frame, timestamp) => {
            (start < timestamp).should.be.true;
            (timestamp < Date.now()).should.be.true;
            camera.Stop();
            done();
        });
    });
});
describe("Set New Camera Settings", () => {
    it("should save new settings and restart camera", (done) => {
        const new_settings = Object.assign({}, camera_defaults_1.DefaultSettings);
        new_settings.width = 1280;
        new_settings.height = 720;
        const camera = new raspi_camera_1.default(camera_defaults_1.DefaultSettings);
        camera.events.once("frame", () => {
            const new_settings = Object.assign({}, camera_defaults_1.DefaultSettings);
            new_settings.width = 1280;
            new_settings.height = 720;
            camera.SetCameraSettings(new_settings);
            camera.events.once("frame", () => {
                camera.Stop();
                done();
            });
        });
    });
});
//# sourceMappingURL=raspi_camera.test.js.map