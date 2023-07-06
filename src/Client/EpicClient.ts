import * as R4 from "fhir/r4";
import SubClient, { FhirClientTypes } from "../FhirClient";
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

  async requestResource(resourceID: string) {
    const resultResource = await this.fhirClientDefault.request(resourceID)
    return resultResource as R4.Resource
  }
}

