/** TODO: Remove this file after use this example */
import type { ExampleType } from "@domains/Example";
import { PaginateResponseType } from "@domains/Response";

export const MOCK_EXAMPLE_RESPONSE_SUCCESS: ExampleType = {
  id: "1",
  foo: "mock-foo",
};

export const MOCK_EXAMPLE_PAGINATE_RESPONSE_SUCCESS: PaginateResponseType<
  ExampleType[]
> = {
  content: [{ id: "1", foo: "mock-foo" }],
  meta: { page: 1, per_page: 10, total_data: 1, total_page: 1 },
};
