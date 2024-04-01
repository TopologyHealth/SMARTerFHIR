import SubClient from "../FhirClient";
import { EMR } from "../Launcher/SmartLaunchHandler";
import BaseClient, { EMR_ENDPOINTS } from "./BaseClient";
/**
 Represents the SmartHealthClient class, extending the BaseClient.
 */
export default class SmartHealthClient extends BaseClient {
    readonly EMR_TYPE: EMR;
    static readonly AUTHORIZE_ENDPOINT = "https://launch.smarthealthit.org/v/r4/auth/authorize";
    static readonly TOKEN_ENDPOINT = "https://launch.smarthealthit.org/v/r4/auth/token";
    static readonly R4_ENDPOINT = "https://launch.smarthealthit.org/v/r4/fhir";
    static getEndpoints(): EMR_ENDPOINTS;
    getEndpoints(): EMR_ENDPOINTS;
    /**
   * Creates an instance of SmartHealthClient.
   * @param {SubClient} fhirClientDefault - The default FHIR client to use.
   */
    constructor(fhirClientDefault: SubClient);
}
