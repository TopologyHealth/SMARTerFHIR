/**
Represents the Transformer namespace for resource transformation.
@namespace Transformer
*/
export var Transformer;
(function (Transformer) {
    /**
     * Converts a resource to the FHIR client type.
     * @param {T} originalResource - The original resource to convert.
     * @returns {FhirClientResourceWithRequiredType} - The converted resource in the FHIR client type.
     * @template T - The original resource type.
     */
    function toFhirClientType(originalResource) {
        const originalResourceKeys = Object.keys(originalResource);
        const transformedResource = Object.assign(Object.assign({}, originalResourceKeys.reduce(convertKeysToFhirClientResource(originalResource), {})), { resourceType: originalResource["resourceType"] });
        return transformedResource;
    }
    Transformer.toFhirClientType = toFhirClientType;
    /**
     * Converts the keys of a resource to the FHIR client resource type.
     * @private
     * @param {T} originalResource - The original resource.
     * @returns {(previousValue: {}, currentValue: keyof T, currentIndex: number, array: (keyof T)[]) => {}} - A reducer function to convert keys to the FHIR client resource type.
     * @template T - The original resource type.
     */
    function convertKeysToFhirClientResource(originalResource) {
        return (a, v) => (Object.assign(Object.assign({}, a), { [v]: originalResource[v] }));
    }
    /**
     * The function `toR4FhirType` converts a resource object from one type to another in a FHIR R4 format.
     * @param {FROM_TYPE} originalResource - The originalResource parameter is of type FROM_TYPE, which is a FhirClientResourceWithRequiredType.
     * @returns a transformed resource of type TO_TYPE.
     */
    function toR4FhirType(originalResource) {
        const originalResourceKeys = Object.keys(originalResource);
        const transformedResource = Object.assign(Object.assign({}, originalResourceKeys.reduce((a, v) => (Object.assign(Object.assign({}, a), { [v]: originalResource[v] })), {})), { resourceType: originalResource["resourceType"] });
        return transformedResource;
    }
    Transformer.toR4FhirType = toR4FhirType;
})(Transformer || (Transformer = {}));
//# sourceMappingURL=transformer.js.map