import { FhirResource } from "fhir/r4";
export declare enum Action {
    READ = "read",
    WRITE = "write"
}
export declare enum Actor {
    USER = "user",
    PATIENT = "patient"
}
type ResourceType = FhirResource['resourceType'];
export declare class FhirScopePermissions {
    actor: Actor;
    action: Action;
    resourceTypes: ResourceType[];
    constructor(actor: Actor, action: Action, resourceTypes: ResourceType[]);
    toString(): string;
    static get(actor: Actor, action: Action, resourceTypes: ResourceType[]): string;
}
export {};
