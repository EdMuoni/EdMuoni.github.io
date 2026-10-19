<script setup lang="ts">
import { RouterLink } from 'vue-router'
import PageIntro from '@/components/PageIntro.vue'
import { mascot } from '@/data/mascot'
</script>

<template>
  <PageIntro
    kicker="404"
    title="This page does not exist"
    lead="The link may be old or mistyped."
    :mascot="mascot.notFound"
  >
    <RouterLink to="/" class="btn btn-primary">Go to the start page</RouterLink>
  </PageIntro>
</template>
