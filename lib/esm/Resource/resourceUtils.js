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
/**
 * The function `resourceMayContainEncounter` checks if a resource may contain an encounter.
 * @param {R4.Resource} resource - The `resource` parameter is of type `R4.Resource`, which is a FHIR resource object.
 * @returns a boolean value indicating whether the resource may contain an encounter.
 */
export function resourceMayContainEncounter(resource) {
    return resource.resourceType === "DocumentReference";
}
//# sourceMappingURL=resourceUtils.js.map