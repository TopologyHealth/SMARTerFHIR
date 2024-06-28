import SubClient from "../FhirClient";
import { EMR } from "../Launcher/SmartLaunchHandler";
import { R4ResourceWithRequiredType } from "../types";
import BaseClient, { EMR_ENDPOINTS } from "./BaseClient";
/**
 Represents the AthenaClient class, extending the BaseClient.
 */
export default class AthenaClient extends BaseClient {
    EMR_TYPE: EMR;
    static readonly AUTHORIZE_ENDPOINT = "https://api.preview.platform.athenahealth.com/oauth2/v1/authorize";
    static readonly TOKEN_ENDPOINT = "https://api.preview.platform.athenahealth.com/oauth2/v1/token";
    static readonly R4_ENDPOINT = "https://api.platform.athenahealth.com/v1/195900";
    static readonly R4_ENDPOINT_PREVIEW = "https://api.preview.platform.athenahealth.com/v1/195900";
    static getEndpoints(): EMR_ENDPOINTS;
    getEndpoints(): EMR_ENDPOINTS;
    readonly athenaCreateHeaders: HeadersInit;
    /**
     * Creates an instance of AthenaClient.
     * @param {SubClient} fhirClientDefault - The default FHIR client to use.
     */
    constructor(fhirClientDefault: SubClient);
    create<T extends R4ResourceWithRequiredType>(resource: T, patientId?: string, encounterId?: string): Promise<T>;
}
