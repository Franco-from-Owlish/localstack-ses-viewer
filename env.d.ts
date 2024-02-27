/// <reference types="vite/client" />

interface ImportMetaEnv {
  readonly BASE_URL: string
  readonly VITE_APP_TITLE: string
  readonly VITE_LOCALSTACK_URL: string
}

interface ImportMeta {
  readonly env: ImportMetaEnv
}