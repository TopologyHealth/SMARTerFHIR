import { EMR } from "../Launcher/SmartLaunchHandler";
import BaseClient from "./BaseClient";
/**
Represents the ClientFactory class for creating EMR clients.
*/
export default class ClientFactory {
    /**
     * Retrieves the EMR type based on the FHIR client.
     * @private
     * @param {SubClient} client - The FHIR client.
     * @returns {EMR} - The EMR type.
     */
    private getEMRType;
    /**
     * Creates an EMR client based on the EMR type.
     * @returns {Promise<BaseClient>} - A promise resolving to the created EMR client.
     */
    createEMRClient(): Promise<BaseClient>;
    /**
     * Creates an EMR client based on the EMR type when called after a standalone launch.
     * @returns {Promise<BaseClient>} - A promise resolving to the created EMR client.
     */
    createStandaloneEMRClient(): Promise<BaseClient>;
    /**
     * The function `getEMRType` takes a decoded JWT object and returns the corresponding known EMR type.
     * @param {string} decoded_jwt - A decoded JWT token that should contain the issuer of an Electronic Medical Record (EMR).
     * @returns the EMR type that matches the input JWT `decoded_jwt`. If a matching EMR type is found, it is returned. If no matching EMR type is found, the function
     * returns `EMR.NONE`.
     */
    getStandaloneEMRType(decoded_jwt: unknown): EMR;
}
