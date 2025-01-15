import { EMR } from "../Launcher/SmartLaunchHandler";
import BaseClient from "./BaseClient";
/**
 Represents the MedplumClient class, extending the BaseClient.
 */
class MedplumClient extends BaseClient {
    static getEndpoints() {
        return BaseClient.constructEndpoints(MedplumClient.TOKEN_ENDPOINT, MedplumClient.R4_ENDPOINT, MedplumClient.AUTHORIZE_ENDPOINT);
    }
    getEndpoints() {
        return MedplumClient.getEndpoints();
    }
    /**
   * Creates an instance of MedplumClient.
   * @param {SubClient} fhirClientDefault - The default FHIR client to use.
   */
    constructor(fhirClientDefault) {
        super(fhirClientDefault);
        this.EMR_TYPE = EMR.MEDPLUM;
    }
}
MedplumClient.AUTHORIZE_ENDPOINT = "https://api.medplum.com/oauth2/authorize";
MedplumClient.TOKEN_ENDPOINT = "https://api.medplum.com/oauth2/token";
MedplumClient.R4_ENDPOINT = "https://api.medplum.com/r4/fhir";
export default MedplumClient;
//# sourceMappingURL=MedplumClient.js.map