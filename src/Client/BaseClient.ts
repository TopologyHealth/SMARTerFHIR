import * as R4 from "fhir/r4";
import SubClient, { FhirClientTypes } from "../FhirClient";
import { Transformer } from "../Resource/transformer";
import {
  Author,
  FhirClientResourceWithRequiredType,
  GenericContext,
  GenericSubject,
  ObjectWithID,
  R4ResourceWithRequiredType,
} from "../types";

/**
Represents the BaseClient abstract class.
*/
export default abstract class BaseClient {
  readonly fhirClientDefault;
  readonly defaultCreateHeaders: HeadersInit = {};
  /**
   * Fetch options for create operation headers.
   * @private
   * @readonly
   * @type {FhirClientTypes.FetchOptions}
   */
  protected createHeaders(additionalCreateHeaders: HeadersInit): FhirClientTypes.FetchOptions {
    return {
      headers: {
        ...this.defaultCreateHeaders,
        ...additionalCreateHeaders,
      },
    };
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
   * @returns {Promise<GenericSubject>} - A promise resolving to the patient subject.
   */
  private async createPatientSubject(): Promise<GenericSubject> {
    const patientID = await this.getIDfromObject(
      this.fhirClientDefault.patient
    );
    return {
      subject: {
        reference: `Patient/${patientID}`,
      },
    };
  }

  private async createEncounterReference() {
    const encounterID = await this.getIDfromObject(
      this.fhirClientDefault.encounter
    );
    return {
      reference: `Encounter/${encounterID}`,
    };
  }

  private async createEncounterReferenceArray() {
    return [await this.createEncounterReference()];
  }

  private createPeriod(start: string): R4.Period {
    return {
      start: start,
      end: start,
    };
  }

  /**
   * Creates an encounter context.
   * @private
   * @returns {Promise<GenericContext>} - A promise resolving to the encounter context.
   */
  private async createContext(): Promise<{ context: GenericContext }> {
    const encounter = await this.createEncounterReferenceArray();
    const currentDateString = new Date().toISOString();
    const period: R4.Period = this.createPeriod(currentDateString);
    return {
      context: {
        encounter: encounter,
        period: period,
      },
    };
  }

  async createReferenceArrayAuthor(): Promise<Author> {
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
      ...("encounter" in resource ? {} : await this.createContext()),
    };
  }

  /**
   * Creates a resource.
   * @override
   * @param {T} resource - The resource to create.
   * @returns {Promise<R4.Resource>} - A promise resolving to the created resource.
   * @throws {Error} - Throws an error if the resource type is not found or if the operation fails.
   */
  async create<T extends R4ResourceWithRequiredType>(resource: T, additionalHeaders?: FhirClientTypes.FetchOptions): Promise<T> {
    const transformedResource = Transformer.toFhirClientType(resource);
    const hydratedResource = await this.hydrateResource(transformedResource);
    const resultResource: FhirClientResourceWithRequiredType =
      await this.fhirClientDefault
        .create(hydratedResource, {
          ...(additionalHeaders ? additionalHeaders : {})
        })
        .then((resource) => {
          if (!resource.resourceType){
            console.log(resource)
            throw new Error(`Resource ${resource}, must have a resource type.`);
          }
          return resource as FhirClientResourceWithRequiredType;
        })
        .catch((reason) => {
          throw new Error("It failed with:" + reason);
        });
    const resultAsR4 = Transformer.toR4FhirType(resultResource);
    return resultAsR4 as T;
  }

  async requestResource(resourceID: string, requestOptions?: RequestInit) {
    const resultResource = await this.fhirClientDefault.request({
      url: resourceID,
      ...(requestOptions ? { headers: requestOptions.headers } : {}),
    });
    return resultResource as R4.Resource;
  }
}
