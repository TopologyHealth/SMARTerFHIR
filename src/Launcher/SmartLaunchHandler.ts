import * as FHIR from "fhirclient";
import { EMR_ENDPOINTS } from "../Client/BaseClient";
import CernerClient from "../Client/CernerClient";
import { LAUNCH } from "../Client/ClientFactory";
import EpicClient from "../Client/EpicClient";
import { cerner } from "./Config";
import scopes from "./scopes.json";
import AthenaClient from "../Client/AthenaClient";

export enum EMR {
  CERNER = "cerner",
  EPIC = "epic",
  SMART = "smart",
  ATHENA = "athena",
  NONE = "none",
}

/**
 * The function `instanceOfEmr` checks if an object is an instance of the EMR enum.
 * @param {unknown} object - The `object` parameter is of type `unknown`, which means it can be any type.
 * @returns a boolean value.
 */
export function instanceOfEmr(object: unknown): object is EMR {
  return Object.values(EMR).includes((object as string) as EMR)
}

/**
* The function `getEndpointsForEmr` returns the endpoints for a given EMR type, such as Epic, Cerner, or SMART.
* @param {EMR} emrType - The `emrType` parameter is of type `EMR`, which is an enumeration representing different types of Electronic Medical Record (EMR)
* systems. The possible values for `emrType` are `EMR.EPIC`, `EMR.CERNER`, `EMR.SMART`,
* @returns an object of type EMR_ENDPOINTS.
*/
export function getEndpointsForEmr(emrType: EMR): EMR_ENDPOINTS {
  switch (emrType) {
    case EMR.EPIC:
      return EpicClient.getEndpoints()
    case EMR.CERNER:
      return CernerClient.getEndpoints()
    case EMR.ATHENA:
      return AthenaClient.getEndpoints()
    case EMR.SMART:
    case EMR.NONE:
    default:
      throw new Error(`Endpoints not found for EMR type: ${emrType}`)
  }
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

  readonly clientSecret?: string

  /**
   * Creates an instance of SmartLaunchHandler.
   * @param {string} clientID - The client ID to use for authorization.
   */
  constructor(clientID: string, clientSecret?: string) {
    this.clientID = clientID;
    this.clientSecret = clientSecret
  }

  /**
   * Launches an EMR application.
   * @param {string} clientId - The client ID to use for authorization.
   * @param {string} redirect - The redirect URI to use for authorization.
   * @param {string} iss - The issuer for authorization.
   * @param {LAUNCH} launchType - The type of launch.
   * @param {string[]} emrSpecificScopes - Additional scopes specific to the EMR.
   * @param {string} clientSecret - The client secret for authorization.
   * @returns {Promise<string | void>} - A promise resolving to the authorization response or void.
   */
  private async launchEMR(
    redirect: string,
    iss: string,
    launchType: LAUNCH,
    emrSpecificScopes: string[]
  ): Promise<string | void> {
    if (launchType === LAUNCH.BACKEND) {
      throw new Error("This doesn't work for backend launch");
    }

    const defaultScopes = [
      launchType === LAUNCH.STANDALONE ? "launch/patient" : "launch",
      // "online_access",
      "offline_access",
      "openid",
      "fhirUser",
    ];

    const scope = [...defaultScopes, ...emrSpecificScopes].join(" ");
    let redirect_uri = redirect ?? "";
    // Add a slash to the end of the redirect_uri if it doesn't already have one
    if (!redirect_uri.endsWith("/")) {
      redirect_uri += "/";
    }

    return FHIR.oauth2.authorize({
      client_id: this.clientID,
      iss: iss,
      redirect_uri: redirect_uri,
      scope: scope,
      // scope: ["openid", "profile", "offline_access", "launch/patient", "fhirUser"].join(" "),
      clientSecret: this.clientSecret,
    });
  }

  /**
   * Launches the Epic EMR application.
   * @param {string} clientId - The client ID to use for authorization.
   * @param {string} redirect - The redirect URI to use for authorization.
   * @param {string} iss - The issuer for authorization.
   * @param {LAUNCH} launchType - The type of launch.
   * @returns {Promise<string | void>} - A promise resolving to the authorization response or void.
   */
  async epicLaunch(
    redirect: string,
    iss: string,
    launchType: LAUNCH
  ): Promise<string | void> {
    const emrSpecificScopes: string[] = [];
    return this.launchEMR(
      redirect,
      iss,
      launchType,
      emrSpecificScopes
    );
  }

  /**
   * Launches the SMART Health IT EMR application.
   * @param {string} clientId - The client ID to use for authorization.
   * @param {string} redirect - The redirect URI to use for authorization.
   * @param {string} iss - The issuer for authorization.
   * @param {LAUNCH} launchType - The type of launch.
   * @returns {Promise<string | void>} - A promise resolving to the authorization response or void.
   */
  async smartHealthITLaunch(
    redirect: string,
    iss: string,
    launchType: LAUNCH
  ): Promise<string | void> {

    return this.launchEMR(
      redirect,
      iss,
      launchType,
      []
    );
  }

  /**
   * Launches the Cerner EMR application.
   * @param {string} clientId - The client ID to use for authorization.
   * @param {string} redirect - The redirect URI to use for authorization.
   * @param {string} iss - The issuer for authorization.
   * @param {LAUNCH} launchType - The type of launch.
   * @returns {Promise<string | void>} - A promise resolving to the authorization response or void.
   */
  async cernerLaunch(
    redirect: string,
    iss: string,
    launchType: LAUNCH
  ): Promise<string | void> {
    const additionalScopes = cerner.scopes.map(
      (name) => (scopes as { [key: string]: string })[name]
    );

    return this.launchEMR(
      redirect,
      iss,
      launchType,
      additionalScopes
    );
  }

  /**
   * Launches the Athena EMR application.
   * @param {string} clientId - The client ID to use for authorization.
   * @param {string} redirect - The redirect URI to use for authorization.
   * @param {string} iss - The issuer for authorization.
   * @param {LAUNCH} launchType - The type of launch.
   * @returns {Promise<string | void>} - A promise resolving to the authorization response or void.
   */
  async athenaLaunch(
    redirect: string,
    iss: string,
    launchType: LAUNCH
  ): Promise<string | void> {

    return this.launchEMR(
      redirect,
      iss,
      launchType,
      []
    );
  }

  /**
   * Authorizes the EMR based on the current URL query parameters.
   * @returns {Promise<void>} - A promise resolving to void.
   */
  async authorizeEMR(launchType: LAUNCH = LAUNCH.EMR, redirectPath?: string) {
    if (launchType === LAUNCH.BACKEND) {
      throw new Error(`Direct Backend Authorization not supported yet.`)
    } else {
      return await this.executeWebLaunch(launchType, redirectPath);
    }
  }



  /**
   * The function `executeEMRLaunch` checks the URL parameters for an "iss" value, determines the EMR type based on the "iss" value, and then launches the
   * corresponding EMR system.
   * @returns nothing (undefined).
   */
  private async executeWebLaunch(launchType: LAUNCH, redirectPath?: string) {
    const queryString = window.location.search;
    const origin = window.location.origin;
    const redirect = origin + (
      redirectPath
        ? redirectPath.startsWith('/')
          ? redirectPath
          : '/' + redirectPath
        : ''
      );
    const urlParams = new URLSearchParams(queryString);
    const iss = urlParams.get("iss") ?? undefined;
    if (!iss)
      throw new Error("Iss Search parameter must be provided as part of EMR Web Launch")
    const emrType = this.getEMRType(iss);
    if (emrType === EMR.NONE || !emrType)
      throw new Error('EMR type cannot be inferred from the ISS')
    switch (emrType) {
      case EMR.EPIC:
        await this.epicLaunch(redirect, iss, launchType);
        break;
      case EMR.CERNER:
        await this.cernerLaunch(redirect, iss, launchType);
        break;
      case EMR.SMART:
        await this.smartHealthITLaunch(redirect, iss, launchType)
        break;
      case EMR.ATHENA:
        await this.athenaLaunch(redirect, iss, launchType)
        break;
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
  getEMRType(iss?: string): EMR {
    if (iss) {
      const isEMROfType = (emrType: EMR) => iss.includes(emrType);
      const emrTypes = Object.values(EMR);
      return emrTypes.find(isEMROfType) ?? EMR.NONE;
    }
    const emrType = (process.env.REACT_APP_EMR_TYPE as string).toLowerCase() as EMR
    if (!emrType) throw new Error('EMR type cannot be inferred. You must provide the emrType explicitly as an env variable')
    return emrType
  }
}
