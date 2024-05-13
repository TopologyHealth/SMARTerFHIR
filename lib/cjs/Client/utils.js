"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getEndpointsForEmr = void 0;
var SmartLaunchHandler_1 = require("../Launcher/SmartLaunchHandler");
var CernerClient_1 = __importDefault(require("./CernerClient"));
var EpicClient_1 = __importDefault(require("./EpicClient"));
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
        case SmartLaunchHandler_1.EMR.CERNER:
            return CernerClient_1.default.getEndpoints();
        case SmartLaunchHandler_1.EMR.SMART:
        case SmartLaunchHandler_1.EMR.NONE:
        default:
            throw new Error("Endpoints not found for EMR type: ".concat(emrType));
    }
}
exports.getEndpointsForEmr = getEndpointsForEmr;
//# sourceMappingURL=utils.js.map