import BaseClient from "./BaseClient";
export default class ClientFactory {
    readonly clientID: string;
    constructor(clientID: string);
    private getEMRType;
    createEMRClient(): Promise<BaseClient>;
}
