import SubClient from "../FhirClient"
import { R4ResourceWithRequiredType } from "../types"
import BaseClient, { EMR_ENDPOINTS } from "./BaseClient"


/**
 Represents the EpicClient class, extending the BaseClient.
 */
export default class EpicClient extends BaseClient {
	static readonly AUTHORIZE_ENDPOINT = "https://fhir.epic.com/interconnect-fhir-oauth/oauth2/authorize"
	static readonly TOKEN_ENDPOINT = "https://fhir.epic.com/interconnect-fhir-oauth/oauth2/token"
	static readonly R4_ENDPOINT = "https://fhir.epic.com/interconnect-fhir-oauth/api/FHIR/R4"

	static getEndpoints(): EMR_ENDPOINTS {
		return BaseClient.constructEndpoints(EpicClient.TOKEN_ENDPOINT, EpicClient.R4_ENDPOINT, EpicClient.AUTHORIZE_ENDPOINT)
	}

	getEndpoints(): EMR_ENDPOINTS {
		return EpicClient.getEndpoints()
	}

	/* The `epicCreateHeaders` property is defining the headers that will be used when making a create request to the Epic FHIR server. In this case, it sets the
`Prefer` header to `"return=representation"`, which indicates that the server should return the created resource in the response. */
	readonly epicCreateHeaders: HeadersInit = {
		Prefer: "return=representation",
	}
	/**
	 * Creates an instance of EpicClient.
	 * @param {SubClient} fhirClientDefault - The default FHIR client to use.
	 */
	constructor(fhirClientDefault: SubClient) {
		super(fhirClientDefault)
	}

	async create<T extends R4ResourceWithRequiredType>(resource: T,
		patientId?: string,
		encounterId?: string): Promise<T> {
		return super.create(resource, patientId, encounterId, this.createHeaders(this.epicCreateHeaders),)
	}
}
