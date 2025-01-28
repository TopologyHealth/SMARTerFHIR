import { EMR } from "../Launcher/SmartLaunchHandler";
import BaseClient, { EMR_ENDPOINTS } from "./BaseClient";

export default class AthenaClient extends BaseClient {
    static readonly AUTHORIZE_ENDPOINT = "https://api.preview.platform.athenahealth.com/oauth2/v1/authorize"
    static readonly TOKEN_ENDPOINT = "https://api.preview.platform.athenahealth.com/oauth2/v1/token"
    static readonly R4_ENDPOINT = "https://api.preview.platform.athenahealth.com/fhir/r4"

    static getEndpoints(): EMR_ENDPOINTS {
        return BaseClient.constructEndpoints(AthenaClient.TOKEN_ENDPOINT, AthenaClient.R4_ENDPOINT, AthenaClient.AUTHORIZE_ENDPOINT)
    }

    public getEndpoints(): EMR_ENDPOINTS {
        throw new Error("Method not implemented.");
    }

    EMR_TYPE: EMR = EMR.ATHENA
}