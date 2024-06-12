<script setup lang="ts">
const BASE_CLASSES =
  'py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white'
const ACTIVE_CLASSES =
  'bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500'
const DISABLED_CLASSES = 'disabled:bg-slate-300 disabled:shadow-none disabled:text-slate-100'

defineProps<{
  type?: 'submit' | 'button'
  disabled?: boolean
  className?: string
}>()

defineEmits<{
  (e: 'click', event: MouseEvent): void
}>()
</script>

<template>
  <button
    :type="type"
    :disabled="disabled"
    :class="[BASE_CLASSES, ACTIVE_CLASSES, DISABLED_CLASSES, className]"
    @click="$emit('click', $event)"
  >
    <slot></slot>
  </button>
</template>
