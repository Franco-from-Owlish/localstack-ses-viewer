<template>
  <v-app>
    <SystemBar />
    <AppBar />
    <NavigationDrawer />
    <MainView />
  </v-app>
</template>

<script setup lang="ts">
import AppBar from '@/layout/default/AppBar.vue'
import MainView from '@/layout/default/MainView.vue'
import NavigationDrawer from '@/layout/default/NavigationDrawer.vue'
import SystemBar from '@/layout/default/SystemBar.vue'
</script>
