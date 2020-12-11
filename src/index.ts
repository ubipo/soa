// Polyfill
import 'core-js/stable'
import 'regenerator-runtime/runtime'

import { createApp } from 'vue';
//@ts-ignore
import VueSelect from "vue-select";
import createAppRouter from './router/router';

import Main from './view/components/Main.vue'


const router = createAppRouter()
const app = createApp(Main, { router })
app.use(router)
app.component("VueSelect", VueSelect)

app.mount('#app')
