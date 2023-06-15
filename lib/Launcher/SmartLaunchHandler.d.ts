export declare enum EMR {
    CERNER = "cerner",
    EPIC = "epic",
    SMART = "smart",
    NONE = "none"
}
export default class SmartLaunchHandler {
    readonly clientID: string;
    readonly emrType: EMR;
    constructor(clientID: string, emrType: EMR);
    epicLaunch(clientId: string, redirect: string, iss: string): Promise<string | void>;
    cernerLaunch(clientId: string, redirect: string, iss: string): Promise<string | void>;
    authorizeEMR(): Promise<void>;
}
