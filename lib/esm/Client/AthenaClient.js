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
 Represents the AthenaClient class, extending the BaseClient.
 */
class AthenaClient extends BaseClient {
    static getEndpoints() {
        return BaseClient.constructEndpoints(AthenaClient.TOKEN_ENDPOINT, AthenaClient.R4_ENDPOINT, AthenaClient.AUTHORIZE_ENDPOINT);
    }
    getEndpoints() {
        return AthenaClient.getEndpoints();
    }
    /**
     * Creates an instance of AthenaClient.
     * @param {SubClient} fhirClientDefault - The default FHIR client to use.
     */
    constructor(fhirClientDefault) {
        super(fhirClientDefault);
        this.EMR_TYPE = EMR.ATHENA;
        /* The `athenaCreateHeaders` property is defining the headers that will be used when making a create request to the Athena FHIR server. In this case, it sets the
    `Prefer` header to `"return=representation"`, which indicates that the server should return the created resource in the response. */
        this.athenaCreateHeaders = {
            Prefer: "return=representation",
        };
    }
    create(resource, patientId, encounterId) {
        const _super = Object.create(null, {
            create: { get: () => super.create }
        });
        return __awaiter(this, void 0, void 0, function* () {
            return _super.create.call(this, resource, patientId, encounterId, this.createHeaders(this.athenaCreateHeaders));
        });
    }
}
AthenaClient.AUTHORIZE_ENDPOINT = "https://api.preview.platform.athenahealth.com/oauth2/v1/authorize";
AthenaClient.TOKEN_ENDPOINT = "https://api.preview.platform.athenahealth.com/oauth2/v1/token";
AthenaClient.R4_ENDPOINT = "https://api.platform.athenahealth.com/v1/195900";
AthenaClient.R4_ENDPOINT_PREVIEW = "https://api.preview.platform.athenahealth.com/v1/195900";
export default AthenaClient;
//# sourceMappingURL=AthenaClient.js.map