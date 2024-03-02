<template>
  <DefaultLayout />
</template>

<script setup lang="ts">
import DefaultLayout from '@/layout/DefaultLayout.vue'
import { useLocalstackStore } from '@/stores/localstack'

const localstackStore = useLocalstackStore()

localstackStore.healthCheck()
</script>
