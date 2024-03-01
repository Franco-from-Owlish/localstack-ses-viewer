import { useLocalStorage } from "@vueuse/core";
import { defineStore } from 'pinia';

export const useLocalstackStore = defineStore('localstack', () => {
  const host = useLocalStorage<string>(
    'localstack_host', 'http://localhost:4566/'
  );

  function setHost(hostUrl: string) {
    host.value = hostUrl;
  }

  return {
    // state
    host,

    // getters

    // actions
    setHost
  }
})
