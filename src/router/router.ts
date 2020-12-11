import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router'
import NotFound from "@/view/components/NotFound.vue"
import Home from "@/view/components/Home.vue"
import { typeInfoToRoutes } from './typeInfoToRoutes'
import homeAutomationTypeInfos from "@/homeAutomationApi/homeAutomationTypeInfos";


export function asSubRoutes(
    baseRecord: RouteRecordRaw,
    subrouteRecords: RouteRecordRaw[]
  ): RouteRecordRaw[] {
    subrouteRecords.forEach(r => {
      r.path = baseRecord.path + r.path
      const meta = r.meta || {}
      if (meta["base"] === undefined)
        meta["base"] = baseRecord
    })
    return [baseRecord, ...subrouteRecords]
  }

function createRoutes(): RouteRecordRaw[] {
  const homeAutomationApiRoutes = homeAutomationTypeInfos.flatMap(typeInfo => 
    typeInfoToRoutes(typeInfo)
  )
  return [
    ...asSubRoutes(
      {
        path: '',
        component: Home,
      },
      [
        ...homeAutomationApiRoutes
      ]
    ),
    {
      path: '/:pathMatch(.*)*',
      component: NotFound,
    }
  ]
}

export default function createAppRouter() {
    const router = createRouter({
      routes: createRoutes(),
      history: createWebHistory(),
      scrollBehavior: (to, from, savedPosition) =>
        savedPosition ? savedPosition : { left: 0, top: 0 }
    })
    
    // router.afterEach(to => {
    //   const content = contentRef.value
    //   /* setPageMetadata will also get called by
    //   ContentRequired.vue if it's a content-dependent
    //   page */
    //   if (content === null) setPageMetadata(to, TITLE_POSTFIX)
    //   else setPageMetadata(to, TITLE_POSTFIX, content)
    // })
    
    return router
}
  