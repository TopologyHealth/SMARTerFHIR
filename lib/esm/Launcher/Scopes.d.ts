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
type WildCard = '*';
export declare class FhirScopePermissions {
    actor: Actor;
    action: Action;
    resourceTypes: ResourceType[] | WildCard;
    constructor(actor: Actor, action: Action, resourceTypes: ResourceType[] | WildCard);
    toString(): string;
    static get(actor: Actor, action: Action, resourceTypes: ResourceType[] | WildCard): string;
}
export {};
