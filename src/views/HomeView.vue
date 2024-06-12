<script setup lang="ts">
import { RouterLink } from 'vue-router'

import NextBirthdayForm from '../components/NextBirthdayForm.vue'
</script>

<template>
  <NextBirthdayForm />

  <p className="text-slate-800">
    De volgende verjaardag in jouw vriendengroep snel vinden?&nbsp;
    <RouterLink className="text-blue-500 hover:text-blue-600" to="/join"> Registreer </RouterLink>
    .
  </p>
</template>
