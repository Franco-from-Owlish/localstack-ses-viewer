<template>
  <v-card
    ref="card"
    class="mx-1 mt-1 mb-3"
    :class="{
      active: active
    }"
  >
    <v-card-title>
      {{ email.Destination.ToAddresses[0] }}
    </v-card-title>
    <v-card-subtitle>
      {{ email.Source }}
    </v-card-subtitle>
    <v-card-item>
      <v-card-title>
        {{ email.Subject ?? '' }}
      </v-card-title>
      <div>
        {{ email.Body.text_part }}
      </div>
    </v-card-item>
  </v-card>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import type { IEmail } from '@/stores/emails/models'

defineProps<{
  email: IEmail
  active: boolean
}>()

const card = ref()
</script>

<style scoped lang="scss">
.active {
  background-color: rgb(var(--v-theme-secondary)) !important;
}
</style>
