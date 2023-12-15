/** TODO: Remove this file after use this example */
import type { ExampleServiceType } from "@services/ExampleService";

import type { ExampleType } from "@domains/Example";
import type {
  PaginateRequestType,
  PaginateResponseType,
} from "@domains/Response";

export interface ExampleUseCaseType {
  getAll(
    params?: PaginateRequestType,
  ): Promise<PaginateResponseType<ExampleType[]>>;

  getById(id: string): Promise<ExampleType | null>;
}

class ExampleUseCase implements ExampleUseCaseType {
  private _exampleService: ExampleServiceType;

  constructor(exampleService: ExampleServiceType) {
    this._exampleService = exampleService;
  }

  getAll: ExampleUseCaseType["getAll"] = (params = {}) =>
    this._exampleService.getAll(params);

  getById: ExampleUseCaseType["getById"] = (id) =>
    this._exampleService.getById(id).then((res) => res?.data);
}

export default ExampleUseCase;
