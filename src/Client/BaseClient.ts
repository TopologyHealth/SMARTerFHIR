import * as R4 from "fhir/r4";
import {
  Author,
  Context,
  FhirClientResourceWithRequiredType,
  ObjectWithID,
  R4ResourceWithRequiredType,
  Subject,
} from "../types";
import SubClient, { FhirClientTypes } from "../FhirClient";
import { Transformer } from "../Resource/transformer";
import { Reference } from "fhir/r4";

/**
Represents the BaseClient abstract class.
*/
export default abstract class BaseClient {
  readonly fhirClientDefault;
  /**
   * Fetch options for create operation headers.
   * @private
   * @readonly
   * @type {FhirClientTypes.FetchOptions}
   */
  private readonly createHeaders: FhirClientTypes.FetchOptions = {
    headers: {
      Prefer: "return=representation",
    },
  };

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
    if (!id) throw new Error(`id not found`);
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

  private async createReferenceArrayAuthor(): Promise<Author> {
    const userID = await this.getIDfromObject(this.fhirClientDefault.user);
    return {
      author: [
        {
          reference: `Practitioner/${userID}`,
        },
      ],
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
      ...("author" in resource ? {} : await this.createReferenceArrayAuthor()),
    };
  }

  /**
   * Creates a resource.
   * @override
   * @param {T} resource - The resource to create.
   * @returns {Promise<R4.Resource>} - A promise resolving to the created resource.
   * @throws {Error} - Throws an error if the resource type is not found or if the operation fails.
   */
  async create<T extends R4ResourceWithRequiredType>(resource: T): Promise<T> {
    const transformedResource = Transformer.toFhirClientType(resource);
    const hydratedResource = await this.hydrateResource(transformedResource);
    const resultResource: FhirClientResourceWithRequiredType =
      await this.fhirClientDefault
        .create(hydratedResource, this.createHeaders)
        .then((resource) => {
          if (!resource.resourceType)
            throw new Error(`Resource ${resource}, must have a resource type.`);
          return resource as FhirClientResourceWithRequiredType;
        })
        .catch((reason) => {
          throw new Error("It failed with:" + reason);
        });
    const resultAsR4 = Transformer.toR4FhirType(resultResource);
    return resultAsR4 as T;
  }

  abstract requestResource(resourceID: string): Promise<R4.Resource>;
}
