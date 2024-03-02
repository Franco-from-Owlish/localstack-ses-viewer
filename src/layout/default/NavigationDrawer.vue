<template>
  <v-navigation-drawer class="bg-secondary">
    <v-list class="bg-transparent">
      <v-list-item
        v-for="route in routes"
        :key="route.name"
        link
        :active="currentRoute.path === route.path"
      >
        <router-link :to="route.path" class="text-decoration-none text-none">
          <v-list-item-title class="text-capitalize text-black">
            {{ route.name }}
          </v-list-item-title>
        </router-link>
      </v-list-item>
    </v-list>
  </v-navigation-drawer>
</template>

<script setup lang="ts">
import mainRoutes from '@/router/routes'
import { useRoute } from 'vue-router'

const currentRoute = useRoute()

interface INavItem {
  name: string
  path: string
}

const routes = mainRoutes.map<INavItem>((r) => {
  return {
    name: r.name ?? r.path.slice(1).toUpperCase(),
    path: r.path
  } as INavItem
})
</script>

<style scoped></style>
