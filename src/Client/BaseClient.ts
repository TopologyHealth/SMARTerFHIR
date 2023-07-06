import * as R4 from "fhir/r4";
import {
  Context,
  FhirClientResourceWithRequiredType,
  ObjectWithID,
  R4ResourceWithRequiredType,
  Subject,
} from "../types";
import SubClient from "../FhirClient";

/**
Represents the BaseClient abstract class.
*/
export default abstract class BaseClient {
  readonly fhirClientDefault;

  /**
   * Creates an instance of BaseClient.
   * @param {SubClient} fhirClientDefault - The default FHIR client to use.
   */
  constructor(fhirClientDefault: SubClient) {
    this.fhirClientDefault = fhirClientDefault;
  }

  /**
   * Gets the ID from an object with ID.
   * @private
   * @param {T} objectWithId - The object with ID.
   * @returns {Promise<string>} - A promise resolving to the ID.
   * @throws {Error} - Throws an error if the ID is not found.
   */
  private async getIDfromObject<T extends ObjectWithID>(objectWithId: T) {
    const id = await objectWithId.id;
    if (!id) throw new Error(`Patient id not found`);
    return id;
  }

  /**
   * Creates a patient subject.
   * @private
   * @returns {Promise<Subject>} - A promise resolving to the patient subject.
   */
  private async createPatientSubject(): Promise<Subject> {
    const patientID = await this.getIDfromObject(
      this.fhirClientDefault.patient
    );
    return {
      subject: {
        reference: `Patient/${patientID}`,
      },
    };
  }

  /**
   * Creates an encounter context.
   * @private
   * @returns {Promise<Context>} - A promise resolving to the encounter context.
   */
  private async createEncounterContext(): Promise<Context> {
    const encounterID = await this.getIDfromObject(
      this.fhirClientDefault.encounter
    );
    return {
      context: {
        encounter: [
          {
            reference: `Encounter/${encounterID}`,
          },
        ],
      },
    };
  }

  /**
   * Hydrates a resource with subject and encounter context.
   * @param {T} resource - The resource to hydrate.
   * @returns {Promise<T>} - A promise resolving to the hydrated resource.
   */
  async hydrateResource<T extends FhirClientResourceWithRequiredType>(
    resource: T
  ) {
    return {
      ...resource,
      ...("subject" in resource ? {} : await this.createPatientSubject()),
      ...("encounter" in resource ? {} : await this.createEncounterContext()),
    };
  }

  /**
   * Abstract method for creating a resource.
   * @abstract
   * @param {T} resource - The resource to create.
   * @returns {Promise<R4.Resource>} - A promise resolving to the created resource.
   */
  abstract create<T extends R4ResourceWithRequiredType>(
    resource: T
  ): Promise<T>;
}