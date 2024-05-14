import { EMR } from "../Launcher/SmartLaunchHandler";
import BaseClient, { EMR_ENDPOINTS } from "./BaseClient";
export default class ECWClient extends BaseClient {
    getEndpoints(): EMR_ENDPOINTS;
    EMR_TYPE: EMR;
}
