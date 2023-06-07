import Client from "fhirclient/lib/Client";
declare enum EMR {
    CERNER = "cerner",
    EPIC = "epic",
    SMART = "smart",
    NONE = "none"
}
export declare function SmartLaunchHandler(clientID: string, emrType: EMR): Promise<Client | undefined>;
export {};
