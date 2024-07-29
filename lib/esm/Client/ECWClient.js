import { EMR } from "../Launcher/SmartLaunchHandler";
import BaseClient from "./BaseClient";
class ECWClient extends BaseClient {
    constructor() {
        super(...arguments);
        this.EMR_TYPE = EMR.ECW;
    }
    static getEndpoints() {
        return BaseClient.constructEndpoints(ECWClient.TOKEN_ENDPOINT, ECWClient.R4_ENDPOINT, ECWClient.AUTHORIZE_ENDPOINT);
    }
    getEndpoints() {
        throw new Error("Method not implemented.");
    }
}
ECWClient.AUTHORIZE_ENDPOINT = "https://staging-oauthserver.ecwcloud.com/oauth/oauth2/authorize";
ECWClient.TOKEN_ENDPOINT = "https://staging-oauthserver.ecwcloud.com/oauth/oauth2/token";
ECWClient.R4_ENDPOINT = "https://staging-fhir.ecwcloud.com/fhir/r4/FFBJCD";
export default ECWClient;
//# sourceMappingURL=ECWClient.js.map