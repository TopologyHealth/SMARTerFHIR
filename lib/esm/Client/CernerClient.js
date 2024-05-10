var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import { EMR } from "../Launcher/SmartLaunchHandler";
import BaseClient from "./BaseClient";
/**
Represents the CernerClient class, extending the BaseClient.
*/
class CernerClient extends BaseClient {
    static getEndpoints() {
        return BaseClient.constructEndpoints(CernerClient.TOKEN_ENDPOINT, CernerClient.R4_ENDPOINT, CernerClient.AUTHORIZE_ENDPOINT);
    }
    getEndpoints() {
        throw new Error("Method not implemented.");
    }
    /**
     * Creates an instance of CernerClient.
     * @param {SubClient} fhirClientDefault - The default FHIR client to use.
     */
    constructor(fhirClientDefault) {
        super(fhirClientDefault);
        this.EMR_TYPE = EMR.CERNER;
        /* The `cernerRequestHeaders` property is a constant that represents the headers to be included in the request made by the CernerClient class. In this case, it
      specifies that the client accepts the "application/fhir+json" media type. The `readonly` keyword indicates that the property cannot be modified after it is
      initialized. */
        this.cernerRequestHeaders = {
            Accept: "application/fhir+json",
        };
    }
    /**
     * Hydrates a resource with subject and encounter context.
     * @param {T} resource - The resource to hydrate.
     * @returns {Promise<T>} - A promise resolving to the hydrated resource.
     */
    hydrateResource(fhirClientResource, r4Resource) {
        const _super = Object.create(null, {
            hydrateResource: { get: () => super.hydrateResource },
            createReferenceArrayAuthor: { get: () => super.createReferenceArrayAuthor }
        });
        return __awaiter(this, void 0, void 0, function* () {
            return Object.assign(Object.assign({}, (yield _super.hydrateResource.call(this, fhirClientResource, r4Resource))), ("author" in r4Resource ? {} : yield _super.createReferenceArrayAuthor.call(this)));
        });
    }
    /**
     * The function `requestResource` is an asynchronous function that makes a request for a resource using a resource ID and Cerner request headers.
     * @param {string} resourceID - The resourceID parameter is a string that represents the ID of the resource that you want to request.
     * @returns The `requestResource` function is returning a promise.
     */
    requestResource(resourceID) {
        const _super = Object.create(null, {
            requestResource: { get: () => super.requestResource }
        });
        return __awaiter(this, void 0, void 0, function* () {
            return _super.requestResource.call(this, resourceID, {
                headers: this.cernerRequestHeaders,
            });
        });
    }
}
CernerClient.AUTHORIZE_ENDPOINT = "https://authorization.cerner.com/tenants/ec2458f2-1e24-41c8-b71b-0e701af7583d/protocols/oauth2/profiles/smart-v1/personas/provider/authorize";
CernerClient.TOKEN_ENDPOINT = "https://authorization.cerner.com/tenants/ec2458f2-1e24-41c8-b71b-0e701af7583d/protocols/oauth2/profiles/smart-v1/token";
CernerClient.R4_ENDPOINT = "https://fhir-ehr-code.cerner.com/r4/ec2458f2-1e24-41c8-b71b-0e701af7583d";
export default CernerClient;
//# sourceMappingURL=CernerClient.js.map