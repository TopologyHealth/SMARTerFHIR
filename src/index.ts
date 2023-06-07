import * as FHIR from 'fhirclient';
import Client from "fhirclient/lib/Client";
import { useEffect, useState } from "react";

enum EMR {
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

export async function SmartLaunchHandler(clientID: string, emrType: EMR): Promise<Client | undefined> {
  const curEMR = emrType;
  const [fhirClient, setFhirClient] = useState<Promise<Client> | undefined>(undefined);

  useEffect(() => {
    (async () => {
      try {
        // Authorize with the EHR
        const queryString = window.location.search;
        const originString = window.location.origin;
        const urlParams = new URLSearchParams(queryString);
        const iss = urlParams.get('iss');

        if (iss !== null && iss.includes(emrType))
          await epicLaunch(clientID, originString, iss);

        setFhirClient(FHIR.oauth2.ready());
      }
      catch (e) {
        if (e instanceof Error) {
          throw e;
        }
      }
    })();
  }, [clientID, curEMR]);
  return fhirClient
}