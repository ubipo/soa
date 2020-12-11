import { RouteRecordRaw } from "vue-router";
import ItemsRoute from "@/view/components/ItemsRoute.vue"
import ItemRoute from "@/view/components/ItemRoute.vue"
import TypeInfo from "@/api/TypeInfo";


export function typeInfoToRoutes<T, O, P>(typeInfo: TypeInfo<T, O, P>): RouteRecordRaw[] {
  return [
    {
      path: `/${typeInfo.urlSafePlural}`,
      component: ItemsRoute,
      props: () => ({
        typeInfo: typeInfo
      })
    },
    {
      path: `/${typeInfo.urlSafePlural}/:id`,
      props: route => ({
        id: route.params["id"],
        typeInfo: typeInfo
      }),
      component: ItemRoute,
    },
  ]
}
