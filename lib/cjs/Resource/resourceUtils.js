"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.resourceMayContainEncounter = exports.isResourceMissingSubject = void 0;
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
/**
 * The function `resourceMayContainEncounter` checks if a resource may contain an encounter.
 * @param {R4.Resource} resource - The `resource` parameter is of type `R4.Resource`, which is a FHIR resource object.
 * @returns a boolean value indicating whether the resource may contain an encounter.
 */
function resourceMayContainEncounter(resource) {
    return resource.resourceType === "DocumentReference";
}
exports.resourceMayContainEncounter = resourceMayContainEncounter;
//# sourceMappingURL=resourceUtils.js.map