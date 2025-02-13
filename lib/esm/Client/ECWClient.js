import { EMR } from "../Launcher/SmartLaunchHandler";
import BaseClient from "./BaseClient";
export default class ECWClient extends BaseClient {
    constructor() {
        super(...arguments);
        this.EMR_TYPE = EMR.ECW;
    }
}
//# sourceMappingURL=ECWClient.js.map