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
export var Transformer;
(function (Transformer) {
    function toFhirClientType(originalResource) {
        var originalResourceKeys = Object.keys(originalResource);
        var transformedResource = __assign(__assign({}, originalResourceKeys.reduce(convertKeysToFhirClientResource(originalResource), {})), { resourceType: originalResource['resourceType'] });
        return transformedResource;
    }
    Transformer.toFhirClientType = toFhirClientType;
    function convertKeysToFhirClientResource(originalResource) {
        return function (a, v) {
            var _a;
            return (__assign(__assign({}, a), (_a = {}, _a[v] = originalResource[v], _a)));
        };
    }
    function toR4FhirType(originalResource) {
        var originalResourceKeys = Object.keys(originalResource);
        var transformedResource = __assign(__assign({}, originalResourceKeys.reduce(function (a, v) {
            var _a;
            return (__assign(__assign({}, a), (_a = {}, _a[v] = originalResource[v], _a)));
        }, {})), { resourceType: originalResource['resourceType'] });
        return transformedResource;
    }
    Transformer.toR4FhirType = toR4FhirType;
})(Transformer || (Transformer = {}));
