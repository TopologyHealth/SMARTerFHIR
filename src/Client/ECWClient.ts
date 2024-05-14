
import { EMR } from "../Launcher/SmartLaunchHandler";
import BaseClient, { EMR_ENDPOINTS } from "./BaseClient";

export default class ECWClient extends BaseClient {
  public getEndpoints(): EMR_ENDPOINTS {
    throw new Error("Method not implemented.");
  }
  EMR_TYPE: EMR = EMR.ECW
}