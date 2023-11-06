import SubClient from "../FhirClient"
import BaseClient, { EMR_ENDPOINTS } from "./BaseClient"


/**
 Represents the SmartHealthClient class, extending the BaseClient.
 */
export default class SmartHealthClient extends BaseClient {
	static readonly AUTHORIZE_ENDPOINT = "https://launch.smarthealthit.org/v/r4/auth/authorize"
	static readonly TOKEN_ENDPOINT = "https://launch.smarthealthit.org/v/r4/auth/token"
	static readonly R4_ENDPOINT = "https://launch.smarthealthit.org/v/r4/fhir"

	static getEndpoints(): EMR_ENDPOINTS {
		return BaseClient.constructEndpoints(SmartHealthClient.TOKEN_ENDPOINT, SmartHealthClient.R4_ENDPOINT, SmartHealthClient.AUTHORIZE_ENDPOINT)
	}

	getEndpoints(): EMR_ENDPOINTS {
		return SmartHealthClient.getEndpoints()
	}

	/**
   * Creates an instance of SmartHealthClient.
   * @param {SubClient} fhirClientDefault - The default FHIR client to use.
   */
	constructor(fhirClientDefault: SubClient) {
		super(fhirClientDefault)
	}
}
