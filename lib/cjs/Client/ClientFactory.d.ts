import { IncomingMessage, ServerResponse } from "http";
import { FhirClientConfig } from "../types";
import BaseClient from "./BaseClient";
export declare enum LAUNCH {
    EMR = 0,
    STANDALONE = 1,
    BACKEND = 2
}
/**
 * The type represents a JSON Web Token (JWT) with properties for client_id and an optional epic.eci property.
 * @property {string} client_id - A string representing the client ID.
 * @property {string}  - - `client_id`: A string representing the client ID associated with the JWT.
 */
export type JWT = {
    client_id: string;
    "epic.eci"?: string;
};
/**
 * The function checks if an object is an instance of the JWT class by verifying if it has a client_id property.
 * @param {unknown} object - The `object` parameter is of type `unknown`, which means it can be any type.
 * @returns a boolean value.
 */
export declare function instanceOfJWT(object: unknown): object is JWT;
/**
Represents the ClientFactory class for creating EMR clients.
*/
export default class ClientFactory {
    /**
     * The function `createEMRClient` creates an EMR client based on the specified launch type.
     * @param {LAUNCH} launchType - The `launchType` parameter is an optional parameter of type `LAUNCH` that specifies the type of EMR launch. It has a default value
     * of `LAUNCH.EMR`.
     * @returns a Promise that resolves to an instance of the `BaseClient` class.
     */
    createEMRClient(launchType: LAUNCH.EMR | LAUNCH.STANDALONE): Promise<BaseClient>;
    /**
     * The function `createEMRClientBackend` creates an EMR client based on the specified launch type.
     * @param {IncomingMessage} req - The `req` parameter is an incoming message object that represents the request made by the client.
     * @param {ServerResponse} res - The `res` parameter is a server response object that represents the response sent by the server.
     * @param {FhirClientConfig} serverConfig - The `serverConfig` parameter is an object that contains the configuration for the FHIR client. It includes the server URL, token response, client ID, and token URI.
     * @returns a Promise that resolves to an instance of the `BaseClient` class.
     */
    createEMRClientBackend(req: IncomingMessage, res: ServerResponse, serverConfig: FhirClientConfig): Promise<BaseClient>;
    private createSmarterFhirClient;
    /**
     * The function creates a default FHIR client based on the launch type.
     * @param {LAUNCH} launchType - The `launchType` parameter is an enum type called `LAUNCH`. It represents the type of launch for the FHIR client. There are two
     * possible values for `LAUNCH`:
     * @returns a Promise that resolves to a SubClient object.
     */
    private createDefaultFhirClient;
}
