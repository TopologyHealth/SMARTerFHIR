import Client from "fhirclient/lib/Client";

export as namespace FhirLib
declare module 'fhir-lib' {
  enum EMR {
    CERNER = 'cerner',
    EPIC = 'epic',
    SMART = 'smart',
    NONE = 'none'
  }

  function epicLaunch(clientId: string, redirect: string, iss: string): Promise<string | void>
  export const SmartLaunchHandler: (clientID: string, emrType: EMR) => Promise<Client> | undefined
}