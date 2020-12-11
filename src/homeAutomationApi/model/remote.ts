import { RefAllItemsMap } from "@/api/types"
import { Entrance } from "./entrance"


export interface Remote {
  uuid: string,
  slug: string,
  entrance: string,
}

export function defaultRemote(refAllItemsMap: RefAllItemsMap): RemoteOut {
  return {
    entrance: (refAllItemsMap["entrance"] as unknown as Entrance[])[0].uuid,
  }
}

export interface RemoteOut {
  entrance: string,
}

export interface RemotePartial {
  entrance?: string,
}

export function remoteToPartial(remote: Remote): RemoteOut {
  return {
    entrance: remote.entrance
  }
}
