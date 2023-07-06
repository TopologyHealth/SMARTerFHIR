import {
  FhirClientResourceWithRequiredType,
  R4ResourceWithRequiredType,
} from "../types";

import * as R4 from "fhir/r4";

/**
Represents the Transformer namespace for resource transformation.
@namespace Transformer
*/
export namespace Transformer {
  /**
   * Converts a resource to the FHIR client type.
   * @param {T} originalResource - The original resource to convert.
   * @returns {FhirClientResourceWithRequiredType} - The converted resource in the FHIR client type.
   * @template T - The original resource type.
   */
  export function toFhirClientType<T extends R4ResourceWithRequiredType>(
    originalResource: T
  ): FhirClientResourceWithRequiredType {
    type originalKey = keyof T;
    const originalResourceKeys = Object.keys(originalResource) as originalKey[];
    const transformedResource: FhirClientResourceWithRequiredType = {
      ...originalResourceKeys.reduce(
        convertKeysToFhirClientResource<T>(originalResource),
        {}
      ),
      resourceType: originalResource["resourceType"],
    };
    return transformedResource;
  }

  /**
   * Converts the keys of a resource to the FHIR client resource type.
   * @private
   * @param {T} originalResource - The original resource.
   * @returns {(previousValue: {}, currentValue: keyof T, currentIndex: number, array: (keyof T)[]) => {}} - A reducer function to convert keys to the FHIR client resource type.
   * @template T - The original resource type.
   */
  function convertKeysToFhirClientResource<
    T extends R4ResourceWithRequiredType
  >(
    originalResource: T
  ): (
    previousValue: {},
    currentValue: keyof T,
    currentIndex: number,
    array: (keyof T)[]
  ) => {} {
    return (a, v) => ({
      ...a,
      [v]: originalResource[v],
    });
  }

  /**
   * Converts a resource to the R4 FHIR type.
   * @param {T} originalResource - The original resource to convert.
   * @returns {R4ResourceWithRequiredType} - The converted resource in the R4 FHIR type.
   * @template T - The original resource type.
   */
  export function toR4FhirType<T extends FhirClientResourceWithRequiredType>(
    originalResource: T
  ): R4.Resource {
    type originalKey = keyof T;
    const originalResourceKeys = Object.keys(originalResource) as originalKey[];
    const transformedResource: R4ResourceWithRequiredType = {
      ...originalResourceKeys.reduce(
        (a, v) => ({
          ...a,
          [v]: originalResource[v],
        }),
        {}
      ),
      resourceType: originalResource["resourceType"],
    };
    return transformedResource;
  }
}
