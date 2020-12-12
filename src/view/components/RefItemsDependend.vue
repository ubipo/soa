<template>
    <div v-if="getRefItemsTask.isRunning">Loading...</div>
    <div v-else-if="getRefItemsTask.isError">
        <p>{{ getRefItemsTask.last.error }}</p>
        <button @click="tryAgain">Try again</button>
    </div>
    <slot v-else :refAllItemsMap="getRefItemsTask.last.value" />
</template>

<script lang="ts">
import { UnauthorizedException } from "@/api/exceptions"
import { serverConfig } from "@/homeAutomationApi/serverConfig"
import { computed, defineComponent, reactive, Ref, watch } from "vue"
import { useAsyncTask, useSequentialTask } from "vue-concurrency"


export default defineComponent({
  props: {
    valueMappings: {
      type: Object,
      required: true
    },
  },
  setup(props, ctx) {
    const getRefItemsTask = useAsyncTask(async (s) => {
      try {
        return Object.fromEntries(await Promise.all(
          Object.entries(props.valueMappings).filter(
            ([key, valueMapping]) => valueMapping.type === "ref"
          ).map(async ([key, valueMapping]) => {
            const allItems = await valueMapping.getAllItemsFn(serverConfig.value)
            return [key, allItems]
          })
        ))
      } catch (err) {
        console.error("Caught err: ", err)
        console.error(UnauthorizedException)
        if (err instanceof UnauthorizedException) {
          ctx.emit("unauthorized")
        }
        throw err
      }
    })
    
    getRefItemsTask.perform()

    watch(() => props.valueMappings, () => getRefItemsTask.perform())

    return {
      getRefItemsTask,
      tryAgain: () => getRefItemsTask.perform()
    }
  },
  components: { }
})
</script>