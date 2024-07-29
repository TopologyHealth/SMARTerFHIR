
import { EMR } from "../Launcher/SmartLaunchHandler";
import BaseClient, { EMR_ENDPOINTS } from "./BaseClient";

export default class ECWClient extends BaseClient {
  static readonly AUTHORIZE_ENDPOINT = "https://staging-oauthserver.ecwcloud.com/oauth/oauth2/authorize"
  static readonly TOKEN_ENDPOINT = "https://staging-oauthserver.ecwcloud.com/oauth/oauth2/token"
  static readonly R4_ENDPOINT = "https://staging-fhir.ecwcloud.com/fhir/r4/FFBJCD"

  static getEndpoints(): EMR_ENDPOINTS {
    return BaseClient.constructEndpoints(ECWClient.TOKEN_ENDPOINT, ECWClient.R4_ENDPOINT, ECWClient.AUTHORIZE_ENDPOINT)
  }
  public getEndpoints(): EMR_ENDPOINTS {
    throw new Error("Method not implemented.");
  }
  EMR_TYPE: EMR = EMR.ECW
}