export interface CameraOut {
  name: string,
  level: number,
  status: boolean,
  angle: number,
}

export interface Camera extends CameraOut {
  id: string,
}

export function defaultCamera(): CameraOut {
  return {
    "name": "Default Camera",
    "level": 0,
    "status": true,
    "angle": 24.0
  }
}

export interface CameraPartial {
  name?: string,
  level?: number,
  status?: boolean,
  angle?: number,
}

export function cameraToPartial(camera: Camera): CameraOut {
  return {
    name: camera.name,
    level: camera.level,
    status: camera.status,
    angle: camera.angle,
  }
}
