import SubClient from "../FhirClient"
import { EMR } from "../Launcher/SmartLaunchHandler"
import { R4ResourceWithRequiredType } from "../types"
import BaseClient, { EMR_ENDPOINTS } from "./BaseClient"


/**
 Represents the AthenaClient class, extending the BaseClient.
 */
export default class AthenaClient extends BaseClient {
	EMR_TYPE: EMR = EMR.ATHENA
	static readonly AUTHORIZE_ENDPOINT = "https://api.preview.platform.athenahealth.com/oauth2/v1/authorize"
	static readonly TOKEN_ENDPOINT = "https://api.preview.platform.athenahealth.com/oauth2/v1/token"
	static readonly R4_ENDPOINT = "https://api.platform.athenahealth.com/v1/195900"
	static readonly R4_ENDPOINT_PREVIEW = "https://api.preview.platform.athenahealth.com/v1/195900"

	static getEndpoints(): EMR_ENDPOINTS {
		return BaseClient.constructEndpoints(AthenaClient.TOKEN_ENDPOINT, AthenaClient.R4_ENDPOINT, AthenaClient.AUTHORIZE_ENDPOINT)
	}

	getEndpoints(): EMR_ENDPOINTS {
		return AthenaClient.getEndpoints()
	}

	/* The `athenaCreateHeaders` property is defining the headers that will be used when making a create request to the Athena FHIR server. In this case, it sets the
`Prefer` header to `"return=representation"`, which indicates that the server should return the created resource in the response. */
	readonly athenaCreateHeaders: HeadersInit = {
		Prefer: "return=representation",
	}
	/**
	 * Creates an instance of AthenaClient.
	 * @param {SubClient} fhirClientDefault - The default FHIR client to use.
	 */
	constructor(fhirClientDefault: SubClient) {
		super(fhirClientDefault)
	}

	async create<T extends R4ResourceWithRequiredType>(resource: T,
		patientId?: string,
		encounterId?: string): Promise<T> {
		return super.create(resource, patientId, encounterId, this.createHeaders(this.athenaCreateHeaders),)
	}
}
