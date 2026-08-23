/**
 * @interface FinancingProvider
 * Core interface contract for automotive financing integrations.
 */
export class FinancingProvider {
  /**
   * Generates the secure destination application URL.
   */
  async getApplicationUrl() {
    throw new Error('getApplicationUrl must be implemented by provider');
  }

  /**
   * Retrieves sanitized provider status/configuration.
   */
  async getProviderStatus() {
    throw new Error('getProviderStatus must be implemented by provider');
  }

  /**
   * Optional: submit lead directly to CRM/API if official credentials exist.
   */
  async submitLead() {
    throw new Error('submitLead is not supported without official provider CRM credentials');
  }

  /**
   * Optional: test connectivity to provider.
   */
  async testConnection() {
    throw new Error('testConnection is not supported without official provider credentials');
  }
}
