import { FhirClientResourceWithRequiredType, R4ResourceWithRequiredType } from "../types";
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
     * @param {FROM_TYPE} originalResource - The original resource to convert.
     * @returns {R4ResourceWithRequiredType} - The converted resource in the R4 FHIR type.
     * @template FROM_TYPE - The original resource type.
     */
    function toR4FhirType<FROM_TYPE extends FhirClientResourceWithRequiredType, TO_TYPE extends R4ResourceWithRequiredType>(originalResource: FROM_TYPE): TO_TYPE;
}
