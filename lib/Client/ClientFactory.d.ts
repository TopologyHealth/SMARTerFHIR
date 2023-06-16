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
}
