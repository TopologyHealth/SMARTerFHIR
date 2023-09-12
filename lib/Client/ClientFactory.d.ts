import BaseClient from "./BaseClient";
export declare enum LAUNCH {
    EMR = 0,
    STANDALONE = 1,
    BACKEND = 2
}
/**
Represents the ClientFactory class for creating EMR clients.
*/
export default class ClientFactory {
    /**
 * The function `getEMRType` determines the type of Electronic Medical Record (EMR) based on the provided client or token.
 * @param {SubClient | JWT} clientOrToken - The parameter `clientOrToken` can be either a `SubClient` object or a JWT (JSON Web Token).
 * @returns the type of Electronic Medical Record (EMR) based on the input parameter. The possible return values are EMR.CERNER, EMR.SMART, EMR.EPIC, or EMR.NONE.
 */
    private getEMRType;
    /**
     * The function `createEMRClient` creates an EMR client based on the specified launch type.
     * @param {LAUNCH} launchType - The `launchType` parameter is an optional parameter of type `LAUNCH` that specifies the type of EMR launch. It has a default value
     * of `LAUNCH.EMR`.
     * @returns a Promise that resolves to an instance of the `BaseClient` class.
     */
    createEMRClient(launchType?: LAUNCH): Promise<BaseClient>;
    /**
     * The function creates a default FHIR client based on the launch type.
     * @param {LAUNCH} launchType - The `launchType` parameter is an enum type called `LAUNCH`. It represents the type of launch for the FHIR client. There are two
     * possible values for `LAUNCH`:
     * @returns a Promise that resolves to a SubClient object.
     */
    private createDefaultFhirClient;
    /**
     * The function `getEmrEndpoints` returns the endpoints based on the EMR type obtained from the JWT.
     * @param {JWT} jwt - The "jwt" parameter is a JSON Web Token (JWT) that is used for authentication and authorization purposes. It contains information about the
     * user and their permissions.
     * @returns an object of type EMR_ENDPOINTS.
     */
    private getEmrEndpoints;
    private getEmrTypeFromObject;
    private buildStandaloneFhirClient;
    private getRequiredTokenParameters;
}
