"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getEndpointsForEmr = getEndpointsForEmr;
exports.getEMRType = getEMRType;
exports.getEmrTypeFromObject = getEmrTypeFromObject;
var SmartLaunchHandler_1 = require("../Launcher/SmartLaunchHandler");
var ClientFactory_1 = require("./ClientFactory");
/**
 * @deprecated Endpoints are no longer assumed in-code. This function will only throw an error if used. Please obtain an R4 endpoint from your EMR Vendor.
* The function `getEndpointsForEmr` returns the endpoints for a given EMR type, such as Epic, Cerner, or SMART.
* @param {EMR} emrType - The `emrType` parameter is of type `EMR`, which is an enumeration representing different types of Electronic Medical Record (EMR)
* systems. The possible values for `emrType` are `EMR.EPIC`, `EMR.CERNER`, `EMR.SMART`,
* @returns an object of type EMR_ENDPOINTS.
*/
function getEndpointsForEmr(emrType) {
    throw new Error("Endpoints not found for EMR type: ".concat(emrType));
}
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
        { substring: "ecw", emr: SmartLaunchHandler_1.EMR.ECW },
        { substring: "platform.athenahealth.com", emr: SmartLaunchHandler_1.EMR.ATHENA },
        { substring: "fhirapi.athenahealth.com", emr: SmartLaunchHandler_1.EMR.ATHENAPRACTICE }
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
    throw new Error('Invalid object type.');
}
//# sourceMappingURL=utils.js.map