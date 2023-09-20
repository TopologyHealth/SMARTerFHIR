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
    SmartLaunchHandler.prototype.epicLaunch = function (clientId, redirect, iss) {
        return __awaiter(this, void 0, void 0, function () {
            var scope, redirect_uri;
            return __generator(this, function (_a) {
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
    SmartLaunchHandler.prototype.cernerLaunch = function (clientId, redirect, iss) {
        return __awaiter(this, void 0, void 0, function () {
            var cernerString, redirect_uri;
            return __generator(this, function (_a) {
                cernerString = cerner.scopes.map(function (name) { return scopes[name]; });
                redirect_uri = redirect !== null && redirect !== void 0 ? redirect : "";
                return [2 /*return*/, FHIR.oauth2.authorize({
                        clientId: clientId,
                        scope: __spreadArray(__spreadArray([
                            "launch"
                        ], cernerString, true), [
                            "online_access",
                            "openid",
                            "fhirUser",
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
    SmartLaunchHandler.prototype.authorizeEMR = function () {
        var _a;
        return __awaiter(this, void 0, void 0, function () {
            var queryString, originString, urlParams, iss, emrType, isValidIss, _b;
            return __generator(this, function (_c) {
                switch (_c.label) {
                    case 0:
                        queryString = window.location.search;
                        originString = window.location.origin;
                        urlParams = new URLSearchParams(queryString);
                        iss = (_a = urlParams.get("iss")) !== null && _a !== void 0 ? _a : "";
                        emrType = this.getEMRType(iss);
                        isValidIss = iss !== null && iss.includes(emrType);
                        if (!isValidIss) return [3 /*break*/, 6];
                        _b = emrType;
                        switch (_b) {
                            case EMR.EPIC: return [3 /*break*/, 1];
                            case EMR.CERNER: return [3 /*break*/, 3];
                            case EMR.SMART: return [3 /*break*/, 5];
                            case EMR.NONE: return [3 /*break*/, 5];
                        }
                        return [3 /*break*/, 5];
                    case 1: return [4 /*yield*/, this.epicLaunch(this.clientID, originString, iss)];
                    case 2:
                        _c.sent();
                        return [3 /*break*/, 6];
                    case 3: return [4 /*yield*/, this.cernerLaunch(this.clientID, originString, iss)];
                    case 4:
                        _c.sent();
                        _c.label = 5;
                    case 5: return [3 /*break*/, 6];
                    case 6: return [2 /*return*/];
                }
            });
        });
    };
    /**
     * Begins a standalone launch flow with the provided EMR.
     * @param {EMR} emrType - The EMR to authenticate with
     * @param {string} redirectUriOverride - Override the "redirect_uri" sent during authentication. By default, this will be the current URL minus any parameters
     * @returns {void} - This function will cause a browser redirect if successful
     */
    SmartLaunchHandler.prototype.authorizeStandalone = function (emrType, redirectUriOverride) {
        var redirectUri = redirectUriOverride !== null && redirectUriOverride !== void 0 ? redirectUriOverride : (window.location.origin + window.location.pathname);
        switch (emrType) {
            case EMR.EPIC:
                var standaloneUrl = "https://fhir.epic.com/interconnect-fhir-oauth/oauth2/authorize?response_type=code&redirect_uri=".concat(redirectUri, "&client_id=").concat(this.clientID, "&aud=https%3A%2F%2Ffhir.epic.com%2Finterconnect-fhir-oauth%2Fapi%2Ffhir%2FR4");
                window.location.href = standaloneUrl;
                break;
            case EMR.CERNER:
            case EMR.SMART:
            case EMR.NONE:
            default:
                throw new Error("This EMR is not supported for standalone launch");
        }
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
