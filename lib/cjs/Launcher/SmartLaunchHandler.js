"use strict";
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
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
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g = Object.create((typeof Iterator === "function" ? Iterator : Object).prototype);
    return g.next = verb(0), g["throw"] = verb(1), g["return"] = verb(2), typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.EMR = void 0;
exports.instanceOfEmr = instanceOfEmr;
var FHIR = __importStar(require("fhirclient"));
var ClientFactory_1 = require("../Client/ClientFactory");
var Config_1 = require("./Config");
var Scopes_1 = require("./Scopes");
var scopes_json_1 = __importDefault(require("./scopes.json"));
var EMR;
(function (EMR) {
    EMR["CERNER"] = "cerner";
    EMR["EPIC"] = "epic";
    EMR["SMART"] = "smart";
    EMR["ECW"] = "ecw";
    EMR["ATHENA"] = "platform.athena";
    EMR["ATHENAPRACTICE"] = "fhirapi.athena";
    EMR["NONE"] = "none";
})(EMR || (exports.EMR = EMR = {}));
/**
 * The function `instanceOfEmr` checks if an object is an instance of the EMR enum.
 * @param {unknown} object - The `object` parameter is of type `unknown`, which means it can be any type.
 * @returns a boolean value.
 */
function instanceOfEmr(object) {
    return Object.values(EMR).includes(object);
}
/**
 * Represents the SmartLaunchHandler class.
 */
var SmartLaunchHandler = /** @class */ (function () {
    /**
     * Creates an instance of SmartLaunchHandler.
     * @param {string} clientID - The client ID to use for authorization.
     */
    function SmartLaunchHandler(clientID, clientSecret) {
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
    SmartLaunchHandler.prototype.launchEMR = function (emrType, redirect, iss, launchType, scopes) {
        return __awaiter(this, void 0, void 0, function () {
            var defaultScopes, emrSpecificScopes, scope, emrSpecificAuthorizeParams, redirect_uri, authorizeParams;
            return __generator(this, function (_a) {
                if (launchType === ClientFactory_1.LAUNCH.BACKEND) {
                    throw new Error("This doesn't work for backend launch");
                }
                defaultScopes = [
                    "openid",
                    "fhirUser",
                ];
                emrSpecificScopes = getEmrSpecificScopes(emrType, launchType);
                scope = __spreadArray(__spreadArray(__spreadArray([], defaultScopes, true), emrSpecificScopes, true), (scopes !== null && scopes !== void 0 ? scopes : []), true).join(" ");
                emrSpecificAuthorizeParams = getEMRSpecificAuthorizeParams(emrType);
                redirect_uri = redirect !== null && redirect !== void 0 ? redirect : "";
                authorizeParams = __assign({ client_id: this.clientID, iss: iss, redirect_uri: redirect_uri, scope: scope, clientSecret: this.clientSecret, noRedirect: true }, emrSpecificAuthorizeParams);
                return [2 /*return*/, FHIR.oauth2.authorize(authorizeParams).then(function (url) {
                        if (typeof url === 'string') {
                            addSearchParams(emrType, url);
                        }
                        else {
                            console.error("Failed to build authorize URL");
                        }
                    })];
            });
        });
    };
    /**
     * Authorizes the EMR based on the current URL query parameters.
     * @returns {Promise<void>} - A promise resolving to void.
     */
    SmartLaunchHandler.prototype.authorizeEMR = function () {
        return __awaiter(this, arguments, void 0, function (launchType, redirectPath, emrType) {
            if (launchType === void 0) { launchType = ClientFactory_1.LAUNCH.EMR; }
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        if (!(launchType === ClientFactory_1.LAUNCH.BACKEND)) return [3 /*break*/, 1];
                        throw new Error("Direct Backend Authorization not supported yet.");
                    case 1: return [4 /*yield*/, this.executeWebLaunch(launchType, redirectPath, emrType)];
                    case 2: return [2 /*return*/, _a.sent()];
                }
            });
        });
    };
    /**
     * The function `executeEMRLaunch` checks the URL parameters for an "iss" value, determines the EMR type based on the "iss" value, and then launches the
     * corresponding EMR system.
     * @returns nothing (undefined).
     */
    SmartLaunchHandler.prototype.executeWebLaunch = function (launchType, redirectPath, emrType) {
        return __awaiter(this, void 0, void 0, function () {
            var queryString, origin, isAbsoluteUrl, redirect, urlParams, iss;
            var _a;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        queryString = window.location.search;
                        origin = window.location.origin;
                        isAbsoluteUrl = function (url) {
                            try {
                                new URL(url); // Throws error for relative URLs
                                return true;
                            }
                            catch (_a) {
                                return false;
                            }
                        };
                        redirect = redirectPath
                            ? isAbsoluteUrl(redirectPath)
                                ? redirectPath // Preserve full URLs (including external domains)
                                : origin + (redirectPath.startsWith('/')
                                    ? redirectPath // Already root-relative path
                                    : '/' + redirectPath) // Make path root-relative
                            : origin;
                        urlParams = new URLSearchParams(queryString);
                        iss = (_a = urlParams.get("iss")) !== null && _a !== void 0 ? _a : undefined;
                        if (!iss)
                            throw new Error("Iss Search parameter must be provided as part of EMR Web Launch");
                        if (emrType === undefined)
                            emrType = SmartLaunchHandler.getEMRType(iss);
                        if (emrType === EMR.NONE)
                            throw new Error('EMR type cannot be inferred from the ISS');
                        return [4 /*yield*/, this.launchEMR(emrType, redirect, iss, launchType)];
                    case 1:
                        _b.sent();
                        return [2 /*return*/];
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
    SmartLaunchHandler.getEMRType = function (iss) {
        var _a;
        if (iss) {
            // Handle specific cases
            // if (iss.includes('https://ap23sandbox.fhirapi.athenahealth.com/demoAPIServer/fhir/r4')) {
            //   return EMR.ATHENAPRACTICE
            // }
            var isEMROfType = function (emrType) { return iss.includes(emrType); };
            var sortedEMRTypes = (Object.values(EMR)).sort(function (a, b) { return b.length - a.length; });
            return (_a = sortedEMRTypes.find(isEMROfType)) !== null && _a !== void 0 ? _a : EMR.NONE;
        }
        var emrType = process.env.REACT_APP_EMR_TYPE.toLowerCase();
        if (!emrType)
            throw new Error('EMR type cannot be inferred. You must provide the emrType explicitly as an env variable');
        return emrType;
    };
    return SmartLaunchHandler;
}());
exports.default = SmartLaunchHandler;
function getEmrSpecificScopes(emrType, launchType) {
    var standardScopes = [launchType === ClientFactory_1.LAUNCH.STANDALONE ? "launch/practitioner" : "launch",
        "online_access"];
    switch (emrType) {
        case EMR.CERNER:
            return __spreadArray(__spreadArray([], standardScopes, true), Config_1.cerner.scopes.map(function (name) { return scopes_json_1.default[name]; }), true);
        case EMR.ECW:
            return [launchType === ClientFactory_1.LAUNCH.STANDALONE ? "launch/patient" : "launch", Scopes_1.FhirScopePermissions.get(Scopes_1.Actor.USER, Scopes_1.Action.READ, ["Patient", "Encounter", "Practitioner"])];
        case EMR.ATHENAPRACTICE:
            return [
                launchType === ClientFactory_1.LAUNCH.EMR ? ["launch"] : [],
                [
                    "profile",
                    "offline_access",
                    Scopes_1.FhirScopePermissions.get(Scopes_1.Actor.USER, Scopes_1.Action.READ, ["Patient"])
                ]
            ].flat();
        case EMR.ATHENA:
            return ["profile", "offline_access", launchType === ClientFactory_1.LAUNCH.STANDALONE ? "launch/patient" : "launch", Scopes_1.FhirScopePermissions.get(Scopes_1.Actor.USER, Scopes_1.Action.READ, ["Patient"])];
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
    var urlSearchParams = new URLSearchParams();
    switch (emrType) {
        case EMR.ATHENAPRACTICE:
            urlSearchParams.set('response_mode', 'query');
            break;
        default:
    }
    return urlSearchParams;
}
function addSearchParams(emrType, url) {
    var emrSpecificUrlsParams = getEMRSpecificUrlParams(emrType);
    var newUrl = new URL(url);
    Object.keys(emrSpecificUrlsParams).forEach(function (key) {
        newUrl.searchParams.append("".concat(String(key)), "".concat(emrSpecificUrlsParams[key]));
    });
    self.location.href = newUrl.toString();
}
//# sourceMappingURL=SmartLaunchHandler.js.map