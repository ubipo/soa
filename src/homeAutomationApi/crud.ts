import { createCreateFn, createDeleteFn, createEditFn, createGetFn, createGetListFn, createGetShortenedListFn } from "@/api/crud"
import { parseBlinds, parseBlind, serializeBlind } from "./parse/blind"
import { parseCameras, parseCamera, serializeCamera } from "./parse/camera"
import { parseEntrances, parseEntrance, serializeEntrance } from "./parse/entrance"
import { parseHeatings, parseHeating, serializeHeating } from "./parse/heating"
import { parseProduct, parseShortenedProducts, serializeProduct } from "./parse/product"
import { parseProductType, parseProductTypes, serializeProductType } from "./parse/productType"
import { parseRemotes, parseRemote, serializeRemote } from "./parse/remote"


const entrancePath = "/entrances/"
export const getEntrances = createGetListFn("entrances", entrancePath, parseEntrances)
export const getEntrance = createGetFn("entrance", entrancePath, parseEntrance)
export const createEntrance = createCreateFn("entrance", entrancePath, parseEntrance, serializeEntrance)
export const editEntrance = createEditFn("entrance", entrancePath, parseEntrance, serializeEntrance)
export const deleteEntrance = createDeleteFn("entrance", entrancePath)

const remotePath = "/remotes/"
export const getRemotes = createGetListFn("remotes", remotePath, parseRemotes)
export const getRemote = createGetFn("remote", remotePath, parseRemote)
export const createRemote = createCreateFn("remote", remotePath, parseRemote, serializeRemote)
export const editRemote = createEditFn("remote", remotePath, parseRemote, serializeRemote)
export const deleteRemote = createDeleteFn("remote", remotePath)

const productPath = "/products/"
export const getProduct = createGetFn("product", productPath, parseProduct)
export const getProducts = createGetShortenedListFn("products", productPath, parseShortenedProducts, shortenedProduct => shortenedProduct.id, getProduct)
export const createProduct = createCreateFn("product", productPath, parseProduct, serializeProduct)
export const editProduct = createEditFn("product", productPath, parseProduct, serializeProduct)
export const deleteProduct = createDeleteFn("product", productPath)

const productTypePath = "/product-types/"
export const getProductTypes = createGetListFn("product-types", productTypePath, parseProductTypes)
export const getProductType = createGetFn("product-type", productTypePath, parseProductType)
export const createProductType = createCreateFn("product-type", productTypePath, parseProductType, serializeProductType)
export const editProductType = createEditFn("product-type", productTypePath, parseProductType, serializeProductType)
export const deleteProductType = createDeleteFn("product-type", productTypePath)

const cameraPath = "/cameras/"
export const getCameras = createGetListFn("cameras", cameraPath, parseCameras)
export const getCamera = createGetFn("camera", cameraPath, parseCamera)
export const createCamera = createCreateFn("camera", cameraPath, parseCamera, serializeCamera)
export const editCamera = createEditFn("camera", cameraPath, parseCamera, serializeCamera)
export const deleteCamera = createDeleteFn("camera", cameraPath)

const heatingPath = "/heatings/"
export const getHeatings = createGetListFn("heatings", heatingPath, parseHeatings)
export const getHeating = createGetFn("heating", heatingPath, parseHeating)
export const createHeating = createCreateFn("heating", heatingPath, parseHeating, serializeHeating)
export const editHeating = createEditFn("heating", heatingPath, parseHeating, serializeHeating)
export const deleteHeating = createDeleteFn("heating", heatingPath)

const blindPath = "/blinds/"
export const getBlinds = createGetListFn("blinds", blindPath, parseBlinds)
export const getBlind = createGetFn("blind", blindPath, parseBlind)
export const createBlind = createCreateFn("blind", blindPath, parseBlind, serializeBlind)
export const editBlind = createEditFn("blind", blindPath, parseBlind, serializeBlind)
export const deleteBlind = createDeleteFn("blind", blindPath)
