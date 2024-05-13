import { EMR } from "../Launcher/SmartLaunchHandler";
import { EMR_ENDPOINTS } from "./BaseClient";
/**
* The function `getEndpointsForEmr` returns the endpoints for a given EMR type, such as Epic, Cerner, or SMART.
* @param {EMR} emrType - The `emrType` parameter is of type `EMR`, which is an enumeration representing different types of Electronic Medical Record (EMR)
* systems. The possible values for `emrType` are `EMR.EPIC`, `EMR.CERNER`, `EMR.SMART`,
* @returns an object of type EMR_ENDPOINTS.
*/
export declare function getEndpointsForEmr(emrType: EMR): EMR_ENDPOINTS;
