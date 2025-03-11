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
import { Action, Actor, FhirScopePermissions } from "./Scopes";
import scopes from "./scopes.json";
import { getEMRType } from "../Client/utils";
export var EMR;
(function (EMR) {
    EMR["CERNER"] = "cerner";
    EMR["EPIC"] = "epic";
    EMR["SMART"] = "smart";
    EMR["ECW"] = "ecw";
    EMR["ATHENA"] = "platform.athena";
    EMR["ATHENAPRACTICE"] = "fhirapi.athena";
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
     * @param {string} clientSecret - The client secret to use for authorization.
     * Set as `undefined` if the application does not require a client secret.
     * @param {string} scope - The scopes to request during launch. If unset,
     * defaults will be computed by SMARTerFHIR based on the EMR type. This can be
     * a list of scopes or it can be a space-delimited string of scopes (e.g.
     * "openid fhirUser profile user/Patient.read")
     */
    constructor(clientID, clientSecret, scope) {
        /**
         * Scopes to be requested during launch, overriding SMARTerFHIR defaults.
         * @readonly
         */
        this.scopeOverride = undefined;
        this.clientID = clientID;
        this.clientSecret = clientSecret;
        if (scope) {
            if (Array.isArray(scope)) {
                this.scopeOverride = scope;
            }
            else {
                this.scopeOverride = scope.split(" ");
            }
        }
    }
    /**
     * Launches an EMR application.
     * @param {EMR} emrType - The EMR type.
     * @param {string} redirect - The redirect URI to use for authorization.
     * @param {string} iss - The issuer for authorization.
     * @param {LAUNCH} launchType - The type of launch.
     * @returns {Promise<string | void>} - A promise resolving to the authorization response or void.
     */
    launchEMR(emrType, redirect, iss, launchType) {
        return __awaiter(this, void 0, void 0, function* () {
            if (launchType === LAUNCH.BACKEND) {
                throw new Error("This doesn't work for backend launch");
            }
            const defaultScopes = ["openid", "fhirUser"];
            const emrSpecificScopes = this.getEmrSpecificScopes(emrType, launchType);
            const scope = [...defaultScopes, ...emrSpecificScopes]
                .reduce((acc, val) => {
                // Deduplicate scopes
                if (!acc.includes(val))
                    acc.push(val);
                return acc;
            }, [])
                .join(" ");
            const emrSpecificAuthorizeParams = getEMRSpecificAuthorizeParams(emrType);
            const redirect_uri = redirect !== null && redirect !== void 0 ? redirect : "";
            const authorizeParams = Object.assign({ client_id: this.clientID, iss: iss, redirect_uri: redirect_uri, scope: scope, clientSecret: this.clientSecret, noRedirect: true }, emrSpecificAuthorizeParams);
            return FHIR.oauth2.authorize(authorizeParams).then(url => {
                if (typeof url === 'string') {
                    addSearchParams(emrType, url);
                }
                else {
                    console.error("Failed to build authorize URL");
                }
            });
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
            const inferredEmrType = getEMRType(new URL(iss));
            const isInvalidEmrType = emrType === undefined && inferredEmrType === EMR.NONE;
            if (isInvalidEmrType)
                throw new Error("EMR type cannot be inferred from the ISS");
            yield this.launchEMR(emrType !== null && emrType !== void 0 ? emrType : inferredEmrType, redirect, iss, launchType);
        });
    }
    /**
     * Returns the scopes to be used during launch
     * @param emrType
     * @param launchType
     * @returns {string[]} - The list of scopes
     */
    getEmrSpecificScopes(emrType, launchType) {
        if (this.scopeOverride && this.scopeOverride.length > 0)
            return this.scopeOverride;
        return generatePreconfiguredScopes(launchType, emrType);
    }
}
function generatePreconfiguredScopes(launchType, emrType) {
    const standardScopes = [launchType === LAUNCH.STANDALONE ? "launch/practitioner" : "launch",
        "online_access"];
    switch (emrType) {
        case EMR.CERNER:
            return [...standardScopes, ...cerner.scopes.map(name => scopes[name])];
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
    const urlSearchParams = new URLSearchParams();
    switch (emrType) {
        case EMR.ATHENAPRACTICE:
            urlSearchParams.set('response_mode', 'query');
            break;
        default:
    }
    return urlSearchParams;
}
function addSearchParams(emrType, url) {
    const emrSpecificUrlsParams = getEMRSpecificUrlParams(emrType);
    const newUrl = new URL(url);
    Object.keys(emrSpecificUrlsParams).forEach(key => {
        newUrl.searchParams.append(`${String(key)}`, `${emrSpecificUrlsParams[key]}`);
    });
    self.location.href = newUrl.toString();
}
//# sourceMappingURL=SmartLaunchHandler.js.map