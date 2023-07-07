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
  readonly epicCreateHeaders: HeadersInit = {
    Prefer: "return=representation",
  };
  /**
   * Creates an instance of EpicClient.
   * @param {SubClient} fhirClientDefault - The default FHIR client to use.
   */
  constructor(fhirClientDefault: SubClient) {
    super(fhirClientDefault);
  }

  async create<T extends R4ResourceWithRequiredType>(resource: T): Promise<T> {
    return super.create(resource, this.createHeaders(this.epicCreateHeaders));
  }
}
