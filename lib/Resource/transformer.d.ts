import { FhirClientResourceWithRequiredType, R4ResourceWithRequiredType } from "../types";
import * as R4 from "fhir/r4";
/**
Represents the Transformer namespace for resource transformation.
@namespace Transformer
*/
export declare namespace Transformer {
    /**
     * Converts a resource to the FHIR client type.
     * @param {T} originalResource - The original resource to convert.
     * @returns {FhirClientResourceWithRequiredType} - The converted resource in the FHIR client type.
     * @template T - The original resource type.
     */
    function toFhirClientType<T extends R4ResourceWithRequiredType>(originalResource: T): FhirClientResourceWithRequiredType;
    /**
     * Converts a resource to the R4 FHIR type.
     * @param {T} originalResource - The original resource to convert.
     * @returns {R4ResourceWithRequiredType} - The converted resource in the R4 FHIR type.
     * @template T - The original resource type.
     */
    function toR4FhirType<T extends FhirClientResourceWithRequiredType>(originalResource: T): R4.Resource;
}
