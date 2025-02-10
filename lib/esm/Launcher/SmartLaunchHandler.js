var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import * as FHIR from "fhirclient";
import { LAUNCH } from "../Client/ClientFactory";
import { cerner } from "./Config";
import scopes from "./scopes.json";
import { Action, Actor, FhirScopePermissions } from "./Scopes";
export var EMR;
(function (EMR) {
    EMR["CERNER"] = "cerner";
    EMR["EPIC"] = "epic";
    EMR["SMART"] = "smart";
    EMR["ECW"] = "ecw";
    EMR["ATHENA"] = "athena";
    EMR["ATHENAPRACTICE"] = "athenapractice";
    EMR["NONE"] = "none";
})(EMR || (EMR = {}));
/**
 * The function `instanceOfEmr` checks if an object is an instance of the EMR enum.
 * @param {unknown} object - The `object` parameter is of type `unknown`, which means it can be any type.
 * @returns a boolean value.
 */
export function instanceOfEmr(object) {
    return Object.values(EMR).includes(object);
}
/**
 * Represents the SmartLaunchHandler class.
 */
export default class SmartLaunchHandler {
    /**
     * Creates an instance of SmartLaunchHandler.
     * @param {string} clientID - The client ID to use for authorization.
     */
    constructor(clientID, clientSecret) {
        this.clientID = clientID;
        this.clientSecret = clientSecret;
    }
    /**
     * Launches an EMR application.
     * @param {string} redirect - The redirect URI to use for authorization.
     * @param {string} iss - The issuer for authorization.
     * @param {LAUNCH} launchType - The type of launch.
     * @param {string[]} scopes - Additional scopes to request.
     * @returns {Promise<string | void>} - A promise resolving to the authorization response or void.
     */
    launchEMR(emrType, redirect, iss, launchType, scopes) {
        return __awaiter(this, void 0, void 0, function* () {
            if (launchType === LAUNCH.BACKEND) {
                throw new Error("This doesn't work for backend launch");
            }
            const defaultScopes = [
                "openid",
                "fhirUser",
            ];
            const emrSpecificScopes = getEmrSpecificScopes(emrType, launchType);
            const scope = [...defaultScopes, ...emrSpecificScopes, ...(scopes !== null && scopes !== void 0 ? scopes : [])].join(" ");
            const emrSpecificAuthorizeParams = getEMRSpecificAuthorizeParams(emrType);
            const redirect_uri = redirect !== null && redirect !== void 0 ? redirect : "";
            const emrSpecificUrlsParams = getEMRSpecificUrlParams(emrType);
            const authorizeParams = Object.assign({ client_id: this.clientID, iss: iss, redirect_uri: redirect_uri, scope: scope, clientSecret: this.clientSecret, noRedirect: true }, emrSpecificAuthorizeParams);
            const url = yield FHIR.oauth2.authorize(authorizeParams);
            if (!url)
                throw new Error("Failed to build authorize URL");
            self.location.href = url + emrSpecificUrlsParams;
        });
    }
    /**
     * Authorizes the EMR based on the current URL query parameters.
     * @returns {Promise<void>} - A promise resolving to void.
     */
    authorizeEMR() {
        return __awaiter(this, arguments, void 0, function* (launchType = LAUNCH.EMR, redirectPath, emrType) {
            if (launchType === LAUNCH.BACKEND) {
                throw new Error(`Direct Backend Authorization not supported yet.`);
            }
            else {
                return yield this.executeWebLaunch(launchType, redirectPath, emrType);
            }
        });
    }
    /**
     * The function `executeEMRLaunch` checks the URL parameters for an "iss" value, determines the EMR type based on the "iss" value, and then launches the
     * corresponding EMR system.
     * @returns nothing (undefined).
     */
    executeWebLaunch(launchType, redirectPath, emrType) {
        return __awaiter(this, void 0, void 0, function* () {
            var _a;
            const queryString = window.location.search;
            const origin = window.location.origin;
            const isAbsoluteUrl = (url) => {
                try {
                    new URL(url); // Throws error for relative URLs
                    return true;
                }
                catch (_a) {
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
            const iss = (_a = urlParams.get("iss")) !== null && _a !== void 0 ? _a : undefined;
            if (!iss)
                throw new Error("Iss Search parameter must be provided as part of EMR Web Launch");
            if (emrType === undefined)
                emrType = SmartLaunchHandler.getEMRType(iss);
            if (emrType === EMR.NONE || !emrType)
                throw new Error('EMR type cannot be inferred from the ISS');
            yield this.launchEMR(emrType, redirect, iss, launchType);
        });
    }
    /**
     * The function `getEMRType` takes a string `iss` and returns the corresponding EMR type based on whether the string includes any of the EMR types.
     * @param {string} iss - The `iss` parameter is a string that represents the issuer of an Electronic Medical Record (EMR).
     * @returns the EMR type that matches the input string `iss`. If a matching EMR type is found, it is returned. If no matching EMR type is found, the function
     * returns `EMR.NONE`.
     */
    static getEMRType(iss) {
        var _a;
        if (iss) {
            // Handle specific cases
            if (iss.includes('https://ap23sandbox.fhirapi.athenahealth.com/demoAPIServer/fhir/r4')) {
                return EMR.ATHENAPRACTICE;
            }
            const isEMROfType = (emrType) => iss.includes(emrType);
            const emrTypes = Object.values(EMR);
            return (_a = emrTypes.find(isEMROfType)) !== null && _a !== void 0 ? _a : EMR.NONE;
        }
        const emrType = process.env.REACT_APP_EMR_TYPE.toLowerCase();
        if (!emrType)
            throw new Error('EMR type cannot be inferred. You must provide the emrType explicitly as an env variable');
        return emrType;
    }
}
function getEmrSpecificScopes(emrType, launchType) {
    const standardScopes = [launchType === LAUNCH.STANDALONE ? "launch/practitioner" : "launch",
        "online_access"];
    switch (emrType) {
        case EMR.CERNER:
            return [...standardScopes, ...cerner.scopes.map(name => scopes[name])];
        case EMR.ECW:
            return [launchType === LAUNCH.STANDALONE ? "launch/patient" : "launch", FhirScopePermissions.get(Actor.USER, Action.READ, ["Patient", "Encounter", "Practitioner"])];
        case EMR.ATHENAPRACTICE:
            const emrScopes = [
                "profile",
                "offline_access",
                FhirScopePermissions.get(Actor.USER, Action.READ, ["Patient"]),
            ];
            if (launchType === LAUNCH.EMR)
                emrScopes.push("launch");
            return emrScopes;
        case EMR.ATHENA:
            return ["profile", "offline_access", launchType === LAUNCH.STANDALONE ? "launch/patient" : "launch", FhirScopePermissions.get(Actor.USER, Action.READ, ["Patient"])];
        case EMR.EPIC:
        case EMR.SMART:
        default:
            return standardScopes;
    }
}
function getEMRSpecificAuthorizeParams(emrType) {
    switch (emrType) {
        case EMR.ECW:
            return {
                pkceMode: 'unsafeV1',
                completeInTarget: true
            };
        case EMR.CERNER:
        case EMR.EPIC:
        case EMR.SMART:
        default:
            return {
                pkceMode: 'ifSupported'
            };
    }
}
function getEMRSpecificUrlParams(emrType) {
    switch (emrType) {
        case EMR.ATHENAPRACTICE:
            return '&response_mode=query';
        default:
            return '';
    }
}
//# sourceMappingURL=SmartLaunchHandler.js.map