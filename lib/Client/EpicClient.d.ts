import * as R4 from "fhir/r4";
import SubClient from "../FhirClient";
import { R4ResourceWithRequiredType } from "../types";
import BaseClient from "./BaseClient";
/**
Represents the EpicClient class, extending the BaseClient.
*/
export default class EpicClient extends BaseClient {
    /**
     * Creates an instance of EpicClient.
     * @param {SubClient} fhirClientDefault - The default FHIR client to use.
     */
    constructor(fhirClientDefault: SubClient);
    /**
     * Fetch options for create operation headers.
     * @private
     * @readonly
     * @type {FhirClientTypes.FetchOptions}
     */
    private readonly createHeaders;
    /**
     * Creates a resource.
     * @override
     * @param {T} resource - The resource to create.
     * @returns {Promise<R4.Resource>} - A promise resolving to the created resource.
     * @throws {Error} - Throws an error if the resource type is not found or if the operation fails.
     */
    create<T extends R4ResourceWithRequiredType>(resource: T): Promise<R4.Resource>;
}
