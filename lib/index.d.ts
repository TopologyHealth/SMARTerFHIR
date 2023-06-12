import Client from "fhirclient/lib/Client";
export declare enum EMR {
    CERNER = "cerner",
    EPIC = "epic",
    SMART = "smart",
    NONE = "none"
}
export declare function SmartLaunchHandler(setFhirClient: (authenticatedClient: Client) => void, clientID: string, emrType: EMR): Promise<void>;
