import { useLocalStorage } from "@vueuse/core";
import { defineStore } from 'pinia';
import { Endpoints } from '@/stores/emails/endpoints'
import { computed } from 'vue'

type ServiceStatus = "available" | "running" | "error";
type SupportedServices = "ses"
type SupportedServicesStatus = Record<SupportedServices, ServiceStatus>;

interface HealthCheckResponse {
  services: { [key: string]: ServiceStatus };
  edition: string;
  version: string;
}

const defaultHeaders = {
  'Accept': 'application/json',
  'Content-Type': 'application/json'
}

export const useLocalstackStore = defineStore('localstack', () => {
  /**
   * Host where localstack is accessible
   */
  const host = useLocalStorage<string>(
    'localstack_host', 'http://localhost:4566/'
  );
  /**
   * Status of the supported services
   */
  const services = useLocalStorage<SupportedServicesStatus>(
    'localstack_services', { 'ses': 'error' }
  );

  const serviceStatus = computed<
    (serviceName: SupportedServices) => ServiceStatus
  >(
    () => function(serviceName: SupportedServices): ServiceStatus {
      return services.value[serviceName];
  });

  /**
   * Set host value
   * @param hostUrl
   */
  function setHost(hostUrl: string) {
    host.value = hostUrl;
  }

  /**
   * Localstack health check. Ensure the supported services are working.
   * @param externalHost Host where localstack is accessible.
   * @return Boolean indicating if the services are healthy.
   */
  async function healthCheck(externalHost: string = host.value): Promise<boolean> {
    let data: HealthCheckResponse;
    try {
      const response = await fetch(
        `${externalHost}${Endpoints.health}`,
        {
          method: 'GET',
          headers: defaultHeaders
        }
      );
      data = await response.json();
    } catch (e) {
      return false;
    }
    if (data) {
      for (const service in Object.keys(services.value)) {
        const status = data.services[service];
        services.value[<SupportedServices>service] = status;
        if (status != 'running') {
          return false;
        }
      }
      return true;
    }
    return false;
  }

  return {
    // state
    host,

    // getters
    serviceStatus,

    // actions
    healthCheck,
    setHost
  }
})
