/** TODO: Remove this file after use this example */
import React from "react";

import ExampleFeature from "@features/Example";
import { ExampleLocale } from "@features/Example/locales";

import { withCommonLocale, type WithCommonLocaleProps } from "@locales";

const ExamplePage: React.FC<WithCommonLocaleProps> = (props) => {
  return (
    <ExampleLocale.I18nProvider locale={props.otherLocale}>
      <ExampleFeature />
    </ExampleLocale.I18nProvider>
  );
};

export const getStaticProps = withCommonLocale(ExampleLocale);

export default ExamplePage;
