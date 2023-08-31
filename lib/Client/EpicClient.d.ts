import SubClient from "../FhirClient";
import { R4ResourceWithRequiredType } from "../types";
import BaseClient, { EMR_ENDPOINTS } from "./BaseClient";
/**
Represents the EpicClient class, extending the BaseClient.
*/
export default class EpicClient extends BaseClient {
    readonly defaultEndpoints: EMR_ENDPOINTS;
    readonly epicCreateHeaders: HeadersInit;
    /**
   * Creates an instance of EpicClient.
   * @param {SubClient} fhirClientDefault - The default FHIR client to use.
   */
    constructor(fhirClientDefault: SubClient);
    create<T extends R4ResourceWithRequiredType>(resource: T): Promise<T>;
}
