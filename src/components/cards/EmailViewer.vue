<template>
  <v-card class="fill-height pa-2">
    <v-row class="ma-2">
      <v-table>
        <tr>
          <td>From</td>
          <td>{{email.Source}}</td>
        </tr>
        <tr>
          <td>To</td>
          <td>
            <v-chip
              v-for="receiver in email.Destination.ToAddresses"
              :key="receiver"
              pill
            >
              {{receiver}}
            </v-chip>
          </td>
        </tr>
      </v-table>
    </v-row>

    <v-card-title>
      {{email.Subject ?? "No subject"}}
    </v-card-title>

    <v-card-item>
      <div v-html="email.Body.html_part"/>
    </v-card-item>

  </v-card>
</template>

<script setup lang="ts">
import type { IEmail } from '@/stores/emails/models'

defineProps<{
  email: IEmail;
}>()
</script>

<style scoped>

</style>