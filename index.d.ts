import Client from "fhirclient/lib/Client";

export function SmartLaunchHandler(clientID: string, emrType: FhirLib.EMR): Promise<Client> | undefined
declare namespace FhirLib{
  export enum EMR {
    CERNER = 'cerner',
    EPIC = 'epic',
    SMART = 'smart',
    NONE = 'none'
  }
  export function epicLaunch(clientId: string, redirect: string, iss: string): Promise<string | void>
}
