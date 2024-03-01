<template>
  <v-main class="d-flex align-center justify-center fill-height">
    <div class="mx-auto my-4 px-3 py-5 fill-height container">
      <RouterView/>
    </div>
  </v-main>
</template>

<script setup lang="ts">
</script>

<style>
.container {
  width: 90%;
}
</style>