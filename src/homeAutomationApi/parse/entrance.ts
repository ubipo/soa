import { createListParser } from "@/api/parse"
import { mustBeExGen, mustBeStringOrNotDefinedExGen, makeNullOrFun, boolOrThrow } from "@/api/util"
import { Entrance, EntrancePartial, EntranceType } from "../model/entrance"


export function parseEntrance(sEntrance: any): Entrance {
    const mustBeEx = mustBeExGen('Entrance')
    const mustBeStringOrNotDefinedEx = mustBeStringOrNotDefinedExGen('Entrance')
    const {
        uuid, slug, name, type: sType, locked: sLocked, open: sOpen
    } = sEntrance
    if (typeof uuid !== "string") throw mustBeEx("uuid", "a string")
    if (typeof slug !== "string") throw mustBeEx("slug", "a string")
    if (typeof name !== "string") throw mustBeEx("name", "a string")

    const entranceTypes = Object.keys(EntranceType)
    if (typeof sType !== "string") throw mustBeEx("type", "a string")
    const typeStr = sType.toUpperCase()
    if (!entranceTypes.includes(typeStr)) throw mustBeEx("type", `one of ${entranceTypes}`)
    const type = EntranceType[typeStr as keyof typeof EntranceType]

    const open = makeNullOrFun(
        sOpen,
        v => boolOrThrow(v, mustBeStringOrNotDefinedEx('open'))
      )

    const locked = makeNullOrFun(
        sLocked,
        v => boolOrThrow(v, mustBeStringOrNotDefinedEx('locked'))
    )
    
    return {
        uuid, slug, name, type, open, locked
    }
}

export const parseEntrances = createListParser("entrances", parseEntrance)

export function serializeEntrance(entrance: EntrancePartial) {
    const sEntrance = {} as any
    if (entrance.name !== undefined) sEntrance["name"] = entrance.name
    if (entrance.type !== undefined) sEntrance["type"] = EntranceType[entrance.type]
    if (entrance.open !== undefined) sEntrance["open"] = entrance.open
    if (entrance.locked !== undefined) sEntrance["locked"] = entrance.locked
    return sEntrance
}
