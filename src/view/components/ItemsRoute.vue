<template>
  <div>
    <h1>{{ typeInfo.namePlural }}</h1>
    <RefItemsDependend :valueMappings="typeInfo.valueMappings">
      <template v-slot="refItemsProps">
        <div class="page-wrapper">
          <div class="main">
            <main class="main__content">
              <div v-if="getItemsTask.isRunning">Loading...</div>
              <div v-else-if="getItemsTask.isError">
                <p>{{ getItemsTask.last.error.message }}</p>
                <button @click="getItemsTask.perform">Try again</button>
              </div>
              <div v-else v-for="item in getItemsTask.last.value" :key="item.uuid">
                <div>
                  <router-link :to="typeInfo.relativeLinkFn(item)">
                    <h2>{{ typeInfo.nameFn(item) }}</h2>
                  </router-link>
                  <Item
                    :item=item :typeInfo="typeInfo"
                    :refItemMap="toRefItemMap(item, refItemsProps.refAllItemsMap)"
                  />
                </div>
              </div>
              <h2>Create a new {{ typeInfo.name }}</h2>
              <CreateItem
                :refAllItemsMap="refItemsProps.refAllItemsMap"
                :router="router" :typeInfo="typeInfo"
                 @created="onCreated"
              />
            </main>
          </div>
        </div>
      </template>
    </RefItemsDependend>
  </div>
</template>

<script lang="ts">
import { computed, defineComponent, PropType, reactive, Ref, watch, watchEffect } from "vue"
import { useAsyncTask } from "vue-concurrency"
import Item from "./Item.vue";
import CreateItem from "./CreateItem.vue";
import { Router } from "vue-router";
import RefItemsDependend from "./RefItemsDependend.vue";
import { createToRefItemMap } from "../itemUtil";
import TypeInfo from "@/api/TypeInfo";
import { GenericItem } from "@/api/types";
import { serverConfig } from "@/homeAutomationApi/serverConfig";
import { UnauthorizedException } from "@/api/exceptions";


export default defineComponent({
  props: {
    router: {
      type: Object as PropType<Router>,
      required: true
    },
    typeInfo: {
      type: Object as PropType<TypeInfo<GenericItem, GenericItem, GenericItem>>,
      required: true
    },
  },
  setup(props, ctx) {
    const getItemsTask = useAsyncTask(async () => {
      try {
        return await props.typeInfo.getItemsFn(serverConfig.value)
      } catch (err) {
        console.error("Caught err: ", err)
        console.error(UnauthorizedException)
        if (err instanceof UnauthorizedException) {
          ctx.emit("unauthorized")
        }
        throw err
      }
    })
    watch(() => props.typeInfo, () => getItemsTask.perform())
    watch(serverConfig, () => getItemsTask.perform())
    getItemsTask.perform()

    const onCreated = (item: any) => {
      const router = props.router as Router
      router.push(props.typeInfo.relativeLinkFn(item))
    }

    const toRefItemMap = computed(() => createToRefItemMap(props.typeInfo.valueMappings))

    return { getItemsTask, onCreated, toRefItemMap }
  },
  components: { Item, CreateItem, RefItemsDependend }
})
</script>
