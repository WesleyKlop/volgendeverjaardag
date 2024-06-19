<template>
  <form @submit.prevent="submitForm" class="flex flex-col gap-x-1 gap-y-3">
    <p>
      Wanneer je je aanmeldt, kan iedereen via de code die je invult erachter komen wanneer jij als
      volgende jarig bent.
    </p>

    <AppInput
      v-model="form.name"
      id="name-input"
      label="Naam"
      placeholder="Jan"
      autoComplete="given-name"
      type="text"
      :error="errors.name"
    />

    <AppInput
      v-model="form.birth_date"
      id="birth-input"
      label="Geboortedatum"
      placeholder="26-7-1986"
      autoComplete="bday"
      type="date"
      :error="errors.birth_date"
    />

    <AppInput
      v-model="form.code"
      id="code-input"
      label="Groepscode"
      autoComplete="off"
      type="text"
      :error="errors.code"
    />

    <AppInput
      v-model="form.website"
      id="website-input"
      label="Verlanglijstje"
      autoComplete="off"
      type="url"
      placeholder="https://lijstje.nl/[jouw lijstje]"
      :error="errors.website"
      :info="`Toegestane domeinen: ${ALLOWED_ORIGINS.join(', ')}`"
    />

    <AppSelect
      v-model="form.species"
      label="Soort"
      :options="[
        { value: 'human', label: 'Mens' },
        { value: 'cat', label: 'Kat' },
        { value: 'dog', label: 'Hond' },
      ]"
    />

    <AppButton type="submit" :disabled="!isFormValid">
      Feest{{ isFormValid ? '! 🥳' : '?' }}
    </AppButton>
  </form>
</template>

<script lang="ts" setup>
import { reactive, computed, onMounted } from 'vue'
import { useRouter, useRoute } from 'vue-router'
import { submitBirthday } from '../lib/api'
import { MIN_CODE_LENGTH } from '../lib/config'
import AppButton from '../components/AppButton.vue'
import AppInput from '../components/AppInput.vue'
import AppSelect from '../components/AppSelect.vue'

const ALLOWED_ORIGINS = ['lijstje.nl']

const route = useRoute()
const router = useRouter()

const form = reactive<Parameters<typeof submitBirthday>[0]>({
  name: '',
  birth_date: '',
  code: '',
  website: '',
  species: 'human',
})

const errors = reactive({
  name: '',
  birth_date: '',
  code: '',
  website: '',
})

const validateForm = () => {
  errors.name = form.name ? '' : 'Dit veld is verplicht'
  errors.birth_date = !isNaN(Date.parse(form.birth_date)) ? '' : 'Ongeldige datum'
  errors.code = form.code.length >= MIN_CODE_LENGTH ? '' : `Minimaal ${MIN_CODE_LENGTH} karakters`
  if (form.website) {
    try {
      const url = new URL(form.website)
      errors.website = ALLOWED_ORIGINS.includes(url.host) ? '' : 'Ongeldig domein'
    } catch {
      errors.website = 'Ongeldige url'
    }
  } else {
    errors.website = ''
  }
}

const isFormValid = computed(() => {
  validateForm()
  return !errors.name && !errors.birth_date && !errors.code && !errors.website
})

onMounted(() => {
  const code = route.query.code as string | null
  if (typeof code === 'string' && code.length > MIN_CODE_LENGTH) {
    form.code = code
  }
})

const submitForm = async () => {
  validateForm()
  if (!isFormValid.value) return

  await submitBirthday(form)
  router.push('/')
}
</script>
