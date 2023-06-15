import * as R4 from "fhir/r4";
import { FhirClientTypes } from "./FhirClient";
export type PartiallyRequired<T, K extends keyof T> = Omit<Partial<T>, K> & Required<Pick<Partial<T>, K>>;
export type R4ResourceWithRequiredType = PartiallyRequired<R4.Resource, "resourceType">;
export type FhirClientResourceWithRequiredType = PartiallyRequired<FhirClientTypes.FHIR.Resource, "resourceType">;
