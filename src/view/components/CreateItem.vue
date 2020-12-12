<template>
  <form @submit.prevent="createTask.perform()">
    <div v-if="createTask.isRunning">Creating...</div>
    <div v-else-if="createTask.isError">
      <p>{{ createTask.last.error }}</p>
      <button @click="tryAgain">Try again</button>
    </div>
    <ItemInputs
      :item="item" :refAllItemsMap="refAllItemsMap" :typeInfo="typeInfo"
    />
    <button type="submit">Create</button>
  </form>
</template>

<script lang="ts">
import TypeInfo from "@/api/TypeInfo"
import { GenericItem, RefAllItemsMap } from "@/api/types"
import { computed, defineComponent, PropType, reactive, ref, Ref } from "vue"
import { Router } from "vue-router"
import EnumInput from "./EnumInput.vue"
import RefInput from "./RefInput.vue"
import RefItemsDependend from "./RefItemsDependend.vue"
import ItemInputs from "./ItemInputs.vue";
import { useAsyncTask } from "vue-concurrency"
import { serverConfig } from "@/homeAutomationApi/serverConfig"
import { UnauthorizedException } from "@/api/exceptions"


export default defineComponent({
  props: {
    refAllItemsMap: {
      type: Object as PropType<RefAllItemsMap>,
      required: true
    },
    typeInfo: {
      type: Object as PropType<TypeInfo<GenericItem, GenericItem, GenericItem>>,
      required: true
    },
  },
  setup(props, ctx) {
    const item = props.typeInfo.defaultItemFn(props.refAllItemsMap)

    const createTask = useAsyncTask(async () => {
      try {
        const createdItem = await props.typeInfo.createItemFn(serverConfig.value, item);
        ctx.emit("created", createdItem)
      } catch (err) {
        console.error("Caught err: ", err)
        console.error(UnauthorizedException)
        if (err instanceof UnauthorizedException) {
          ctx.emit("unauthorized")
        }
        throw err
      }
    })

    const onEnumChange = (key: string, val: string) => {
      item[key] = Number(val)
    }

    const onRefChange = (key: string, id: string) => {
      item[key] = String(id)
    }
    
    return {
      createTask, onEnumChange, onRefChange, ref, item,
      tryAgain: () => createTask.perform()
    }
  },
  components: { EnumInput, RefInput, RefItemsDependend, ItemInputs }
})
</script>
