export enum EntranceType {
  DOOR, GARAGE_DOOR, WINDOW
}

export interface EntranceOut {
  name: string,
  type: EntranceType,
  locked: boolean | null,
  open: boolean | null
}

export interface Entrance extends EntranceOut {
  uuid: string,
  slug: string,
}

export function defaultEntrance(): EntranceOut {
  return {
    name: "Entrance",
    type: EntranceType.DOOR,
    locked: null,
    open: null
  }
}

export interface EntrancePartial {
  name?: string,
  type?: EntranceType,
  locked?: boolean | null,
  open?: boolean | null
}

export function entranceToPartial(entrance: Entrance): EntranceOut {
  return {
    name: entrance.name,
    type: entrance.type,
    locked: entrance.locked,
    open: entrance.open
  }
}
