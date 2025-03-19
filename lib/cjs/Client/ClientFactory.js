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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.LAUNCH = void 0;
exports.instanceOfJWT = instanceOfJWT;
var fhirclient_1 = __importStar(require("fhirclient")), FHIR = fhirclient_1;
var __1 = require("..");
var SmartLaunchHandler_1 = require("../Launcher/SmartLaunchHandler");
var AthenaClient_1 = __importDefault(require("./AthenaClient"));
var AthenaPracticeClient_1 = __importDefault(require("./AthenaPracticeClient"));
var CernerClient_1 = __importDefault(require("./CernerClient"));
var ECWClient_1 = __importDefault(require("./ECWClient"));
var EpicClient_1 = __importDefault(require("./EpicClient"));
var SmartHealthClient_1 = __importDefault(require("./SmartHealthClient"));
var MeditechClient_1 = __importDefault(require("./MeditechClient"));
var LAUNCH;
(function (LAUNCH) {
    LAUNCH[LAUNCH["EMR"] = 0] = "EMR";
    LAUNCH[LAUNCH["STANDALONE"] = 1] = "STANDALONE";
    LAUNCH[LAUNCH["BACKEND"] = 2] = "BACKEND";
})(LAUNCH || (exports.LAUNCH = LAUNCH = {}));
/**
 * The function checks if an object is an instance of the JWT class by verifying if it has a client_id property.
 * @param {unknown} object - The `object` parameter is of type `unknown`, which means it can be any type.
 * @returns a boolean value.
 */
function instanceOfJWT(object) {
    return object.client_id !== undefined;
}
/**
Represents the ClientFactory class for creating EMR clients.
*/
var ClientFactory = /** @class */ (function () {
    function ClientFactory() {
    }
    /**
     * The function `createEMRClient` creates an EMR client based on the specified launch type.
     * @param {LAUNCH} launchType - The `launchType` parameter is an optional parameter of type `LAUNCH` that specifies the type of EMR launch. It has a default value
     * of `LAUNCH.EMR`.
     * @returns a Promise that resolves to an instance of the `BaseClient` class.
     */
    ClientFactory.prototype.createEMRClient = function (launchType) {
        return __awaiter(this, void 0, void 0, function () {
            var fhirClient;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.createDefaultFhirClient(launchType)];
                    case 1:
                        fhirClient = _a.sent();
                        return [4 /*yield*/, this.createSmarterFhirClient(fhirClient)];
                    case 2: return [2 /*return*/, _a.sent()];
                }
            });
        });
    };
    /**
     * The function `createEMRClientBackend` creates an EMR client based on the specified launch type.
     * @param {IncomingMessage} req - The `req` parameter is an incoming message object that represents the request made by the client.
     * @param {ServerResponse} res - The `res` parameter is a server response object that represents the response sent by the server.
     * @param {FhirClientConfig} serverConfig - The `serverConfig` parameter is an object that contains the configuration for the FHIR client. It includes the server URL, token response, client ID, and token URI.
     * @returns a Promise that resolves to an instance of the `BaseClient` class.
     */
    ClientFactory.prototype.createEMRClientBackend = function (req, res, serverConfig) {
        return __awaiter(this, void 0, void 0, function () {
            var fhirClient;
            return __generator(this, function (_a) {
                fhirClient = (0, fhirclient_1.default)(req, res).client({
                    serverUrl: serverConfig.serverUrl,
                    tokenResponse: serverConfig.tokenResponse,
                    clientId: serverConfig.clientId,
                    tokenUri: serverConfig.tokenUri
                });
                return [2 /*return*/, this.createSmarterFhirClient(fhirClient)];
            });
        });
    };
    ClientFactory.prototype.createSmarterFhirClient = function (fhirClient) {
        return __awaiter(this, void 0, void 0, function () {
            var emrType;
            return __generator(this, function (_a) {
                emrType = __1.ClientUtils.getEMRType(fhirClient);
                switch (emrType) {
                    case SmartLaunchHandler_1.EMR.EPIC:
                        return [2 /*return*/, new EpicClient_1.default(fhirClient)];
                    case SmartLaunchHandler_1.EMR.CERNER:
                        return [2 /*return*/, new CernerClient_1.default(fhirClient)];
                    case SmartLaunchHandler_1.EMR.SMART:
                        return [2 /*return*/, new SmartHealthClient_1.default(fhirClient)];
                    case SmartLaunchHandler_1.EMR.ECW:
                        return [2 /*return*/, new ECWClient_1.default(fhirClient)];
                    case SmartLaunchHandler_1.EMR.ATHENAPRACTICE:
                        return [2 /*return*/, new AthenaPracticeClient_1.default(fhirClient)];
                    case SmartLaunchHandler_1.EMR.ATHENA:
                        return [2 /*return*/, new AthenaClient_1.default(fhirClient)];
                    case SmartLaunchHandler_1.EMR.MEDITECH:
                        return [2 /*return*/, new MeditechClient_1.default(fhirClient)];
                    case SmartLaunchHandler_1.EMR.NONE:
                    default:
                        throw new Error("Unsupported provider for EMR Client creation");
                }
                return [2 /*return*/];
            });
        });
    };
    /**
     * The function creates a default FHIR client based on the launch type.
     * @param {LAUNCH} launchType - The `launchType` parameter is an enum type called `LAUNCH`. It represents the type of launch for the FHIR client. There are two
     * possible values for `LAUNCH`:
     * @returns a Promise that resolves to a SubClient object.
     */
    ClientFactory.prototype.createDefaultFhirClient = function (launchType) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (launchType) {
                    case LAUNCH.EMR:
                    case LAUNCH.STANDALONE:
                        return [2 /*return*/, FHIR.oauth2.ready()];
                    default:
                        throw new Error("Unsupported provider for standalone launch");
                }
                return [2 /*return*/];
            });
        });
    };
    return ClientFactory;
}());
exports.default = ClientFactory;
//# sourceMappingURL=ClientFactory.js.map