"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getEmrTypeFromObject = exports.getEMRType = exports.getEndpointsForEmr = void 0;
var SmartLaunchHandler_1 = require("../Launcher/SmartLaunchHandler");
var CernerClient_1 = __importDefault(require("./CernerClient"));
var EpicClient_1 = __importDefault(require("./EpicClient"));
var ClientFactory_1 = require("./ClientFactory");
var ECWClient_1 = __importDefault(require("./ECWClient"));
var AthenaClient_1 = __importDefault(require("./AthenaClient"));
/**
 * The function `getEndpointsForEmr` returns the endpoints for a given EMR type, such as Epic, Cerner, or SMART.
 * @param {EMR} emrType - The `emrType` parameter is of type `EMR`, which is an enumeration representing different types of Electronic Medical Record (EMR)
 * systems. The possible values for `emrType` are `EMR.EPIC`, `EMR.CERNER`, `EMR.SMART`,
 * @returns an object of type EMR_ENDPOINTS.
 */
function getEndpointsForEmr(emrType) {
    switch (emrType) {
        case SmartLaunchHandler_1.EMR.EPIC:
            return EpicClient_1.default.getEndpoints();
        case SmartLaunchHandler_1.EMR.ATHENA:
            return AthenaClient_1.default.getEndpoints();
        case SmartLaunchHandler_1.EMR.CERNER:
            return CernerClient_1.default.getEndpoints();
        case SmartLaunchHandler_1.EMR.ECW:
            return ECWClient_1.default.getEndpoints();
        case SmartLaunchHandler_1.EMR.SMART:
        case SmartLaunchHandler_1.EMR.NONE:
        default:
            throw new Error("Endpoints not found for EMR type: ".concat(emrType));
    }
}
exports.getEndpointsForEmr = getEndpointsForEmr;
/**
 * The function `getEMRType` determines the type of Electronic Medical Record (EMR) based on the provided client or token.
 * @param {SubClient | JWT} client - The parameter `clientOrToken` can be either a `SubClient` object or a JWT (JSON Web Token).
 * @returns the type of Electronic Medical Record (EMR) based on the input parameter. The possible return values are EMR.CERNER, EMR.SMART, EMR.EPIC, or EMR.NONE.
 */
function getEMRType(clientOrToken) {
    function isClient(input) {
        return input.state.serverUrl !== undefined;
    }
    var EMR_MAPPING = [
        { substring: "cerner", emr: SmartLaunchHandler_1.EMR.CERNER },
        { substring: "smarthealthit", emr: SmartLaunchHandler_1.EMR.SMART },
        { substring: "epic", emr: SmartLaunchHandler_1.EMR.EPIC },
        { substring: "athena", emr: SmartLaunchHandler_1.EMR.ATHENA },
        { substring: "ecw", emr: SmartLaunchHandler_1.EMR.ECW },
    ];
    if (isClient(clientOrToken)) {
        var serverUrl = clientOrToken.state.serverUrl;
        for (var _i = 0, EMR_MAPPING_1 = EMR_MAPPING; _i < EMR_MAPPING_1.length; _i++) {
            var _a = EMR_MAPPING_1[_i], substring = _a.substring, emr = _a.emr;
            if (serverUrl.includes(substring)) {
                return emr;
            }
        }
    }
    else {
        if ("epic.eci" in clientOrToken) {
            return SmartLaunchHandler_1.EMR.EPIC;
        }
    }
    return SmartLaunchHandler_1.EMR.NONE;
}
exports.getEMRType = getEMRType;
/**
 * The function `getEmrTypeFromObject` takes an object as input and returns the corresponding EMR type if the object is of type JWT or EMR, otherwise it throws an
 * error.
 * @param {unknown} object - The `object` parameter is of type `unknown`, which means it can be any type. It is used as input to determine the EMR (Electronic
 * Medical Record) type. The function checks if the `object` is an instance of JWT (JSON Web Token) or EMR, and returns
 * @returns an EMR (Electronic Medical Record) object.
 */
function getEmrTypeFromObject(object) {
    if ((0, ClientFactory_1.instanceOfJWT)(object))
        return getEMRType(object);
    if ((0, SmartLaunchHandler_1.instanceOfEmr)(object))
        return object;
    throw new Error("Invalid object type.");
}
exports.getEmrTypeFromObject = getEmrTypeFromObject;
//# sourceMappingURL=utils.js.map