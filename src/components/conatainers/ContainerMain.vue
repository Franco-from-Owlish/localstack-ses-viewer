<template>
  <v-container class="main-container my-0 pb-2 pt-4 bg-grey-lighten-3 rounded overflow-y-auto">
    <v-row>
      <slot />
    </v-row>
  </v-container>
</template>

<script setup lang="ts">
</script>

<style scoped>
.main-container {
  max-height: calc(100vh - 90px - 16px - 16px);
  width: 100%;
}
</style>