/// <reference types="node" />
import { StreamOptions } from "pi-camera-connect";
import { SPTypes } from "node-stream-processor-types";
import TypedEventEmitter from "typed-emitter";
declare type RaspiCameraEvents = {
    frame: (frame: Buffer, timestamp: number) => void;
    error: (error: Error) => void;
};
export default class RaspiCamera {
    private events_;
    get events(): TypedEventEmitter<RaspiCameraEvents>;
    private camera_;
    private options_;
    constructor(settings: StreamOptions & SPTypes.RequiredSettings);
    /**
     * SetCameraSettings() - Sets new camera settings and restarts camera
     * @param settings new settings to set
     */
    SetCameraSettings(settings: StreamOptions & SPTypes.RequiredSettings): void;
    /**
     * Stop() - Stops camera
     */
    Stop(): void;
    /**
     * CreateCamera() - Creates camera with given settings and emits frame event when frame is recieved
     */
    private CreateCamera;
}
export {};
