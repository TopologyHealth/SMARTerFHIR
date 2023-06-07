import Client from "fhirclient/lib/Client";

export = SmartLaunchHandler

declare namespace FhirLib {
  export function epicLaunch(clientId: string, redirect: string, iss: string): Promise<string | void>
}
declare enum EMR {
  CERNER = 'cerner',
  EPIC = 'epic',
  SMART = 'smart',
  NONE = 'none'
}
declare const SmartLaunchHandler: (clientID: string, emrType: EMR) => Promise<Client> | undefined
