<template>
  <form @submit.prevent="submit">
    <label>
      <span>Name:</span>
      <input type="text" v-model="partial.name" placeholder="Name">
    </label>
    <label>
      <span>Type:</span>
      <EntranceTypeInput :selectedEntranceType="partial.type" @selection-change="onTypeChange" />
    </label>
    <label>
      <span>Open:</span>
      <input type="checkbox" v-model="partial.open">
    </label>
    <label>
      <span>Locked:</span>
      <input type="checkbox" v-model="partial.locked">
    </label>
    <button type="submit">Edit</button>
  </form>
</template>

<script lang="ts">
import { editEntrance } from "@/api/crud"
import { defaultEntrance, Entrance, EntranceOut, entranceToPartial, EntranceType } from "@/api/model"
import { computed, defineComponent, reactive, Ref } from "vue"
import { Router } from "vue-router"
import EntranceTypeInput from "./EntranceTypeInput.vue"


export default defineComponent({
  props: {
    entrance: {
      type: Object,
      required: true
    }
  },
  setup(props, ctx) {
    const uuid = (props.entrance as Entrance).uuid
    const partial = entranceToPartial(props.entrance as Entrance)
    const submit = async () => {
      const editedEntrance = await editEntrance(uuid, partial);
      ctx.emit("edited")
    }
    const onTypeChange = (val: string) => {
      partial.type = Number(val) as EntranceType
    }
    return { partial, submit, onTypeChange }
  },
  components: { EntranceTypeInput }
})
</script>

<style lang="scss" scoped>
  form > label {
    display: block;
    margin-bottom: 0.5rem;

    & > span:first-child {
      display: block;
      margin-bottom: 0.2rem;
    }
  }
</style>
