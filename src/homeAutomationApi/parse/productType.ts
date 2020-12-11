import { createListParser } from "@/api/parse"
import { mustBeExGen } from "@/api/util"
import { ProductType, ProductTypePartial } from "../model/productType"


export function parseProductType(sProductType: any): ProductType {
  const mustBeEx = mustBeExGen('ProductType')
  const { id, name } = sProductType
  if (typeof id !== "string") throw mustBeEx("id", "a string")
  if (typeof name !== "string") throw mustBeEx("name", "a string")
  return { id, name }
}

export const parseProductTypes = createListParser("productTypes", parseProductType)

export function serializeProductType(productType: ProductTypePartial) {
  const sEntrance = {} as any
  if (productType.name !== undefined) sEntrance["name"] = productType.name
  return sEntrance
}
