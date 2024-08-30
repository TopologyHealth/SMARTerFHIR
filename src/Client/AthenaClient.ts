import SubClient from "../FhirClient";
import { EMR } from "../Launcher/SmartLaunchHandler";
import { R4ResourceWithRequiredType } from "../types";
import BaseClient, { EMR_ENDPOINTS } from "./BaseClient";

/**
 Represents the AthenaClient class, extending the BaseClient.
 */
export default class AthenaClient extends BaseClient {
  EMR_TYPE: EMR = EMR.ATHENA;
  static readonly AUTHORIZE_ENDPOINT =
    "https://api.platform.athenahealth.com/oauth2/v1/authorize";
  static readonly TOKEN_ENDPOINT =
    "https://api.platform.athenahealth.com/oauth2/v1/token";
  static readonly R4_ENDPOINT = "https://api.platform.athenahealth.com/fhir/r4";

  static getEndpoints(): EMR_ENDPOINTS {
    return BaseClient.constructEndpoints(
      AthenaClient.TOKEN_ENDPOINT,
      AthenaClient.R4_ENDPOINT,
      AthenaClient.AUTHORIZE_ENDPOINT
    );
  }

  getEndpoints(): EMR_ENDPOINTS {
    return AthenaClient.getEndpoints();
  }

  /* The `athenaCreateHeaders` property is defining the headers that will be used when making a create request to the Athena FHIR server. In this case, it sets the
`Content-Security-Policy: default-src 'self' *.athenahealth.com`, which indicates that the app must be configured to be able to open in an iFrame via a Content Security Policy (CSP). */
  readonly athenaCreateHeaders: HeadersInit = {
    Prefer: "return=representation",
    "Content-Security-Policy": "default-src 'self' *.athenahealth.com",
  };
  /**
   * Creates an instance of AthenaClient.
   * @param {SubClient} fhirClientDefault - The default FHIR client to use.
   */
  constructor(fhirClientDefault: SubClient) {
    super(fhirClientDefault);
  }

  async create<T extends R4ResourceWithRequiredType>(
    resource: T,
    patientId?: string,
    encounterId?: string
  ): Promise<T> {
    return super.create(
      resource,
      patientId,
      encounterId,
      this.createHeaders(this.athenaCreateHeaders)
    );
  }
}
