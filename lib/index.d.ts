import BaseClient from './Client/BaseClient';
export declare enum EMR {
    CERNER = "cerner",
    EPIC = "epic",
    SMART = "smart",
    NONE = "none"
}
export declare function SmartLaunchHandler(clientID: string, emrType: EMR): Promise<BaseClient | undefined>;
