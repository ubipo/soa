// https://projektwerk.ucll.be/projects/soa_herfst20_home_automation/repository/revisions/master/entry/api_aanmaken/api_aanmaken_phloy_vandewyngaert_r0667921/blinds/models.py
export enum BlindLocation {
  BR, LR, KC, DR
}

export interface BlindOut {
  isUp: boolean,
  location: BlindLocation,
}

export interface Blind extends BlindOut {
  id: string
}

export function defaultBlind(): BlindOut {
  return {
    "isUp": true,
    "location": BlindLocation.KC
  }
}

export interface BlindPartial {
  name?: string,
  isUp?: boolean,
  location?: BlindLocation,
}

export function blindToPartial(blind: Blind): BlindOut {
  return {
    isUp: blind.isUp,
    location: blind.location,
  }
}
