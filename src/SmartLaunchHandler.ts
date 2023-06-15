import * as FHIR from 'fhirclient';

export enum EMR {
  CERNER = 'cerner',
  EPIC = 'epic',
  SMART = 'smart',
  NONE = 'none'
}

export default class SmartLaunchHandler {
  readonly clientID: string
  readonly emrType: EMR

  constructor(clientID: string, emrType: EMR) {
    this.clientID = clientID
    this.emrType = emrType
  }

  async epicLaunch(clientId: string, redirect: string, iss: string): Promise<string | void> {
    const scope = "launch online_access openid fhirUser"
    const redirect_uri = redirect ?? '';
    return FHIR.oauth2.authorize({
      client_id: clientId,
      iss: iss,
      "redirect_uri": redirect_uri,
      scope: scope,
    });
  }

  async authorizeEMR() {
    const queryString = window.location.search;
    const originString = window.location.origin;
    const urlParams = new URLSearchParams(queryString);
    const iss = urlParams.get('iss');

    if (iss !== null && iss.includes(this.emrType))
      switch (this.emrType) {
        case EMR.EPIC:
          await this.epicLaunch(this.clientID, originString, iss);
          break;
        case EMR.CERNER:
        case EMR.SMART:
        case EMR.NONE:
        default:
          break;
      }
  }
}