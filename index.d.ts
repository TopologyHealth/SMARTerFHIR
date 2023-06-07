import Client from "fhirclient/lib/Client";

declare function SmartLaunchHandler(clientID: string, emrType: SmartLaunchHandler.EMR): Promise<Client> | undefined
declare namespace SmartLaunchHandler{
  export enum EMR {
    CERNER = 'cerner',
    EPIC = 'epic',
    SMART = 'smart',
    NONE = 'none'
  }
  export function epicLaunch(clientId: string, redirect: string, iss: string): Promise<string | void>
}

export = SmartLaunchHandler;
