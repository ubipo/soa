<template>
  <div class="modal fade" id="exampleModal" ref="loginModalRef" tabindex="-1" role="dialog" aria-labelledby="loginModalLabel" aria-hidden="true">
    <div class="modal-dialog" role="document">
      <div class="modal-content">
        <div class="modal-header">
          <h5 class="modal-title" id="loginModalLabel">Login</h5>
          <button type="button" class="close" aria-label="Close" @click="onClose">
            <span aria-hidden="true">&times;</span>
          </button>
        </div>
        <div class="modal-body">
          <form @submit.prevent="onSubmit" @keypress.enter.prevent="onSubmit">
            <label>
              <span>Username: </span>
              <input type="text" v-model="credentials.username" />
            </label>
            <label>
              <span>Password: </span>
              <input type="password" v-model="credentials.password" />
            </label>
          </form>
        </div>
        <div class="modal-footer">
          <button type="button" class="btn btn-secondary" @click="onClose">Close</button>
          <button type="button" class="btn btn-primary" @click="onSubmit">Login</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import homeAutomationTypeInfos from "@/homeAutomationApi/homeAutomationTypeInfos";
import { serverConfig } from "@/homeAutomationApi/serverConfig";
import { Modal } from "bootstrap";
import { computed, defineComponent, onMounted, reactive, ref, Ref } from "vue"
import { useAsyncTask } from "vue-concurrency"
import Nav from "./Nav.vue";


export default defineComponent({
  props: { },
  setup(props, ctx) {
    const loginModalRef = ref<Element | null>(null)
    const loginModal = ref<Modal | null>(null)
    const credentials = reactive({
      username: '',
      password: ''
    })

    onMounted(() => {
      const elem = loginModalRef.value
      if (elem === null) throw Error("Login modal ref not populated")
      loginModal.value = new Modal(elem, {
        keyboard: true
      })
    })

    const showModal = () => {
      loginModal.value?.show()
    }

    const onClose = () => {
      loginModal.value?.hide()
    }

    const onSubmit = () => {
      serverConfig.value = {
        baseUrl: serverConfig.value.baseUrl,
        credentials: {
          username: credentials.username,
          password: credentials.password
        } // Lodash clone would be nice but overkill
      }
      console.info("Updated server config credentials")
      loginModal.value?.hide()
    }

    return { loginModalRef, showModal, onClose, onSubmit, credentials }
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

