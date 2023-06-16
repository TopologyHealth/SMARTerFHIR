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
   * The EMR (Electronic Medical Record) type associated with the SmartLaunchHandler.
   * @readonly
   * @enum {string}
   */

  /**
   * The EMR (Electronic Medical Record) type associated with the SmartLaunchHandler.
   * @readonly
   * @enum {string}
   */
  readonly emrType: EMR;

  /**
   * Creates an instance of SmartLaunchHandler.
   * @param {string} clientID - The client ID to use for authorization.
   * @param {EMR} emrType - The EMR type associated with the handler.
   */
  constructor(clientID: string, emrType: EMR) {
    this.clientID = clientID;
    this.emrType = emrType;
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
      (name) => (scopes as { [key: string]: any })[name]
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
    const iss = urlParams.get("iss");

    if (iss !== null && iss.includes(this.emrType))
      switch (this.emrType) {
        case EMR.EPIC:
          await this.epicLaunch(this.clientID, originString, iss);
          break;
        case EMR.CERNER:
          await this.cernerLaunch(this.clientID, originString, iss);
        case EMR.SMART:
        case EMR.NONE:
        default:
          break;
      }
  }
}
