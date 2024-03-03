<template>
  <v-main class="d-flex align-center justify-center main-view">
    <div class="mx-auto my-4 px-3 py-5 fill-height container overflow-hidden">
      <RouterView />
    </div>
  </v-main>
</template>

<script setup lang="ts"></script>

<style>
.main-view {
  height: 100vh;
}
.container {
  width: 90%;
  height: calc(100vh - 100px);
}
</style>
