
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
type WildCard = '*'

export class FhirScopePermissions {
  actor: Actor
  action: Action
  resourceTypes: ResourceType[] | WildCard

  constructor(actor: Actor, action: Action, resourceTypes: ResourceType[] | WildCard) {
    this.actor = actor,
      this.action = action,
      this.resourceTypes = resourceTypes
  }

  toString() {
    const toScopeString = (resourceScope: string) => `${this.actor}/${resourceScope}.${this.action}`
    if (typeof this.resourceTypes === 'string')
        return toScopeString(this.resourceTypes)
    return this.resourceTypes.map(toScopeString).join(" ")
  }

  static get(actor: Actor, action: Action, resourceTypes: ResourceType[] | WildCard) {
    return (new FhirScopePermissions(actor, action, resourceTypes)).toString()
  }
}