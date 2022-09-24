import { should } from "chai";
should();
import fs from "fs";
import path from "path";

import RaspiCamera from "../src/raspi_camera";
import { DefaultSettings } from "../src/camera_defaults";

describe("Raspi Camera", () => {
  it("should stop taking frames when stop is called", (done) => {
    const camera = new RaspiCamera(path.join(__dirname, "..", "..", "test-files", "test_config.json"));
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
    const camera = new RaspiCamera(path.join(__dirname, "..", "..", "test-files", "test_config.json"));
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
    const new_settings = Object.assign({}, DefaultSettings);
    new_settings.width = 1280;
    new_settings.height = 720;

    const camera = new RaspiCamera(path.join(__dirname, "..", "..", "test-files", "test_config.json"));
    camera.events.once("frame", () => {
      const new_settings = Object.assign({}, DefaultSettings);
      new_settings.width = 1280;
      new_settings.height = 720;
      camera.SetCameraSettings(new_settings);

      camera.events.once("frame", () => {
        const saved_settings = fs.readFileSync(path.join(__dirname, "..", "..", "test-files", "test_config.json")).toString();

        saved_settings.should.equal(JSON.stringify(new_settings));

        fs.writeFileSync(path.join(__dirname, "..", "..", "test-files", "test_config.json"), JSON.stringify(DefaultSettings));
        done();
      });
    });
  });
});