<script setup lang="ts">
import { reactive, computed } from 'vue'
import AppInput from './AppInput.vue'
import AppButton from './AppButton.vue'
import { MIN_CODE_LENGTH } from '../lib/config'
import { useRouter } from 'vue-router'

const router = useRouter()
const formState = reactive({
  code: '',
})
const isValid = computed(() => formState.code.length >= MIN_CODE_LENGTH)

function submitForm() {
  router.push(`/code/${formState.code}`)
}
</script>

<template>
  <form @submit.prevent="submitForm" className="flex flex-col gap-6">
    <AppInput
      v-model="formState.code"
      required
      id="code-input"
      label="Jouw groepscode"
      autoComplete="off"
      autoFocus
      type="text"
    />

    <AppButton type="submit" :disabled="!isValid">Feest {{ isValid ? '! 🥳' : '?' }}</AppButton>
  </form>
</template>
