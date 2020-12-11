import { AllItemsGetter, ItemGetter } from "./types";


export interface BaseValueMapping {
  type: "string" | "boolean" | "integer" | "float" | "enum" | "ref",
  name: string,
  editable: boolean,
}

export interface StringValueMapping extends BaseValueMapping {
  type: "string",
}

export interface BooleanValueMapping extends BaseValueMapping {
  type: "boolean",
}

export interface NumberValueMapping extends BaseValueMapping {
  type: "integer" | "float",
}

export interface EnumValueMapping<T> extends BaseValueMapping {
  type: "enum",
  enum: { [s: number]: string },
  toStringFn: (item: T) => string,
}

export interface RefValueMapping<T> extends BaseValueMapping {
  type: "ref",
  getItemFn: ItemGetter<T>,
  getAllItemsFn: AllItemsGetter<T>,
  idFn: (item: T) => string,
  relativeLinkFn: (item: T) => string,
}

export interface ValueMappings {
  [key: string]: BaseValueMapping
}
