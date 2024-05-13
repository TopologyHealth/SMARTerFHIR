import { EMR } from "../Launcher/SmartLaunchHandler";
import CernerClient from "./CernerClient";
import EpicClient from "./EpicClient";
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
            throw new Error(`Endpoints not found for EMR type: ${emrType}`);
    }
}
//# sourceMappingURL=utils.js.map