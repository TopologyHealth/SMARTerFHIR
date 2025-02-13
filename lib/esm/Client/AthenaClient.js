import { EMR } from "../Launcher/SmartLaunchHandler";
import BaseClient from "./BaseClient";
export default class AthenaClient extends BaseClient {
    constructor() {
        super(...arguments);
        this.EMR_TYPE = EMR.ATHENA;
    }
}
//# sourceMappingURL=AthenaClient.js.map