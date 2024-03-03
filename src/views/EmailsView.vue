<template>
  <ContainerMain>
    <v-col cols="3" class="fill-height bg-transparent rounded">
      <v-virtual-scroll height="100%" :items="emailStore.emails">
        <template #default="{ item }">
          <EmailPreview
            @click="selectedEmail = item"
            :active="selectedEmail?.Id === item.Id"
            :email="item"
          />
        </template>
      </v-virtual-scroll>
    </v-col>
    <v-col cols="9" class="fill-height px-1 py-0">
      <EmailViewer v-if="selectedEmail" :email="selectedEmail" />
    </v-col>
  </ContainerMain>
</template>

<script setup lang="ts">
import { useEmailStore } from '@/stores/emails'
import type { IEmail } from '@/stores/emails/models'
import EmailPreview from '@/components/cards/EmailPreview.vue'
import { ref } from 'vue'
import EmailViewer from '@/components/cards/EmailViewer.vue'
import ContainerMain from '@/components/conatainers/ContainerMain.vue'

const emailStore = useEmailStore()

const selectedEmail = ref<IEmail>()

// on-created
emailStore.fetchEmails()
</script>

<style scoped></style>
