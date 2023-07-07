import SubClient from "../FhirClient";
import { FhirClientResourceWithRequiredType } from "../types";
import BaseClient from "./BaseClient";

/**
Represents the CernerClient class, extending the BaseClient.
*/
export default class CernerClient extends BaseClient {
  readonly cernerRequestHeaders: HeadersInit = {
    Accept: "application/fhir+json",
  };
  /**
   * Creates an instance of CernerClient.
   * @param {SubClient} fhirClientDefault - The default FHIR client to use.
   */
  constructor(fhirClientDefault: SubClient) {
    super(fhirClientDefault);
  }

  /**
   * Hydrates a resource with subject and encounter context.
   * @param {T} resource - The resource to hydrate.
   * @returns {Promise<T>} - A promise resolving to the hydrated resource.
   */
  async hydrateResource<T extends FhirClientResourceWithRequiredType>(
    resource: T
  ) {
    return {
      ...(await super.hydrateResource(resource)),
      ...("author" in resource ? {} : await super.createReferenceArrayAuthor()),
    };
  }

  async requestResource(resourceID: string) {
    return super.requestResource(resourceID, {
      headers: this.cernerRequestHeaders,
    });
  }
}
