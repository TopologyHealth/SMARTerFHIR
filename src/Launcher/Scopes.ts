
import { FhirResource } from "fhir/r4";

export enum Action {
  READ = "read",
  WRITE = "write"
}

export enum Actor {
  USER = "user",
  PATIENT = "patient"
}
type ResourceType = FhirResource['resourceType'];

export class FhirScopePermissions {
  actor: Actor
  action: Action
  resourceTypes: ResourceType[]

  constructor(actor: Actor, action: Action, resourceTypes: ResourceType[]) {
    this.actor = actor,
      this.action = action,
      this.resourceTypes = resourceTypes
  }

  toString() {
    return this.resourceTypes.map(resourceType => `${this.actor}/${resourceType}.${this.action}`).join(" ")
  }

  static get(actor: Actor, action: Action, resourceTypes: ResourceType[]) {
    return (new FhirScopePermissions(actor, action, resourceTypes)).toString()
  }
}