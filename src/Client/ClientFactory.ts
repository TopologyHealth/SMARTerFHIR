import * as FHIR from "fhirclient";
import jwt_decode from "jwt-decode";
import SubClient from "../FhirClient";
import { EMR } from "../Launcher/SmartLaunchHandler";
import BaseClient from "./BaseClient";
import CernerClient from "./CernerClient";
import EpicClient, { EPIC_R4_ENDPOINT, EPIC_TOKEN_ENDPOINT } from "./EpicClient";

/**
Represents the ClientFactory class for creating EMR clients.
*/
export default class ClientFactory {
  /**
   * Retrieves the EMR type based on the FHIR client.
   * @private
   * @param {SubClient} client - The FHIR client.
   * @returns {EMR} - The EMR type.
   */
  private getEMRType(client: SubClient): EMR {
    if (client.state.serverUrl.includes("cerner")) {
      return EMR.CERNER;
    }
    if (client.state.serverUrl.includes("smarthealthit")) {
      return EMR.SMART;
    }
    if (client.state.serverUrl.includes("epic")) {
      return EMR.EPIC;
    }
    return EMR.NONE;
  }

  /**
   * Creates an EMR client based on the EMR type.
   * @returns {Promise<BaseClient>} - A promise resolving to the created EMR client.
   */
  async createEMRClient(): Promise<BaseClient> {
    const defaultFhirClient = await FHIR.oauth2.ready();
    const emrType = this.getEMRType(defaultFhirClient);
    switch (emrType) {
      case EMR.EPIC:
        return new EpicClient(defaultFhirClient);
      case EMR.CERNER:
        return new CernerClient(defaultFhirClient);
      case EMR.SMART:
      case EMR.NONE:
      default:
        return new EpicClient(defaultFhirClient);
    }
  }

  /**
   * Creates an EMR client based on the EMR type when called after a standalone launch.
   * @returns {Promise<BaseClient>} - A promise resolving to the created EMR client.
   */
  async createStandaloneEMRClient(): Promise<BaseClient> {
    const urlParams = new URLSearchParams(window.location.search);
    const code = urlParams.get('code');
    if (code === null) throw new Error(`Could not find any JWT token.`);
    
    const decodedJwt = jwt_decode(code);
    const clientId = (decodedJwt as any).client_id;

    const emrType = this.getStandaloneEMRType(decodedJwt);
    switch (emrType) {
      case EMR.EPIC: {
        const tokenResponse = await fetch(EPIC_TOKEN_ENDPOINT, {
          mode: "cors",
          method: "POST",
          headers: {
              accept: "application/x-www-form-urlencoded"
          },
          body: new URLSearchParams({
              "grant_type": "authorization_code",
              'code': code,
              'redirect_uri': window.location.origin,
              'client_id': clientId
          })
        });
        
        const tokenResponseJson = await tokenResponse.json();
        if (!("access_token" in tokenResponseJson)) throw new Error("Could not find any access token from the oauth endpoint's response");

        const defaultFhirClient = FHIR.client(EPIC_R4_ENDPOINT);
        defaultFhirClient.state.clientId = clientId;
        defaultFhirClient.state.tokenResponse = {
            ...tokenResponseJson
        }
        return new EpicClient(defaultFhirClient);
      }
      case EMR.CERNER:
      case EMR.SMART:
      case EMR.NONE:
      default:
        throw new Error(`Unsupported provider for standalone launch`);
    }
  }

  /**
   * Retrieves the EMR type from a decoded JWT object.
   * @param {string} decoded_jwt - A decoded JWT token that should contain the issuer of an Electronic Medical Record (EMR).
   * @returns the EMR type that matches the input JWT `decoded_jwt`. If a matching EMR type is found, it is returned. If no matching EMR type is found, the function
   * returns `EMR.NONE`.
   */
  private getStandaloneEMRType(decoded_jwt: unknown): EMR {
    if ("epic.eci" in (decoded_jwt as any)) {
      return EMR.EPIC;
    }
    return EMR.NONE;
  }
}
