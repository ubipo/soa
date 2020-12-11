<template>
  <header>
    <Nav :router="router" />
  </header>
  <div class="page-wrapper">
    <div class="main">
      <main class="main__content">
        <LoginModal ref="loginModal" />
        <router-view :router="router" @unauthorized="onUnauthorized" />
      </main>
    </div>
  </div>
</template>

<script lang="ts">
import homeAutomationTypeInfos from "@/homeAutomationApi/homeAutomationTypeInfos";
import { computed, defineComponent, reactive, ref, Ref } from "vue"
import { useAsyncTask } from "vue-concurrency"
import Nav from "./Nav.vue";
import LoginModal from "./LoginModal.vue";


export default defineComponent({
  props: {
    router: {
      type: Object,
      required: true
    }
  },
  setup(props, ctx) {
    const loginModal = ref<HTMLElement | null>(null)

    const onUnauthorized = () => {
      (loginModal.value as any).showModal()
    }

    return { loginModal, onUnauthorized }
  },
  components: { Nav, LoginModal }
})
</script>

<style lang="scss">
  @import "~bootstrap/scss/bootstrap";

  .page-wrapper {
    margin: 1rem;
  }
</style>

<!--
<style lang="scss">
@import '@/ui/style/main.scss';
@import '@/ui/style/style.scss';

p {
  font-family: $text-font-stack;
  color: $text-color;
}

h1,
h2,
h3 {
  font-family: 'Quicksand', sans-serif;
  font-weight: 400;
  text-decoration: none;
  color: $text-color;
  outline: none;
}

.page-wrapper {
  height: 100%;
  display: flex;
  flex-flow: column;
}

.main {
  display: flex;
  justify-content: center;
  background-image: url('/content/bg.svg');
  background-color: hsl(0, 0, 95%);
  background-size: 100vw;
  flex-grow: 1;
}

.main__content {
  z-index: 100; // For nav shadow
  margin: 0.25rem;
  width: 100%;
}

@media only screen and (min-width: 650px) {
  .main__content {
    margin-top: 4rem;
    margin-bottom: 4rem;
  }
}

figure {
  max-width: 100%;
  margin: 0;
}

img {
  max-width: 100%;
}

.site-data-status {
  display: flex;
  align-items: center;
  justify-content: center;
}

.edit-button {
  position: fixed;
  bottom: 0;
  right: 0;
  background-color: transparentize($color: grey($amount: 30), $amount: 0.6);
  width: 1.5rem;
  height: 1.5rem;
}
</style> -->
