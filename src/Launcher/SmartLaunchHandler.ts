import * as FHIR from "fhirclient";
import { cerner } from "./Config";
import scopes from "./scopes.json";

export enum EMR {
  CERNER = "cerner",
  EPIC = "epic",
  SMART = "smart",
  NONE = "none",
}

export function instanceOfEmr(object: unknown): object is EMR {
  return Object.values(EMR).includes((object as string) as EMR)
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
    if (isValidIss)
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
