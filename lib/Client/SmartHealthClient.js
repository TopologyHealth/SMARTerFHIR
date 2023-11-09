var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        if (typeof b !== "function" && b !== null)
            throw new TypeError("Class extends value " + String(b) + " is not a constructor or null");
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
import { EMR } from "../Launcher/SmartLaunchHandler";
import BaseClient from "./BaseClient";
/**
 Represents the SmartHealthClient class, extending the BaseClient.
 */
var SmartHealthClient = /** @class */ (function (_super) {
    __extends(SmartHealthClient, _super);
    /**
   * Creates an instance of SmartHealthClient.
   * @param {SubClient} fhirClientDefault - The default FHIR client to use.
   */
    function SmartHealthClient(fhirClientDefault) {
        var _this = _super.call(this, fhirClientDefault) || this;
        _this.EMR_TYPE = EMR.SMART;
        return _this;
    }
    SmartHealthClient.getEndpoints = function () {
        return BaseClient.constructEndpoints(SmartHealthClient.TOKEN_ENDPOINT, SmartHealthClient.R4_ENDPOINT, SmartHealthClient.AUTHORIZE_ENDPOINT);
    };
    SmartHealthClient.prototype.getEndpoints = function () {
        return SmartHealthClient.getEndpoints();
    };
    SmartHealthClient.AUTHORIZE_ENDPOINT = "https://launch.smarthealthit.org/v/r4/auth/authorize";
    SmartHealthClient.TOKEN_ENDPOINT = "https://launch.smarthealthit.org/v/r4/auth/token";
    SmartHealthClient.R4_ENDPOINT = "https://launch.smarthealthit.org/v/r4/fhir";
    return SmartHealthClient;
}(BaseClient));
export default SmartHealthClient;
