<template>
  <v-btn @click="healthCheck" :disabled="loading" :color="colour"> Health Check </v-btn>
</template>

<script setup lang="ts">
import { useLocalstackStore } from '@/stores/localstack'
import { computed, ref } from 'vue'

const localstackStore = useLocalstackStore()

const loading = ref<boolean>(false)

const status = computed<boolean>(() => localstackStore.status)
const colour = computed<string>(() => (status.value ? 'success' : 'error'))

async function healthCheck() {
  loading.value = true
  await localstackStore.healthCheck()
  loading.value = false
}
</script>

<style scoped></style>
