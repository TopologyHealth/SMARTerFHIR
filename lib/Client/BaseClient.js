var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (g && (g = 0, op[0] && (_ = 0)), _) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
import { Transformer } from "../Resource/transformer";
/**
Represents the BaseClient abstract class.
*/
var BaseClient = /** @class */ (function () {
    /**
     * Creates an instance of BaseClient.
     * @param {SubClient} fhirClientDefault - The default FHIR client to use.
     */
    function BaseClient(fhirClientDefault) {
        this.defaultCreateHeaders = {};
        this.fhirClientDefault = fhirClientDefault;
    }
    BaseClient.prototype.getEMRType = function () {
        return this.EMR_TYPE;
    };
    /**
     * The function constructs and returns an object containing three endpoints (token, r4, and auth) based on the provided tokenEP, r4EP, and authorizeEP values.
     * @param {string | undefined} tokenEP - The `tokenEP` parameter is a string that represents the token endpoint. This endpoint is used to obtain an access token
     * for authentication and authorization purposes.
     * @param {string | undefined} r4EP - The `r4EP` parameter is the endpoint URL for the R4 API. It is used to make requests to the R4 API.
     * @param {string | undefined} authorizeEP - The `authorizeEP` parameter is the endpoint URL for the authorization server. It is used for initiating the
     * authorization process and obtaining an authorization code or access token.
     * @returns An object with three properties: "token", "r4", and "auth". Each property is assigned a new URL object based on the corresponding input parameters.
     */
    BaseClient.constructEndpoints = function (tokenEP, r4EP, authorizeEP) {
        if (tokenEP == undefined)
            throw Error('Token Endpoint not defined');
        if (r4EP === undefined)
            throw Error('R4 Endpoint not defined');
        if (authorizeEP === undefined)
            throw Error('Auth Endpoint not defined');
        return {
            token: new URL(tokenEP),
            r4: new URL(r4EP),
            auth: new URL(authorizeEP)
        };
    };
    /**
     * Fetch options for create operation headers.
     * @private
     * @readonly
     * @type {FhirClientTypes.FetchOptions}
     */
    BaseClient.prototype.createHeaders = function (additionalCreateHeaders) {
        return {
            headers: __assign(__assign({}, this.defaultCreateHeaders), additionalCreateHeaders),
        };
    };
    /**
     * Gets the ID from an object with ID.
     * @private
     * @param {T} objectWithId - The object with ID.
     * @returns {Promise<string>} - A promise resolving to the ID.
     * @throws {Error} - Throws an error if the ID is not found.
     */
    BaseClient.prototype.getIDfromObject = function (objectWithId) {
        return __awaiter(this, void 0, void 0, function () {
            var id;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, objectWithId.id];
                    case 1:
                        id = _a.sent();
                        if (!id) {
                            console.error(objectWithId);
                            throw new Error("id not found");
                        }
                        return [2 /*return*/, id];
                }
            });
        });
    };
    /**
     * Creates a patient subject.
     * @private
     * @returns {Promise<GenericSubject>} - A promise resolving to the patient subject.
     */
    BaseClient.prototype.createPatientSubject = function (patientIdParam) {
        return __awaiter(this, void 0, void 0, function () {
            var patientID, _a;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        console.log(patientIdParam);
                        if (!(patientIdParam == undefined)) return [3 /*break*/, 2];
                        return [4 /*yield*/, this.getIDfromObject(this.fhirClientDefault.patient)];
                    case 1:
                        _a = _b.sent();
                        return [3 /*break*/, 3];
                    case 2:
                        _a = patientIdParam;
                        _b.label = 3;
                    case 3:
                        patientID = _a;
                        return [2 /*return*/, {
                                subject: {
                                    reference: "Patient/".concat(patientID),
                                },
                            }];
                }
            });
        });
    };
    /**
     * The function creates a reference to an Encounter object by retrieving its ID from a FHIR client.
     * @returns An object is being returned with a property "reference" that has a value of `Encounter/`.
     */
    BaseClient.prototype.createEncounterReference = function (encounterIdParam) {
        return __awaiter(this, void 0, void 0, function () {
            var encounterID, _a;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        if (!(encounterIdParam == undefined)) return [3 /*break*/, 2];
                        return [4 /*yield*/, this.getIDfromObject(this.fhirClientDefault.encounter)];
                    case 1:
                        _a = _b.sent();
                        return [3 /*break*/, 3];
                    case 2:
                        _a = encounterIdParam;
                        _b.label = 3;
                    case 3:
                        encounterID = _a;
                        return [2 /*return*/, {
                                reference: "Encounter/".concat(encounterID),
                            }];
                }
            });
        });
    };
    /**
     * The function creates an array of encounter references asynchronously.
     * @returns An array containing the result of the `createEncounterReference` function, which is awaited.
     */
    BaseClient.prototype.createEncounterReferenceArray = function (encounterIdParam) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.createEncounterReference(encounterIdParam)];
                    case 1: return [2 /*return*/, [_a.sent()]];
                }
            });
        });
    };
    /**
     * The function "createPeriod" creates a period object with the same start and end date.
     * @param {string} start - The start parameter is a string that represents the start date or time of a period.
     * @returns An object of type R4.Period is being returned.
     */
    BaseClient.prototype.createPeriod = function (start) {
        return {
            start: start,
            end: start,
        };
    };
    /**
     * The createContext function creates a context object with an encounter reference array and a period.
     * @returns The function `createContext` is returning an object with a property `context` which contains the values of `encounter` and `period`.
     */
    BaseClient.prototype.createContext = function (encounterIdParam) {
        return __awaiter(this, void 0, void 0, function () {
            var encounter, currentDateString, period;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.createEncounterReferenceArray(encounterIdParam)];
                    case 1:
                        encounter = _a.sent();
                        currentDateString = new Date().toISOString();
                        period = this.createPeriod(currentDateString);
                        return [2 /*return*/, {
                                context: {
                                    encounter: encounter,
                                    period: period,
                                },
                            }];
                }
            });
        });
    };
    /**
     * The function creates an array of author references using the user ID obtained from the FHIR client.
     * @returns an object with an "author" property, which is an array containing an object with a "reference" property. The value of the "reference" property is a
     * string in the format "Practitioner/{userID}".
     */
    BaseClient.prototype.createReferenceArrayAuthor = function () {
        return __awaiter(this, void 0, void 0, function () {
            var userID;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.getIDfromObject(this.fhirClientDefault.user)];
                    case 1:
                        userID = _a.sent();
                        return [2 /*return*/, {
                                author: [
                                    {
                                        reference: "Practitioner/".concat(userID),
                                    },
                                ],
                            }];
                }
            });
        });
    };
    /**
     * Hydrates a resource with subject and encounter context.
     * @param {T} resource - The resource to hydrate.
     * @returns {Promise<T>} - A promise resolving to the hydrated resource.
     */
    BaseClient.prototype.hydrateResource = function (resource, patientId, encounterId) {
        return __awaiter(this, void 0, void 0, function () {
            var _a, _b, _c, _d;
            return __generator(this, function (_e) {
                switch (_e.label) {
                    case 0:
                        _a = [__assign({}, resource)];
                        if (!("subject" in resource)) return [3 /*break*/, 1];
                        _b = {};
                        return [3 /*break*/, 3];
                    case 1: return [4 /*yield*/, this.createPatientSubject(patientId)];
                    case 2:
                        _b = _e.sent();
                        _e.label = 3;
                    case 3:
                        _c = [__assign.apply(void 0, _a.concat([(_b)]))];
                        if (!("encounter" in resource)) return [3 /*break*/, 4];
                        _d = {};
                        return [3 /*break*/, 6];
                    case 4: return [4 /*yield*/, this.createContext(encounterId)];
                    case 5:
                        _d = _e.sent();
                        _e.label = 6;
                    case 6: return [2 /*return*/, __assign.apply(void 0, _c.concat([(_d)]))];
                }
            });
        });
    };
    /**
     * The function creates a resource of type T, transforms it to a FhirClientType, hydrates it, sends a create request to the FhirClientDefault, transforms the
     * result back to type T, and returns it.
     * @param {T} resource - The `resource` parameter is the FHIR resource object that you want to create. It should be an object that conforms to the R4 (Release 4)
     * FHIR specification and has a required `resourceType` property.
     * @param [additionalHeaders] - The `additionalHeaders` parameter is an optional object that represents additional headers to be included in the HTTP request when
     * creating a resource. It is of type `FhirClientTypes.FetchOptions`.
     * @returns a Promise of type T, which is the same type as the input resource.
     */
    BaseClient.prototype.create = function (resource, patientId, encounterId, additionalHeaders) {
        return __awaiter(this, void 0, void 0, function () {
            var transformedResource, hydratedResource, resultResource, resultAsR4;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        transformedResource = Transformer.toFhirClientType(resource);
                        return [4 /*yield*/, this.hydrateResource(transformedResource, patientId, encounterId)];
                    case 1:
                        hydratedResource = _a.sent();
                        return [4 /*yield*/, this.createHydratedResource(hydratedResource, additionalHeaders)];
                    case 2:
                        resultResource = _a.sent();
                        resultAsR4 = Transformer.toR4FhirType(resultResource);
                        return [2 /*return*/, resultAsR4];
                }
            });
        });
    };
    BaseClient.prototype.createHydratedResource = function (hydratedResource, additionalHeaders) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.fhirClientDefault
                            .create(hydratedResource, __assign({}, (additionalHeaders ? additionalHeaders : {})))
                            .then(function (resource) {
                            if (!resource.resourceType) {
                                return resource.body;
                            }
                            if (!resource.resourceType) {
                                console.log(resource);
                                throw new Error("Resource ".concat(resource, ", must have a resource type."));
                            }
                            return resource;
                        })
                            .catch(function (reason) {
                            throw new Error("It failed with:" + reason);
                        })];
                    case 1: return [2 /*return*/, _a.sent()];
                }
            });
        });
    };
    /**
     * The function `requestResource` asynchronously requests a resource using a specified resource ID and optional request options.
     * @param {string} resourceID - The resourceID parameter is a string that represents the ID of the resource you want to request. It could be the URL or identifier
     * of the resource you want to retrieve.
     * @param {RequestInit} [requestOptions] - The `requestOptions` parameter is an optional object that contains additional options for the HTTP request. It can
     * include properties such as headers, method, body, etc.
     * @returns a resource of type R4.Resource.
     */
    BaseClient.prototype.requestResource = function (resourceID, requestOptions) {
        return __awaiter(this, void 0, void 0, function () {
            var resultResource;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.fhirClientDefault.request(__assign({ url: resourceID }, (requestOptions ? { headers: requestOptions.headers } : {})))];
                    case 1:
                        resultResource = _a.sent();
                        return [2 /*return*/, resultResource];
                }
            });
        });
    };
    /**
     * The function `getUserRead` is a private asynchronous function that retrieves user data using the `read` method of the `fhirClientDefault` object and returns a
     * `UserReadResult` promise.
     * @returns a Promise that resolves to a UserReadResult object.
     */
    BaseClient.prototype.getUserRead = function () {
        return __awaiter(this, void 0, void 0, function () {
            var user;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.fhirClientDefault.user.read()];
                    case 1:
                        user = _a.sent();
                        return [2 /*return*/, user];
                }
            });
        });
    };
    /**
     * The function `getPractitionerRead` retrieves a user and checks if they are a practitioner, then converts the user to an R4 Practitioner if they are, otherwise
     * it throws an error.
     * @param {UserReadResult} user - The `user` parameter is of type `UserReadResult`, which is a result object returned from the `getUserRead()` function. It
     * represents a user resource in the FHIR format.
     * @returns a Promise that resolves to a FHIR R4 Practitioner resource.
     */
    BaseClient.prototype.getPractitionerRead = function () {
        return __awaiter(this, void 0, void 0, function () {
            function isPractitioner(user) {
                return user.resourceType == "Practitioner";
            }
            var user, userInR4;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.getUserRead()];
                    case 1:
                        user = _a.sent();
                        if (isPractitioner(user)) {
                            userInR4 = Transformer.toR4FhirType(user);
                            return [2 /*return*/, userInR4];
                        }
                        throw new Error("User is Not a Practitioner");
                }
            });
        });
    };
    /**
     * The function `getPatientRead` retrieves a patient record from a FHIR server and transforms it into an R4.Patient object.
     * @returns a Promise that resolves to an instance of the R4.Patient type.
     */
    BaseClient.prototype.getPatientRead = function () {
        return __awaiter(this, void 0, void 0, function () {
            var patient, patientInR4;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.fhirClientDefault.patient.read()];
                    case 1:
                        patient = _a.sent();
                        patientInR4 = Transformer.toR4FhirType(patient);
                        return [2 /*return*/, patientInR4];
                }
            });
        });
    };
    /* The `getEncounterRead` function is an asynchronous function that retrieves an encounter record from a FHIR server and transforms it into an R4.Encounter object. */
    BaseClient.prototype.getEncounterRead = function () {
        return __awaiter(this, void 0, void 0, function () {
            var encounter, encounterInR4;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.fhirClientDefault.encounter.read()];
                    case 1:
                        encounter = _a.sent();
                        encounterInR4 = Transformer.toR4FhirType(encounter);
                        return [2 /*return*/, encounterInR4];
                }
            });
        });
    };
    return BaseClient;
}());
export default BaseClient;
//# sourceMappingURL=BaseClient.js.map