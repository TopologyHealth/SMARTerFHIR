import * as R4 from "fhir/r4";
import SubClient from "../FhirClient";
import { Context, FhirClientResourceWithRequiredType, ObjectWithID, R4ResourceWithRequiredType, Subject } from "../types";
export default abstract class BaseClient {
    readonly fhirClientDefault: SubClient
    readonly patientID: string
    readonly encounterID: string

    constructor(fhirClientDefault: SubClient) {
        this.fhirClientDefault = fhirClientDefault
        this.patientID = this.getIDfromObject(this.fhirClientDefault.patient);
        this.encounterID = this.getIDfromObject(this.fhirClientDefault.encounter)
    }

    private getIDfromObject<T extends ObjectWithID>(objectWithId: T) {
        const id = objectWithId.id;
        if (!id) throw new Error(`Patient id not found`);
        return id;
    }

    private createPatientSubject(): Subject {
        return {
            "subject": {
                "reference": `Patient/${this.patientID}`
            }
        } 
    }

    private createEncounterContext(): Context {
        return {
            "context": {
                "encounter": [{
                    "reference": `Encounter/${this.encounterID}`
                }]
            }
        }
    }

    hydrateResource<T extends FhirClientResourceWithRequiredType>(resource: T) {
        return {
            ...resource,
            ...(('subject' in resource) ? {} : this.createPatientSubject()),
            ...(('encounter' in resource) ? {} : this.createEncounterContext())

        }
    }
    abstract create<T extends R4ResourceWithRequiredType>(resource: T): Promise<R4.Resource>

}