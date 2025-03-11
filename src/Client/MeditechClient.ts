import { EMR } from "../Launcher/SmartLaunchHandler";
import BaseClient from "./BaseClient";

export default class MeditechClient extends BaseClient {
    EMR_TYPE: EMR = EMR.MEDITECH
}