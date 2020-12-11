export interface ProductTypeOut {
  name: string
}

export interface ProductType extends ProductTypeOut {
  id: string,
}

export function defaultProductType(): ProductTypeOut {
  return {
    name: "A type of cheese"
  }
}

export interface ProductTypePartial {
  name?: string
}

export function productTypeToPartial(productType: ProductType): ProductTypeOut {
  return { name: productType.name }
}
