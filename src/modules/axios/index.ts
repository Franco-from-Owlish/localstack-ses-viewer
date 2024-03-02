import axios from 'axios'
import { useLocalstackStore } from '@/stores/localstack'

export const localstackApi = axios.create({
  baseURL: useLocalstackStore().host,
  timeout: 10000,
  headers: {
    Accept: 'application/json',
    'Content-Type': 'application/json'
  }
})
