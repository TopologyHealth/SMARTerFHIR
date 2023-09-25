import { LAUNCH } from "../Client/ClientFactory";
export declare enum EMR {
    CERNER = "cerner",
    EPIC = "epic",
    SMART = "smart",
    NONE = "none"
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
    constructor(clientID: string);
    /**
     * Launches the Epic EMR application.
     * @param {string} clientId - The client ID to use for authorization.
     * @param {string} redirect - The redirect URI to use for authorization.
     * @param {string} iss - The issuer for authorization.
     * @returns {Promise<string | void>} - A promise resolving to the authorization response or void.
     */
    epicLaunch(clientId: string, redirect: string, iss: string): Promise<string | void>;
    /**
     * Launches the Cerner EMR application.
     * @param {string} clientId - The client ID to use for authorization.
     * @param {string} redirect - The redirect URI to use for authorization.
     * @param {string} iss - The issuer for authorization.
     * @returns {Promise<string | void>} - A promise resolving to the authorization response or void.
     */
    cernerLaunch(clientId: string, redirect: string, iss: string): Promise<string | void>;
    /**
     * Authorizes the EMR based on the current URL query parameters.
     * @returns {Promise<void>} - A promise resolving to void.
     */
    authorizeEMR(launchType?: LAUNCH, emrType?: EMR, redirectUriOverride?: string): Promise<void>;
    /**
     * The function `executeStandaloneLaunch` is used to launch a standalone application for a specific EMR type, with an optional redirect URI override.
     * @param {EMR | undefined} emrType - The `emrType` parameter is of type `EMR`, which is an enumeration representing different types of EMR (Electronic Medical
     * Record) systems. It can have the following values:
     * @param {string | undefined} redirectUriOverride - The `redirectUriOverride` parameter is a string that represents the URL where the user should be redirected
     * after the standalone launch is completed. If this parameter is not provided, the default value is set to the current URL of the window.
     * @returns Nothing is being returned. The function has a return type of `void`, which means it does not return any value.
     */
    private executeStandaloneLaunch;
    /**
     * The function generates a standalone URL for a given EMR type, redirect URI, and client ID.
     * @param {EMR} emrType - The `emrType` parameter represents the type of EMR (Electronic Medical Record) system. It is of type `EMR`.
     * @param {string} redirectUri - The `redirectUri` parameter is the URL where the user will be redirected to after completing the authentication process.
     * @returns a URL string.
     */
    private generateStandaloneUrl;
    /**
   * The function `getEndpointsForEmr` returns the endpoints for a given EMR type, such as Epic, Cerner, or SMART.
   * @param {EMR} emrType - The `emrType` parameter is of type `EMR`, which is an enumeration representing different types of Electronic Medical Record (EMR)
   * systems. The possible values for `emrType` are `EMR.EPIC`, `EMR.CERNER`, `EMR.SMART`,
   * @returns an object of type EMR_ENDPOINTS.
   */
    private getEndpointsForEmr;
    /**
     * The function `executeEMRLaunch` checks the URL parameters for an "iss" value, determines the EMR type based on the "iss" value, and then launches the
     * corresponding EMR system.
     * @returns nothing (undefined).
     */
    private executeEMRLaunch;
    /**
     * The function `getEMRType` takes a string `iss` and returns the corresponding EMR type based on whether the string includes any of the EMR types.
     * @param {string} iss - The `iss` parameter is a string that represents the issuer of an Electronic Medical Record (EMR).
     * @returns the EMR type that matches the input string `iss`. If a matching EMR type is found, it is returned. If no matching EMR type is found, the function
     * returns `EMR.NONE`.
     */
    getEMRType(iss: string): EMR;
}
