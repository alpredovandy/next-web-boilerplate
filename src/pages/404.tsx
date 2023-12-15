import React from "react";

import type { NextPage } from "next";
import Image from "next/image";
import { ReyEmptyState } from "rey-mix";

import { COMMON_IMAGE } from "@constants/images";

import { CommonLocale } from "@locales";

const FourOFourPage: React.FC<NextPage> = () => {
  const t = CommonLocale.useScopedI18n("fourOFour");

  return (
    <ReyEmptyState
      banner={
        <Image
          src={COMMON_IMAGE.PAGE_404}
          blurDataURL={COMMON_IMAGE.PAGE_404}
          placeholder="blur"
          fill
          alt="Error 404"
          loading="lazy"
        />
      }
      title={t("title")}
      description={t("description")}
    />
  );
};

export const getStaticProps = CommonLocale.getLocaleProps();

export default FourOFourPage;
