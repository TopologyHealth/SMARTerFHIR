import SubClient from "../FhirClient"
import { EMR } from "../Launcher/SmartLaunchHandler"
import BaseClient, { EMR_ENDPOINTS } from "./BaseClient"


/**
 Represents the MedplumClient class, extending the BaseClient.
 */
export default class MedplumClient extends BaseClient {
	readonly EMR_TYPE: EMR = EMR.MEDPLUM
	static readonly AUTHORIZE_ENDPOINT = "https://api.medplum.com/oauth2/authorize"
	static readonly TOKEN_ENDPOINT = "https://api.medplum.com/oauth2/token"
	static readonly R4_ENDPOINT = "https://api.medplum.com/r4/fhir"

	static getEndpoints(): EMR_ENDPOINTS {
		return BaseClient.constructEndpoints(MedplumClient.TOKEN_ENDPOINT, MedplumClient.R4_ENDPOINT, MedplumClient.AUTHORIZE_ENDPOINT)
	}

	getEndpoints(): EMR_ENDPOINTS {
		return MedplumClient.getEndpoints()
	}

	/**
   * Creates an instance of MedplumClient.
   * @param {SubClient} fhirClientDefault - The default FHIR client to use.
   */
	constructor(fhirClientDefault: SubClient) {
		super(fhirClientDefault)
	}
}
