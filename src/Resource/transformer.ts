import {
  FhirClientResourceWithRequiredType,
  R4ResourceWithRequiredType
} from "../types";

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
 * The function `toR4FhirType` converts a resource object from one type to another in a FHIR R4 format.
 * @param {FROM_TYPE} originalResource - The originalResource parameter is of type FROM_TYPE, which is a FhirClientResourceWithRequiredType.
 * @returns a transformed resource of type TO_TYPE.
 */
  export function toR4FhirType<FROM_TYPE extends FhirClientResourceWithRequiredType, TO_TYPE extends R4ResourceWithRequiredType>(
    originalResource: FROM_TYPE
  ): TO_TYPE {
    type originalKey = keyof FROM_TYPE;
    const originalResourceKeys = Object.keys(originalResource) as originalKey[];
    const transformedResource: any = {
      ...originalResourceKeys.reduce(
        (a, v) => ({
          ...a,
          [v]: originalResource[v],
        }),
        {}
      ),
      resourceType: originalResource["resourceType"],
    };
    return transformedResource as TO_TYPE;
  }
}
