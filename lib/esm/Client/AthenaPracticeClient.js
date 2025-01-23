import { EMR } from "../Launcher/SmartLaunchHandler";
import BaseClient from "./BaseClient";
class AthenaPracticeClient extends BaseClient {
    constructor() {
        super(...arguments);
        this.EMR_TYPE = EMR.ATHENAPRACTICE;
    }
    static getEndpoints() {
        return BaseClient.constructEndpoints(AthenaPracticeClient.TOKEN_ENDPOINT, AthenaPracticeClient.R4_ENDPOINT, AthenaPracticeClient.AUTHORIZE_ENDPOINT);
    }
    getEndpoints() {
        throw new Error("Method not implemented.");
    }
}
AthenaPracticeClient.AUTHORIZE_ENDPOINT = "https://ap22sandbox.fhirapi.athenahealth.com/demoAPIServer/oauth2/authorize";
AthenaPracticeClient.TOKEN_ENDPOINT = "https://ap22sandbox.fhirapi.athenahealth.com/demoAPIServer/oauth2/token";
AthenaPracticeClient.R4_ENDPOINT = "https://ap22sandbox.fhirapi.athenahealth.com/demoAPIServer/fhir/r4";
export default AthenaPracticeClient;
//# sourceMappingURL=AthenaPracticeClient.js.map