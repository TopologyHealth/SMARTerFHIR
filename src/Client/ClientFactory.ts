import * as FHIR from "fhirclient"
import jwt_decode from "jwt-decode"
import SubClient, { FhirClientTypes } from "../FhirClient"
import { EMR } from "../Launcher/SmartLaunchHandler"
import { JWT, LAUNCH } from "../types"
import BaseClient, { EMR_ENDPOINTS } from "./BaseClient"
import CernerClient from "./CernerClient"
import EpicClient from "./EpicClient"

/**
Represents the ClientFactory class for creating EMR clients.
*/
export default class ClientFactory {
	/**
   * Retrieves the EMR type based on the FHIR client.
   * @private
   * @param {SubClient} clientOrToken - The FHIR client.
   * @returns {EMR} - The EMR type.
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
   * Creates an EMR client based on the EMR type.
   * @returns {Promise<BaseClient>} - A promise resolving to the created EMR client.
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
			return BaseClient.getEndpoints()
		}
	}
	
	private async buildStandaloneFhirClient() {
		const code = getCodeFromBrowserUrl()
		const decodedJwt = codeToJwt(code)
		const clientId: string = decodedJwt.client_id
		const {token: tokenEndpoint, r4: r4Endpoint}: EMR_ENDPOINTS = this.getEmrEndpoints(decodedJwt)
		const tokenResponse = await getAccessToken(tokenEndpoint, code, clientId)	
		const defaultFhirClient = FHIR.client(r4Endpoint.toString())
		defaultFhirClient.state.clientId = clientId
		defaultFhirClient.state.tokenResponse = {
			...tokenResponse
		}
		return defaultFhirClient
	}
}

async function getAccessToken(tokenEndpoint: URL, code: string, clientId: string) {
	return await fetch(tokenEndpoint, {
		mode: "cors",
		method: "POST",
		headers: {
			accept: "application/x-www-form-urlencoded"
		},
		body: new URLSearchParams({
			"grant_type": "authorization_code",
			"code": code,
			"redirect_uri": window.location.origin,
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

function codeToJwt(code: string) {
	return jwt_decode<JWT>(code)
}

function getCodeFromBrowserUrl(): string {
	const urlParams = new URLSearchParams(window.location.search)
	const code = urlParams.get("code")
	if (code === null) throw new Error("Could not find any JWT token.")
	return code
}

