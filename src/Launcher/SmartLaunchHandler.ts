import * as FHIR from "fhirclient";
import { EMR_ENDPOINTS } from "../Client/BaseClient";
import CernerClient from "../Client/CernerClient";
import { LAUNCH } from "../Client/ClientFactory";
import EpicClient from "../Client/EpicClient";
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
      launchType === LAUNCH.STANDALONE ? "launch/practitioner" : "launch",
      "online_access",
      "openid",
      "fhirUser",
    ];

    const scope = [...defaultScopes, ...emrSpecificScopes].join(" ");
    const redirect_uri = redirect ?? "";

    return FHIR.oauth2.authorize({
      client_id: this.clientID,
      iss: iss,
      redirect_uri: redirect_uri,
      scope: scope,
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
   * Authorizes the EMR based on the current URL query parameters.
   * @returns {Promise<void>} - A promise resolving to void.
   */
  async authorizeEMR(launchType: LAUNCH = LAUNCH.EMR) {
  if (launchType !== LAUNCH.BACKEND) {
    return await this.executeWebLaunch(launchType);
  }
  // if (launchType === LAUNCH.STANDALONE) {
  //   return this.executeStandaloneLaunch(emrType, redirectUriOverride);
  // }
  throw new Error('Invalid Smart Launch Type')
}

  /**
   * The function `executeStandaloneLaunch` is used to launch a standalone application for a specific EMR type, with an optional redirect URI override.
   * @param {EMR | undefined} emrType - The `emrType` parameter is of type `EMR`, which is an enumeration representing different types of EMR (Electronic Medical
   * Record) systems. It can have the following values:
   * @param {string | undefined} redirectUriOverride - The `redirectUriOverride` parameter is a string that represents the URL where the user should be redirected
   * after the standalone launch is completed. If this parameter is not provided, the default value is set to the current URL of the window.
   * @returns Nothing is being returned. The function has a return type of `void`, which means it does not return any value.
   */
  /* The commented code block is defining a private method called `executeStandaloneLaunch` within the `SmartLaunchHandler` class. This method is used to launch a
  standalone application for a specific EMR type, with an optional redirect URI override. */
  // private executeStandaloneLaunch(emrType: EMR | undefined, redirectUriOverride: string | undefined) {
  //   if (!emrType)
  //     throw new Error('EmrType must be specified for Standalone Launch');
  //   const redirectUri = redirectUriOverride ?? (window.location.origin + window.location.pathname);
  //   const standaloneUrl = this.generateStandaloneUrl(emrType, redirectUri);
  //   switch (emrType) {
  //     case EMR.EPIC:
  //     case EMR.CERNER:
  //     case EMR.SMART:
  //       window.location.href = standaloneUrl;
  //       break;
  //     case EMR.NONE:
  //     default:
  //       throw new Error("This EMR is not supported for standalone launch");
  //   }
  //   return;
  // }

  /**
   * The function generates a standalone URL for a given EMR type, redirect URI, and client ID.
   * @param {EMR} emrType - The `emrType` parameter represents the type of EMR (Electronic Medical Record) system. It is of type `EMR`.
   * @param {string} redirectUri - The `redirectUri` parameter is the URL where the user will be redirected to after completing the authentication process.
   * @returns a URL string.
   */
  private generateStandaloneUrl(emrType: EMR, redirectUri: string) {
  const { r4: r4Endpoint, auth: authEndpoint } = getEndpointsForEmr(emrType)
  const r4EndpointBase64 = btoa(r4Endpoint.toString())
  return `${authEndpoint}?response_type=code&redirect_uri=${redirectUri}&client_id=${this.clientID}&aud=${r4EndpointBase64}`;
}

  /**
   * The function `executeEMRLaunch` checks the URL parameters for an "iss" value, determines the EMR type based on the "iss" value, and then launches the
   * corresponding EMR system.
   * @returns nothing (undefined).
   */
  private async executeWebLaunch(launchType: LAUNCH) {
  const queryString = window.location.search;
  const originString = window.location.origin;
  const urlParams = new URLSearchParams(queryString);
  const iss = urlParams.get("iss") ?? undefined;
  if (!iss)
    throw new Error("Iss Search parameter must be provided as part of EMR Web Launch")
  const emrType = this.getEMRType(iss);
  if (emrType === EMR.NONE || !emrType)
    throw new Error('EMR type cannot be inferred from the ISS')
  switch (emrType) {
    case EMR.EPIC:
      await this.epicLaunch(originString, iss, launchType);
      break;
    case EMR.CERNER:
      await this.cernerLaunch(originString, iss, launchType);
      break;
    case EMR.SMART:
    default:
      break;
  }
  return;
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
