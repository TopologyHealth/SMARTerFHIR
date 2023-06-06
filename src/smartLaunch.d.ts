import Client from "fhirclient/lib/Client";
import * as et from "./emr";

export function epicLaunch(clientId: string, redirect: string, iss: string): Promise<string | void>
export const SmartLaunchHandler: (clientID: string, emrType: et.EMRType) => Promise<Client> | undefined