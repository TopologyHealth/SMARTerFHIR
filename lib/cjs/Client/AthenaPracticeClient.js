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
var AthenaPracticeClient = /** @class */ (function (_super) {
    __extends(AthenaPracticeClient, _super);
    function AthenaPracticeClient() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.EMR_TYPE = SmartLaunchHandler_1.EMR.ATHENAPRACTICE;
        return _this;
    }
    AthenaPracticeClient.getEndpoints = function () {
        return BaseClient_1.default.constructEndpoints(AthenaPracticeClient.TOKEN_ENDPOINT, AthenaPracticeClient.R4_ENDPOINT, AthenaPracticeClient.AUTHORIZE_ENDPOINT);
    };
    AthenaPracticeClient.prototype.getEndpoints = function () {
        throw new Error("Method not implemented.");
    };
    AthenaPracticeClient.AUTHORIZE_ENDPOINT = "https://ap23sandbox.fhirapi.athenahealth.com/demoAPIServer/oauth2/authorize";
    AthenaPracticeClient.TOKEN_ENDPOINT = "https://ap23sandbox.fhirapi.athenahealth.com/demoAPIServer/oauth2/token";
    AthenaPracticeClient.R4_ENDPOINT = "https://ap23sandbox.fhirapi.athenahealth.com/demoAPIServer/fhir/r4";
    return AthenaPracticeClient;
}(BaseClient_1.default));
exports.default = AthenaPracticeClient;
//# sourceMappingURL=AthenaPracticeClient.js.map