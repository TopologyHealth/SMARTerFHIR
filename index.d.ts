export as namespace FhirLib
import Client from "fhirclient/lib/Client";
  
// function epicLaunch(clientId: string, redirect: string, iss: string): Promise<string | void>
type EMR = {
  CERNER: 'cerner',
  EPIC: 'epic',
  SMART: 'smart',
  NONE: 'none'
}
export function SmartLaunchHandler(clientID: string, emrType: EMR): Promise<Client> | undefined