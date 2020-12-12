import TypeInfo from "../api/TypeInfo";
import { getEntrance, getEntrances, createEntrance, editEntrance, getProduct, getProducts, createProduct, editProduct, getProductType, getProductTypes, createProductType, editProductType, createRemote, editRemote, getRemote, getRemotes, createCamera, editCamera, getCamera, getCameras, createHeating, editHeating, getHeating, getHeatings, createBlind, editBlind, getBlind, getBlinds, deleteBlind, deleteCamera, deleteEntrance, deleteHeating, deleteProduct, deleteProductType, deleteRemote } from "./crud";
import { Blind, BlindOut, BlindPartial, defaultBlind, blindToPartial } from "./model/blind";
import { Camera, CameraOut, CameraPartial, defaultCamera, cameraToPartial } from "./model/camera";
import { Entrance, EntranceOut, EntrancePartial, defaultEntrance, entranceToPartial } from "./model/entrance";
import { defaultHeating, Heating, HeatingOut, HeatingPartial, heatingToPartial } from "./model/heating";
import { Product, ProductOut, ProductPartial, defaultProduct, productToPartial } from "./model/product";
import { ProductType, ProductTypeOut, ProductTypePartial, defaultProductType, productTypeToPartial } from "./model/productType";
import { Remote, RemoteOut, RemotePartial, defaultRemote, remoteToPartial } from "./model/remote";
import { entranceValueMappings, productValueMappings, productTypeValueMappings, remoteValueMappings, cameraValueMappings, heatingValueMappings, blindValueMappings } from "./valueMappings";


export const entranceTypeInfo: TypeInfo<Entrance, EntranceOut, EntrancePartial> = {
    name: "Entrance",
    namePlural: "Entrances",
    urlSafePlural: "entrances",
    getItemFn: getEntrance,
    getItemsFn: getEntrances,
    createItemFn: createEntrance,
    editFn: editEntrance,
    deleteFn: deleteEntrance,
    defaultItemFn: defaultEntrance,
    valueMappings: entranceValueMappings,
    relativeLinkFn: entrance => `/entrances/${entrance.slug}`,
    nameFn: entrance => entrance.name,
    idFn: entrance => entrance.slug,
    toPartialFn: entranceToPartial,
}

export const remoteTypeInfo: TypeInfo<Remote, RemoteOut, RemotePartial> = {
    name: "Remote",
    namePlural: "Remotes",
    urlSafePlural: "remotes",
    getItemFn: getRemote,
    getItemsFn: getRemotes,
    createItemFn: createRemote,
    editFn: editRemote,
    deleteFn: deleteRemote,
    defaultItemFn: defaultRemote,
    valueMappings: remoteValueMappings,
    relativeLinkFn: remote => `/remotes/${remote.slug}`,
    nameFn: () => "Remote",
    idFn: remote => remote.slug,
    toPartialFn: remoteToPartial,
}

export const productTypeInfo: TypeInfo<Product, ProductOut, ProductPartial> = {
    name: "Product",
    namePlural: "Products",
    urlSafePlural: "products",
    getItemFn: getProduct,
    getItemsFn: getProducts,
    createItemFn: createProduct,
    editFn: editProduct,
    deleteFn: deleteProduct,
    defaultItemFn: defaultProduct,
    valueMappings: productValueMappings,
    relativeLinkFn: product => `/products/${product.id}`,
    nameFn: () => "Product",
    idFn: product => product.id,
    toPartialFn: productToPartial,
}

export const productTypeTypeInfo: TypeInfo<ProductType, ProductTypeOut, ProductTypePartial> = {
    name: "Product Type",
    namePlural: "Product Types",
    urlSafePlural: "product-types",
    getItemFn: getProductType,
    getItemsFn: getProductTypes,
    createItemFn: createProductType,
    editFn: editProductType,
    deleteFn: deleteProductType,
    defaultItemFn: defaultProductType,
    valueMappings: productTypeValueMappings,
    relativeLinkFn: productType => `/product-types/${productType.id}`,
    nameFn: productType => productType.name,
    idFn: productType => productType.id,
    toPartialFn: productTypeToPartial,
}

export const cameraTypeInfo: TypeInfo<Camera, CameraOut, CameraPartial> = {
    name: "Camera",
    namePlural: "Cameras",
    urlSafePlural: "cameras",
    getItemFn: getCamera,
    getItemsFn: getCameras,
    createItemFn: createCamera,
    editFn: editCamera,
    deleteFn: deleteCamera,
    defaultItemFn: defaultCamera,
    valueMappings: cameraValueMappings,
    relativeLinkFn: camera => `/cameras/${camera.id}`,
    nameFn: camera => camera.name,
    idFn: camera => camera.id,
    toPartialFn: cameraToPartial,
}

export const heatingTypeInfo: TypeInfo<Heating, HeatingOut, HeatingPartial> = {
    name: "Heating",
    namePlural: "Heatings",
    urlSafePlural: "heatings",
    getItemFn: getHeating,
    getItemsFn: getHeatings,
    createItemFn: createHeating,
    editFn: editHeating,
    deleteFn: deleteHeating,
    defaultItemFn: defaultHeating,
    valueMappings: heatingValueMappings,
    relativeLinkFn: heating => `/heatings/${heating.id}`,
    nameFn: heating => heating.name,
    idFn: heating => heating.id,
    toPartialFn: heatingToPartial,
}

export const blindTypeInfo: TypeInfo<Blind, BlindOut, BlindPartial> = {
    name: "Blind",
    namePlural: "Blinds",
    urlSafePlural: "blinds",
    getItemFn: getBlind,
    getItemsFn: getBlinds,
    createItemFn: createBlind,
    editFn: editBlind,
    deleteFn: deleteBlind,
    defaultItemFn: defaultBlind,
    valueMappings: blindValueMappings,
    relativeLinkFn: blind => `/blinds/${blind.id}`,
    nameFn: () => "Blind",
    idFn: blind => blind.id,
    toPartialFn: blindToPartial,
}
