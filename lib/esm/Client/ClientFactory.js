var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import smart, * as FHIR from "fhirclient";
import { EMR, instanceOfEmr } from "../Launcher/SmartLaunchHandler";
import CernerClient from "./CernerClient";
import EpicClient from "./EpicClient";
import SmartHealthClient from "./SmartHealthClient";
export var LAUNCH;
(function (LAUNCH) {
    LAUNCH[LAUNCH["EMR"] = 0] = "EMR";
    LAUNCH[LAUNCH["STANDALONE"] = 1] = "STANDALONE";
    LAUNCH[LAUNCH["BACKEND"] = 2] = "BACKEND";
})(LAUNCH || (LAUNCH = {}));
/**
 * The function checks if an object is an instance of the JWT class by verifying if it has a client_id property.
 * @param {unknown} object - The `object` parameter is of type `unknown`, which means it can be any type.
 * @returns a boolean value.
 */
function instanceOfJWT(object) {
    return object.client_id !== undefined;
}
/**
Represents the ClientFactory class for creating EMR clients.
*/
export default class ClientFactory {
    /**
     * The function `getEMRType` determines the type of Electronic Medical Record (EMR) based on the provided client or token.
     * @param {SubClient | JWT} client - The parameter `clientOrToken` can be either a `SubClient` object or a JWT (JSON Web Token).
     * @returns the type of Electronic Medical Record (EMR) based on the input parameter. The possible return values are EMR.CERNER, EMR.SMART, EMR.EPIC, or EMR.NONE.
    */
    getEMRType(clientOrToken) {
        function isClient(input) {
            return input.state.serverUrl !== undefined;
        }
        if (isClient(clientOrToken)) {
            if (clientOrToken.state.serverUrl.includes("cerner")) {
                return EMR.CERNER;
            }
            if (clientOrToken.state.serverUrl.includes("smarthealthit")) {
                return EMR.SMART;
            }
            if (clientOrToken.state.serverUrl.includes("epic")) {
                return EMR.EPIC;
            }
        }
        else {
            if ("epic.eci" in clientOrToken) {
                return EMR.EPIC;
            }
        }
        return EMR.NONE;
    }
    /**
     * The function `createEMRClient` creates an EMR client based on the specified launch type.
     * @param {LAUNCH} launchType - The `launchType` parameter is an optional parameter of type `LAUNCH` that specifies the type of EMR launch. It has a default value
     * of `LAUNCH.EMR`.
     * @returns a Promise that resolves to an instance of the `BaseClient` class.
     */
    createEMRClient(launchType) {
        return __awaiter(this, void 0, void 0, function* () {
            const fhirClient = yield this.createDefaultFhirClient(launchType);
            return yield this.createSmarterFhirClient(fhirClient);
        });
    }
    /**
     * The function `createEMRClientBackend` creates an EMR client based on the specified launch type.
     * @param {IncomingMessage} req - The `req` parameter is an incoming message object that represents the request made by the client.
     * @param {ServerResponse} res - The `res` parameter is a server response object that represents the response sent by the server.
     * @param {FhirClientConfig} serverConfig - The `serverConfig` parameter is an object that contains the configuration for the FHIR client. It includes the server URL, token response, client ID, and token URI.
     * @returns a Promise that resolves to an instance of the `BaseClient` class.
     */
    createEMRClientBackend(req, res, serverConfig) {
        return __awaiter(this, void 0, void 0, function* () {
            const fhirClient = smart(req, res).client({
                serverUrl: serverConfig.serverUrl,
                tokenResponse: serverConfig.tokenResponse,
                clientId: serverConfig.clientId,
                tokenUri: serverConfig.tokenUri
            });
            return this.createSmarterFhirClient(fhirClient);
        });
    }
    createSmarterFhirClient(fhirClient) {
        return __awaiter(this, void 0, void 0, function* () {
            const emrType = this.getEMRType(fhirClient);
            switch (emrType) {
                case EMR.EPIC:
                    return new EpicClient(fhirClient);
                case EMR.CERNER:
                    return new CernerClient(fhirClient);
                case EMR.SMART:
                    return new SmartHealthClient(fhirClient);
                case EMR.NONE:
                default:
                    throw new Error("Unsupported provider for EMR Client creation");
            }
        });
    }
    /**
     * The function creates a default FHIR client based on the launch type.
     * @param {LAUNCH} launchType - The `launchType` parameter is an enum type called `LAUNCH`. It represents the type of launch for the FHIR client. There are two
     * possible values for `LAUNCH`:
     * @returns a Promise that resolves to a SubClient object.
     */
    createDefaultFhirClient(launchType) {
        return __awaiter(this, void 0, void 0, function* () {
            switch (launchType) {
                case LAUNCH.EMR:
                case LAUNCH.STANDALONE:
                    return FHIR.oauth2.ready();
                default:
                    throw new Error("Unsupported provider for standalone launch");
            }
        });
    }
    getEmrEndpoints(object) {
        switch (this.getEmrTypeFromObject(object)) {
            case EMR.EPIC:
                return EpicClient.getEndpoints();
            case EMR.CERNER:
                return CernerClient.getEndpoints();
            case EMR.SMART:
            case EMR.NONE:
            default:
                throw new Error('EMR type not defined.');
        }
    }
    /**
     * The function `getEmrTypeFromObject` takes an object as input and returns the corresponding EMR type if the object is of type JWT or EMR, otherwise it throws an
     * error.
     * @param {unknown} object - The `object` parameter is of type `unknown`, which means it can be any type. It is used as input to determine the EMR (Electronic
     * Medical Record) type. The function checks if the `object` is an instance of JWT (JSON Web Token) or EMR, and returns
     * @returns an EMR (Electronic Medical Record) object.
     */
    getEmrTypeFromObject(object) {
        if (instanceOfJWT(object))
            return this.getEMRType(object);
        if (instanceOfEmr(object))
            return object;
        throw new Error('Invalid object type.');
    }
}
//# sourceMappingURL=ClientFactory.js.map