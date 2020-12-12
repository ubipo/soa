<template>
  <div>
    <RefItemsDependend :valueMappings="typeInfo.valueMappings">
      <template v-slot="refItemsProps">
        <div class="page-wrapper">
          <div class="main">
            <main class="main__content">
              <div v-if="getItemTask.isRunning">Loading...</div>
              <div v-else-if="getItemTask.isError">
                <p>{{ getItemTask.last.error }}</p>
                <button @click="tryAgain">Try again</button>
              </div>
              <template v-else>
                <h1>{{ typeInfo.nameFn(getItemTask.last.value) }}</h1>
                <Item
                  :item="getItemTask.last.value" :typeInfo="typeInfo"
                  :refItemMap="toRefItemMap(getItemTask.last.value, refItemsProps.refAllItemsMap)"
                  class="item"
                />
                <h2>Edit</h2>
                <EditItem
                  :refAllItemsMap="refItemsProps.refAllItemsMap"
                  :id="id" :partial="typeInfo.toPartialFn(getItemTask.last.value)"
                  :typeInfo="typeInfo" @edited="onEdited"
                />
                <h2>Delete</h2>
                <DeleteItem
                  :item="getItemTask.last.value" :typeInfo="typeInfo"
                  @deleted="onDeleted"
                /> 
              </template>
            </main>
          </div>
        </div>
        </template>
    </RefItemsDependend>
  </div>
</template>

<script lang="ts">
import { computed, defineComponent, PropType, reactive, Ref, watch } from "vue"
import { useAsyncTask, useSequentialTask } from "vue-concurrency"
import Item from "./Item.vue";
import EditItem from "./EditItem.vue";
import DeleteItem from "./DeleteItem.vue";
import RefItemsDependend from "./RefItemsDependend.vue";
import { createToRefItemMap } from "../itemUtil";
import { Router } from "vue-router";
import TypeInfo from "@/api/TypeInfo";
import { serverConfig } from "@/homeAutomationApi/serverConfig";
import { UnauthorizedException } from "@/api/exceptions";


export default defineComponent({
  props: {
    router: {
      type: Object as PropType<Router>,
      required: true
    },
    id: {
      type: String,
      required: true
    },
    typeInfo: {
      type: Object as PropType<TypeInfo<object, object, object>>,
      required: true
    },
  },
  setup(props, ctx) {
    const getItemTask = useAsyncTask(async (s, id: string) => {
      try {
        return await props.typeInfo.getItemFn(serverConfig.value, id)
      } catch (err) {
        if (err instanceof UnauthorizedException) {
          ctx.emit("unauthorized")
        }
        throw err
      }
    })
    watch(() => props.id, () => getItemTask.perform(props.id))
    watch(serverConfig, () => getItemTask.perform(props.id))
    getItemTask.perform(props.id)

    const onEdited = () => {
      getItemTask.perform(props.id)
    }

    const onDeleted = () => {
      props.router.push(`/${props.typeInfo.urlSafePlural}`)
    }

    const toRefItemMap = computed(() =>
      createToRefItemMap(props.typeInfo.valueMappings
    ))

    return {
      getItemTask,
      onEdited,
      onDeleted,
      tryAgain: () => getItemTask.perform(props.id),
      toRefItemMap
    }
  },
  components: { Item, EditItem, DeleteItem, RefItemsDependend }
})
</script>

<style scoped>
h2 {
  margin-top: 2rem;
}
</style>
