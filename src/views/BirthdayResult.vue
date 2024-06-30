<script setup lang="ts">
import { ref, onMounted, watch, computed } from 'vue'
import { useRouter, useRoute } from 'vue-router'
import { fetchNextBirthday } from '../lib/api'
import { confetti } from '../lib/confetti'
import { formatDate, isSameDate } from '../lib/date'
import { type NextBirthday, type Species } from '../lib/birthday'
import AppButton from '../components/AppButton.vue'

const isLoading = ref(true)
const birthdays = ref<NextBirthday[]>([])
const isToday = ref(false)
const isShowingAll = ref(false)

const route = useRoute()
const router = useRouter()

const code = computed(() => route.params.code as string)

const updatePerson = async (code: string) => {
  if (!code) {
    router.push('/')
    return
  }
  const result = await fetchNextBirthday(code)
  isLoading.value = false

  if (!result) {
    return
  }

  birthdays.value = result
  const today = isSameDate(new Date(result[0]?.next_birthday))
  isToday.value = today
  if (today) {
    await confetti()
  }
}

watch(code, (newCode) => {
  if (typeof newCode === 'string') {
    isLoading.value = true
    updatePerson(newCode)
  }
})

const showAll = async () => {
  isLoading.value = true
  const result = await fetchNextBirthday(code.value!, true)
  if (result) birthdays.value = result
  isLoading.value = false
  isShowingAll.value = true
}

onMounted(() => {
  if (typeof code.value === 'string') {
    isLoading.value = true
    updatePerson(code.value)
  }
})

const emojis: Record<Species, string> = {
  cat: '🐱',
  dog: '🐶',
  human: '',
  alien: '👽',
}
</script>

<template>
  <div v-if="isLoading">Laden...</div>
  <div v-else-if="birthdays.length" class="text-center">
    <p v-for="birthday in birthdays" :key="birthday.name">
      <span :title="`${birthday.name} is geboren op ${formatDate(birthday.birth_date)}.`">
        {{ emojis[birthday.species] }}
        {{ birthday.name }} is op {{ formatDate(birthday.next_birthday) }} jarig en wordt dan
        {{ birthday.age }}!
      </span>
      &nbsp;
      <a
        v-if="birthday.website"
        class="text-xs"
        :href="birthday.website.toString()"
        target="_blank"
        rel="noreferrer"
      >
        Bekijk hier mijn verlanglijstje.
      </a>
    </p>
    <p v-if="isToday" class="text-xl">
      🎉🥳&nbsp;
      <button class="rainbow-text" type="button" @click="confetti">
        En dat is vandaag! Van harte gefeliciteerd!
      </button>
      &nbsp;🥳🎉
    </p>
    <AppButton v-if="!isShowingAll" class="mt-4" @click="showAll">
      Bekijk welke verjaardagen er nog meer aan komen
    </AppButton>
  </div>
  <div v-else>Niemand gevonden. Bestaat de code wel?</div>
</template>
