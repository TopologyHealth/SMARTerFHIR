import SubClient from "../FhirClient";
import { R4ResourceWithRequiredType } from "../types";
import BaseClient, { EMR_ENDPOINTS } from "./BaseClient";
/**
 Represents the EpicClient class, extending the BaseClient.
 */
export default class EpicClient extends BaseClient {
    static readonly AUTHORIZE_ENDPOINT = "https://fhir.epic.com/interconnect-fhir-oauth/oauth2/authorize";
    static readonly TOKEN_ENDPOINT = "https://fhir.epic.com/interconnect-fhir-oauth/oauth2/token";
    static readonly R4_ENDPOINT = "https://fhir.epic.com/interconnect-fhir-oauth/api/FHIR/R4/";
    static getEndpoints(): EMR_ENDPOINTS;
    getEndpoints(): EMR_ENDPOINTS;
    readonly epicCreateHeaders: HeadersInit;
    /**
   * Creates an instance of EpicClient.
   * @param {SubClient} fhirClientDefault - The default FHIR client to use.
   */
    constructor(fhirClientDefault: SubClient);
    create<T extends R4ResourceWithRequiredType>(resource: T): Promise<T>;
}
