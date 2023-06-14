import * as R4 from "fhir/r4";
import SubClient from "../FhirClient";
import { R4ResourceWithRequiredType } from "../types";

export default abstract class BaseClient {
    readonly fhirClientDefault: SubClient

    constructor(fhirClientDefault: SubClient) {
        this.fhirClientDefault = fhirClientDefault
    }

    abstract create<T extends R4ResourceWithRequiredType>(resource: T): Promise<R4.Resource>

}