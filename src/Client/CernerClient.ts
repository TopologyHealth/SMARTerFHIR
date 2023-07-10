import SubClient from "../FhirClient";
import { FhirClientResourceWithRequiredType } from "../types";
import BaseClient from "./BaseClient";

/**
Represents the CernerClient class, extending the BaseClient.
*/
export default class CernerClient extends BaseClient {
  /* The `cernerRequestHeaders` property is a constant that represents the headers to be included in the request made by the CernerClient class. In this case, it
specifies that the client accepts the "application/fhir+json" media type. The `readonly` keyword indicates that the property cannot be modified after it is
initialized. */
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

  /**
   * The function `requestResource` is an asynchronous function that makes a request for a resource using a resource ID and Cerner request headers.
   * @param {string} resourceID - The resourceID parameter is a string that represents the ID of the resource that you want to request.
   * @returns The `requestResource` function is returning a promise.
   */
  async requestResource(resourceID: string) {
    return super.requestResource(resourceID, {
      headers: this.cernerRequestHeaders,
    });
  }
}
