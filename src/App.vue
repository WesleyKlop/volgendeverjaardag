<script setup lang="ts">
import { RouterLink, RouterView, useRoute } from 'vue-router'

const route = useRoute()
</script>

<template>
  <main class="mx-auto grid max-w-screen-sm gap-4 p-4">
    <h1 class="text-center font-title text-4xl text-black">Wie is er ook alweer jarig?</h1>

    <RouterView />

    <RouterLink
      v-if="route.fullPath !== '/'"
      class="mr-auto text-blue-500 hover:text-blue-600"
      to="/"
    >
      ← terug
    </RouterLink>
  </main>
</template>
