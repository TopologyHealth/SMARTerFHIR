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
/**
Represents the BaseClient abstract class.
*/
var BaseClient = /** @class */ (function () {
    /**
     * Creates an instance of BaseClient.
     * @param {SubClient} fhirClientDefault - The default FHIR client to use.
     */
    function BaseClient(fhirClientDefault) {
        this.fhirClientDefault = fhirClientDefault;
    }
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
                        if (!id)
                            throw new Error("Patient id not found");
                        return [2 /*return*/, id];
                }
            });
        });
    };
    /**
     * Creates a patient subject.
     * @private
     * @returns {Promise<Subject>} - A promise resolving to the patient subject.
     */
    BaseClient.prototype.createPatientSubject = function () {
        return __awaiter(this, void 0, void 0, function () {
            var patientID;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.getIDfromObject(this.fhirClientDefault.patient)];
                    case 1:
                        patientID = _a.sent();
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
     * Creates an encounter context.
     * @private
     * @returns {Promise<Context>} - A promise resolving to the encounter context.
     */
    BaseClient.prototype.createEncounterContext = function () {
        return __awaiter(this, void 0, void 0, function () {
            var encounterID;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.getIDfromObject(this.fhirClientDefault.encounter)];
                    case 1:
                        encounterID = _a.sent();
                        return [2 /*return*/, {
                                context: {
                                    encounter: [
                                        {
                                            reference: "Encounter/".concat(encounterID),
                                        },
                                    ],
                                },
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
    BaseClient.prototype.hydrateResource = function (resource) {
        return __awaiter(this, void 0, void 0, function () {
            var _a, _b, _c, _d;
            return __generator(this, function (_e) {
                switch (_e.label) {
                    case 0:
                        _a = [__assign({}, resource)];
                        if (!("subject" in resource)) return [3 /*break*/, 1];
                        _b = {};
                        return [3 /*break*/, 3];
                    case 1: return [4 /*yield*/, this.createPatientSubject()];
                    case 2:
                        _b = _e.sent();
                        _e.label = 3;
                    case 3:
                        _c = [__assign.apply(void 0, _a.concat([(_b)]))];
                        if (!("encounter" in resource)) return [3 /*break*/, 4];
                        _d = {};
                        return [3 /*break*/, 6];
                    case 4: return [4 /*yield*/, this.createEncounterContext()];
                    case 5:
                        _d = _e.sent();
                        _e.label = 6;
                    case 6: return [2 /*return*/, __assign.apply(void 0, _c.concat([(_d)]))];
                }
            });
        });
    };
    return BaseClient;
}());
export default BaseClient;
