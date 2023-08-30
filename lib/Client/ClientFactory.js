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
import * as FHIR from "fhirclient";
import jwt_decode from "jwt-decode";
import { EMR } from "../Launcher/SmartLaunchHandler";
import CernerClient from "./CernerClient";
import EpicClient, { EPIC_R4_ENDPOINT, EPIC_TOKEN_ENDPOINT } from "./EpicClient";
/**
Represents the ClientFactory class for creating EMR clients.
*/
var ClientFactory = /** @class */ (function () {
    function ClientFactory() {
    }
    /**
     * Retrieves the EMR type based on the FHIR client.
     * @private
     * @param {SubClient} client - The FHIR client.
     * @returns {EMR} - The EMR type.
     */
    ClientFactory.prototype.getEMRType = function (client) {
        if (client.state.serverUrl.includes("cerner")) {
            return EMR.CERNER;
        }
        if (client.state.serverUrl.includes("smarthealthit")) {
            return EMR.SMART;
        }
        if (client.state.serverUrl.includes("epic")) {
            return EMR.EPIC;
        }
        return EMR.NONE;
    };
    /**
     * Creates an EMR client based on the EMR type.
     * @returns {Promise<BaseClient>} - A promise resolving to the created EMR client.
     */
    ClientFactory.prototype.createEMRClient = function () {
        return __awaiter(this, void 0, void 0, function () {
            var defaultFhirClient, emrType;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, FHIR.oauth2.ready()];
                    case 1:
                        defaultFhirClient = _a.sent();
                        emrType = this.getEMRType(defaultFhirClient);
                        switch (emrType) {
                            case EMR.EPIC:
                                return [2 /*return*/, new EpicClient(defaultFhirClient)];
                            case EMR.CERNER:
                                return [2 /*return*/, new CernerClient(defaultFhirClient)];
                            case EMR.SMART:
                            case EMR.NONE:
                            default:
                                return [2 /*return*/, new EpicClient(defaultFhirClient)];
                        }
                        return [2 /*return*/];
                }
            });
        });
    };
    /**
     * Creates an EMR client based on the EMR type when called after a standalone launch.
     * @returns {Promise<BaseClient>} - A promise resolving to the created EMR client.
     */
    ClientFactory.prototype.createStandaloneEMRClient = function () {
        return __awaiter(this, void 0, void 0, function () {
            var urlParams, code, decodedJwt, clientId, emrType, _a, tokenResponse, tokenResponseJson, defaultFhirClient;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        urlParams = new URLSearchParams(window.location.search);
                        code = urlParams.get('code');
                        if (code === null)
                            throw new Error("Could not find any JWT token.");
                        decodedJwt = jwt_decode(code);
                        clientId = decodedJwt.client_id;
                        emrType = this.getStandaloneEMRType(decodedJwt);
                        _a = emrType;
                        switch (_a) {
                            case EMR.EPIC: return [3 /*break*/, 1];
                            case EMR.CERNER: return [3 /*break*/, 4];
                            case EMR.SMART: return [3 /*break*/, 4];
                            case EMR.NONE: return [3 /*break*/, 4];
                        }
                        return [3 /*break*/, 4];
                    case 1: return [4 /*yield*/, fetch(EPIC_TOKEN_ENDPOINT, {
                            mode: "cors",
                            method: "POST",
                            headers: {
                                accept: "application/x-www-form-urlencoded"
                            },
                            body: new URLSearchParams({
                                "grant_type": "authorization_code",
                                'code': code,
                                'redirect_uri': window.location.origin,
                                'client_id': clientId
                            })
                        })];
                    case 2:
                        tokenResponse = _b.sent();
                        return [4 /*yield*/, tokenResponse.json()];
                    case 3:
                        tokenResponseJson = _b.sent();
                        if (!("access_token" in tokenResponseJson))
                            throw new Error("Could not find any access token from the oauth endpoint's response");
                        defaultFhirClient = FHIR.client(EPIC_R4_ENDPOINT);
                        defaultFhirClient.state.clientId = clientId;
                        defaultFhirClient.state.tokenResponse = __assign({}, tokenResponseJson);
                        return [2 /*return*/, new EpicClient(defaultFhirClient)];
                    case 4: throw new Error("Unsupported provider for standalone launch");
                }
            });
        });
    };
    /**
     * Retrieves the EMR type from a decoded JWT object.
     * @param {string} decoded_jwt - A decoded JWT token that should contain the issuer of an Electronic Medical Record (EMR).
     * @returns the EMR type that matches the input JWT `decoded_jwt`. If a matching EMR type is found, it is returned. If no matching EMR type is found, the function
     * returns `EMR.NONE`.
     */
    ClientFactory.prototype.getStandaloneEMRType = function (decoded_jwt) {
        if ("epic.eci" in decoded_jwt) {
            return EMR.EPIC;
        }
        return EMR.NONE;
    };
    return ClientFactory;
}());
export default ClientFactory;
