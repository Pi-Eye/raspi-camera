# Raspi Camera

## About

Package for interfacing with raspberry pi camera

### Built With

* NodeJS
* TypeScript
* pi-camera-connect

## Getting Started

### Prerequisites

1. [Node](https://nodejs.org/en/) and npm

### Installation

1. Install NPM package: raspi-config:
    ```sh
    npm install https://github.com/Pi-Eye/raspi-camera
    ```

## Usage

### Example RaspiCamera

```js
import RaspiCamera from "raspi-camera";

const settings = {
  width: 640,
  height: 480,
  rotation: 0,
  bitRate: 17000000,
  fps: 30,
  contrast: 0,
  brightness: 50,
  saturation: 0,
  sharpness: 0,
  exposureCompensation: 0,
  analogGain: 0,
  digitalGain: 0,
}

const camera = new RaspiCamera(settings);

camera.events.on("frame", (frame, timestamp) => {
  // frames and timestamps
});
```

See more settings at https://www.npmjs.com/package/pi-camera-connect

## License

Distributed uner the GPL-3.0 License. See `LICENSE.txt` for more information.

## Contact

Bennett Wu - bwu1324@gmail.com