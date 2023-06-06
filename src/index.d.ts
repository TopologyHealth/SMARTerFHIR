import Client from "fhirclient/lib/Client";

export = FhirLib
export as namespace FhirLib
declare namespace FhirLib {
  enum EMR {
    CERNER = 'cerner',
    EPIC = 'epic',
    SMART = 'smart',
    NONE = 'none'
  }

  function epicLaunch(clientId: string, redirect: string, iss: string): Promise<string | void>
  export const SmartLaunchHandler: (clientID: string, emrType: EMR) => Promise<Client> | undefined
}