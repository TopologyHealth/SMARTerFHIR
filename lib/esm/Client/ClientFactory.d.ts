/// <reference types="node" />
import BaseClient from "./BaseClient";
import { ServerResponse, IncomingMessage } from "http";
import { FhirClientConfig } from "../types";
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
     * @param {SubClient | JWT} client - The parameter `clientOrToken` can be either a `SubClient` object or a JWT (JSON Web Token).
     * @returns the type of Electronic Medical Record (EMR) based on the input parameter. The possible return values are EMR.CERNER, EMR.SMART, EMR.EPIC, or EMR.NONE.
    */
    private getEMRType;
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
    /**
     * The function `getEmrEndpoints` returns the endpoints based on the EMR type obtained from the JWT.
     * @param {JWT} jwt - The "jwt" parameter is a JSON Web Token (JWT) that is used for authentication and authorization purposes. It contains information about the
     * user and their permissions.
     * @returns an object of type EMR_ENDPOINTS.
     */
    private getEmrEndpoints;
    /**
     * The function `getEmrTypeFromObject` takes an object as input and returns the corresponding EMR type if the object is of type JWT or EMR, otherwise it throws an
     * error.
     * @param {unknown} object - The `object` parameter is of type `unknown`, which means it can be any type. It is used as input to determine the EMR (Electronic
     * Medical Record) type. The function checks if the `object` is an instance of JWT (JSON Web Token) or EMR, and returns
     * @returns an EMR (Electronic Medical Record) object.
     */
    private getEmrTypeFromObject;
}
