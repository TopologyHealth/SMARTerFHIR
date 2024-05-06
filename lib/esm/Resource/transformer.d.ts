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
     * The function `toR4FhirType` converts a resource object from one type to another in a FHIR R4 format.
     * @param {FROM_TYPE} originalResource - The originalResource parameter is of type FROM_TYPE, which is a FhirClientResourceWithRequiredType.
     * @returns a transformed resource of type TO_TYPE.
     */
    function toR4FhirType<FROM_TYPE extends FhirClientResourceWithRequiredType, TO_TYPE extends R4ResourceWithRequiredType>(originalResource: FROM_TYPE): TO_TYPE;
}
