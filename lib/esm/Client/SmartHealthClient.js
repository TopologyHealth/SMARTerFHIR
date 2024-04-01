import { EMR } from "../Launcher/SmartLaunchHandler";
import BaseClient from "./BaseClient";
/**
 Represents the SmartHealthClient class, extending the BaseClient.
 */
class SmartHealthClient extends BaseClient {
    static getEndpoints() {
        return BaseClient.constructEndpoints(SmartHealthClient.TOKEN_ENDPOINT, SmartHealthClient.R4_ENDPOINT, SmartHealthClient.AUTHORIZE_ENDPOINT);
    }
    getEndpoints() {
        return SmartHealthClient.getEndpoints();
    }
    /**
   * Creates an instance of SmartHealthClient.
   * @param {SubClient} fhirClientDefault - The default FHIR client to use.
   */
    constructor(fhirClientDefault) {
        super(fhirClientDefault);
        this.EMR_TYPE = EMR.SMART;
    }
}
SmartHealthClient.AUTHORIZE_ENDPOINT = "https://launch.smarthealthit.org/v/r4/auth/authorize";
SmartHealthClient.TOKEN_ENDPOINT = "https://launch.smarthealthit.org/v/r4/auth/token";
SmartHealthClient.R4_ENDPOINT = "https://launch.smarthealthit.org/v/r4/fhir";
export default SmartHealthClient;
//# sourceMappingURL=SmartHealthClient.js.map