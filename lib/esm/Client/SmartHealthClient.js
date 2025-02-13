import { EMR } from "../Launcher/SmartLaunchHandler";
import BaseClient from "./BaseClient";
/**
 Represents the SmartHealthClient class, extending the BaseClient.
 */
export default class SmartHealthClient extends BaseClient {
    /**
     * Creates an instance of SmartHealthClient.
     * @param {SubClient} fhirClientDefault - The default FHIR client to use.
     */
    constructor(fhirClientDefault) {
        super(fhirClientDefault);
        this.EMR_TYPE = EMR.SMART;
    }
}
//# sourceMappingURL=SmartHealthClient.js.map