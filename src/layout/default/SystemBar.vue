<template>
  <v-system-bar class="bg-secondary">
    <v-spacer />
    <IconServiceStatus
      v-for="service in supportedServices"
      :key="service"
      :service-name="service"
    />
  </v-system-bar>
</template>

<script setup lang="ts">
import { supportedServices } from '@/stores/localstack'
import IconServiceStatus from '@/components/icons/IconServiceStatus.vue'
</script>

<style scoped>

</style>