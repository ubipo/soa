import homeAutomationTypeInfos from "@/homeAutomationApi/homeAutomationTypeInfos";


export const navItems = homeAutomationTypeInfos.flatMap(typeInfo => ({
  name: typeInfo.namePlural,
  path: `/${typeInfo.urlSafePlural}`
}))
