import smart, * as FHIR from "fhirclient"
import SubClient from "../FhirClient"
import { EMR, instanceOfEmr } from "../Launcher/SmartLaunchHandler"
import BaseClient, { EMR_ENDPOINTS } from "./BaseClient"
import CernerClient from "./CernerClient"
import EpicClient from "./EpicClient"
import SmartHealthClient from "./SmartHealthClient"
import { ServerResponse, IncomingMessage } from "http"
import { FhirClientConfig } from "../types"
import ECWClient from "./ECWClient"

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
 * The function checks if an object is an instance of the JWT class by verifying if it has a client_id property.
 * @param {unknown} object - The `object` parameter is of type `unknown`, which means it can be any type.
 * @returns a boolean value.
 */
function instanceOfJWT(object: unknown): object is JWT {
	return (object as JWT).client_id !== undefined
}


/**
Represents the ClientFactory class for creating EMR clients.
*/
export default class ClientFactory {


	/**
	 * The function `getEMRType` determines the type of Electronic Medical Record (EMR) based on the provided client or token.
	 * @param {SubClient | JWT} client - The parameter `clientOrToken` can be either a `SubClient` object or a JWT (JSON Web Token).
	 * @returns the type of Electronic Medical Record (EMR) based on the input parameter. The possible return values are EMR.CERNER, EMR.SMART, EMR.EPIC, or EMR.NONE.
	*/
	private getEMRType(clientOrToken: SubClient | JWT): EMR {
		function isClient(input: object): input is SubClient {
			return (input as SubClient).state.serverUrl !== undefined;
		}
		const EMR_MAPPING = [
			{ substring: "cerner", emr: EMR.CERNER },
			{ substring: "smarthealthit", emr: EMR.SMART },
			{ substring: "epic", emr: EMR.EPIC },
			{ substring: "ecw", emr: EMR.ECW }
		];

		if (isClient(clientOrToken)) {
			const serverUrl = clientOrToken.state.serverUrl;
			for (const { substring, emr } of EMR_MAPPING) {
				if (serverUrl.includes(substring)) {
					return emr;
				}
			}
		} else {
			if ("epic.eci" in clientOrToken) {
				return EMR.EPIC;
			}
		}

		return EMR.NONE;
	}


	/**
	 * The function `createEMRClient` creates an EMR client based on the specified launch type.
	 * @param {LAUNCH} launchType - The `launchType` parameter is an optional parameter of type `LAUNCH` that specifies the type of EMR launch. It has a default value
	 * of `LAUNCH.EMR`.
	 * @returns a Promise that resolves to an instance of the `BaseClient` class.
	 */
	async createEMRClient(launchType: LAUNCH.EMR | LAUNCH.STANDALONE): Promise<BaseClient> {
		const fhirClient = await this.createDefaultFhirClient(launchType)
		return await this.createSmarterFhirClient(fhirClient)
	}

	/**
	 * The function `createEMRClientBackend` creates an EMR client based on the specified launch type.
	 * @param {IncomingMessage} req - The `req` parameter is an incoming message object that represents the request made by the client.
	 * @param {ServerResponse} res - The `res` parameter is a server response object that represents the response sent by the server.
	 * @param {FhirClientConfig} serverConfig - The `serverConfig` parameter is an object that contains the configuration for the FHIR client. It includes the server URL, token response, client ID, and token URI.
	 * @returns a Promise that resolves to an instance of the `BaseClient` class.
	 */
	async createEMRClientBackend(req: IncomingMessage, res: ServerResponse, serverConfig: FhirClientConfig): Promise<BaseClient> {
		const fhirClient = smart(req, res).client({
			serverUrl: serverConfig.serverUrl,
			tokenResponse: serverConfig.tokenResponse,
			clientId: serverConfig.clientId,
			tokenUri: serverConfig.tokenUri
		});

		return this.createSmarterFhirClient(fhirClient)
	}

	private async createSmarterFhirClient(fhirClient: SubClient) {
		const emrType = this.getEMRType(fhirClient)
		switch (emrType) {
			case EMR.EPIC:
				return new EpicClient(fhirClient)
			case EMR.CERNER:
				return new CernerClient(fhirClient)
			case EMR.SMART:
				return new SmartHealthClient(fhirClient)
			case EMR.ECW:
				return new ECWClient(fhirClient)
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
			case LAUNCH.STANDALONE:
				return FHIR.oauth2.ready()
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
	private getEmrEndpoints(emrType: EMR): EMR_ENDPOINTS;
	private getEmrEndpoints(jwt: JWT): EMR_ENDPOINTS;
	private getEmrEndpoints(object: unknown): EMR_ENDPOINTS {
		switch (this.getEmrTypeFromObject(object)) {
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


	/**
	 * The function `getEmrTypeFromObject` takes an object as input and returns the corresponding EMR type if the object is of type JWT or EMR, otherwise it throws an
	 * error.
	 * @param {unknown} object - The `object` parameter is of type `unknown`, which means it can be any type. It is used as input to determine the EMR (Electronic
	 * Medical Record) type. The function checks if the `object` is an instance of JWT (JSON Web Token) or EMR, and returns
	 * @returns an EMR (Electronic Medical Record) object.
	 */
	private getEmrTypeFromObject(object: unknown): EMR {
		if (instanceOfJWT(object)) return this.getEMRType(object)
		if (instanceOfEmr(object)) return (object as EMR)
		throw new Error('Invalid object type.')
	}

}


