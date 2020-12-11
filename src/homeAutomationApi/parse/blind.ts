import { createListParser } from "@/api/parse"
import { mustBeExGen } from "@/api/util"
import { Blind, BlindPartial, BlindLocation } from "../model/blind"


export function parseBlind(sBlind: any): Blind {
    const mustBeEx = mustBeExGen('Blind')
    const {
        id, is_up: isUp, location: sLocation
    } = sBlind
    if (typeof id !== "number") throw mustBeEx("id", "a number")
    if (typeof isUp !== "boolean") throw mustBeEx("isUp", "a boolean")

    const blindLocations = Object.keys(BlindLocation)
    if (typeof sLocation !== "string") throw mustBeEx("type", "a string")
    const locationStr = sLocation.toUpperCase()
    if (!blindLocations.includes(locationStr)) throw mustBeEx("type", `one of ${blindLocations}`)
    const location = BlindLocation[locationStr as keyof typeof BlindLocation]

    return {
      id: id.toString(), isUp, location
    }
}

export const parseBlinds = createListParser("blinds", parseBlind)

export function serializeBlind(blind: BlindPartial) {
    const sBlind = {} as any
    if (blind.isUp !== undefined) sBlind["is_up"] = blind.isUp
    if (blind.location !== undefined) sBlind["location"] = BlindLocation[blind.location]
    return sBlind
}
