<template>
  <select @change="onSelectChange">
    <template
      v-for="value in values"
      :key="value" >
      <option
        :value="value"
        :selected="value == selectedValue">
        {{ toStringFn(value) }}
      </option>
    </template>
  </select>
</template>

<script lang="ts">
import { defineComponent } from "vue"


export const SELECTION_CHANGED_EVENT = "selection-change"

export default defineComponent({
  props: {
    selectedValue: {
      type: Number,
      required: true
    },
    toStringFn: {
      type: Function,
      required: true
    },
    enumRef: {
      type: Object,
      required: true
    }
  },
  setup(props, ctx) {
    const values = Object.values(props.enumRef.value)
      .filter(e => typeof(e) === 'number')
    const onSelectChange = (e: any) => {
      ctx.emit(SELECTION_CHANGED_EVENT, e.target.value)
    }
    return { values, onSelectChange }
  },
  components: { }
})
</script>
