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
import { EMR, instanceOfEmr } from "../Launcher/SmartLaunchHandler";
import CernerClient from "./CernerClient";
import EpicClient from "./EpicClient";
import SmartHealthClient from "./SmartHealthClient";
export var LAUNCH;
(function (LAUNCH) {
    LAUNCH[LAUNCH["EMR"] = 0] = "EMR";
    LAUNCH[LAUNCH["STANDALONE"] = 1] = "STANDALONE";
    LAUNCH[LAUNCH["BACKEND"] = 2] = "BACKEND";
})(LAUNCH || (LAUNCH = {}));
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
     * The function `getEMRType` determines the type of Electronic Medical Record (EMR) based on the provided client or token.
     * @param {SubClient | JWT} client - The parameter `clientOrToken` can be either a `SubClient` object or a JWT (JSON Web Token).
     * @returns the type of Electronic Medical Record (EMR) based on the input parameter. The possible return values are EMR.CERNER, EMR.SMART, EMR.EPIC, or EMR.NONE.
    */
    ClientFactory.prototype.getEMRType = function (clientOrToken) {
        function isClient(input) {
            return input.state.serverUrl !== undefined;
        }
        if (isClient(clientOrToken)) {
            if (clientOrToken.state.serverUrl.includes("cerner")) {
                return EMR.CERNER;
            }
            if (clientOrToken.state.serverUrl.includes("smarthealthit")) {
                return EMR.SMART;
            }
            if (clientOrToken.state.serverUrl.includes("epic")) {
                return EMR.EPIC;
            }
        }
        else {
            if ("epic.eci" in clientOrToken) {
                return EMR.EPIC;
            }
        }
        return EMR.NONE;
    };
    /**
     * The function `createEMRClient` creates an EMR client based on the specified launch type.
     * @param {LAUNCH} launchType - The `launchType` parameter is an optional parameter of type `LAUNCH` that specifies the type of EMR launch. It has a default value
     * of `LAUNCH.EMR`.
     * @returns a Promise that resolves to an instance of the `BaseClient` class.
     */
    ClientFactory.prototype.createEMRClient = function (launchType, fhirClient) {
        if (launchType === void 0) { launchType = LAUNCH.EMR; }
        return __awaiter(this, void 0, void 0, function () {
            var defaultFhirClient, _a, emrType;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        if (launchType === LAUNCH.BACKEND) {
                            if (!fhirClient)
                                throw new Error("FhirClient must be passed as a param for Backend Authentication");
                        }
                        if (!(fhirClient !== null && fhirClient !== void 0)) return [3 /*break*/, 1];
                        _a = fhirClient;
                        return [3 /*break*/, 3];
                    case 1: return [4 /*yield*/, this.createDefaultFhirClient(launchType)];
                    case 2:
                        _a = _b.sent();
                        _b.label = 3;
                    case 3:
                        defaultFhirClient = _a;
                        emrType = this.getEMRType(defaultFhirClient);
                        switch (emrType) {
                            case EMR.EPIC:
                                return [2 /*return*/, new EpicClient(defaultFhirClient)];
                            case EMR.CERNER:
                                return [2 /*return*/, new CernerClient(defaultFhirClient)];
                            case EMR.SMART:
                                return [2 /*return*/, new SmartHealthClient(defaultFhirClient)];
                            case EMR.NONE:
                            default:
                                throw new Error("Unsupported provider for EMR Client creation");
                        }
                        return [2 /*return*/];
                }
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
    ClientFactory.prototype.getEmrEndpoints = function (object) {
        switch (this.getEmrTypeFromObject(object)) {
            case EMR.EPIC:
                return EpicClient.getEndpoints();
            case EMR.CERNER:
                return CernerClient.getEndpoints();
            case EMR.SMART:
            case EMR.NONE:
            default:
                throw new Error('EMR type not defined.');
        }
    };
    /**
     * The function `getEmrTypeFromObject` takes an object as input and returns the corresponding EMR type if the object is of type JWT or EMR, otherwise it throws an
     * error.
     * @param {unknown} object - The `object` parameter is of type `unknown`, which means it can be any type. It is used as input to determine the EMR (Electronic
     * Medical Record) type. The function checks if the `object` is an instance of JWT (JSON Web Token) or EMR, and returns
     * @returns an EMR (Electronic Medical Record) object.
     */
    ClientFactory.prototype.getEmrTypeFromObject = function (object) {
        if (instanceOfJWT(object))
            return this.getEMRType(object);
        if (instanceOfEmr(object))
            return object;
        throw new Error('Invalid object type.');
    };
    return ClientFactory;
}());
export default ClientFactory;
//# sourceMappingURL=ClientFactory.js.map