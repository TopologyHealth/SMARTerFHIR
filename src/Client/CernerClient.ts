import * as R4 from "fhir/r4";
import SubClient from "../FhirClient";
import { FhirClientResourceWithRequiredType } from "../types";
import BaseClient from "./BaseClient";

/**
Represents the CernerClient class, extending the BaseClient.
*/
export default class CernerClient extends BaseClient {
  requestResource(resourceID: string): Promise<R4.Resource> {
    throw new Error("Method not implemented.");
  }
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
}
