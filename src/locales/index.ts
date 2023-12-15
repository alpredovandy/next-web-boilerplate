import type {
  GetServerSidePropsContext,
  GetServerSidePropsResult,
  GetStaticPropsContext,
  GetStaticPropsResult,
} from "next";
import { createI18n } from "next-international";
import type { ParsedUrlQuery } from "querystring";

export const CommonLocale = createI18n({
  id: () => import("./id"),
  en: () => import("./en"),
});

export interface LocalProps {
  locale?: any;
}

export interface WithCommonLocaleProps extends LocalProps {
  otherLocale: any;
}

export const withCommonLocale = <
  TProps extends { [key: string]: any },
  TParams extends ParsedUrlQuery = ParsedUrlQuery,
>(
  Locale: { getLocaleProps: () => any },
  callback?: (
    context: GetServerSidePropsContext<TParams> &
      GetStaticPropsContext<TParams>,
  ) => Promise<GetServerSidePropsResult<TProps> | GetStaticPropsResult<TProps>>,
) =>
  CommonLocale.getLocaleProps(async (ctx: any) => {
    let props = {};
    let otherProps: LocalProps = {};

    const result = await callback?.(ctx);

    const localeResult = await Locale.getLocaleProps()(ctx);

    if (result && "props" in result) props = result.props;

    if (localeResult && "props" in localeResult)
      otherProps = localeResult.props;

    return {
      ...result,
      props: { ...props, otherLocale: otherProps?.locale ?? {} },
    };
  });
