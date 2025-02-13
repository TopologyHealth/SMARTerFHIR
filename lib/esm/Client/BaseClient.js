var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import { isResourceMissingContext, isResourceMissingEncounter, isResourceMissingSubject, } from "../Resource/resourceUtils";
import { Transformer } from "../Resource/transformer";
/**
Represents the BaseClient abstract class.
*/
export default class BaseClient {
    getR4Endpoint() {
        return new URL(this.fhirClientDefault.state.serverUrl);
    }
    getEMRType() {
        return this.EMR_TYPE;
    }
    /**
     * The function constructs and returns an object containing three endpoints (token, r4, and auth) based on the provided tokenEP, r4EP, and authorizeEP values.
     * @param {string | undefined} tokenEP - The `tokenEP` parameter is a string that represents the token endpoint. This endpoint is used to obtain an access token
     * for authentication and authorization purposes.
     * @param {string | undefined} r4EP - The `r4EP` parameter is the endpoint URL for the R4 API. It is used to make requests to the R4 API.
     * @param {string | undefined} authorizeEP - The `authorizeEP` parameter is the endpoint URL for the authorization server. It is used for initiating the
     * authorization process and obtaining an authorization code or access token.
     * @returns An object with three properties: "token", "r4", and "auth". Each property is assigned a new URL object based on the corresponding input parameters.
     */
    static setR4Endpoint(r4Endpoint) {
        if (r4Endpoint === undefined)
            throw Error('R4 Endpoint not defined');
        return new URL(r4Endpoint);
    }
    /**
     * Fetch options for create operation headers.
     * @private
     * @readonly
     * @type {FhirClientTypes.FetchOptions}
     */
    createHeaders(additionalCreateHeaders) {
        return {
            headers: Object.assign(Object.assign({}, this.defaultCreateHeaders), additionalCreateHeaders),
        };
    }
    /**
     * Creates an instance of BaseClient.
     * @param {SubClient} fhirClientDefault - The default FHIR client to use.
     */
    constructor(fhirClientDefault) {
        this.defaultCreateHeaders = {};
        this.fhirClientDefault = fhirClientDefault;
    }
    /**
     * Gets the ID from an object with ID.
     * @private
     * @param {T} objectWithId - The object with ID.
     * @returns {Promise<string>} - A promise resolving to the ID.
     * @throws {Error} - Throws an error if the ID is not found.
     */
    getIDfromObject(objectWithId) {
        return __awaiter(this, void 0, void 0, function* () {
            const id = yield objectWithId.id;
            if (!id) {
                console.error(objectWithId);
                throw new Error(`id not found`);
            }
            return id;
        });
    }
    /**
     * Creates a patient subject.
     * @private
     * @returns {Promise<GenericSubject>} - A promise resolving to the patient subject.
     */
    createPatientSubject(patientIdParam) {
        return __awaiter(this, void 0, void 0, function* () {
            const patientID = patientIdParam == undefined ? yield this.getIDfromObject(this.fhirClientDefault.patient) : patientIdParam;
            return {
                subject: {
                    reference: `Patient/${patientID}`,
                },
            };
        });
    }
    createEncounterReference(encounterIdParam, encounterType) {
        return __awaiter(this, void 0, void 0, function* () {
            const encounterID = encounterIdParam == undefined ? yield this.getIDfromObject(this.fhirClientDefault.encounter) : encounterIdParam;
            const reference = {
                reference: `Encounter/${encounterID}`,
            };
            return encounterType == 'GenericEncounterReference' ? { encounter: reference } : reference;
        });
    }
    /**
     * The function creates an array of encounter references asynchronously.
     * @returns An array containing the result of the `createReferenceToEncounter` function, which is awaited.
     */
    createEncounterReferenceArray(encounterIdParam) {
        return __awaiter(this, void 0, void 0, function* () {
            return [yield this.createEncounterReference(encounterIdParam, 'R4.Reference')];
        });
    }
    /**
     * The function "createPeriod" creates a period object with the same start and end date.
     * @param {string} start - The start parameter is a string that represents the start date or time of a period.
     * @returns An object of type R4.Period is being returned.
     */
    createPeriod(start) {
        return {
            start: start,
            end: start,
        };
    }
    /**
     * The createContext function creates a context object with an encounter reference array and a period.
     * @returns The function `createContext` is returning an object with a property `context` which contains the values of `encounter` and `period`.
     */
    createContext(encounterIdParam) {
        return __awaiter(this, void 0, void 0, function* () {
            const encounter = yield this.createEncounterReferenceArray(encounterIdParam);
            const currentDateString = new Date().toISOString();
            const period = this.createPeriod(currentDateString);
            return {
                context: {
                    encounter: encounter,
                    period: period,
                },
            };
        });
    }
    /**
     * The function creates an array of author references using the user ID obtained from the FHIR client.
     * @returns an object with an "author" property, which is an array containing an object with a "reference" property. The value of the "reference" property is a
     * string in the format "Practitioner/{userID}".
     */
    createReferenceArrayAuthor() {
        return __awaiter(this, void 0, void 0, function* () {
            const userID = yield this.getIDfromObject(this.fhirClientDefault.user);
            return {
                author: [
                    {
                        reference: `Practitioner/${userID}`,
                    },
                ],
            };
        });
    }
    /**
     * Hydrates a resource with subject and encounter context.
     * @param {T} fhirClientResource - The resource to hydrate.
     * @returns {Promise<T>} - A promise resolving to the hydrated resource.
     */
    hydrateResource(fhirClientResource, r4Resource, patientId, encounterId) {
        return __awaiter(this, void 0, void 0, function* () {
            var _a, _b, _c;
            const subject = () => __awaiter(this, void 0, void 0, function* () {
                if (isResourceMissingSubject(r4Resource))
                    return yield this.createPatientSubject(patientId);
            });
            const encounter = () => __awaiter(this, void 0, void 0, function* () {
                if (isResourceMissingEncounter(r4Resource))
                    return yield this.createEncounterReference(encounterId, 'GenericEncounterReference');
            });
            const context = () => __awaiter(this, void 0, void 0, function* () {
                if (isResourceMissingContext(r4Resource))
                    return yield this.createContext(encounterId);
            });
            return Object.assign(Object.assign(Object.assign(Object.assign({}, fhirClientResource), (_a = yield subject()) !== null && _a !== void 0 ? _a : {}), (_b = yield encounter()) !== null && _b !== void 0 ? _b : {}), (_c = yield context()) !== null && _c !== void 0 ? _c : {});
        });
    }
    /**
     * The function creates a resource of type T, transforms it to a FhirClientType, hydrates it, sends a create request to the FhirClientDefault, transforms the
     * result back to type T, and returns it.
     * @param {T} r4Resource - The `resource` parameter is the FHIR resource object that you want to create. It should be an object that conforms to the R4 (Release 4)
     * FHIR specification and has a required `resourceType` property.
     * @param [additionalHeaders] - The `additionalHeaders` parameter is an optional object that represents additional headers to be included in the HTTP request when
     * creating a resource. It is of type `FhirClientTypes.FetchOptions`.
     * @returns a Promise of type T, which is the same type as the input resource.
     */
    create(r4Resource, patientId, encounterId, additionalHeaders) {
        return __awaiter(this, void 0, void 0, function* () {
            const transformedResource = Transformer.toFhirClientType(r4Resource);
            const hydratedResource = yield this.hydrateResource(transformedResource, r4Resource, patientId, encounterId);
            const resultResource = yield this.createHydratedResource(hydratedResource, additionalHeaders);
            const resultAsR4 = Transformer.toR4FhirType(resultResource);
            return resultAsR4;
        });
    }
    createHydratedResource(hydratedResource, additionalHeaders) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield this.fhirClientDefault
                .create(hydratedResource, Object.assign({}, (additionalHeaders ? additionalHeaders : {})))
                .then((resource) => {
                if (!resource.resourceType) {
                    return resource.body;
                }
                if (!resource.resourceType) {
                    console.log(resource);
                    throw new Error(`Resource ${resource}, must have a resource type.`);
                }
                return resource;
            })
                .catch((reason) => {
                throw new Error("It failed with:" + reason);
            });
        });
    }
    /**
     * The function `requestResource` asynchronously requests a resource using a specified resource ID and optional request options.
     * @param {string} resourceID - The resourceID parameter is a string that represents the ID of the resource you want to request. It could be the URL or identifier
     * of the resource you want to retrieve.
     * @param {RequestInit} [requestOptions] - The `requestOptions` parameter is an optional object that contains additional options for the HTTP request. It can
     * include properties such as headers, method, body, etc.
     * @returns a resource of type R4.Resource.
     */
    requestResource(resourceID, requestOptions) {
        return __awaiter(this, void 0, void 0, function* () {
            const resultResource = yield this.fhirClientDefault.request(Object.assign({ url: resourceID }, (requestOptions ? { headers: requestOptions.headers } : {})));
            return resultResource;
        });
    }
    /**
     * The function `getUserRead` is a private asynchronous function that retrieves user data using the `read` method of the `fhirClientDefault` object and returns a
     * `UserReadResult` promise.
     * @returns a Promise that resolves to a UserReadResult object.
     */
    getUserRead() {
        return __awaiter(this, void 0, void 0, function* () {
            const user = yield this.fhirClientDefault.user.read();
            return user;
        });
    }
    /**
     * The function `getPractitionerRead` retrieves a user and checks if they are a practitioner, then converts the user to an R4 Practitioner if they are, otherwise
     * it throws an error.
     * @param {UserReadResult} user - The `user` parameter is of type `UserReadResult`, which is a result object returned from the `getUserRead()` function. It
     * represents a user resource in the FHIR format.
     * @returns a Promise that resolves to a FHIR R4 Practitioner resource.
     */
    getPractitionerRead() {
        return __awaiter(this, void 0, void 0, function* () {
            function isPractitioner(user) {
                return user.resourceType == "Practitioner";
            }
            const user = yield this.getUserRead();
            if (isPractitioner(user)) {
                const userInR4 = Transformer.toR4FhirType(user);
                return userInR4;
            }
            throw new Error("User is Not a Practitioner");
        });
    }
    /**
     * The function `getPatientRead` retrieves a patient record from a FHIR server and transforms it into an R4.Patient object.
     * @returns a Promise that resolves to an instance of the R4.Patient type.
     */
    getPatientRead() {
        return __awaiter(this, void 0, void 0, function* () {
            const patient = yield this.fhirClientDefault.patient.read();
            const patientInR4 = Transformer.toR4FhirType(patient);
            return patientInR4;
        });
    }
    /* The `getEncounterRead` function is an asynchronous function that retrieves an encounter record from a FHIR server and transforms it into an R4.Encounter object. */
    getEncounterRead() {
        return __awaiter(this, void 0, void 0, function* () {
            const encounter = yield this.fhirClientDefault.encounter.read();
            const encounterInR4 = Transformer.toR4FhirType(encounter);
            return encounterInR4;
        });
    }
    /**
     * The function creates a patient resource and returns it as a R4.Patient object.
     * @param {R4.Patient} patient - The `patient` parameter is the FHIR patient resource object that you want to create. It should be an object that conforms to the R4 (Release 4)
     * FHIR specification and has a required `resourceType` property.
     * @returns a Promise of type R4.Patient
     */
    createPatient(patient) {
        return __awaiter(this, void 0, void 0, function* () {
            return this.create(patient);
        });
    }
}
//# sourceMappingURL=BaseClient.js.map