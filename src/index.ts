// Polyfill
import 'core-js/stable'
import 'regenerator-runtime/runtime'

import { createApp } from 'vue';
//@ts-ignore
import VueSelect from "vue-select";
import createAppRouter from './router/router';

import Main from './view/components/Main.vue'
// import { infoString } from './enviroment/content'
// import { setWebpackPublicPath } from './enviroment/runtime'
// import createAppRouter from './router';
// import { Content } from './content/types'
// import { addToApp as addPredefinedToApp } from './ui/predefinedComponents'
// import { toUrl } from './url'
// import { setToDomCache } from './content/domCache'
// import { isPrerender, isProd } from './enviroment'

// eslint-disable-next-line no-console
// console.info(infoString())
// setWebpackPublicPath(toUrl('d:/'))

// window.onunload = () => {} // cache fix

// Init store
// store.init().then(() => {
//   console.log("Store init")
// })

// const contentRef = ref<Content | null>(null)
// watch(contentRef, content => {
//   if (content !== null) {
//     watch(content, _ => {
//       setToDomCache(content)
//     }, {
//       deep: true,
//       immediate: true
//     })
//   }
// })
const router = createAppRouter()
//, { contentRef, router }
const app = createApp(Main, { router })
app.use(router)
app.component("VueSelect", VueSelect)
// addPredefinedToApp(app)
// const shouldHydrate = isProd
app.mount('#app')

// const main = new main()
// const shouldHydrate = !isPrerender
// main.$mount('#app', shouldHydrate)
