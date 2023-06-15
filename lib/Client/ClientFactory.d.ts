import BaseClient from "./BaseClient";
export default class ClientFactory {
    private getEMRType;
    createEMRClient(): Promise<BaseClient>;
}
