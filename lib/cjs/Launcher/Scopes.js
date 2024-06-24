"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.FhirScopePermissions = exports.Actor = exports.Action = void 0;
var Action;
(function (Action) {
    Action["READ"] = "read";
    Action["WRITE"] = "write";
})(Action || (exports.Action = Action = {}));
var Actor;
(function (Actor) {
    Actor["USER"] = "user";
    Actor["PATIENT"] = "patient";
})(Actor || (exports.Actor = Actor = {}));
var FhirScopePermissions = /** @class */ (function () {
    function FhirScopePermissions(actor, action, resourceTypes) {
        this.actor = actor,
            this.action = action,
            this.resourceTypes = resourceTypes;
    }
    FhirScopePermissions.prototype.toString = function () {
        var _this = this;
        return this.resourceTypes.map(function (resourceType) { return "".concat(_this.actor, "/").concat(resourceType, ".").concat(_this.action); }).join(", ");
    };
    FhirScopePermissions.get = function (actor, action, resourceTypes) {
        return (new FhirScopePermissions(actor, action, resourceTypes)).toString();
    };
    return FhirScopePermissions;
}());
exports.FhirScopePermissions = FhirScopePermissions;
//# sourceMappingURL=Scopes.js.map