import * as R4 from "fhir/r4";
import SubClient from "../FhirClient";
import { FhirClientResourceWithRequiredType, R4ResourceWithRequiredType } from "../types";
export default abstract class BaseClient {
    readonly fhirClientDefault: SubClient;
    constructor(fhirClientDefault: SubClient);
    private getIDfromObject;
    private createPatientSubject;
    private createEncounterContext;
    hydrateResource<T extends FhirClientResourceWithRequiredType>(resource: T): Promise<T & {
        context?: import("../types").Encounter | undefined;
        subject?: R4.Reference | undefined;
    }>;
    abstract create<T extends R4ResourceWithRequiredType>(resource: T): Promise<R4.Resource>;
}
