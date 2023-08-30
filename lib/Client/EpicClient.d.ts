import SubClient from "../FhirClient";
import { R4ResourceWithRequiredType } from "../types";
import BaseClient from "./BaseClient";
export declare const EPIC_TOKEN_ENDPOINT = "https://fhir.epic.com/interconnect-fhir-oauth/oauth2/token";
export declare const EPIC_R4_ENDPOINT = "https://fhir.epic.com/interconnect-fhir-oauth/api/FHIR/R4/";
/**
Represents the EpicClient class, extending the BaseClient.
*/
export default class EpicClient extends BaseClient {
    readonly epicCreateHeaders: HeadersInit;
    /**
     * Creates an instance of EpicClient.
     * @param {SubClient} fhirClientDefault - The default FHIR client to use.
     */
    constructor(fhirClientDefault: SubClient);
    create<T extends R4ResourceWithRequiredType>(resource: T): Promise<T>;
}
