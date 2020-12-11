import { createListParser } from "@/api/parse"
import { mustBeExGen } from "@/api/util"
import { Camera, CameraPartial } from "../model/camera"


export function parseCamera(sCamera: any): Camera {
    const mustBeEx = mustBeExGen('Camera')
    const { id, name, level, status, angle }  = sCamera
    if (typeof id !== "number") throw mustBeEx("id", "a number")
    if (typeof name !== "string") throw mustBeEx("name", "a string")
    if (typeof level !== "number") throw mustBeEx("level", "a number")
    if (typeof status !== "boolean") throw mustBeEx("status", "a boolean")
    if (typeof angle !== "number") throw mustBeEx("angle", "a number")
    return { id: id.toString(), name, level, status, angle }
}

export const parseCameras = createListParser("cameras", parseCamera)

export function serializeCamera(camera: CameraPartial) {
    const sCamera = {} as any
    if (camera.name !== undefined) sCamera["name"] = camera.name
    if (camera.level !== undefined) sCamera["level"] = camera.level
    if (camera.status !== undefined) sCamera["status"] = camera.status
    if (camera.angle !== undefined) sCamera["angle"] = camera.angle
    return sCamera
}
