import SubClient from "../FhirClient";
import { R4ResourceWithRequiredType } from "../types";
import BaseClient from "./BaseClient";

/**
Represents the EpicClient class, extending the BaseClient.
*/
export default class EpicClient extends BaseClient {
/* The `epicCreateHeaders` property is defining the headers that will be used when making a create request to the Epic FHIR server. In this case, it sets the
`Prefer` header to `"return=representation"`, which indicates that the server should return the created resource in the response. */
  readonly epicCreateHeaders: HeadersInit = {
    Prefer: "return=representation",
  };
  /**
   * Creates an instance of EpicClient.
   * @param {SubClient} fhirClientDefault - The default FHIR client to use.
   */
  constructor(fhirClientDefault: SubClient) {
    super(fhirClientDefault);
  }

  async create<T extends R4ResourceWithRequiredType>(resource: T): Promise<T> {
    return super.create(resource, this.createHeaders(this.epicCreateHeaders));
  }
}
