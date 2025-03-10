import * as FHIR from "fhirclient";
import { fhirclient } from "fhirclient/lib/types";
import { LAUNCH } from "../Client/ClientFactory";
import { cerner } from "./Config";
import { Action, Actor, FhirScopePermissions } from "./Scopes";
import scopes from "./scopes.json";
import { getEMRType } from "../Client/utils";

export enum EMR {
  CERNER = "cerner",
  EPIC = "epic",
  SMART = "smart",
  ECW = "ecw",
  ATHENA = "platform.athena",
  ATHENAPRACTICE = "fhirapi.athena",
  MEDITECH = "meditech",
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
   * Scopes to be requested during launch, overriding SMARTerFHIR defaults.
   * @readonly
   */
  readonly scopeOverride?: string[];

  /**
   * Creates an instance of SmartLaunchHandler.
   * @param {string} clientID - The client ID to use for authorization.
   * @param {string} clientSecret - The client secret to use for authorization.
   * Set as `undefined` if the application does not require a client secret.
   * @param {string} scope - The scopes to request during launch. If unset,
   * defaults will be computed by SMARTerFHIR based on the EMR type. **If
   * provided, this function expects a string containing scopes separated by
   * commas** (e.g., "openid, fhirUser, profile, offline_access, user/Patient.*,
   * user/Practitioner.read")
   */
  constructor(clientID: string, clientSecret?: string, scope?: string) {
    this.clientID = clientID;
    this.clientSecret = clientSecret;
    if (scope) {
      const hasCommaSeparators = scope.includes(",");
      if (!hasCommaSeparators)
        throw new Error(
          "`scope` argument is of invalid format. `scope` must be provided as a string of comma-separated values"
        );
      this.scopeOverride = scope.split(",").map((s) => s.trim());
    }
  }

  /**
   * Launches an EMR application.
   * @param {string} redirect - The redirect URI to use for authorization.
   * @param {string} iss - The issuer for authorization.
   * @param {LAUNCH} launchType - The type of launch.
   * @param {string[]} scopes - Additional scopes to request.
   * @returns {Promise<string | void>} - A promise resolving to the authorization response or void.
   */
  private async launchEMR(
    emrType: EMR,
    redirect: string,
    iss: string,
    launchType: LAUNCH,
    scopes?: string[]
  ): Promise<string | void> {
    if (launchType === LAUNCH.BACKEND) {
      throw new Error("This doesn't work for backend launch");
    }

    const defaultScopes = [
      "openid",
      "fhirUser",
    ];
    const emrSpecificScopes = this.getEmrSpecificScopes(emrType, launchType);
    const scope = [...defaultScopes, ...emrSpecificScopes, ...(scopes ?? [])].join(" ");
    const emrSpecificAuthorizeParams: Partial<fhirclient.AuthorizeParams> = getEMRSpecificAuthorizeParams(emrType)
    const redirect_uri = redirect ?? "";

    const authorizeParams = {
      client_id: this.clientID,
      iss: iss,
      redirect_uri: redirect_uri,
      scope: scope,
      clientSecret: this.clientSecret,
      noRedirect: true,
      ...emrSpecificAuthorizeParams
    };
    return FHIR.oauth2.authorize(authorizeParams).then(url => {
      if (typeof url === 'string') {
        addSearchParams(emrType, url);
      } else {
        console.error("Failed to build authorize URL")
      }
    })
  }

  /**
   * Authorizes the EMR based on the current URL query parameters.
   * @returns {Promise<void>} - A promise resolving to void.
   */
  async authorizeEMR(launchType: LAUNCH = LAUNCH.EMR, redirectPath?: string, emrType?: EMR): Promise<void> {
    if (launchType === LAUNCH.BACKEND) {
      throw new Error(`Direct Backend Authorization not supported yet.`)
    } else {
      return await this.executeWebLaunch(launchType, redirectPath, emrType);
    }
  }

  /**
   * The function `executeEMRLaunch` checks the URL parameters for an "iss" value, determines the EMR type based on the "iss" value, and then launches the
   * corresponding EMR system.
   * @returns nothing (undefined).
   */
  private async executeWebLaunch(launchType: LAUNCH, redirectPath?: string, emrType?: EMR) {
    const queryString = window.location.search;
    const origin = window.location.origin;

    const isAbsoluteUrl = (url: string): boolean => {
      try {
        new URL(url); // Throws error for relative URLs
        return true;
      } catch {
        return false;
      }
    };

    const redirect = redirectPath
      ? isAbsoluteUrl(redirectPath)
        ? redirectPath // Preserve full URLs (including external domains)
        : origin + (redirectPath.startsWith('/')
          ? redirectPath // Already root-relative path
          : '/' + redirectPath) // Make path root-relative
      : origin; // Default to current origin

    const urlParams = new URLSearchParams(queryString);
    const iss = urlParams.get("iss") ?? undefined;
    if (!iss)
      throw new Error("Iss Search parameter must be provided as part of EMR Web Launch")
    if (emrType === undefined) emrType = getEMRType(new URL(iss));
    if (emrType === EMR.NONE)
      throw new Error("EMR type cannot be inferred from the ISS");
    await this.launchEMR(emrType, redirect, iss, launchType);
  }

  /**
   * Returns the scopes to be used during launch
   * @param emrType
   * @param launchType
   * @returns {string[]} - The list of scopes
   */
  private getEmrSpecificScopes(emrType: EMR, launchType: LAUNCH): string[] {
    if (this.scopeOverride && this.scopeOverride.length > 0)
      return this.scopeOverride;
    return generatePreconfiguredScopes(launchType, emrType);
  }
}

function generatePreconfiguredScopes(launchType: LAUNCH, emrType: EMR) {
  const standardScopes = [launchType === LAUNCH.STANDALONE ? "launch/practitioner" : "launch",
    "online_access"];
  switch (emrType) {
    case EMR.CERNER:
      return [...standardScopes, ...cerner.scopes.map(name => (scopes as { [key: string]: string; })[name])];
    case EMR.ECW:
      return [launchType === LAUNCH.STANDALONE ? "launch/patient" : "launch", FhirScopePermissions.get(Actor.USER, Action.READ, ["Patient", "Encounter", "Practitioner"])];
    case EMR.ATHENAPRACTICE:
      return [
        launchType === LAUNCH.EMR ? ["launch"] : [],
        [
          "profile",
          "offline_access",
          FhirScopePermissions.get(Actor.USER, Action.READ, ["Patient"])
        ]
      ].flat();
    case EMR.ATHENA:
      return ["profile", "offline_access", launchType === LAUNCH.STANDALONE ? "launch/patient" : "launch", FhirScopePermissions.get(Actor.USER, Action.READ, ["Patient"])];
    case EMR.MEDITECH:
      return ["launch/patient", FhirScopePermissions.get(Actor.PATIENT, Action.READ, '*')]
    case EMR.EPIC:
    case EMR.SMART:
    default:
      return standardScopes;
  }
}

function getEMRSpecificAuthorizeParams(emrType: EMR): Partial<fhirclient.AuthorizeParams> {
  switch (emrType) {
    case EMR.ECW:
      return {
        pkceMode: 'unsafeV1',
        completeInTarget: true
      }
    case EMR.CERNER:
    case EMR.EPIC:
    case EMR.SMART:
    default:
      return {
        pkceMode: 'ifSupported'
      };
  }
}

function getEMRSpecificUrlParams(emrType: EMR): URLSearchParams {
  const urlSearchParams = new URLSearchParams()
  switch (emrType) {
    case EMR.ATHENAPRACTICE:
      urlSearchParams.set('response_mode', 'query')
      break;
    default:
  }
  return urlSearchParams
}

function addSearchParams(emrType: EMR, url: string) {
  const emrSpecificUrlsParams = getEMRSpecificUrlParams(emrType);
  const newUrl = new URL(url);
  (Object.keys(emrSpecificUrlsParams) as Array<keyof typeof emrSpecificUrlsParams>).forEach(key => {
    newUrl.searchParams.append(`${String(key)}`, `${emrSpecificUrlsParams[key]}`);
  });
  self.location.href = newUrl.toString();
}

