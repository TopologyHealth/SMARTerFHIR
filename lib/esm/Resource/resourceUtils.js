const subjectRequiredResourceList = [
    "Basic", "CareTeam", "Communication", "CommunicationRequest", "Composition",
    "DiagnosticReport", "DocumentManifest", "DocumentReference", "Encounter",
    "GuidanceResponse", "Invoice", "List", "MeasureReport", "Media",
    "MedicationDispense", "MedicinalProductAuthorization", "Observation",
    "QuestionnaireResponse", "RequestGroup", "Specimen"
];
export function isResourceMissingSubject(resource) {
    const subjectRequiredResourceTypes = new Set(subjectRequiredResourceList);
    const requiresSubject = subjectRequiredResourceTypes.has(resource.resourceType);
    const isSubjectAbsentFromResource = !('subject' in resource);
    return requiresSubject && isSubjectAbsentFromResource;
}
const encounterRequiredResourceList = [
    "AdverseEvent", "AllergyIntolerance", "CarePlan", "CareTeam",
    "ClinicalImpression", "Communication", "CommunicationRequest", "Composition",
    "Condition", "DeviceRequest", "DiagnosticReport", "Flag", "GuidanceResponse",
    "ImagingStudy", "Immunization", "List", "Media", "MedicationRequest",
    "NutritionOrder", "Observation", "Procedure", "QuestionnaireResponse",
    "RequestGroup", "RiskAssessment", "ServiceRequest", "Task", "VisionPrescription"
];
export function isResourceMissingEncounter(resource) {
    const encounterRequiredResourceTypes = new Set(encounterRequiredResourceList);
    const requiresEncounter = encounterRequiredResourceTypes.has(resource.resourceType);
    const isEncounterAbsentFromResource = !('encounter' in resource);
    return requiresEncounter && isEncounterAbsentFromResource;
}
const contextRequiredResourceList = [
    "ChargeItem", "DocumentReference", "MedicationAdministration",
    "MedicationDispense", "MedicationStatement"
];
export function isResourceMissingContext(resource) {
    const contextRequiredResourceTypes = new Set(contextRequiredResourceList);
    const requiresContext = contextRequiredResourceTypes.has(resource.resourceType);
    const isContextAbsentFromResource = !('context' in resource);
    return requiresContext && isContextAbsentFromResource;
}
//# sourceMappingURL=resourceUtils.js.map