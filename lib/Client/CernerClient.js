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
import BaseClient from "./BaseClient";
/**
Represents the CernerClient class, extending the BaseClient.
*/
var CernerClient = /** @class */ (function (_super) {
    __extends(CernerClient, _super);
    /**
     * Creates an instance of CernerClient.
     * @param {SubClient} fhirClientDefault - The default FHIR client to use.
     */
    function CernerClient(fhirClientDefault) {
        return _super.call(this, fhirClientDefault) || this;
    }
    /**
     * Creates a resource.
     * @override
     * @param {T} resource - The resource to create.
     * @returns {Promise<R4.Resource>} - A promise resolving to the created resource.
     * @throws {Error} - Throws an error indicating the method is not implemented.
     */
    CernerClient.prototype.create = function (resource) {
        throw new Error("Method not implemented.");
    };
    return CernerClient;
}(BaseClient));
export default CernerClient;
