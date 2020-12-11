<template>
  <div>
    <table>
      <tr v-for="(valueMapping, key) in typeInfo.valueMappings" :key="valueMapping.name">
        <td>{{valueMapping.name}}: </td>
        <td v-if="valueMapping.type === 'string'">{{ item[key] }}</td>
        <td v-else-if="valueMapping.type === 'boolean'" :class="`boolean-${item[key]}`">{{ item[key] }}</td>
        <td v-else-if="valueMapping.type === 'integer'" class="number">{{ item[key] }}</td>
        <td v-else-if="valueMapping.type === 'float'" class="number">{{ item[key].toFixed(2) }}</td>
        <td v-else-if="valueMapping.type === 'enum'">{{ valueMapping.toStringFn(item[key]) }}</td>
        <td v-else-if="valueMapping.type === 'ref'"><a :href="valueMapping.relativeLinkFn(refItemMap[key])">{{ valueMapping.nameFn(refItemMap[key]) }}</a></td>
        <td v-else class="bad">Bad valueMapping</td>
      </tr>
    </table>
  </div>
</template>

<script lang="ts">
import TypeInfo from "@/api/TypeInfo"
import { computed, defineComponent, PropType, reactive, Ref } from "vue"


export default defineComponent({
  props: {
    item: {
      type: Object,
      required: true
    },
    refItemMap: {
      type: Object,
      required: true
    },
    typeInfo: {
      type: Object as PropType<TypeInfo<object, object, object>>,
      required: true
    },
  },
  setup(props, ctx) {
    return { }
  },
  components: { }
})
</script>

<style lang="scss" scoped>
  ul {
    list-style: none;
    padding-left: 0;
  }

  .boolean-true {
    color: darkgreen;
  }

  .boolean-false {
    color: darkred;
  }

  .bad { 
    color: red;
    font-style: italic;
  }
</style>
