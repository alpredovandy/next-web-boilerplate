import type {
  BaseResponseType,
  MetaType,
  PaginateRequestType,
  PaginateResponseType,
} from "@domains/Response";

export const MOCK_RESPONSE_SUCCESS: BaseResponseType = {
  data: { result: true },
  message: "Success",
};

export const MOCK_META: MetaType = {
  page: 1,
  per_page: 10,
  total_page: 1,
  total_data: 10,
};

export const MOCK_PAGINATION_REQUEST: PaginateRequestType = {
  page: 1,
  limit: 1,
  search: "mock-search",
  sort: "-updated_at",
};

export const MOCK_PAGINATE_RESPONSE_SUCCESS: PaginateResponseType = {
  content: { result: true },
  meta: { page: 1, per_page: 10, total_page: 1, total_data: 10 },
};
