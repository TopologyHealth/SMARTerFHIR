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
var AthenaClient = /** @class */ (function (_super) {
    __extends(AthenaClient, _super);
    function AthenaClient() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.EMR_TYPE = SmartLaunchHandler_1.EMR.ATHENA;
        return _this;
    }
    AthenaClient.getEndpoints = function () {
        return BaseClient_1.default.constructEndpoints(AthenaClient.TOKEN_ENDPOINT, AthenaClient.R4_ENDPOINT, AthenaClient.AUTHORIZE_ENDPOINT);
    };
    AthenaClient.prototype.getEndpoints = function () {
        throw new Error("Method not implemented.");
    };
    AthenaClient.AUTHORIZE_ENDPOINT = "https://api.preview.platform.athenahealth.com/oauth2/v1/authorize";
    AthenaClient.TOKEN_ENDPOINT = "https://api.preview.platform.athenahealth.com/oauth2/v1/token";
    AthenaClient.R4_ENDPOINT = "https://api.preview.platform.athenahealth.com/fhir/r4";
    return AthenaClient;
}(BaseClient_1.default));
exports.default = AthenaClient;
//# sourceMappingURL=AthenaClient.js.map