import SubClient from "../FhirClient";
import { EMR, instanceOfEmr } from "../Launcher/SmartLaunchHandler";
import { JWT, instanceOfJWT } from "./ClientFactory";

/**
 * @deprecated Endpoints are no longer assumed in-code. This function will only throw an error if used. Please obtain an R4 endpoint from your EMR Vendor.
* The function `getEndpointsForEmr` returns the endpoints for a given EMR type, such as Epic, Cerner, or SMART.
* @param {EMR} emrType - The `emrType` parameter is of type `EMR`, which is an enumeration representing different types of Electronic Medical Record (EMR)
* systems. The possible values for `emrType` are `EMR.EPIC`, `EMR.CERNER`, `EMR.SMART`,
* @returns an object of type EMR_ENDPOINTS.
*/

export function getEndpointsForEmr(emrType: EMR) {
  throw new Error(`Endpoints not found for EMR type: ${emrType}`);
}

/**
 * The function `getEMRType` determines the type of Electronic Medical Record (EMR) based on the provided client or token.
 * @param {SubClient | JWT} client - The parameter `clientOrToken` can be either a `SubClient` object or a JWT (JSON Web Token).
 * @returns the type of Electronic Medical Record (EMR) based on the input parameter. The possible return values are EMR.CERNER, EMR.SMART, EMR.EPIC, or EMR.NONE.
*/
export function getEMRType(object: SubClient | JWT | URL): EMR {
  function isClient(input: object): input is SubClient {
    return (input as SubClient).state.serverUrl !== undefined;
  }
  function isJWT(input: object): input is JWT {
    return (input as JWT).client_id !== undefined
  }

  if (isJWT(object)) {
    if ("epic.eci" in object) {
      return EMR.EPIC;
    } else {
      console.error('Unknown JWT', object)
      throw new Error('Could not determine EMR Type from JWT')
    }
  }
  if (isClient(object)) {
    const serverUrl = object.state.serverUrl;
    return getEMRType(new URL(serverUrl))
    
  } else {      //Is a URL
    const urlAsString = object.toString()    
    const isEMROfType = (emrType: EMR) => urlAsString.includes(emrType);
    const sortedEMRTypes = (Object.values(EMR)).sort((a, b) => b.length - a.length)
    return sortedEMRTypes.find(isEMROfType) ?? EMR.NONE;
  }
}


/**
 * The function `getEmrTypeFromObject` takes an object as input and returns the corresponding EMR type if the object is of type JWT or EMR, otherwise it throws an
 * error.
 * @param {unknown} object - The `object` parameter is of type `unknown`, which means it can be any type. It is used as input to determine the EMR (Electronic
 * Medical Record) type. The function checks if the `object` is an instance of JWT (JSON Web Token) or EMR, and returns
 * @returns an EMR (Electronic Medical Record) object.
 */
export function getEmrTypeFromObject(object: unknown): EMR {
  if (instanceOfJWT(object)) return getEMRType(object)
  if (instanceOfEmr(object)) return (object as EMR)
  throw new Error('Invalid object type.')
}
