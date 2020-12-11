import TypeInfo from "@/api/TypeInfo";
import { entranceTypeInfo, remoteTypeInfo, productTypeInfo, productTypeTypeInfo, cameraTypeInfo, heatingTypeInfo, blindTypeInfo } from "./typeInfos";

const homeAutomationTypeInfos: TypeInfo<any, any, any>[] = [
  entranceTypeInfo, remoteTypeInfo, productTypeInfo, productTypeTypeInfo,
  cameraTypeInfo, heatingTypeInfo, blindTypeInfo
]

export default homeAutomationTypeInfos
