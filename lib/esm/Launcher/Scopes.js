export var Action;
(function (Action) {
    Action["READ"] = "read";
    Action["WRITE"] = "write";
})(Action || (Action = {}));
export var Actor;
(function (Actor) {
    Actor["USER"] = "user";
    Actor["PATIENT"] = "patient";
})(Actor || (Actor = {}));
export class FhirScopePermissions {
    constructor(actor, action, resourceTypes) {
        this.actor = actor,
            this.action = action,
            this.resourceTypes = resourceTypes;
    }
    toString() {
        return this.resourceTypes.map(resourceType => `${this.actor}/${resourceType}.${this.action}`).join(", ");
    }
    static get(actor, action, resourceTypes) {
        return (new FhirScopePermissions(actor, action, resourceTypes)).toString();
    }
}
//# sourceMappingURL=Scopes.js.map