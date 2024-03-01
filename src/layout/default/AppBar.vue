<template>
  <v-app-bar class="bg-primary">
    <v-app-bar-nav-icon :icon="mdiMessageBadge" />
    <v-app-bar-title>
      Localstack Message Viewer
    </v-app-bar-title>
  </v-app-bar>
</template>

<script setup lang="ts">
import { mdiMessageBadge } from '@mdi/js';
</script>