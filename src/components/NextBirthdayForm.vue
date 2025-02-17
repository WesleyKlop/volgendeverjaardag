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
  return router.push(`/code/${formState.code}`)
}
</script>

<template>
  <form
    className="flex flex-col gap-6"
    @submit.prevent="submitForm"
  >
    <AppInput
      id="code-input"
      v-model="formState.code"
      required
      label="Jouw groepscode"
      auto-complete="off"
      auto-focus
      type="text"
    />

    <AppButton
      type="submit"
      :disabled="!isValid"
    >
      Feest {{ isValid ? '! 🥳' : '?' }}
    </AppButton>
  </form>
</template>
