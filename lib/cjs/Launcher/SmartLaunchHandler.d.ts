import { LAUNCH } from "../Client/ClientFactory";
export declare enum EMR {
    CERNER = "cerner",
    EPIC = "epic",
    SMART = "smart",
    ECW = "ecw",
    ATHENA = "platform.athena",
    ATHENAPRACTICE = "fhirapi.athena",
    MEDITECH = "meditech",
    NONE = "none"
}
/**
 * The function `instanceOfEmr` checks if an object is an instance of the EMR enum.
 * @param {unknown} object - The `object` parameter is of type `unknown`, which means it can be any type.
 * @returns a boolean value.
 */
export declare function instanceOfEmr(object: unknown): object is EMR;
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
    constructor(clientID: string, clientSecret?: string, scope?: string);
    /**
     * Launches an EMR application.
     * @param {string} redirect - The redirect URI to use for authorization.
     * @param {string} iss - The issuer for authorization.
     * @param {LAUNCH} launchType - The type of launch.
     * @param {string[]} scopes - Additional scopes to request.
     * @returns {Promise<string | void>} - A promise resolving to the authorization response or void.
     */
    private launchEMR;
    /**
     * Authorizes the EMR based on the current URL query parameters.
     * @returns {Promise<void>} - A promise resolving to void.
     */
    authorizeEMR(launchType?: LAUNCH, redirectPath?: string, emrType?: EMR): Promise<void>;
    /**
     * The function `executeEMRLaunch` checks the URL parameters for an "iss" value, determines the EMR type based on the "iss" value, and then launches the
     * corresponding EMR system.
     * @returns nothing (undefined).
     */
    private executeWebLaunch;
    /**
     * Returns the scopes to be used during launch
     * @param emrType
     * @param launchType
     * @returns {string[]} - The list of scopes
     */
    private getEmrSpecificScopes;
}
