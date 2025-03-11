import { EMR } from "../Launcher/SmartLaunchHandler";
import BaseClient from "./BaseClient";
export default class AthenaPracticeClient extends BaseClient {
    constructor() {
        super(...arguments);
        this.EMR_TYPE = EMR.ATHENAPRACTICE;
    }
}
//# sourceMappingURL=AthenaPracticeClient.js.map