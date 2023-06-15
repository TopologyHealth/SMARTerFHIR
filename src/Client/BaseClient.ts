import * as R4 from "fhir/r4";
import SubClient from "../FhirClient";
import { Context, FhirClientResourceWithRequiredType, ObjectWithID, R4ResourceWithRequiredType, Subject } from "../types";
export default abstract class BaseClient {
    readonly fhirClientDefault: SubClient

    constructor(fhirClientDefault: SubClient) {
        this.fhirClientDefault = fhirClientDefault
    }

    private async getIDfromObject<T extends ObjectWithID>(objectWithId: T) {
        const id = await objectWithId.id;
        if (!id) throw new Error(`Patient id not found`);
        return id;
    }

    private async createPatientSubject(): Promise<Subject> {

        const patientID = await this.getIDfromObject(this.fhirClientDefault.patient);
        return {
            "subject": {
                "reference": `Patient/${patientID}`
            }
        } 
    }

    private async createEncounterContext(): Promise<Context> {
        const encounterID = await this.getIDfromObject(this.fhirClientDefault.encounter);
        return {
            "context": {
                "encounter": [{
                    "reference": `Encounter/${encounterID}`
                }]
            }
        }
    }

    async hydrateResource<T extends FhirClientResourceWithRequiredType>(resource: T) {
        return {
            ...resource,
            ...(('subject' in resource) ? {} : await this.createPatientSubject()),
            ...(('encounter' in resource) ? {} : await this.createEncounterContext())

        }
    }
    abstract create<T extends R4ResourceWithRequiredType>(resource: T): Promise<R4.Resource>

}