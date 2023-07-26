var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
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
        var originalResourceKeys = Object.keys(originalResource);
        var transformedResource = __assign(__assign({}, originalResourceKeys.reduce(convertKeysToFhirClientResource(originalResource), {})), { resourceType: originalResource["resourceType"] });
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
        return function (a, v) {
            var _a;
            return (__assign(__assign({}, a), (_a = {}, _a[v] = originalResource[v], _a)));
        };
    }
    /**
     * Converts a resource to the R4 FHIR type.
     * @param {FROM_TYPE} originalResource - The original resource to convert.
     * @returns {R4ResourceWithRequiredType} - The converted resource in the R4 FHIR type.
     * @template FROM_TYPE - The original resource type.
     */
    function toR4FhirType(originalResource) {
        var originalResourceKeys = Object.keys(originalResource);
        var transformedResource = __assign(__assign({}, originalResourceKeys.reduce(function (a, v) {
            var _a;
            return (__assign(__assign({}, a), (_a = {}, _a[v] = originalResource[v], _a)));
        }, {})), { resourceType: originalResource["resourceType"] });
        return transformedResource;
    }
    Transformer.toR4FhirType = toR4FhirType;
})(Transformer || (Transformer = {}));
