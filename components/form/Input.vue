<template>
  <label class="flex flex-col gap-1">
    <span>{{ label }}</span>
    <input
      class="rounded-md bg-gray-7 p-2 text-gray-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
      type="text" :name="name" :value="model"
      :placeholder="placeholder"
      @input="update"
    >
  </label>
</template>

<script lang="ts" setup>
defineProps<{
  label?: string
  name?: string
  placeholder?: string
}>();

const model = defineModel()

function update(event: Event) {
  model.value = (event.target as HTMLInputElement).value;
}
</script>
