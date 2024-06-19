<template>
  <div>
    <label :for="id" class="block text-sm font-medium leading-6 text-gray-900">{{ label }}</label>
    <div class="relative mt-1 rounded-md shadow-sm">
      <input
        :id="id"
        :class="[
          className,
          'w-full rounded-md border-0 px-3 py-1.5 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-blue-600 sm:text-sm sm:leading-6',
        ]"
        v-bind="$attrs"
        v-model="model"
      />
    </div>

    <p v-if="error && model" class="mt-0.5 text-xs font-light text-red-500">
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
  error?: string | { message: string } | { type: string }
  info?: string
}>()
const model = defineModel<string>()

const validationMessage = computed(() => {
  if (!props.error) {
    return
  }
  const error = props.error
  if (typeof error === 'string') {
    return error
  }

  if ('message' in error) {
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
