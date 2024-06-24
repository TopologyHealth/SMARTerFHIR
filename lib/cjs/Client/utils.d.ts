import { EMR } from "../Launcher/SmartLaunchHandler";
import { EMR_ENDPOINTS } from "./BaseClient";
import SubClient from "../FhirClient";
import { JWT } from "./ClientFactory";
/**
* The function `getEndpointsForEmr` returns the endpoints for a given EMR type, such as Epic, Cerner, or SMART.
* @param {EMR} emrType - The `emrType` parameter is of type `EMR`, which is an enumeration representing different types of Electronic Medical Record (EMR)
* systems. The possible values for `emrType` are `EMR.EPIC`, `EMR.CERNER`, `EMR.SMART`,
* @returns an object of type EMR_ENDPOINTS.
*/
export declare function getEndpointsForEmr(emrType: EMR): EMR_ENDPOINTS;
/**
 * The function `getEMRType` determines the type of Electronic Medical Record (EMR) based on the provided client or token.
 * @param {SubClient | JWT} client - The parameter `clientOrToken` can be either a `SubClient` object or a JWT (JSON Web Token).
 * @returns the type of Electronic Medical Record (EMR) based on the input parameter. The possible return values are EMR.CERNER, EMR.SMART, EMR.EPIC, or EMR.NONE.
*/
export declare function getEMRType(clientOrToken: SubClient | JWT): EMR;
/**
 * The function `getEmrTypeFromObject` takes an object as input and returns the corresponding EMR type if the object is of type JWT or EMR, otherwise it throws an
 * error.
 * @param {unknown} object - The `object` parameter is of type `unknown`, which means it can be any type. It is used as input to determine the EMR (Electronic
 * Medical Record) type. The function checks if the `object` is an instance of JWT (JSON Web Token) or EMR, and returns
 * @returns an EMR (Electronic Medical Record) object.
 */
export declare function getEmrTypeFromObject(object: unknown): EMR;
