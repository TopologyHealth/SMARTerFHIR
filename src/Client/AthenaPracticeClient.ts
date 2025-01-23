import { EMR } from "../Launcher/SmartLaunchHandler";
import BaseClient, { EMR_ENDPOINTS } from "./BaseClient";

export default class AthenaPracticeClient extends BaseClient {
  static readonly AUTHORIZE_ENDPOINT = "https://ap22sandbox.fhirapi.athenahealth.com/demoAPIServer/oauth2/authorize"
  static readonly TOKEN_ENDPOINT = "https://ap22sandbox.fhirapi.athenahealth.com/demoAPIServer/oauth2/token"
  static readonly R4_ENDPOINT = "https://ap22sandbox.fhirapi.athenahealth.com/demoAPIServer/fhir/r4"

  static getEndpoints(): EMR_ENDPOINTS {
    return BaseClient.constructEndpoints(AthenaPracticeClient.TOKEN_ENDPOINT, AthenaPracticeClient.R4_ENDPOINT, AthenaPracticeClient.AUTHORIZE_ENDPOINT)
  }

  public getEndpoints(): EMR_ENDPOINTS {
    throw new Error("Method not implemented.");
  }

  EMR_TYPE: EMR = EMR.ATHENAPRACTICE
}