import { createListParser } from "@/api/parse"
import { mustBeExGen } from "@/api/util"
import { Product, ProductPartial, ShortenedProduct } from "../model/product"


export function parseProduct(sProduct: any): Product {
    const mustBeEx = mustBeExGen('Product')
    const { id, type } = sProduct
    if (typeof id !== "string") throw mustBeEx("id", "a string")
    if (typeof type !== "string") throw mustBeEx("type", "a string")
    return { id, type }
}

export function parseShortenedProduct(sShortenedProduct: any): ShortenedProduct {
    const mustBeEx = mustBeExGen('Product')
    const { id, type } = sShortenedProduct
    if (typeof id !== "string") throw mustBeEx("id", "a string")
    if (typeof type !== "string") throw mustBeEx("type", "a string")
    return { id, typeName: type }
}

export const parseShortenedProducts = createListParser("shortenedProducts", parseShortenedProduct)

export function serializeProduct(product: ProductPartial) {
    const sEntrance = {} as any
    if (product.type !== undefined) sEntrance["type"] = product.type
    return sEntrance
}
