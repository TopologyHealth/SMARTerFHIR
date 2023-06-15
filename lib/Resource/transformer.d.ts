import { FhirClientResourceWithRequiredType, R4ResourceWithRequiredType } from "../types";
export declare namespace Transformer {
    function toFhirClientType<T extends R4ResourceWithRequiredType>(originalResource: T): FhirClientResourceWithRequiredType;
    function toR4FhirType<T extends FhirClientResourceWithRequiredType>(originalResource: T): R4ResourceWithRequiredType;
}
