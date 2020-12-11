export interface HeatingOut {
  name: string,
  temperature: number,
  isOn: boolean,
  location: string,
}

export interface Heating extends HeatingOut {
  id: string
}

export function defaultHeating(): HeatingOut {
  return {
    "name": "Default Heating",
    "temperature": 19,
    "isOn": true,
    "location": "Upstairs"
  }
}

export interface HeatingPartial {
  name?: string,
  temperature?: number,
  isOn?: boolean,
  location?: string,
}

export function heatingToPartial(heating: Heating): HeatingOut {
  return {
    name: heating.name,
    temperature: heating.temperature,
    isOn: heating.isOn,
    location: heating.location,
  }
}
