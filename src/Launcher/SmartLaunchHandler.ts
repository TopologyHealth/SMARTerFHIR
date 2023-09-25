import * as FHIR from "fhirclient";
import { cerner } from "./Config";
import scopes from "./scopes.json";

export enum EMR {
  CERNER = "cerner",
  EPIC = "epic",
  SMART = "smart",
  NONE = "none",
}

/**
 * Represents the SmartLaunchHandler class.
 */
export default class SmartLaunchHandler {
  /**
   * The client ID for the SmartLaunchHandler.
   * @readonly
   */
  readonly clientID: string;

  /**
   * Creates an instance of SmartLaunchHandler.
   * @param {string} clientID - The client ID to use for authorization.
   */
  constructor(clientID: string) {
    this.clientID = clientID;
  }

  /**
   * Launches the Epic EMR application.
   * @param {string} clientId - The client ID to use for authorization.
   * @param {string} redirect - The redirect URI to use for authorization.
   * @param {string} iss - The issuer for authorization.
   * @returns {Promise<string | void>} - A promise resolving to the authorization response or void.
   */
  async epicLaunch(
    clientId: string,
    redirect: string,
    iss: string
  ): Promise<string | void> {
    const scope = "launch online_access openid fhirUser";
    const redirect_uri = redirect ?? "";
    return FHIR.oauth2.authorize({
      client_id: clientId,
      iss: iss,
      redirect_uri: redirect_uri,
      scope: scope,
    });
  }

  /**
   * Launches the Cerner EMR application.
   * @param {string} clientId - The client ID to use for authorization.
   * @param {string} redirect - The redirect URI to use for authorization.
   * @param {string} iss - The issuer for authorization.
   * @returns {Promise<string | void>} - A promise resolving to the authorization response or void.
   */
  async cernerLaunch(clientId: string, redirect: string, iss: string) {
    const cernerString = cerner.scopes.map(
      (name) => (scopes as { [key: string]: string })[name]
    );
    const redirect_uri = redirect ?? "";
    return FHIR.oauth2.authorize({
      clientId: clientId,
      scope: [
        "launch",
        ...cernerString,
        "online_access",
        "openid",
        "fhirUser",
      ].join(" "),
      iss: iss,
      redirect_uri: redirect_uri,
    });
  }

  /**
   * Authorizes the EMR based on the current URL query parameters.
   * @returns {Promise<void>} - A promise resolving to void.
   */
  async authorizeEMR() {
    const queryString = window.location.search;
    const originString = window.location.origin;
    const urlParams = new URLSearchParams(queryString);
    const iss = urlParams.get("iss") ?? "";
    const emrType = this.getEMRType(iss)
    const isValidIss = iss !== null && iss.includes(emrType);
    if (isValidIss) {
      switch (emrType) {
        case EMR.EPIC:
          await this.epicLaunch(this.clientID, originString, iss);
          break;
        case EMR.CERNER:
          await this.cernerLaunch(this.clientID, originString, iss);
          break;
        case EMR.SMART:
        case EMR.NONE:
        default:
          break;
      }
    }
  }

  /**
   * Begins a standalone launch flow with the provided EMR.
   * @param {EMR} emrType - The EMR to authenticate with
   * @param {string} redirectUriOverride - Override the "redirect_uri" sent during authentication. By default, this will be the current URL minus any parameters
   * @returns {void} - This function will cause a browser redirect if successful
   */
  authorizeStandalone(emrType: EMR, redirectUriOverride?: string) {
    const redirectUri = redirectUriOverride ?? (window.location.origin + window.location.pathname)
    const standaloneUrl = `https://fhir.epic.com/interconnect-fhir-oauth/oauth2/authorize?response_type=code&redirect_uri=${redirectUri}&client_id=${this.clientID}&aud=https%3A%2F%2Ffhir.epic.com%2Finterconnect-fhir-oauth%2Fapi%2Ffhir%2FR4`
    switch (emrType) {
      case EMR.EPIC:
        window.location.href = standaloneUrl;
        break;
      case EMR.CERNER:
      case EMR.SMART:
      case EMR.NONE:
      default:
        throw new Error("This EMR is not supported for standalone launch")
    }
    
  }

  /**
   * The function `getEMRType` takes a string `iss` and returns the corresponding EMR type based on whether the string includes any of the EMR types.
   * @param {string} iss - The `iss` parameter is a string that represents the issuer of an Electronic Medical Record (EMR).
   * @returns the EMR type that matches the input string `iss`. If a matching EMR type is found, it is returned. If no matching EMR type is found, the function
   * returns `EMR.NONE`.
   */
  getEMRType(iss: string): EMR {
    const isEMROfType = (emrType: EMR) => iss.includes(emrType);
    const emrTypes = Object.values(EMR);
    return emrTypes.find(isEMROfType) ?? EMR.NONE;
  }
}
