module.exports = (_type, name) => ({
  type: "index",
  content: `import React from "react";

import Header from "@components/Header";
  
import { ${name}Content } from "@features/${name}/sections";
  
import { ${name}Locale } from "./locales";
  
const ${name}Feature: React.FC = () => {
  const t = ${name}Locale.useScopedI18n("index");
  
  return (
    <>
      <Header title={t("title")} />
      <${name}Content />
    </>
  );
};
  
export default ${name}Feature;
`,
  extension: `index.tsx`,
});
