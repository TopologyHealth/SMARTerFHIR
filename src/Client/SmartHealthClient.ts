import SubClient from "../FhirClient"
import { EMR } from "../Launcher/SmartLaunchHandler"
import BaseClient from "./BaseClient"


/**
 Represents the SmartHealthClient class, extending the BaseClient.
 */
export default class SmartHealthClient extends BaseClient {
	readonly EMR_TYPE: EMR = EMR.SMART

	/**
	 * Creates an instance of SmartHealthClient.
	 * @param {SubClient} fhirClientDefault - The default FHIR client to use.
	 */
	constructor(fhirClientDefault: SubClient) {
		super(fhirClientDefault)
	}
}
