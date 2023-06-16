import * as R4 from "fhir/r4";
import SubClient, { FhirClientTypes } from "../FhirClient";
import { Transformer } from "../Resource/transformer";
import {
  FhirClientResourceWithRequiredType,
  R4ResourceWithRequiredType,
} from "../types";
import BaseClient from "./BaseClient";

/**
Represents the EpicClient class, extending the BaseClient.
*/
export default class EpicClient extends BaseClient {
  /**
   * Creates an instance of EpicClient.
   * @param {SubClient} fhirClientDefault - The default FHIR client to use.
   */
  constructor(fhirClientDefault: SubClient) {
    super(fhirClientDefault);
  }

  /**
   * Fetch options for create operation headers.
   * @private
   * @readonly
   * @type {FhirClientTypes.FetchOptions}
   */
  private readonly createHeaders: FhirClientTypes.FetchOptions = {
    headers: {
      Prefer: "return=representation",
    },
  };

  /**
   * Creates a resource.
   * @override
   * @param {T} resource - The resource to create.
   * @returns {Promise<R4.Resource>} - A promise resolving to the created resource.
   * @throws {Error} - Throws an error if the resource type is not found or if the operation fails.
   */
  async create<T extends R4ResourceWithRequiredType>(
    resource: T
  ): Promise<R4.Resource> {
    const transformedResource = Transformer.toFhirClientType(resource);
    const hydratedResource = await this.hydrateResource(transformedResource);
    const resultResource: FhirClientResourceWithRequiredType =
      await this.fhirClientDefault
        .create(hydratedResource, this.createHeaders)
        .then((resource) => {
          if (!resource.resourceType)
            throw new Error(`Resource ${resource}, must have a resource type.`);
          return resource as FhirClientResourceWithRequiredType;
        })
        .catch((reason) => {
          throw new Error("It failed with:" + reason);
        });
    const resultAsR4 = Transformer.toR4FhirType(resultResource);
    return resultAsR4;
  }
}
