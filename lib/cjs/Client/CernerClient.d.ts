import SubClient from "../FhirClient";
import { EMR } from "../Launcher/SmartLaunchHandler";
import { FhirClientResourceWithRequiredType, R4ResourceWithRequiredType } from "../types";
import BaseClient, { EMR_ENDPOINTS } from "./BaseClient";
/**
Represents the CernerClient class, extending the BaseClient.
*/
export default class CernerClient extends BaseClient {
    EMR_TYPE: EMR;
    static readonly AUTHORIZE_ENDPOINT = "https://authorization.cerner.com/tenants/ec2458f2-1e24-41c8-b71b-0e701af7583d/protocols/oauth2/profiles/smart-v1/personas/provider/authorize";
    static readonly TOKEN_ENDPOINT = "https://authorization.cerner.com/tenants/ec2458f2-1e24-41c8-b71b-0e701af7583d/protocols/oauth2/profiles/smart-v1/token";
    static readonly R4_ENDPOINT = "https://fhir-ehr-code.cerner.com/r4/ec2458f2-1e24-41c8-b71b-0e701af7583d";
    static getEndpoints(): EMR_ENDPOINTS;
    getEndpoints(): EMR_ENDPOINTS;
    readonly cernerRequestHeaders: HeadersInit;
    /**
     * Creates an instance of CernerClient.
     * @param {SubClient} fhirClientDefault - The default FHIR client to use.
     */
    constructor(fhirClientDefault: SubClient);
    /**
     * Hydrates a resource with subject and encounter context.
     * @param {T} resource - The resource to hydrate.
     * @returns {Promise<T>} - A promise resolving to the hydrated resource.
     */
    hydrateResource<T extends FhirClientResourceWithRequiredType, U extends R4ResourceWithRequiredType>(fhirClientResource: T, r4Resource: U): Promise<T & {
        author?: import("fhir/r4").Reference[] | undefined;
    }>;
    /**
     * The function `requestResource` is an asynchronous function that makes a request for a resource using a resource ID and Cerner request headers.
     * @param {string} resourceID - The resourceID parameter is a string that represents the ID of the resource that you want to request.
     * @returns The `requestResource` function is returning a promise.
     */
    requestResource(resourceID: string): Promise<import("fhir/r4").Resource>;
}
