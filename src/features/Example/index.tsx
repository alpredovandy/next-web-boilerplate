/** TODO: Remove this file after use this example */
import React from "react";

import Header from "@components/Header";

import { ExampleLocale } from "./locales";

const ExampleFeature: React.FC = () => {
  const t = ExampleLocale.useScopedI18n("index");

  return (
    <>
      <Header title={t("title")} />

      {/* TODO: Add content section here  */}
    </>
  );
};

export default ExampleFeature;
