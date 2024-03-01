<template>
  <v-tooltip :text="status">
    <template v-slot:activator="{ props }">
      <v-chip
        v-bind="props"
        class="my-1 px-2 bg-primary"
        rounded
        size="x-small"
      >
    <span class="text-uppercase mr-1">
    {{ serviceName }}
    </span>
        <template #append>
          <v-icon :color="colour" :icon="mdiCircle" />
        </template>
      </v-chip>
    </template>
  </v-tooltip>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { mdiCircle } from '@mdi/js'
import type { ServiceStatus, SupportedServices } from '@/stores/localstack'
import { useLocalstackStore } from '@/stores/localstack'

const props = defineProps<{
  serviceName: SupportedServices;
}>()

const localstackStore = useLocalstackStore()

const status = computed<ServiceStatus>(() => localstackStore.serviceStatus(props.serviceName))
const colour = computed<string>(() => {
  switch (status.value) {
    case 'available':
      return 'orange'
    case 'running':
      return 'green'
    case 'error':
      return 'red'
    default:
      return 'red-darken-5'
  }
});
</script>

<style scoped>

</style>