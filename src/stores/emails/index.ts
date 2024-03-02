import { computed } from 'vue'
import { defineStore } from 'pinia'
import type { IEmail, ILocalstackSesMessage, ILocalstackSesResponse } from '@/stores/emails/models'
import { localstackApi } from '@/modules/axios'
import { Endpoints } from '@/stores/emails/endpoints'
import { useSessionStorage } from '@vueuse/core'

const pollingTimeout: number = 10000;

export const useEmailStore = defineStore('emails', () => {
  const emails= useSessionStorage<IEmail[]>('email_emails',[]);

  let fetchTimeoutId: ReturnType<typeof setTimeout>;

  const unread = computed<Array<IEmail>>(
    () => emails.value.filter((email: IEmail) => email.Read)
  );
  const read = computed<Array<IEmail>>(
    () => emails.value.filter((email: IEmail) => !email.Read)
  );

  async function fetchEmails() {
    clearTimeout(fetchTimeoutId);
    const response = await localstackApi
      .get<ILocalstackSesResponse>(Endpoints.ses);
    fetchTimeoutId = setTimeout(fetchEmails, pollingTimeout);
    if (
      (response.status >= 300) ||
      (Object.keys(response.data).length === 0) ||
      (response.data.messages.length === 0)) {
      return
    }

    const emailIds = emails.value.map<string>(e => e.Id);
    const newEmails = response.data.messages.filter(
      email => !emailIds.includes(email.Id)
    );

    // add new emails
    emails.value.push(...newEmails.map<IEmail>((e: ILocalstackSesMessage) => {
      return {
        ...e,
        Read: false
      }
    }));
  }

  return {
    // state
    emails,

    // getters
    unread,
    read,

    // actions
    fetchEmails
  }
})
