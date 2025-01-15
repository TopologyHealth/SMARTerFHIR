"use strict";
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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var SmartLaunchHandler_1 = require("../Launcher/SmartLaunchHandler");
var BaseClient_1 = __importDefault(require("./BaseClient"));
/**
 Represents the MedplumClient class, extending the BaseClient.
 */
var MedplumClient = /** @class */ (function (_super) {
    __extends(MedplumClient, _super);
    /**
   * Creates an instance of MedplumClient.
   * @param {SubClient} fhirClientDefault - The default FHIR client to use.
   */
    function MedplumClient(fhirClientDefault) {
        var _this = _super.call(this, fhirClientDefault) || this;
        _this.EMR_TYPE = SmartLaunchHandler_1.EMR.MEDPLUM;
        return _this;
    }
    MedplumClient.getEndpoints = function () {
        return BaseClient_1.default.constructEndpoints(MedplumClient.TOKEN_ENDPOINT, MedplumClient.R4_ENDPOINT, MedplumClient.AUTHORIZE_ENDPOINT);
    };
    MedplumClient.prototype.getEndpoints = function () {
        return MedplumClient.getEndpoints();
    };
    MedplumClient.AUTHORIZE_ENDPOINT = "https://api.medplum.com/oauth2/authorize";
    MedplumClient.TOKEN_ENDPOINT = "https://api.medplum.com/oauth2/token";
    MedplumClient.R4_ENDPOINT = "https://api.medplum.com/r4/fhir";
    return MedplumClient;
}(BaseClient_1.default));
exports.default = MedplumClient;
//# sourceMappingURL=MedplumClient.js.map