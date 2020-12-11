import { RefAllItemsMap } from "@/api/types"
import { ProductType } from "./productType"

export interface ProductOut {
  type: string // type is the product type (cheese, milk...), it's a uuid
}

export interface Product extends ProductOut {
  id: string,
}

export interface ShortenedProduct {
  id: string,
  typeName: string // typeName is the product type string (cheese, milk...), it's the literal name of the product
}

export function defaultProduct(refAllItemsMap: RefAllItemsMap): ProductOut {
  return {
    type: (refAllItemsMap["type"] as unknown as ProductType[])[0].id,
  }
}

export interface ProductPartial {
  type?: string
}

export function productToPartial(product: Product): ProductOut {
  return { type: product.type }
}
