/// <reference types="react" />
import Client from "fhirclient/lib/Client";
declare enum EMR {
    CERNER = "cerner",
    EPIC = "epic",
    SMART = "smart",
    NONE = "none"
}
export declare function SmartLaunchHandler(setFhirClient: React.Dispatch<React.SetStateAction<Client | undefined>>, clientID: string, emrType: EMR): void;
export {};
