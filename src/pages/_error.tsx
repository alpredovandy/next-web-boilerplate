import type { NextPageContext } from "next";
import Image from "next/image";
import { ReyEmptyState } from "rey-mix";

import Newrelic from "@services/adapters/Newrelic";

import { COMMON_IMAGE } from "@constants/images";

import { CommonLocale } from "@locales";

import { ClientError, ServerError } from "@helpers/error";

const ErrorPage = () => {
  const t = CommonLocale.useScopedI18n("fiveHundred");

  return (
    <ReyEmptyState
      banner={
        <Image
          src={COMMON_IMAGE.PAGE_500}
          blurDataURL={COMMON_IMAGE.PAGE_500}
          placeholder="blur"
          fill
          alt="Error 500"
          loading="lazy"
        />
      }
      title={t("title")}
      description={t("description")}
    />
  );
};

ErrorPage.getInitialProps = async (context: NextPageContext) => {
  const { err, req, res } = context;

  let customError: Error;

  if (req) {
    /** Server Side Error */
    customError = new ServerError({ cause: err?.cause });
  } else {
    /** Client Side Error */
    customError = new ClientError({ cause: err?.cause });
  }

  const logger = new Newrelic();

  /** Logging error */
  logger.sendError(customError, {
    message: err?.message ?? "",
    statusCode: err?.statusCode ?? "",
    stack: err?.stack ?? "",
  });
  logger.sendEvent("Test Event", { message: "test event" });

  const statusCode = res ? res.statusCode : err ? err.statusCode : 404;

  /** Rewrite url to 404 if status code is 404 */
  if (statusCode === 404) {
    res?.writeHead(302, { Location: "/404" });
    res?.end();
  }

  const locales = await CommonLocale.getLocaleProps()(context);

  return { locales };
};

export default ErrorPage;
