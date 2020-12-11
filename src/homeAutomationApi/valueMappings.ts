import { ValueMappings, StringValueMapping, EnumValueMapping, BooleanValueMapping, RefValueMapping, NumberValueMapping } from "@/api/valueMappings"
import { getEntrance, getEntrances, getProductType, getProductTypes } from "./crud"
import { BlindLocation } from "./model/blind"
import { Entrance, EntranceType } from "./model/entrance"
import { ProductType } from "./model/productType"


export const entranceValueMappings: ValueMappings = {
  uuid: { name: "Uuid", type: "string", editable: false } as StringValueMapping,
  slug: { name: "Slug", type: "string", editable: false } as StringValueMapping,
  name: { name: "Name", type: "string", editable: true  } as StringValueMapping,
  type: {
    name: "Type", type: "enum", editable: true,
    toStringFn: type => EntranceType[type].toLocaleLowerCase(),
    enum: EntranceType,
  } as EnumValueMapping<EntranceType>,
  open: { name: "Open", type: "boolean", editable: true } as BooleanValueMapping,
  locked: { name: "Locked", type: "boolean", editable: true } as BooleanValueMapping
}

export const remoteValueMappings: ValueMappings = {
  uuid: { name: "Uuid", type: "string", editable: false } as StringValueMapping,
  slug: { name: "Slug", type: "string", editable: false } as StringValueMapping,
  entrance: { 
    name: "Entrance", type: "ref", editable: true,
    getItemFn: getEntrance, getAllItemsFn: getEntrances,
    nameFn: (entrance: Entrance) => entrance.name,
    idFn: (entrance: Entrance) => entrance.uuid,
    relativeLinkFn: (entrance: Entrance) => `/entrances/${entrance.uuid}`
  } as RefValueMapping<Entrance>
}

export const productTypeValueMappings: ValueMappings = {
  id: { name: "ID", type: "string", editable: false } as StringValueMapping,
  name: { name: "Type", type: "string", editable: true } as StringValueMapping
}

export const productValueMappings: ValueMappings = {
  id: { name: "ID", type: "string", editable: false } as StringValueMapping,
  type: { 
    name: "Type", type: "ref", editable: true,
    getItemFn: getProductType, getAllItemsFn: getProductTypes,
    nameFn: (productType: ProductType) => productType.name,
    idFn: (productType: ProductType) => productType.id,
    relativeLinkFn: (productType: ProductType) => `/product-types/${productType.id}`
  } as RefValueMapping<ProductType>
}

export const cameraValueMappings: ValueMappings = {
  id: { name: "ID", type: "string", editable: false } as StringValueMapping,
  name: { name: "Name", type: "string", editable: true } as StringValueMapping,
  level: { name: "Level", type: "integer", editable: true } as NumberValueMapping,
  status: { name: "Status", type: "boolean", editable: true } as BooleanValueMapping,
  angle: { name: "Angle", type: "float", editable: true } as NumberValueMapping,
}

export const heatingValueMappings: ValueMappings = {
  id: { name: "ID", type: "string", editable: false } as StringValueMapping,
  name: { name: "Name", type: "string", editable: true } as StringValueMapping,
  temperature: { name: "Temperature", type: "integer", editable: true } as NumberValueMapping,
  isOn: { name: "Is on", type: "boolean", editable: true } as BooleanValueMapping,
  location: { name: "Location", type: "string", editable: true } as StringValueMapping,
}

export const blindValueMappings: ValueMappings = {
  id: { name: "ID", type: "string", editable: false } as StringValueMapping,
  isUp: { name: "Is up", type: "boolean", editable: true } as BooleanValueMapping,
  location: {
    name: "Location", type: "enum", editable: true,
    toStringFn: location => BlindLocation[location].toLocaleLowerCase(),
    enum: BlindLocation,
  } as EnumValueMapping<BlindLocation>,
}
