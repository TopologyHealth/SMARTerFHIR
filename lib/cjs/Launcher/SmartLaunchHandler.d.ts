import { LAUNCH } from "../Client/ClientFactory";
export declare enum EMR {
    CERNER = "cerner",
    EPIC = "epic",
    SMART = "smart",
    ECW = "ecw",
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
     * Creates an instance of SmartLaunchHandler.
     * @param {string} clientID - The client ID to use for authorization.
     */
    constructor(clientID: string, clientSecret?: string);
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
    private launchEMR;
    /**
     * Authorizes the EMR based on the current URL query parameters.
     * @returns {Promise<void>} - A promise resolving to void.
     */
    authorizeEMR(launchType?: LAUNCH, redirectPath?: string): Promise<void>;
    /**
     * The function `executeEMRLaunch` checks the URL parameters for an "iss" value, determines the EMR type based on the "iss" value, and then launches the
     * corresponding EMR system.
     * @returns nothing (undefined).
     */
    private executeWebLaunch;
    /**
     * The function `getEMRType` takes a string `iss` and returns the corresponding EMR type based on whether the string includes any of the EMR types.
     * @param {string} iss - The `iss` parameter is a string that represents the issuer of an Electronic Medical Record (EMR).
     * @returns the EMR type that matches the input string `iss`. If a matching EMR type is found, it is returned. If no matching EMR type is found, the function
     * returns `EMR.NONE`.
     */
    getEMRType(iss?: string): EMR;
}
