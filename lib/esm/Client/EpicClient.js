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
 Represents the EpicClient class, extending the BaseClient.
 */
class EpicClient extends BaseClient {
    static getEndpoints() {
        return BaseClient.constructEndpoints(EpicClient.TOKEN_ENDPOINT, EpicClient.R4_ENDPOINT, EpicClient.AUTHORIZE_ENDPOINT);
    }
    getEndpoints() {
        return EpicClient.getEndpoints();
    }
    /**
     * Creates an instance of EpicClient.
     * @param {SubClient} fhirClientDefault - The default FHIR client to use.
     */
    constructor(fhirClientDefault) {
        super(fhirClientDefault);
        this.EMR_TYPE = EMR.EPIC;
        /* The `epicCreateHeaders` property is defining the headers that will be used when making a create request to the Epic FHIR server. In this case, it sets the
    `Prefer` header to `"return=representation"`, which indicates that the server should return the created resource in the response. */
        this.epicCreateHeaders = {
            Prefer: "return=representation",
        };
    }
    create(resource, patientId, encounterId) {
        const _super = Object.create(null, {
            create: { get: () => super.create }
        });
        return __awaiter(this, void 0, void 0, function* () {
            return _super.create.call(this, resource, patientId, encounterId, this.createHeaders(this.epicCreateHeaders));
        });
    }
}
EpicClient.AUTHORIZE_ENDPOINT = "https://fhir.epic.com/interconnect-fhir-oauth/oauth2/authorize";
EpicClient.TOKEN_ENDPOINT = "https://fhir.epic.com/interconnect-fhir-oauth/oauth2/token";
EpicClient.R4_ENDPOINT = "https://fhir.epic.com/interconnect-fhir-oauth/api/FHIR/R4";
export default EpicClient;
//# sourceMappingURL=EpicClient.js.map