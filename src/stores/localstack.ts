import { useLocalStorage, useSessionStorage } from '@vueuse/core'
import { defineStore } from 'pinia'
import { Endpoints } from '@/stores/emails/endpoints'
import { computed } from 'vue'

export const supportedServices = ['ses'] as const
export type SupportedServices = (typeof supportedServices)[number]

export type ServiceStatus = 'available' | 'running' | 'error'

type SupportedServicesStatus = Record<SupportedServices, ServiceStatus>

interface HealthCheckResponse {
  services: { [key: string]: ServiceStatus }
  edition: string
  version: string
}

const defaultHeaders = {
  Accept: 'application/json',
  'Content-Type': 'application/json'
}

export const useLocalstackStore = defineStore('localstack', () => {
  /**
   * Host where localstack is accessible
   */
  const host = useLocalStorage<string>('localstack_host', 'http://localhost:4566/')
  /**
   * Status of the supported services
   */
  const services = useSessionStorage<SupportedServicesStatus>('localstack_services', {
    ses: 'error'
  })

  /**
   * Get the status of a specified service
   */
  const serviceStatus = computed<(serviceName: SupportedServices) => ServiceStatus>(
    () =>
      function (serviceName: SupportedServices): ServiceStatus {
        return services.value[serviceName]
      }
  )
  /**
   * Get the status of all supported services
   */
  const status = computed<boolean>(() => {
    for (const service of Object.keys(services.value)) {
      const status = serviceStatus.value(<SupportedServices>service)
      if (status != 'running') {
        return false
      }
    }
    return true
  })

  /**
   * Localstack health check. Ensure the supported services are working.
   * @param externalHost Host where localstack is accessible.
   * @return Boolean indicating if the services are healthy.
   */
  async function healthCheck(externalHost: string = host.value): Promise<void> {
    let data: HealthCheckResponse
    try {
      const response = await fetch(`${externalHost}${Endpoints.health}`, {
        method: 'GET',
        headers: defaultHeaders
      })
      data = await response.json()
    } catch (e) {
      return
    }
    if (data) {
      for (const service of Object.keys(services.value)) {
        services.value[<SupportedServices>service] = data.services[service]
      }
    }
  }

  return {
    // state
    host,

    // getters
    serviceStatus,
    status,

    // actions
    healthCheck
  }
})
