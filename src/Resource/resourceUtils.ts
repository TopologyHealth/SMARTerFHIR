import { R4ResourceWithRequiredType } from "../types";

/**
 * The function `resourceMayContainSubject` checks if a resource may contain a subject.
 * @param {R4.Resource} resource - The `resource` parameter is of type `R4.Resource`, which is a FHIR resource object.
 * @returns a boolean value indicating whether the resource may contain a subject.
 */
export function resourceMayContainSubject(resource: R4ResourceWithRequiredType): boolean {
  return resource.resourceType === "DocumentReference";
}

/**
 * The function `resourceMayContainEncounter` checks if a resource may contain an encounter.
 * @param {R4.Resource} resource - The `resource` parameter is of type `R4.Resource`, which is a FHIR resource object.
 * @returns a boolean value indicating whether the resource may contain an encounter.
 */
export function resourceMayContainEncounter(resource: R4ResourceWithRequiredType): boolean {
  return resource.resourceType === "DocumentReference";
}