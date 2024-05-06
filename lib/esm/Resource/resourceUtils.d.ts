import { R4ResourceWithRequiredType } from "../types";
export declare function isResourceMissingSubject(resource: R4ResourceWithRequiredType): boolean;
/**
 * The function `resourceMayContainEncounter` checks if a resource may contain an encounter.
 * @param {R4.Resource} resource - The `resource` parameter is of type `R4.Resource`, which is a FHIR resource object.
 * @returns a boolean value indicating whether the resource may contain an encounter.
 */
export declare function resourceMayContainEncounter(resource: R4ResourceWithRequiredType): boolean;
