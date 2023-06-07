export as namespace FhirLib
import Client from "fhirclient/lib/Client";
import SmartLaunchHandler  from "./smartLaunch";
  
function epicLaunch(clientId: string, redirect: string, iss: string): Promise<string | void>
enum EMR {
  CERNER = 'cerner',
  EPIC = 'epic',
  SMART = 'smart',
  NONE = 'none'
}
export const SmartLaunchHandler: (clientID: string, emrType: EMR) => Promise<Client> | undefined