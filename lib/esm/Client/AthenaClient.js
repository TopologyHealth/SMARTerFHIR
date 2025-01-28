import { EMR } from "../Launcher/SmartLaunchHandler";
import BaseClient from "./BaseClient";
class AthenaClient extends BaseClient {
    constructor() {
        super(...arguments);
        this.EMR_TYPE = EMR.ATHENA;
    }
    static getEndpoints() {
        return BaseClient.constructEndpoints(AthenaClient.TOKEN_ENDPOINT, AthenaClient.R4_ENDPOINT, AthenaClient.AUTHORIZE_ENDPOINT);
    }
    getEndpoints() {
        throw new Error("Method not implemented.");
    }
}
AthenaClient.AUTHORIZE_ENDPOINT = "https://api.preview.platform.athenahealth.com/oauth2/v1/authorize";
AthenaClient.TOKEN_ENDPOINT = "https://api.preview.platform.athenahealth.com/oauth2/v1/token";
AthenaClient.R4_ENDPOINT = "https://api.preview.platform.athenahealth.com/fhir/r4";
export default AthenaClient;
//# sourceMappingURL=AthenaClient.js.map