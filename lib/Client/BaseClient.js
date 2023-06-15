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
var BaseClient = /** @class */ (function () {
    function BaseClient(fhirClientDefault) {
        this.fhirClientDefault = fhirClientDefault;
        this.patientID = this.getIDfromObject(this.fhirClientDefault.patient);
        this.encounterID = this.getIDfromObject(this.fhirClientDefault.encounter);
    }
    BaseClient.prototype.getIDfromObject = function (objectWithId) {
        var id = objectWithId.id;
        if (!id)
            throw new Error("Patient id not found");
        return id;
    };
    BaseClient.prototype.createPatientSubject = function () {
        return {
            "subject": {
                "reference": "Patient/".concat(this.patientID)
            }
        };
    };
    BaseClient.prototype.createEncounterContext = function () {
        return {
            "context": {
                "encounter": [{
                        "reference": "Encounter/".concat(this.encounterID)
                    }]
            }
        };
    };
    BaseClient.prototype.hydrateResource = function (resource) {
        return __assign(__assign(__assign({}, resource), (('subject' in resource) ? {} : this.createPatientSubject())), (('encounter' in resource) ? {} : this.createEncounterContext()));
    };
    return BaseClient;
}());
export default BaseClient;
