import * as FHIR from "fhirclient"
import jwt_decode from "jwt-decode"
import SubClient, { FhirClientTypes } from "../FhirClient"
import { EMR } from "../Launcher/SmartLaunchHandler"
import BaseClient, { EMR_ENDPOINTS } from "./BaseClient"
import CernerClient from "./CernerClient"
import EpicClient from "./EpicClient"
import Client from "../FhirClient"

export enum LAUNCH {
  EMR,
  STANDALONE,
  BACKEND
}

/**
 * The type represents a JSON Web Token (JWT) with properties for client_id and an optional epic.eci property.
 * @property {string} client_id - A string representing the client ID.
 * @property {string}  - - `client_id`: A string representing the client ID associated with the JWT.
 */
type JWT = {
  client_id: string
  "epic.eci"?: string
}

/**
Represents the ClientFactory class for creating EMR clients.
*/
export default class ClientFactory {

	/**
 * The function `getEMRType` determines the type of Electronic Medical Record (EMR) based on the provided client or token.
 * @param {SubClient | JWT} clientOrToken - The parameter `clientOrToken` can be either a `SubClient` object or a JWT (JSON Web Token).
 * @returns the type of Electronic Medical Record (EMR) based on the input parameter. The possible return values are EMR.CERNER, EMR.SMART, EMR.EPIC, or EMR.NONE.
 */
	private getEMRType(clientOrToken: SubClient | JWT): EMR {
		if (clientOrToken instanceof SubClient) {
			if (clientOrToken.state.serverUrl.includes("cerner")) {
				return EMR.CERNER
			}
			if (clientOrToken.state.serverUrl.includes("smarthealthit")) {
				return EMR.SMART
			}
			if (clientOrToken.state.serverUrl.includes("epic")) {
				return EMR.EPIC
			}
			return EMR.NONE
		}	else {
			if ("epic.eci" in clientOrToken) {
				return EMR.EPIC
			}
			return EMR.NONE
		}
	}


	/**
	 * The function `createEMRClient` creates an EMR client based on the specified launch type.
	 * @param {LAUNCH} launchType - The `launchType` parameter is an optional parameter of type `LAUNCH` that specifies the type of EMR launch. It has a default value
	 * of `LAUNCH.EMR`.
	 * @returns a Promise that resolves to an instance of the `BaseClient` class.
	 */
	async createEMRClient(launchType: LAUNCH = LAUNCH.EMR): Promise<BaseClient> {
		const defaultFhirClient = await this.createDefaultFhirClient(launchType)
		const emrType = this.getEMRType(defaultFhirClient)
		switch (emrType) {
		case EMR.EPIC:
			return new EpicClient(defaultFhirClient)
		case EMR.CERNER:
			return new CernerClient(defaultFhirClient)
		case EMR.SMART:
		case EMR.NONE:
		default:
			throw new Error("Unsupported provider for EMR Client creation")
		}
	}

	/**
	 * The function creates a default FHIR client based on the launch type.
	 * @param {LAUNCH} launchType - The `launchType` parameter is an enum type called `LAUNCH`. It represents the type of launch for the FHIR client. There are two
	 * possible values for `LAUNCH`:
	 * @returns a Promise that resolves to a SubClient object.
	 */
	private async createDefaultFhirClient(launchType: LAUNCH): Promise<SubClient> {
		switch (launchType) {
		case LAUNCH.EMR:
			return await FHIR.oauth2.ready()
		case LAUNCH.STANDALONE: 
			return await this.buildStandaloneFhirClient()
		default:
			throw new Error("Unsupported provider for standalone launch")
		}
	}

	/**
	 * The function `getEmrEndpoints` returns the endpoints based on the EMR type obtained from the JWT.
	 * @param {JWT} jwt - The "jwt" parameter is a JSON Web Token (JWT) that is used for authentication and authorization purposes. It contains information about the
	 * user and their permissions.
	 * @returns an object of type EMR_ENDPOINTS.
	 */
	private getEmrEndpoints(jwt: JWT): EMR_ENDPOINTS {
		const emrType = this.getEMRType(jwt)
		switch (emrType) {
		case EMR.EPIC:
			return EpicClient.getEndpoints()
		case EMR.CERNER:
			return CernerClient.getEndpoints()
		case EMR.SMART:
		case EMR.NONE:
		default:
			throw new Error('EMR type not defined.')
		}
	}
	
	/* The `buildStandaloneFhirClient` function is responsible for creating a standalone FHIR client. */
	private async buildStandaloneFhirClient() {
		const code = getCodeFromBrowserUrl()
		const decodedJwt = codeToJwt(code)
		const clientId: string = decodedJwt.client_id
		const {token: tokenEndpoint, r4: r4Endpoint}: EMR_ENDPOINTS = this.getEmrEndpoints(decodedJwt)
		const redirectUri = window.location.origin + window.location.pathname // The current URL minus any parameters
		const tokenResponse = await getAccessToken(tokenEndpoint, code, clientId, redirectUri)	
		const defaultFhirClient = FHIR.client(r4Endpoint.toString())
		defaultFhirClient.state.clientId = clientId
		defaultFhirClient.state.tokenResponse = {
			...tokenResponse
		}
		return defaultFhirClient
	}
}

/**
 * The function `getAccessToken` is an async function that makes a POST request to a token endpoint with the provided code and client ID, and returns the access
 * token from the response.
 * @param {URL} tokenEndpoint - The `tokenEndpoint` parameter is the URL of the token endpoint where you need to send the authorization code to obtain an access
 * token. This endpoint is typically provided by the OAuth server or authorization server.
 * @param {string} code - The `code` parameter is the authorization code that you received from the authorization server after the user has granted permission to
 * your application. This code is used to exchange for an access token.
 * @param {string} clientId - The `clientId` parameter is the identifier for the client application that is requesting the access token. It is typically provided
 * by the authorization server when registering the client application.
 * @param {string} redirectUri - The `redirectUri` parameter is the redirection URI that will be sent to the authorization server.
 * @returns a Promise that resolves to a TokenResponse object.
 */
async function getAccessToken(tokenEndpoint: URL, code: string, clientId: string, redirectUri: string) {
	return await fetch(tokenEndpoint, {
		mode: "cors",
		method: "POST",
		headers: {
			accept: "application/x-www-form-urlencoded"
		},
		body: new URLSearchParams({
			"grant_type": "authorization_code",
			"code": code,
			"redirect_uri": redirectUri,
			"client_id": clientId
		})
	})
		.then(async (response) => await response.json())
		.then(json => {
			const tokenResponse = json as FhirClientTypes.TokenResponse
			if (!tokenResponse.access_token) throw new Error("Could not find any access token from the oauth endpoint's response")
			return tokenResponse
		})
}

/**
 * The codeToJwt function decodes a JWT token using the jwt_decode library.
 * @param {string} code - The `code` parameter is a string that represents a JSON Web Token (JWT).
 * @returns the decoded JSON Web Token (JWT) object.
 */
function codeToJwt(code: string) {
	return jwt_decode<JWT>(code)
}

/**
 * The function retrieves a JWT token from the browser URL parameters.
 * @returns a string value.
 */
function getCodeFromBrowserUrl(): string {
	const urlParams = new URLSearchParams(window.location.search)
	const code = urlParams.get("code")
	if (code === null) throw new Error("Could not find any JWT token.")
	return code
}

