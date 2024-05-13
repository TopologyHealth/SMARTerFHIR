import * as R4 from "fhir/r4";
import { R4ResourceWithRequiredType } from "../types";

type ResourceType = R4.FhirResource['resourceType'];
const subjectRequiredResourceList: ResourceType[] = [
  "Basic", "CareTeam", "Communication", "CommunicationRequest", "Composition",
  "DiagnosticReport", "DocumentManifest", "DocumentReference", "Encounter",
  "GuidanceResponse", "Invoice", "List", "MeasureReport", "Media",
  "MedicationDispense", "MedicinalProductAuthorization", "Observation",
  "QuestionnaireResponse", "RequestGroup", "Specimen"
];

export function isResourceMissingSubject(resource: R4ResourceWithRequiredType): boolean {
  const subjectRequiredResourceTypes: Set<ResourceType> = new Set(subjectRequiredResourceList);
  const requiresSubject = subjectRequiredResourceTypes.has(resource.resourceType);
  const isSubjectAbsentFromResource = !('subject' in resource);
  return requiresSubject && isSubjectAbsentFromResource
}

const encounterRequiredResourceList: ResourceType[] = [
  "AdverseEvent", "AllergyIntolerance", "CarePlan", "CareTeam",
  "ClinicalImpression", "Communication", "CommunicationRequest", "Composition",
  "Condition", "DeviceRequest", "DiagnosticReport", "Flag", "GuidanceResponse",
  "ImagingStudy", "Immunization", "List", "Media", "MedicationRequest",
  "NutritionOrder", "Observation", "Procedure", "QuestionnaireResponse",
  "RequestGroup", "RiskAssessment", "ServiceRequest", "Task", "VisionPrescription"
];
export function isResourceMissingEncounter(resource: R4ResourceWithRequiredType): boolean {
  const encounterRequiredResourceTypes: Set<ResourceType> = new Set(encounterRequiredResourceList);
  const requiresEncounter = encounterRequiredResourceTypes.has(resource.resourceType);
  const isEncounterAbsentFromResource = !('encounter' in resource);
  return requiresEncounter && isEncounterAbsentFromResource
}

const contextRequiredResourceList: ResourceType[] = [
  "ChargeItem", "DocumentReference", "MedicationAdministration",
  "MedicationDispense", "MedicationStatement"
];
export function isResourceMissingContext(resource: R4ResourceWithRequiredType): boolean {
  const contextRequiredResourceTypes: Set<ResourceType> = new Set(contextRequiredResourceList);
  const requiresContext = contextRequiredResourceTypes.has(resource.resourceType);
  const isContextAbsentFromResource = !('context' in resource);
  return requiresContext && isContextAbsentFromResource
}
