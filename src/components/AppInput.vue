<template>
  <div>
    <label :for="id" class="block text-sm font-medium text-gray-700">
      {{ label }}
    </label>
    <input
      :id="id"
      :class="[
        className,
        'mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm',
      ]"
      v-bind="$attrs"
      v-model="model"
    />
    <p v-if="error" class="mt-0.5 text-xs font-light text-red-500">
      {{ validationMessage }}
    </p>
    <p v-else-if="info" class="mt-0.5 text-xs font-light">{{ info }}</p>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'
defineOptions({
  inheritAttrs: false,
})
const props = defineProps<{
  label: string
  id: string
  className?: string
  error?: {
    message: string
    type: string
  }
  info?: string
}>()
const model = defineModel<string>()

const validationMessage = computed(() => {
  if (!props.error) {
    return
  }
  const error = props.error
  if (error.message) {
    return error.message
  }

  switch (error.type) {
    case 'required':
      return 'Dit veld is verplicht'
    case 'minLength':
      return 'Invoer is niet lang genoeg'
    default:
      return ''
  }
})
</script>
