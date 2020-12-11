<template>
  <nav class="navbar navbar-expand-lg navbar-light bg-light">
    <div class="container-fluid">
      <router-link class="navbar-brand" to="/">Home Automation</router-link>
      <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
        <span class="navbar-toggler-icon"></span>
      </button>
      <div class="collapse navbar-collapse" id="navbarNav">
        <ul class="navbar-nav">
          <li
            v-for="navItem in navItems" :key="navItem.name"
            class="nav-item"
          >
            <router-link class="nav-link" :to="navItem.path">
              {{ navItem.name }}
            </router-link>
          </li>
        </ul>
      </div>
    </div>
  </nav>
</template>

<script lang="ts">
import { computed, defineComponent, onMounted, reactive, Ref } from "vue"
import { useAsyncTask } from "vue-concurrency"
import { Collapse } from 'bootstrap';
import homeAutomationTypeInfos from "@/homeAutomationApi/homeAutomationTypeInfos";
import { Router } from "vue-router";
import { navItems } from "@/view/navItems";


export default defineComponent({
  props: {
    router: {
      type: Object,
      required: true
    }
  },
  setup(props, ctx) {
    onMounted(() => {
      const elem = document.getElementById("navbarNav")
      if (elem === null) throw new Error()
      const navBarCollapse = new Collapse(elem, {
        toggle: false
      });
      (props.router as Router).afterEach(() => navBarCollapse.hide())
    })

    return { navItems }
  },
  components: { }
})
</script>
