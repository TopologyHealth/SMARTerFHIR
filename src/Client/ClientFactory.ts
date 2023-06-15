import * as FHIR from 'fhirclient';
import SubClient from "../FhirClient";
import { EMR } from "../Launcher/SmartLaunchHandler";
import BaseClient from "./BaseClient";
import CernerClient from "./CernerClient";
import EpicClient from "./EpicClient";

export default class ClientFactory {
  readonly clientID: string
  constructor(clientID: string) {
    this.clientID = clientID
  }

  private getEMRType(client: SubClient): EMR {
    if (client.state.serverUrl.includes('cerner')) {
      return EMR.CERNER;
    }
    if (client.state.serverUrl.includes('smarthealthit')) {
      return EMR.SMART;
    }
    if (client.state.serverUrl.includes('epic')) {
      return EMR.EPIC;
    }
    return EMR.NONE
  }

  async createEMRClient(): Promise<BaseClient> {
    const defaultFhirClient = await FHIR.oauth2.ready()
    const emrType = this.getEMRType(defaultFhirClient)
    switch (emrType) {
      case EMR.EPIC: {
        return new EpicClient(defaultFhirClient);
      }
      case EMR.CERNER:
        return new CernerClient(defaultFhirClient);
      case EMR.SMART:
      case EMR.NONE:
      default:
        return new EpicClient(defaultFhirClient);
    }
  };
}