import SubClient, { FhirClientTypes } from "../FhirClient";
import { Transformer } from "../Resource/transformer";
import { FhirClientResourceWithRequiredType, R4ResourceWithRequiredType } from "../types";
import BaseClient from "./BaseClient";
import * as R4 from "fhir/r4";

export default class EpicClient extends BaseClient {
    constructor(fhirClientDefault: SubClient) {
        super(fhirClientDefault);
    }

    private readonly createHeaders: FhirClientTypes.FetchOptions = {
        headers: {
            "Prefer": "return=representation"
        }
    };

    async create<T extends R4ResourceWithRequiredType>(resource: T): Promise<R4.Resource> {
        const transformedResource = Transformer.toFhirClientType(resource)
        const hydratedResource = await this.hydrateResource(transformedResource)
        const resultResource: FhirClientResourceWithRequiredType = await this.fhirClientDefault.create(hydratedResource, this.createHeaders)
            .then(resource => {
                if (!resource.resourceType) throw new Error(`Resource ${resource}, must have a resource type.`)
                return resource as FhirClientResourceWithRequiredType
            })
            .catch((reason) => {
                throw new Error("It failed with:" + reason);
            });
        const resultAsR4 = Transformer.toR4FhirType(resultResource)
        return resultAsR4
    }

}