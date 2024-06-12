<script setup lang="ts">
import { RouterLink, RouterView } from 'vue-router'

const location = window.location
</script>

<template>
  <main className="grid gap-4 p-4 max-w-screen-sm mx-auto">
    <h1 className="text-4xl text-center font-title text-black">Wie is er ookalweer jarig?</h1>

    <RouterView />

    <RouterLink
      v-if="location.pathname !== ''"
      className="text-blue-500 hover:text-blue-600 mr-auto"
      to="/"
    >
      ← terug
    </RouterLink>
  </main>
</template>
