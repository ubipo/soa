<template>
  <label v-for="(valueMapping, key) in editableInputs" :key="valueMapping.name">
    <span>{{ valueMapping.name }}:</span>
    <input
      v-if="valueMapping.type === 'string'" type="text" v-model="item[key]"
      :placeholder="valueMapping.placeholder"
    />
    <EnumInput
      v-else-if="valueMapping.type === 'enum'"
      :toStringFn="valueMapping.toStringFn"
      :enumRef="ref(valueMapping.enum)" :selectedValue="item[key]"
      @selection-change="val => onEnumChange(key, val)"
    />
    <input
      v-else-if="valueMapping.type === 'boolean'" type="checkbox"
      v-model="item[key]"
    >
    <input
      v-else-if="['integer', 'float'].includes(valueMapping.type)" type="number"
      :step="valueMapping.type === 'integer' ? 1 : 0.01"
      v-model="item[key]" :placeholder="valueMapping.placeholder"
    />
    <RefInput
      v-else-if="valueMapping.type === 'ref'" :nameFn="valueMapping.nameFn"
      :idFn="valueMapping.idFn" :items="refAllItemsMap[key]"
      :selectedId="item[key]"
      @selection-change="val => onRefChange(key, val)"
    />
    <span v-else>Bad input type: {{ valueMapping.type }}</span>
  </label>
</template>

<script lang="ts">
import TypeInfo from "@/api/TypeInfo"
import { computed, defineComponent, PropType, reactive, ref, Ref } from "vue"
import { Router } from "vue-router"
import EnumInput from "./EnumInput.vue"
import RefInput from "./RefInput.vue"
import RefItemsDependend from "./RefItemsDependend.vue"
import { filterObj } from "@/util";


export default defineComponent({
  props: {
    item: {
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
    const onEnumChange = (key: string, val: string) => {
      props.item[key] = Number(val)
    }
    const onRefChange = (key: string, id: string) => {
      props.item[key] = String(id)
    }

    const editableInputs = computed(() =>
      filterObj(props.typeInfo.valueMappings, (k, v) => v.editable)
    )

    return { onEnumChange, onRefChange, ref, editableInputs }
  },
  components: { EnumInput, RefInput, RefItemsDependend }
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
