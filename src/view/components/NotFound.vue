<template>
  <div>
    <h1 class="page-title">Not found</h1>
    <p>The page "{{ getPathname() }}" does not exist</p>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'


export default defineComponent({
  setup(props, ctx) {
    const getPathname = () => window.location.pathname
    return { getPathname }
  },
  components: { }
})

</script>

<style lang="scss" scoped></style>
