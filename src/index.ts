import * as FHIR from 'fhirclient';
import SubClient from "./FhirClient";
import BaseClient from './Client/BaseClient';
import EpicClient from './Client/EpicClient';

export enum EMR {
  CERNER = 'cerner',
  EPIC = 'epic',
  SMART = 'smart',
  NONE = 'none'
}

async function epicLaunch(clientId: string, redirect: string, iss: string): Promise<string | void> {
  const scope = "launch online_access openid fhirUser"
  const redirect_uri = redirect ?? '';
  return FHIR.oauth2.authorize({
    client_id: clientId,
    iss: iss,
    "redirect_uri": redirect_uri,
    scope: scope,
  });
}

async function authorizeEMR(clientID: string, emrType: EMR) {
  const queryString = window.location.search;
  const originString = window.location.origin;
  const urlParams = new URLSearchParams(queryString);
  const iss = urlParams.get('iss');

  if (iss !== null && iss.includes(emrType))
    switch (emrType) {
      case EMR.EPIC:
        await epicLaunch(clientID, originString, iss);
        break;
      case EMR.CERNER:
      case EMR.SMART:
      case EMR.NONE:
      default:
        break;
    }
}

const createEMRClient = async (defaultFhirClient: SubClient, emrType: EMR): Promise<BaseClient> => {
  switch (emrType) {
    case EMR.EPIC: {
      return new EpicClient(defaultFhirClient);;
    }
    case EMR.CERNER:
    case EMR.SMART:
    case EMR.NONE:
    default:
      return new EpicClient(defaultFhirClient);;
  }
};

export function SmartLaunchHandler(clientID: string, emrType: EMR): Promise<BaseClient | undefined> {
  return (async () => {
    try {
      // Authorize with the EHR
      await authorizeEMR( clientID, emrType);
      
      return createEMRClient(await FHIR.oauth2.ready(), emrType);
    }
    catch (e) {
      if (e instanceof Error) {
        throw e;
      }
    }
  })();
}
