import SubClient from "../FhirClient";
import { R4ResourceWithRequiredType } from "../types";
import BaseClient from "./BaseClient";
import * as R4 from "fhir/r4";
export default class EpicClient extends BaseClient {
    constructor(fhirClientDefault: SubClient);
    private readonly createHeaders;
    create<T extends R4ResourceWithRequiredType>(resource: T): Promise<R4.Resource>;
}
