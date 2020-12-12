<template>
  <div>
    <div v-if="editTask.isRunning">Editing...</div>
    <div v-else-if="editTask.isError">
      <p>{{ editTask.last.error }}</p>
      <button @click="tryAgain">Try again</button>
    </div>
    <form @submit.prevent="editTask.perform()">
      <ItemInputs
        :item="partial" :refAllItemsMap="refAllItemsMap" :typeInfo="typeInfo"
      />
      <button type="submit" class="btn btn-success">Edit</button>
    </form>
  </div>
</template>

<script lang="ts">
import TypeInfo from "@/api/TypeInfo"
import { computed, defineComponent, PropType, reactive, ref, Ref } from "vue"
import { Router } from "vue-router"
import EnumInput from "./EnumInput.vue"
import RefInput from "./RefInput.vue"
import RefItemsDependend from "./RefItemsDependend.vue"
import ItemInputs from "./ItemInputs.vue";
import { useAsyncTask } from "vue-concurrency"
import { serverConfig } from "@/homeAutomationApi/serverConfig";
import { UnauthorizedException } from "@/api/exceptions"


export default defineComponent({
  props: {
    id: {
      type: String,
      required: true
    },
    partial: {
      type: Object,
      required: true
    },
    refAllItemsMap: {
      type: Object,
      required: true
    },
    typeInfo: {
      type: Object as PropType<TypeInfo<object, object, object>>,
      required: true
    },
  },
  setup(props, ctx) {
    const editTask = useAsyncTask(async () => {
      try {
        const editedItem = await props.typeInfo.editFn(serverConfig.value, props.id, props.partial);
        ctx.emit("edited", editedItem)
      } catch (err) {
        if (err instanceof UnauthorizedException) {
          ctx.emit("unauthorized")
        }
        throw err
      }
    })

    const onEnumChange = (key: string, val: string) => {
      props.partial[key] = Number(val)
    }

    const onRefChange = (key: string, id: string) => {
      props.partial[key] = String(id)
    }

    return {
      editTask, onEnumChange, onRefChange, ref,
      tryAgain: () => editTask.perform()
    }
  },
  components: { EnumInput, RefInput, RefItemsDependend, ItemInputs }
})
</script>
