<template>
  <v-container class="main-container">
    <v-row>
      <slot />
    </v-row>
  </v-container>
</template>

<script setup lang="ts">
</script>

<style scoped lang="scss">
@import "vuetify";

.main-container {
  height: calc(100vh - 122px);
  width: 100%;
  @extend .overflow-y-auto;
  @extend .my-0;
  @extend .py-4;
  @extend .bg-grey-lighten-3;
  @extend .rounded;
}
</style>