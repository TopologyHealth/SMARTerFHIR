import * as R4 from "fhir/r4";
import SubClient, { FhirClientTypes } from "./FhirClient";
/**
Represents the PartiallyRequired type, which makes specified properties required and the rest optional.
@typedef {Omit<Partial<T>, K> & Required<Pick<Partial<T>, K>>} PartiallyRequired<T, K>
@template T - The original type.
@template K - The keys to make required.
*/
export type PartiallyRequired<T, K extends keyof T> = Omit<Partial<T>, K> & Required<Pick<Partial<T>, K>>;
/**
 * Represents the R4ResourceWithRequiredType type, which is a resource with required resource type.
 * @typedef {PartiallyRequired<R4.Resource, "resourceType">} R4ResourceWithRequiredType
 */
export type R4ResourceWithRequiredType = PartiallyRequired<R4.FhirResource, "resourceType">;
/**
 * Represents the FhirClientResourceWithRequiredType type, which is a FHIR client resource with required resource type.
 * @typedef {PartiallyRequired<FhirClientTypes.FHIR.Resource, "resourceType">} FhirClientResourceWithRequiredType
 */
export type FhirClientResourceWithRequiredType = PartiallyRequired<FhirClientTypes.FHIR.Resource, "resourceType">;
/**
 * Represents the ObjectWithID type, which can be either a patient or an encounter from the FHIR client.
 */
export type ObjectWithID = SubClient["patient" | "encounter" | "user"];
/**
 * The above type defines a generic subject with a reference to a resource.
 * @property subject - The `subject` property is of type `R4.Reference`.
 */
export type GenericSubject = {
    subject: R4.Reference;
};
/**
 * The GenericEncounter type is an object that contains an array of R4.Reference objects named "encounter".
 * @property {R4.Reference[]} encounter - The `encounter` property is an array of `R4.Reference` objects.
 */
export type GenericEncounter = {
    encounter: R4.Reference[];
};
export type GenericContext = R4.DocumentReference["context"];
/**
 * The above type defines an object with a property called "author" which is an array of R4.Reference objects.
 * @property {R4.Reference[]} author - An array of references to authors. Each reference is of type R4.Reference.
 */
export type Author = {
    author: R4.Reference[];
};
/**
 * Represents the result of a user read operation for a SubClient.
 * This type is a conditional type that extracts the response type from the function return type.
 * If the function returns a Promise, it resolves to the inferred type 'T'.
 * If the 'includeResponse' property is present in the request options, it returns the inferred type 'T'.
 * Otherwise, it returns the inferred type 'R'.
 *
 * @template O - Type of the request options.
 * @template R - Type of the original Promise return type.
 * @template T - Inferred type from the Promise.
 */
export type UserReadResult = SubClient["user"]["read"] extends (requestOptions?: infer O) => Promise<infer R> ? O extends {
    includeResponse: true;
} ? R extends Promise<infer T> ? T : never : R : never;
