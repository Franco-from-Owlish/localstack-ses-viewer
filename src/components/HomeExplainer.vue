<template>
  <v-container>
    <h1>See your Localstack Messages in your browser</h1>

    <h2>Setup</h2>
    <p>
      Add Localstack Message Viewer to your Localstack configuration's CORS allowed origins:
      <v-code> EXTRA_CORS_ALLOWED_ORIGINS={{ baseUrl }} </v-code>
    </p>
  </v-container>
</template>

<script setup lang="ts">
const baseUrl = import.meta.env.VITE_HOST
</script>

<style scoped></style>
