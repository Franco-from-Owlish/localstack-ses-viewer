<template>
  <v-card
    class="mx-1 mt-1 mb-3"
    :class="{
      active: active
    }"
  >
    <v-row no-gutters>
      <v-card-title>
        {{ email.Destination.ToAddresses[0] }}
      </v-card-title>
      <v-spacer />
      <v-badge v-if="!email.Read" inline dot color="red" />
    </v-row>
    <v-card-subtitle>
      {{ email.Source }}
    </v-card-subtitle>
    <v-card-item>
      <v-card-title>
        {{ email.Subject ?? '' }}
      </v-card-title>
      <v-text-field
        v-if="email.Body.text_part"
        :model-value="email.Body.text_part"
        single-line
        readonly
      />
    </v-card-item>
  </v-card>
</template>

<script setup lang="ts">
import type { IEmail } from '@/stores/emails/models'

defineProps<{
  email: IEmail
  active: boolean
}>()
</script>

<style scoped lang="scss">
.active {
  background-color: rgb(var(--v-theme-secondary)) !important;
}
</style>
