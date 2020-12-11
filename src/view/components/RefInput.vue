<template>
  <select @change="onSelectChange">
    <template
      v-for="item in items"
      :key="idFn(item)" >
      <option
        :value="idFn(item)"
        :selected="idFn(item) === selectedId">
        {{ nameFn(item) }}
      </option>
    </template>
  </select>
</template>

<script lang="ts">
import { computed, defineComponent } from "vue"


export const SELECTION_CHANGED_EVENT = "selection-change"

export default defineComponent({
  props: {
    selectedId: {
      type: String,
      required: true
    },
    nameFn: {
      type: Function,
      required: true
    },
    idFn: {
      type: Function,
      required: true
    },
    items: {
      type: Array,
      required: true
    }
  },
  setup(props, ctx) {
    const onSelectChange = (e: any) => {
      ctx.emit(SELECTION_CHANGED_EVENT, e.target.value)
    }
    return { onSelectChange }
  },
  components: { }
})
</script>
