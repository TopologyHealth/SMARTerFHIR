import * as FHIR from "fhirclient";
import { fhirclient } from "fhirclient/lib/types";
import { LAUNCH } from "../Client/ClientFactory";
import { cerner } from "./Config";
import scopes from "./scopes.json";
import { FhirResource, Patient } from "fhir/r4";
import { Action, Actor, FhirScopePermissions } from "./Scopes";

export enum EMR {
  CERNER = "cerner",
  EPIC = "epic",
  ATHENA = "athena",
  SMART = "smart",
  ECW = "ecw",
  NONE = "none",
}

/**
 * The function `instanceOfEmr` checks if an object is an instance of the EMR enum.
 * @param {unknown} object - The `object` parameter is of type `unknown`, which means it can be any type.
 * @returns a boolean value.
 */
export function instanceOfEmr(object: unknown): object is EMR {
  return Object.values(EMR).includes(object as string as EMR);
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

  readonly clientSecret?: string;

  /**
   * Creates an instance of SmartLaunchHandler.
   * @param {string} clientID - The client ID to use for authorization.
   */
  constructor(clientID: string, clientSecret?: string) {
    this.clientID = clientID;
    this.clientSecret = clientSecret;
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
    emrType: EMR,
    redirect: string,
    iss: string,
    launchType: LAUNCH
    // ,
    // emrSpecificScopes: string[]
  ): Promise<string | void> {
    if (launchType === LAUNCH.BACKEND) {
      throw new Error("This doesn't work for backend launch");
    }

    const defaultScopes = ["openid", "fhirUser"];
    const emrSpecificScopes = getEmrSpecificScopes(emrType, launchType);
    const scope = [...defaultScopes, ...emrSpecificScopes].join(" ");
    const emrSpecificAuthorizeParams: Partial<fhirclient.AuthorizeParams> =
      getEMRSpecificAuthorizeParams(emrType);
    const redirect_uri = redirect ?? "";

    const authorizeParams = {
      client_id: this.clientID,
      iss: iss,
      redirect_uri: redirect_uri,
      scope: scope,
      clientSecret: this.clientSecret,
      ...emrSpecificAuthorizeParams,
    };
    return FHIR.oauth2.authorize(authorizeParams);
  }

  /**
   * Authorizes the EMR based on the current URL query parameters.
   * @returns {Promise<void>} - A promise resolving to void.
   */
  async authorizeEMR(launchType: LAUNCH = LAUNCH.EMR, redirectPath?: string) {
    if (launchType === LAUNCH.BACKEND) {
      throw new Error(`Direct Backend Authorization not supported yet.`);
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
    const redirect =
      origin +
      (redirectPath
        ? redirectPath.startsWith("/")
          ? redirectPath
          : "/" + redirectPath
        : "");
    const urlParams = new URLSearchParams(queryString);
    const iss = urlParams.get("iss") ?? undefined;
    if (!iss)
      throw new Error(
        "Iss Search parameter must be provided as part of EMR Web Launch"
      );
    const emrType = SmartLaunchHandler.getEMRType(iss);
    if (emrType === EMR.NONE || !emrType)
      throw new Error("EMR type cannot be inferred from the ISS");
    await this.launchEMR(emrType, redirect, iss, launchType);
  }

  /**
   * The function `getEMRType` takes a string `iss` and returns the corresponding EMR type based on whether the string includes any of the EMR types.
   * @param {string} iss - The `iss` parameter is a string that represents the issuer of an Electronic Medical Record (EMR).
   * @returns the EMR type that matches the input string `iss`. If a matching EMR type is found, it is returned. If no matching EMR type is found, the function
   * returns `EMR.NONE`.
   */
  static getEMRType(iss?: string): EMR {
    if (iss) {
      const isEMROfType = (emrType: EMR) => iss.includes(emrType);
      const emrTypes = Object.values(EMR);
      return emrTypes.find(isEMROfType) ?? EMR.NONE;
    }
    const emrType = (
      process.env.REACT_APP_EMR_TYPE as string
    ).toLowerCase() as EMR;
    if (!emrType)
      throw new Error(
        "EMR type cannot be inferred. You must provide the emrType explicitly as an env variable"
      );
    return emrType;
  }
}
function getEmrSpecificScopes(emrType: EMR, launchType: LAUNCH): string[] {
  const standardScopes = [
    launchType === LAUNCH.STANDALONE ? "launch/practitioner" : "launch",
    "online_access",
  ];
  switch (emrType) {
    case EMR.CERNER:
      return [
        ...standardScopes,
        ...cerner.scopes.map(
          (name) => (scopes as { [key: string]: string })[name]
        ),
      ];
    case EMR.ECW:
      return [
        launchType === LAUNCH.STANDALONE ? "launch/patient" : "launch",
        FhirScopePermissions.get(Actor.USER, Action.READ, [
          "Patient",
          "Encounter",
          "Practitioner",
        ]),
      ];
    case EMR.EPIC:
    case EMR.ATHENA:
    case EMR.SMART:
    default:
      return standardScopes;
  }
}

function getEMRSpecificAuthorizeParams(
  emrType: EMR
): Partial<fhirclient.AuthorizeParams> {
  switch (emrType) {
    case EMR.ECW:
      return {
        pkceMode: "unsafeV1",
        completeInTarget: true,
      };
    case EMR.CERNER:
    case EMR.EPIC:
    case EMR.ATHENA:
    case EMR.SMART:
    default:
      return {
        pkceMode: "ifSupported",
      };
  }
}
