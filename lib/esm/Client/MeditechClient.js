import { EMR } from "../Launcher/SmartLaunchHandler";
import BaseClient from "./BaseClient";
export default class MeditechClient extends BaseClient {
    constructor() {
        super(...arguments);
        this.EMR_TYPE = EMR.MEDITECH;
    }
}
//# sourceMappingURL=MeditechClient.js.map