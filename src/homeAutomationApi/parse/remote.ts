import { createListParser } from "@/api/parse"
import { mustBeExGen } from "@/api/util"
import { Remote, RemotePartial } from "../model/remote"
import { parseEntrance } from "./entrance"


export function parseRemote(sRemote: any): Remote {
    const mustBeEx = mustBeExGen('Remote')
    const {
        uuid, slug, entrance: sEntrance
    } = sRemote

    const entrance = parseEntrance(sEntrance)

    if (typeof uuid !== "string") throw mustBeEx("uuid", "a string")
    if (typeof slug !== "string") throw mustBeEx("slug", "a string")

    return {
        uuid, slug, entrance: entrance.uuid
    }
}

export const parseRemotes = createListParser("remotes", parseRemote)

export function serializeRemote(remote: RemotePartial) {
    const sRemote = {} as any
    if (remote.entrance !== undefined) sRemote["entrance"] = remote.entrance
    return sRemote
}
