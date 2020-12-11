import { createListParser } from "@/api/parse"
import { mustBeExGen } from "@/api/util"
import { Heating, HeatingPartial } from "../model/heating"


export function parseHeating(sHeating: any): Heating {
    const mustBeEx = mustBeExGen('Heating')
    const { id, name, temperature, is_on: isOn, location }  = sHeating
    if (typeof id !== "number") throw mustBeEx("id", "a number")
    if (typeof name !== "string") throw mustBeEx("name", "a string")
    if (typeof temperature !== "number") throw mustBeEx("temperature", "a number")
    if (typeof isOn !== "boolean") throw mustBeEx("isOn", "a boolean")
    if (typeof location !== "string") throw mustBeEx("location", "a string")
    return { id: id.toString(), name, temperature, isOn, location }
}

export const parseHeatings = createListParser("heatings", parseHeating)

export function serializeHeating(heating: HeatingPartial) {
    const sHeating = {} as any
    if (heating.name !== undefined) sHeating["name"] = heating.name
    if (heating.temperature !== undefined) sHeating["temperature"] = heating.temperature
    if (heating.isOn !== undefined) sHeating["is_on"] = heating.isOn
    if (heating.location !== undefined) sHeating["location"] = heating.location
    return sHeating
}
