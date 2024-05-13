"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.isResourceMissingContext = exports.isResourceMissingEncounter = exports.isResourceMissingSubject = void 0;
var subjectRequiredResourceList = [
    "Basic", "CareTeam", "Communication", "CommunicationRequest", "Composition",
    "DiagnosticReport", "DocumentManifest", "DocumentReference", "Encounter",
    "GuidanceResponse", "Invoice", "List", "MeasureReport", "Media",
    "MedicationDispense", "MedicinalProductAuthorization", "Observation",
    "QuestionnaireResponse", "RequestGroup", "Specimen"
];
function isResourceMissingSubject(resource) {
    var subjectRequiredResourceTypes = new Set(subjectRequiredResourceList);
    var requiresSubject = subjectRequiredResourceTypes.has(resource.resourceType);
    var isSubjectAbsentFromResource = !('subject' in resource);
    return requiresSubject && isSubjectAbsentFromResource;
}
exports.isResourceMissingSubject = isResourceMissingSubject;
var encounterRequiredResourceList = [
    "AdverseEvent", "AllergyIntolerance", "CarePlan", "CareTeam",
    "ClinicalImpression", "Communication", "CommunicationRequest", "Composition",
    "Condition", "DeviceRequest", "DiagnosticReport", "Flag", "GuidanceResponse",
    "ImagingStudy", "Immunization", "List", "Media", "MedicationRequest",
    "NutritionOrder", "Observation", "Procedure", "QuestionnaireResponse",
    "RequestGroup", "RiskAssessment", "ServiceRequest", "Task", "VisionPrescription"
];
function isResourceMissingEncounter(resource) {
    var encounterRequiredResourceTypes = new Set(encounterRequiredResourceList);
    var requiresEncounter = encounterRequiredResourceTypes.has(resource.resourceType);
    var isEncounterAbsentFromResource = !('encounter' in resource);
    return requiresEncounter && isEncounterAbsentFromResource;
}
exports.isResourceMissingEncounter = isResourceMissingEncounter;
var contextRequiredResourceList = [
    "ChargeItem", "DocumentReference", "MedicationAdministration",
    "MedicationDispense", "MedicationStatement"
];
function isResourceMissingContext(resource) {
    var contextRequiredResourceTypes = new Set(contextRequiredResourceList);
    var requiresContext = contextRequiredResourceTypes.has(resource.resourceType);
    var isContextAbsentFromResource = !('context' in resource);
    return requiresContext && isContextAbsentFromResource;
}
exports.isResourceMissingContext = isResourceMissingContext;
//# sourceMappingURL=resourceUtils.js.map