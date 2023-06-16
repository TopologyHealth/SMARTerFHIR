import * as FHIR from "fhirclient";
import SubClient from "../FhirClient";
import { EMR } from "../Launcher/SmartLaunchHandler";
import BaseClient from "./BaseClient";
import CernerClient from "./CernerClient";
import EpicClient from "./EpicClient";

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
  private getEMRType(client: SubClient): EMR {
    if (client.state.serverUrl.includes("cerner")) {
      return EMR.CERNER;
    }
    if (client.state.serverUrl.includes("smarthealthit")) {
      return EMR.SMART;
    }
    if (client.state.serverUrl.includes("epic")) {
      return EMR.EPIC;
    }
    return EMR.NONE;
  }

  /**
   * Creates an EMR client based on the EMR type.
   * @returns {Promise<BaseClient>} - A promise resolving to the created EMR client.
   */
  async createEMRClient(): Promise<BaseClient> {
    const defaultFhirClient = await FHIR.oauth2.ready();
    const emrType = this.getEMRType(defaultFhirClient);
    switch (emrType) {
      case EMR.EPIC:
        return new EpicClient(defaultFhirClient);
      case EMR.CERNER:
        return new CernerClient(defaultFhirClient);
      case EMR.SMART:
      case EMR.NONE:
      default:
        return new EpicClient(defaultFhirClient);
    }
  }
}
