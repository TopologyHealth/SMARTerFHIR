"use strict";
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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getEndpointsForEmr = exports.instanceOfEmr = exports.EMR = void 0;
var FHIR = __importStar(require("fhirclient"));
var CernerClient_1 = __importDefault(require("../Client/CernerClient"));
var ClientFactory_1 = require("../Client/ClientFactory");
var EpicClient_1 = __importDefault(require("../Client/EpicClient"));
var Config_1 = require("./Config");
var scopes_json_1 = __importDefault(require("./scopes.json"));
var EMR;
(function (EMR) {
    EMR["CERNER"] = "cerner";
    EMR["EPIC"] = "epic";
    EMR["SMART"] = "smart";
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
exports.instanceOfEmr = instanceOfEmr;
/**
* The function `getEndpointsForEmr` returns the endpoints for a given EMR type, such as Epic, Cerner, or SMART.
* @param {EMR} emrType - The `emrType` parameter is of type `EMR`, which is an enumeration representing different types of Electronic Medical Record (EMR)
* systems. The possible values for `emrType` are `EMR.EPIC`, `EMR.CERNER`, `EMR.SMART`,
* @returns an object of type EMR_ENDPOINTS.
*/
function getEndpointsForEmr(emrType) {
    switch (emrType) {
        case EMR.EPIC:
            return EpicClient_1.default.getEndpoints();
        case EMR.CERNER:
            return CernerClient_1.default.getEndpoints();
        case EMR.SMART:
        case EMR.NONE:
        default:
            throw new Error("Endpoints not found for EMR type: ".concat(emrType));
    }
}
exports.getEndpointsForEmr = getEndpointsForEmr;
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
     * @param {string} clientId - The client ID to use for authorization.
     * @param {string} redirect - The redirect URI to use for authorization.
     * @param {string} iss - The issuer for authorization.
     * @param {LAUNCH} launchType - The type of launch.
     * @param {string[]} emrSpecificScopes - Additional scopes specific to the EMR.
     * @param {string} clientSecret - The client secret for authorization.
     * @returns {Promise<string | void>} - A promise resolving to the authorization response or void.
     */
    SmartLaunchHandler.prototype.launchEMR = function (redirect, iss, launchType, emrSpecificScopes) {
        return __awaiter(this, void 0, void 0, function () {
            var defaultScopes, scope, redirect_uri;
            return __generator(this, function (_a) {
                if (launchType === ClientFactory_1.LAUNCH.BACKEND) {
                    throw new Error("This doesn't work for backend launch");
                }
                defaultScopes = [
                    launchType === ClientFactory_1.LAUNCH.STANDALONE ? "launch/practitioner" : "launch",
                    "online_access",
                    "openid",
                    "fhirUser",
                ];
                scope = __spreadArray(__spreadArray([], defaultScopes, true), emrSpecificScopes, true).join(" ");
                redirect_uri = redirect !== null && redirect !== void 0 ? redirect : "";
                return [2 /*return*/, FHIR.oauth2.authorize({
                        client_id: this.clientID,
                        iss: iss,
                        redirect_uri: redirect_uri,
                        scope: scope,
                        clientSecret: this.clientSecret,
                    })];
            });
        });
    };
    /**
     * Launches the Epic EMR application.
     * @param {string} clientId - The client ID to use for authorization.
     * @param {string} redirect - The redirect URI to use for authorization.
     * @param {string} iss - The issuer for authorization.
     * @param {LAUNCH} launchType - The type of launch.
     * @returns {Promise<string | void>} - A promise resolving to the authorization response or void.
     */
    SmartLaunchHandler.prototype.epicLaunch = function (redirect, iss, launchType) {
        return __awaiter(this, void 0, void 0, function () {
            var emrSpecificScopes;
            return __generator(this, function (_a) {
                emrSpecificScopes = [];
                return [2 /*return*/, this.launchEMR(redirect, iss, launchType, emrSpecificScopes)];
            });
        });
    };
    /**
     * Launches the SMART Health IT EMR application.
     * @param {string} clientId - The client ID to use for authorization.
     * @param {string} redirect - The redirect URI to use for authorization.
     * @param {string} iss - The issuer for authorization.
     * @param {LAUNCH} launchType - The type of launch.
     * @returns {Promise<string | void>} - A promise resolving to the authorization response or void.
     */
    SmartLaunchHandler.prototype.smartHealthITLaunch = function (redirect, iss, launchType) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                return [2 /*return*/, this.launchEMR(redirect, iss, launchType, [])];
            });
        });
    };
    /**
     * Launches the Cerner EMR application.
     * @param {string} clientId - The client ID to use for authorization.
     * @param {string} redirect - The redirect URI to use for authorization.
     * @param {string} iss - The issuer for authorization.
     * @param {LAUNCH} launchType - The type of launch.
     * @returns {Promise<string | void>} - A promise resolving to the authorization response or void.
     */
    SmartLaunchHandler.prototype.cernerLaunch = function (redirect, iss, launchType) {
        return __awaiter(this, void 0, void 0, function () {
            var additionalScopes;
            return __generator(this, function (_a) {
                additionalScopes = Config_1.cerner.scopes.map(function (name) { return scopes_json_1.default[name]; });
                return [2 /*return*/, this.launchEMR(redirect, iss, launchType, additionalScopes)];
            });
        });
    };
    /**
     * Authorizes the EMR based on the current URL query parameters.
     * @returns {Promise<void>} - A promise resolving to void.
     */
    SmartLaunchHandler.prototype.authorizeEMR = function (launchType, redirectPath) {
        if (launchType === void 0) { launchType = ClientFactory_1.LAUNCH.EMR; }
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        if (!(launchType === ClientFactory_1.LAUNCH.BACKEND)) return [3 /*break*/, 1];
                        throw new Error("Direct Backend Authorization not supported yet.");
                    case 1: return [4 /*yield*/, this.executeWebLaunch(launchType, redirectPath)];
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
    SmartLaunchHandler.prototype.executeWebLaunch = function (launchType, redirectPath) {
        var _a;
        return __awaiter(this, void 0, void 0, function () {
            var queryString, origin, redirect, urlParams, iss, emrType, _b;
            return __generator(this, function (_c) {
                switch (_c.label) {
                    case 0:
                        queryString = window.location.search;
                        origin = window.location.origin;
                        redirect = origin + (redirectPath
                            ? redirectPath.startsWith('/')
                                ? redirectPath
                                : '/' + redirectPath
                            : '');
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
                        return [3 /*break*/, 7];
                    case 1: return [4 /*yield*/, this.epicLaunch(redirect, iss, launchType)];
                    case 2:
                        _c.sent();
                        return [3 /*break*/, 8];
                    case 3: return [4 /*yield*/, this.cernerLaunch(redirect, iss, launchType)];
                    case 4:
                        _c.sent();
                        return [3 /*break*/, 8];
                    case 5: return [4 /*yield*/, this.smartHealthITLaunch(redirect, iss, launchType)];
                    case 6:
                        _c.sent();
                        return [3 /*break*/, 8];
                    case 7: return [3 /*break*/, 8];
                    case 8: return [2 /*return*/];
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
        if (iss) {
            var isEMROfType = function (emrType) { return iss.includes(emrType); };
            var emrTypes = Object.values(EMR);
            return (_a = emrTypes.find(isEMROfType)) !== null && _a !== void 0 ? _a : EMR.NONE;
        }
        var emrType = process.env.REACT_APP_EMR_TYPE.toLowerCase();
        if (!emrType)
            throw new Error('EMR type cannot be inferred. You must provide the emrType explicitly as an env variable');
        return emrType;
    };
    return SmartLaunchHandler;
}());
exports.default = SmartLaunchHandler;
//# sourceMappingURL=SmartLaunchHandler.js.map