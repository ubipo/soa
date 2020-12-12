<template>
  <div class="modal fade" id="exampleModal" ref="deleteModalRef" tabindex="-1" role="dialog" aria-labelledby="deleteModalLabel" aria-hidden="true">
    <div class="modal-dialog" role="document">
      <div class="modal-content">
        <div class="modal-header">
          <h5 class="modal-title" id="deleteModalLabel">Are you sure?</h5>
          <button type="button" class="close" aria-label="Close" @click="onClose">
            <span aria-hidden="true">&times;</span>
          </button>
        </div>
        <div class="modal-body">
          <p>
            Are you sure you want to delete 
            {{ typeInfo.name }} "{{ typeInfo.nameFn(item) }}"?
          </p>
          <p>
            ID: {{ typeInfo.idFn(item) }}
          </p>
        </div>
        <div class="modal-footer">
          <button type="button" class="btn btn-secondary" @click="onClose">Cancel</button>
          <button type="button" class="btn btn-danger" @click="onSubmit">Delete</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import TypeInfo from "@/api/TypeInfo";
import homeAutomationTypeInfos from "@/homeAutomationApi/homeAutomationTypeInfos";
import { serverConfig } from "@/homeAutomationApi/serverConfig";
import { Modal } from "bootstrap";
import { computed, defineComponent, onMounted, PropType, reactive, ref, Ref } from "vue"
import { useAsyncTask } from "vue-concurrency"
import Nav from "./Nav.vue";


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
    const deleteModalRef = ref<Element | null>(null)
    const deleteModal = ref<Modal | null>(null)
    const credentials = reactive({
      username: '',
      password: ''
    })

    onMounted(() => {
      const elem = deleteModalRef.value
      if (elem === null) throw Error("Login modal ref not populated")
      deleteModal.value = new Modal(elem, {
        keyboard: true
      })
    })

    const showModal = () => {
      deleteModal.value?.show()
    }

    const onClose = () => {
      deleteModal.value?.hide()
    }

    const onSubmit = () => {
      deleteModal.value?.hide()
      ctx.emit("delete-confirmed")
    }

    return { deleteModalRef, showModal, onClose, onSubmit, credentials }
  },
  components: { Nav }
})
</script>

<style lang="scss" scoped>
  label {
    display: block;
    margin-bottom: 0.5rem;

    & > span:first-child {
      display: block;
      margin-bottom: 0.2rem;
    }
  }
</style>
