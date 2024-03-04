<template>
  <v-card class="fill-height pa-2 my-4">
    <v-row class="ma-2">
      <v-table>
        <tr>
          <th scope="row">Sent</th>
          <td>{{ new Date(email.Timestamp) }}</td>
        </tr>
        <tr>
          <th scope="row">From</th>
          <td>{{ email.Source }}</td>
        </tr>
        <tr>
          <th scope="row">To</th>
          <td>
            <v-chip v-for="receiver in email.Destination.ToAddresses" :key="receiver" pill>
              {{ receiver }}
            </v-chip>
          </td>
        </tr>
      </v-table>
    </v-row>

    <v-card-title>
      {{ email.Subject ?? 'No subject' }}
    </v-card-title>

    <v-card-item>
      <div v-html="email.Body.html_part" />
    </v-card-item>
  </v-card>
</template>

<script setup lang="ts">
import type { IEmail } from '@/stores/emails/models'
import { onMounted, onUpdated } from 'vue'
import { useEmailStore } from '@/stores/emails'

const props = defineProps<{
  email: IEmail
}>()

const emailStore = useEmailStore()

onMounted(() => {
  emailStore.markRead(props.email.Id)
})
onUpdated(() => {
  emailStore.markRead(props.email.Id)
})
</script>

<style scoped>
th {
  margin: 2px;
  padding: 4px;
  text-align: left;
}
</style>
