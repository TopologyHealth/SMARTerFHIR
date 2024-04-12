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
import CernerClient from "../Client/CernerClient";
import { LAUNCH } from "../Client/ClientFactory";
import EpicClient from "../Client/EpicClient";
import { cerner } from "./Config";
import scopes from "./scopes.json";
export var EMR;
(function (EMR) {
    EMR["CERNER"] = "cerner";
    EMR["EPIC"] = "epic";
    EMR["SMART"] = "smart";
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
* The function `getEndpointsForEmr` returns the endpoints for a given EMR type, such as Epic, Cerner, or SMART.
* @param {EMR} emrType - The `emrType` parameter is of type `EMR`, which is an enumeration representing different types of Electronic Medical Record (EMR)
* systems. The possible values for `emrType` are `EMR.EPIC`, `EMR.CERNER`, `EMR.SMART`,
* @returns an object of type EMR_ENDPOINTS.
*/
export function getEndpointsForEmr(emrType) {
    switch (emrType) {
        case EMR.EPIC:
            return EpicClient.getEndpoints();
        case EMR.CERNER:
            return CernerClient.getEndpoints();
        case EMR.SMART:
        case EMR.NONE:
        default:
            throw new Error(`Endpoints not found for EMR type: ${emrType}`);
    }
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
     * @param {string} clientId - The client ID to use for authorization.
     * @param {string} redirect - The redirect URI to use for authorization.
     * @param {string} iss - The issuer for authorization.
     * @param {LAUNCH} launchType - The type of launch.
     * @param {string[]} emrSpecificScopes - Additional scopes specific to the EMR.
     * @param {string} clientSecret - The client secret for authorization.
     * @returns {Promise<string | void>} - A promise resolving to the authorization response or void.
     */
    launchEMR(redirect, iss, launchType, emrSpecificScopes) {
        return __awaiter(this, void 0, void 0, function* () {
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
            const redirect_uri = redirect !== null && redirect !== void 0 ? redirect : "";
            return FHIR.oauth2.authorize({
                client_id: this.clientID,
                iss: iss,
                redirect_uri: redirect_uri,
                scope: scope,
                clientSecret: this.clientSecret,
            });
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
    epicLaunch(redirect, iss, launchType) {
        return __awaiter(this, void 0, void 0, function* () {
            const emrSpecificScopes = [];
            return this.launchEMR(redirect, iss, launchType, emrSpecificScopes);
        });
    }
    /**
     * Launches the SMART Health IT EMR application.
     * @param {string} clientId - The client ID to use for authorization.
     * @param {string} redirect - The redirect URI to use for authorization.
     * @param {string} iss - The issuer for authorization.
     * @param {LAUNCH} launchType - The type of launch.
     * @returns {Promise<string | void>} - A promise resolving to the authorization response or void.
     */
    smartHealthITLaunch(redirect, iss, launchType) {
        return __awaiter(this, void 0, void 0, function* () {
            return this.launchEMR(redirect, iss, launchType, []);
        });
    }
    /**
     * Launches the Cerner EMR application.
     * @param {string} clientId - The client ID to use for authorization.
     * @param {string} redirect - The redirect URI to use for authorization.
     * @param {string} iss - The issuer for authorization.
     * @param {LAUNCH} launchType - The type of launch.
     * @returns {Promise<string | void>} - A promise resolving to the authorization response or void.
     */
    cernerLaunch(redirect, iss, launchType) {
        return __awaiter(this, void 0, void 0, function* () {
            const additionalScopes = cerner.scopes.map((name) => scopes[name]);
            return this.launchEMR(redirect, iss, launchType, additionalScopes);
        });
    }
    /**
     * Authorizes the EMR based on the current URL query parameters.
     * @returns {Promise<void>} - A promise resolving to void.
     */
    authorizeEMR(launchType = LAUNCH.EMR, redirectPath) {
        return __awaiter(this, void 0, void 0, function* () {
            if (launchType === LAUNCH.BACKEND) {
                throw new Error(`Direct Backend Authorization not supported yet.`);
            }
            else {
                return yield this.executeWebLaunch(launchType, redirectPath);
            }
        });
    }
    /**
     * The function `executeEMRLaunch` checks the URL parameters for an "iss" value, determines the EMR type based on the "iss" value, and then launches the
     * corresponding EMR system.
     * @returns nothing (undefined).
     */
    executeWebLaunch(launchType, redirectPath) {
        var _a;
        return __awaiter(this, void 0, void 0, function* () {
            const queryString = window.location.search;
            const origin = window.location.origin;
            const redirect = origin + (redirectPath
                ? redirectPath.startsWith('/')
                    ? redirectPath
                    : '/' + redirectPath
                : '');
            const urlParams = new URLSearchParams(queryString);
            const iss = (_a = urlParams.get("iss")) !== null && _a !== void 0 ? _a : undefined;
            if (!iss)
                throw new Error("Iss Search parameter must be provided as part of EMR Web Launch");
            const emrType = this.getEMRType(iss);
            if (emrType === EMR.NONE || !emrType)
                throw new Error('EMR type cannot be inferred from the ISS');
            switch (emrType) {
                case EMR.EPIC:
                    yield this.epicLaunch(redirect, iss, launchType);
                    break;
                case EMR.CERNER:
                    yield this.cernerLaunch(redirect, iss, launchType);
                    break;
                case EMR.SMART:
                    yield this.smartHealthITLaunch(redirect, iss, launchType);
                    break;
                default:
                    break;
            }
        });
    }
    /**
     * The function `getEMRType` takes a string `iss` and returns the corresponding EMR type based on whether the string includes any of the EMR types.
     * @param {string} iss - The `iss` parameter is a string that represents the issuer of an Electronic Medical Record (EMR).
     * @returns the EMR type that matches the input string `iss`. If a matching EMR type is found, it is returned. If no matching EMR type is found, the function
     * returns `EMR.NONE`.
     */
    getEMRType(iss) {
        var _a;
        if (iss) {
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
//# sourceMappingURL=SmartLaunchHandler.js.map