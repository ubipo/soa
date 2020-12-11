<template>
  <div class="page-wrapper">
    <div class="main">
      <main class="main__content">
        <h1>SOA Home Automation</h1>
        <router-link
          v-for="navItem in navItems" :key="navItem.name" :to="navItem.path"
        >
          <h2>{{ navItem.name }}</h2>
        </router-link>
        <h2>Zato server config</h2>
        <input class="baseUrl" type="text" v-model="baseUrl">
        <button @click="onLoginClick">Set credentials</button>
      </main>
    </div>
  </div>
</template>

<script lang="ts">
import { computed, defineComponent, reactive, ref, Ref, watch } from "vue"
import { navItems } from "@/view/navItems";
import { serverConfig } from "@/homeAutomationApi/serverConfig";


export default defineComponent({
  props: { },
  setup(props, ctx) {
    const baseUrl = ref(serverConfig.value.baseUrl.href)

    const onLoginClick = () => {
      ctx.emit("unauthorized")
    }

    watch(baseUrl, () => {
      serverConfig.value = {
        baseUrl: new URL(baseUrl.value),
        credentials: serverConfig.value.credentials
      };
    })

    return { navItems, onLoginClick, baseUrl }
  },
  components: { }
})
</script>

<style lang="scss" scoped>
.baseUrl {
  display: block;
}
</style>
