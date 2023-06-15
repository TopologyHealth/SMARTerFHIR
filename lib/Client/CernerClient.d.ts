import * as R4 from "fhir/r4";
import SubClient from "../FhirClient";
import { R4ResourceWithRequiredType } from "../types";
import BaseClient from "./BaseClient";
export default class CernerClient extends BaseClient {
    constructor(fhirClientDefault: SubClient);
    create<T extends R4ResourceWithRequiredType>(resource: T): Promise<R4.Resource>;
}
