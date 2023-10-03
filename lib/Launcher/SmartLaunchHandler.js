var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (g && (g = 0, op[0] && (_ = 0)), _) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
var __spreadArray = (this && this.__spreadArray) || function (to, from, pack) {
    if (pack || arguments.length === 2) for (var i = 0, l = from.length, ar; i < l; i++) {
        if (ar || !(i in from)) {
            if (!ar) ar = Array.prototype.slice.call(from, 0, i);
            ar[i] = from[i];
        }
    }
    return to.concat(ar || Array.prototype.slice.call(from));
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
            throw new Error("Endpoints not found for EMR type: ".concat(emrType));
    }
}
/**
 * Represents the SmartLaunchHandler class.
 */
var SmartLaunchHandler = /** @class */ (function () {
    /**
     * Creates an instance of SmartLaunchHandler.
     * @param {string} clientID - The client ID to use for authorization.
     */
    function SmartLaunchHandler(clientID) {
        this.clientID = clientID;
    }
    /**
     * Launches the Epic EMR application.
     * @param {string} clientId - The client ID to use for authorization.
     * @param {string} redirect - The redirect URI to use for authorization.
     * @param {string} iss - The issuer for authorization.
     * @returns {Promise<string | void>} - A promise resolving to the authorization response or void.
     */
    SmartLaunchHandler.prototype.epicLaunch = function (clientId, redirect, iss, launchType) {
        return __awaiter(this, void 0, void 0, function () {
            var scope, redirect_uri;
            return __generator(this, function (_a) {
                if (launchType === LAUNCH.BACKEND)
                    throw new Error("This doesn't work for backend launch");
                scope = "launch online_access openid fhirUser";
                redirect_uri = redirect !== null && redirect !== void 0 ? redirect : "";
                return [2 /*return*/, FHIR.oauth2.authorize({
                        client_id: clientId,
                        iss: iss,
                        redirect_uri: redirect_uri,
                        scope: scope,
                    })];
            });
        });
    };
    /**
     * Launches the Cerner EMR application.
     * @param {string} clientId - The client ID to use for authorization.
     * @param {string} redirect - The redirect URI to use for authorization.
     * @param {string} iss - The issuer for authorization.
     * @returns {Promise<string | void>} - A promise resolving to the authorization response or void.
     */
    SmartLaunchHandler.prototype.cernerLaunch = function (clientId, redirect, iss, launchType) {
        return __awaiter(this, void 0, void 0, function () {
            var cernerString, redirect_uri;
            return __generator(this, function (_a) {
                cernerString = cerner.scopes.map(function (name) { return scopes[name]; });
                redirect_uri = redirect !== null && redirect !== void 0 ? redirect : "";
                return [2 /*return*/, FHIR.oauth2.authorize({
                        clientId: clientId,
                        scope: __spreadArray(__spreadArray([
                            launchType === LAUNCH.STANDALONE ? "launch/patient" : "launch"
                        ], cernerString, true), [
                            "online_access",
                            "openid",
                            launchType === LAUNCH.STANDALONE ? "profile" : "fhirUser",
                        ], false).join(" "),
                        iss: iss,
                        redirect_uri: redirect_uri,
                    })];
            });
        });
    };
    /**
     * Authorizes the EMR based on the current URL query parameters.
     * @returns {Promise<void>} - A promise resolving to void.
     */
    SmartLaunchHandler.prototype.authorizeEMR = function (launchType) {
        if (launchType === void 0) { launchType = LAUNCH.EMR; }
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        if (!(launchType !== LAUNCH.BACKEND)) return [3 /*break*/, 2];
                        return [4 /*yield*/, this.executeWebLaunch(launchType)];
                    case 1: return [2 /*return*/, _a.sent()];
                    case 2: 
                    // if (launchType === LAUNCH.STANDALONE) {
                    //   return this.executeStandaloneLaunch(emrType, redirectUriOverride);
                    // }
                    throw new Error('Invalid Smart Launch Type');
                }
            });
        });
    };
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
    SmartLaunchHandler.prototype.generateStandaloneUrl = function (emrType, redirectUri) {
        var _a = getEndpointsForEmr(emrType), r4Endpoint = _a.r4, authEndpoint = _a.auth;
        var r4EndpointBase64 = btoa(r4Endpoint.toString());
        return "".concat(authEndpoint, "?response_type=code&redirect_uri=").concat(redirectUri, "&client_id=").concat(this.clientID, "&aud=").concat(r4EndpointBase64);
    };
    /**
     * The function `executeEMRLaunch` checks the URL parameters for an "iss" value, determines the EMR type based on the "iss" value, and then launches the
     * corresponding EMR system.
     * @returns nothing (undefined).
     */
    SmartLaunchHandler.prototype.executeWebLaunch = function (launchType) {
        var _a;
        return __awaiter(this, void 0, void 0, function () {
            var queryString, originString, urlParams, iss, emrType, _b;
            return __generator(this, function (_c) {
                switch (_c.label) {
                    case 0:
                        queryString = window.location.search;
                        originString = window.location.origin;
                        urlParams = new URLSearchParams(queryString);
                        iss = (_a = urlParams.get("iss")) !== null && _a !== void 0 ? _a : undefined;
                        if (!iss)
                            throw new Error("Iss Search parameter must be provided as part of EMR Web Launch");
                        emrType = this.getEMRType(iss);
                        if (emrType === EMR.NONE || !emrType)
                            throw new Error('EMR type cannot be inferred from the ISS');
                        _b = emrType;
                        switch (_b) {
                            case EMR.EPIC: return [3 /*break*/, 1];
                            case EMR.CERNER: return [3 /*break*/, 3];
                            case EMR.SMART: return [3 /*break*/, 5];
                        }
                        return [3 /*break*/, 5];
                    case 1: return [4 /*yield*/, this.epicLaunch(this.clientID, originString, iss, launchType)];
                    case 2:
                        _c.sent();
                        return [3 /*break*/, 6];
                    case 3: return [4 /*yield*/, this.cernerLaunch(this.clientID, originString, iss, launchType)];
                    case 4:
                        _c.sent();
                        return [3 /*break*/, 6];
                    case 5: return [3 /*break*/, 6];
                    case 6: return [2 /*return*/];
                }
            });
        });
    };
    /**
     * The function `getEMRType` takes a string `iss` and returns the corresponding EMR type based on whether the string includes any of the EMR types.
     * @param {string} iss - The `iss` parameter is a string that represents the issuer of an Electronic Medical Record (EMR).
     * @returns the EMR type that matches the input string `iss`. If a matching EMR type is found, it is returned. If no matching EMR type is found, the function
     * returns `EMR.NONE`.
     */
    SmartLaunchHandler.prototype.getEMRType = function (iss) {
        var _a;
        var isEMROfType = function (emrType) { return iss.includes(emrType); };
        var emrTypes = Object.values(EMR);
        return (_a = emrTypes.find(isEMROfType)) !== null && _a !== void 0 ? _a : EMR.NONE;
    };
    return SmartLaunchHandler;
}());
export default SmartLaunchHandler;
