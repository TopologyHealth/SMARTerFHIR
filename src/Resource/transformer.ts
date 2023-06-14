import { FhirClientResourceWithRequiredType, R4ResourceWithRequiredType} from "../types";

export namespace Transformer {
    export function toFhirClientType<T extends R4ResourceWithRequiredType>(originalResource: T): FhirClientResourceWithRequiredType {
        type originalKey = keyof T
        const originalResourceKeys = Object.keys(originalResource) as originalKey[]
        const transformedResource: FhirClientResourceWithRequiredType = {
            ...originalResourceKeys.reduce(convertKeysToFhirClientResource<T>(originalResource), {})
            , resourceType: originalResource['resourceType']
        }
        return transformedResource
    }


    function convertKeysToFhirClientResource<T extends R4ResourceWithRequiredType>(originalResource: T): (previousValue: {}, currentValue: keyof T, currentIndex: number, array: (keyof T)[]) => {} {
        return (a, v) => (
            {
                ...a, [v]: originalResource[v]
            }
        );
    }

    export function toR4FhirType<T extends FhirClientResourceWithRequiredType>(originalResource: T): R4ResourceWithRequiredType {
        type originalKey = keyof T
        const originalResourceKeys = Object.keys(originalResource) as originalKey[]
        const transformedResource: R4ResourceWithRequiredType = {
            ...originalResourceKeys.reduce((a, v) => (
                {
                    ...a, [v]: originalResource[v]
                }
            ), {})
            , resourceType: originalResource['resourceType']
        }
        return transformedResource
    }
}