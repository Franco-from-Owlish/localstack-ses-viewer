<template>
<v-card class="pa-4">
  <v-card-title>
    Localstack
  </v-card-title>
  <v-form ref="form" class="my-2">
    <v-text-field
      @update:model-value="resetValidation"
      v-model="host"
      label="External Host"
      :rules="hostRules"
    />

    <v-row class="px-3">
      <v-spacer/>
      <v-btn
        class="mx-2"
        @click="resetForm"
      >
        Reset
      </v-btn>
      <v-btn
        class="ml-2"
        @click="submit"
      >
        Save
      </v-btn>
    </v-row>
  </v-form>
</v-card>
</template>

<script setup lang="ts">
import { useLocalstackStore } from '@/stores/localstack'
import { ref } from 'vue'
import type { VForm } from 'vuetify/components'

const localstackStore = useLocalstackStore();

const form = ref<VForm>();
const formValid = ref<boolean>(false);

const host = ref<string>(localstackStore.host);

const hostRules = [
  (value: string) => !!value || "Host required",
  (value: string) =>
    (value.startsWith('http://') || value.startsWith('https://')) ||
    "Host must start with 'http[s]://",
  (value: string) =>
    (value.endsWith('/')) || "Host must end with '/",
]

async function submit() {
  await validate();
  if (formValid.value) {
    localstackStore.$patch({
      host: host.value
    });
  }
}

async function validate() {
  if (form.value) {
    const { valid } = await form.value.validate()
    formValid.value = valid;
  }
}

function resetValidation() {
  if (form.value) {
    form.value.resetValidation();
    formValid.value = false;
  }
}

function resetForm() {
  if (form.value) {
    form.value.reset();
    host.value = localstackStore.host;
  }
}

</script>

<style scoped>

</style>