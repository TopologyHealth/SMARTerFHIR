import * as R4 from "fhir/r4";
import SubClient from "../FhirClient";
import { R4ResourceWithRequiredType } from "../types";
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

}
