import * as R4 from "fhir/r4";
import SubClient from "../FhirClient";
import { R4ResourceWithRequiredType } from "../types";
import BaseClient from "./BaseClient";

/**
Represents the CernerClient class, extending the BaseClient.
*/
export default class CernerClient extends BaseClient {
  /**
   * Creates an instance of CernerClient.
   * @param {SubClient} fhirClientDefault - The default FHIR client to use.
   */
  constructor(fhirClientDefault: SubClient) {
    super(fhirClientDefault);
  }

  /**
   * Creates a resource.
   * @override
   * @param {T} resource - The resource to create.
   * @returns {Promise<R4.Resource>} - A promise resolving to the created resource.
   * @throws {Error} - Throws an error indicating the method is not implemented.
   */
  create<T extends R4ResourceWithRequiredType>(
    resource: T
  ): Promise<T> {
    throw new Error("Method not implemented.");
  }
}
