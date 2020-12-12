<template>
  <div>
    <div v-if="deleteTask.isRunning">Deleting...</div>
    <div v-else-if="deleteTask.isError">
      <p>{{ deleteTask.last.error }}</p>
      <button @click="tryAgain">Try again</button>
    </div>
    <form @submit.prevent="onDelete">
      <button type="submit" class="btn btn-danger">Delete</button>
    </form>
    <DeleteModal
      ref="deleteModal" :item="item" :typeInfo="typeInfo"
      @delete-confirmed="onDeleteConfirmed"
    />
  </div>
</template>

<script lang="ts">
import TypeInfo from "@/api/TypeInfo"
import { computed, defineComponent, PropType, reactive, ref, Ref } from "vue"
import { Router } from "vue-router"
import DeleteModal from "./DeleteModal.vue";
import { useAsyncTask } from "vue-concurrency"
import { serverConfig } from "@/homeAutomationApi/serverConfig";
import { UnauthorizedException } from "@/api/exceptions"


export default defineComponent({
  props: {
    item: {
      type: Object,
      required: true
    },
    typeInfo: {
      type: Object as PropType<TypeInfo<object, object, object>>,
      required: true
    },
  },
  setup(props, ctx) {
    const deleteTask = useAsyncTask(async () => {
      try {
        await props.typeInfo.deleteFn(serverConfig.value, props.typeInfo.idFn(props.item));
        ctx.emit("deleted")
      } catch (err) {
        if (err instanceof UnauthorizedException) {
          ctx.emit("unauthorized")
        }
        throw err
      }
    })

    const deleteModal = ref<HTMLElement | null>(null)

    const onDeleteConfirmed = () => {
      deleteTask.perform()
    }

    const onDelete = () => {
      (deleteModal.value as any).showModal()
    }

    return {
      deleteTask, deleteModal, onDelete, onDeleteConfirmed,
      tryAgain: () => deleteTask.perform()
    }
  },
  components: { DeleteModal }
})
</script>
