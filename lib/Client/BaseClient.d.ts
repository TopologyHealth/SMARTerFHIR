import * as R4 from "fhir/r4";
import { FhirClientResourceWithRequiredType, R4ResourceWithRequiredType } from "../types";
import SubClient from "../FhirClient";
/**
Represents the BaseClient abstract class.
*/
export default abstract class BaseClient {
    readonly fhirClientDefault: SubClient;
    /**
     * Creates an instance of BaseClient.
     * @param {SubClient} fhirClientDefault - The default FHIR client to use.
     */
    constructor(fhirClientDefault: SubClient);
    /**
     * Gets the ID from an object with ID.
     * @private
     * @param {T} objectWithId - The object with ID.
     * @returns {Promise<string>} - A promise resolving to the ID.
     * @throws {Error} - Throws an error if the ID is not found.
     */
    private getIDfromObject;
    /**
     * Creates a patient subject.
     * @private
     * @returns {Promise<Subject>} - A promise resolving to the patient subject.
     */
    private createPatientSubject;
    /**
     * Creates an encounter context.
     * @private
     * @returns {Promise<Context>} - A promise resolving to the encounter context.
     */
    private createEncounterContext;
    /**
     * Hydrates a resource with subject and encounter context.
     * @param {T} resource - The resource to hydrate.
     * @returns {Promise<T>} - A promise resolving to the hydrated resource.
     */
    hydrateResource<T extends FhirClientResourceWithRequiredType>(resource: T): Promise<T & {
        context?: import("../types").Encounter | undefined;
        subject?: R4.Reference | undefined;
    }>;
    /**
     * Abstract method for creating a resource.
     * @abstract
     * @param {T} resource - The resource to create.
     * @returns {Promise<R4.Resource>} - A promise resolving to the created resource.
     */
    abstract create<T extends R4ResourceWithRequiredType>(resource: T): Promise<R4.Resource>;
}
