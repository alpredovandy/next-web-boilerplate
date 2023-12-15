import { z } from "zod";

export const baseResponseSchema = <T extends z.ZodTypeAny>(dataSchema: T) =>
  z.object({
    data: dataSchema.nullable(),
    message: z.string().optional(),
  });
export type BaseResponseType<T = unknown> = z.infer<
  ReturnType<typeof baseResponseSchema<z.ZodType<T>>>
>;

export const metaSchema = z.object({
  page: z.union([z.number(), z.string()]),
  per_page: z.union([z.number(), z.string()]),
  total_page: z.number(),
  total_data: z.number(),
});
export type MetaType = z.infer<typeof metaSchema>;

export const paginateResponseSchema = <T extends z.ZodTypeAny>(
  contentSchema: T,
) =>
  z.object({
    content: contentSchema.optional(),
    data: contentSchema.optional(),
    meta: metaSchema.optional(),
  });
export type PaginateResponseType<T = unknown> = z.infer<
  ReturnType<typeof paginateResponseSchema<z.ZodType<T>>>
>;

export const paginateRequestSchema = z.object({
  page: z.number().optional(),
  limit: z.number().optional(),
  search: z.string().optional(),
  sort: z.string().optional(),
});
export type PaginateRequestType = z.infer<typeof paginateRequestSchema>;

export const paginateRequestMapper = (params?: PaginateRequestType) => ({
  ...params,
  page: String(params?.page ?? 1),
  limit: String(params?.limit ?? 10),
});
