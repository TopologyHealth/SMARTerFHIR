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
    authorizeEMR(): Promise<void>;
    getEMRType(iss: string): EMR;
}
