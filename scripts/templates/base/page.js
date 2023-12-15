module.exports = (_type, name) => ({
  type: "page",
  folder: name
    .match(/[A-Z][a-z]*/g)
    .join("-")
    .toLowerCase(),
  content: `import React from "react";

import ${name}Feature from "@features/${name}";
import { ${name}Locale } from "@features/${name}/locales";
  
import { withCommonLocale, type WithCommonLocaleProps } from "@locales";
  
const ${name}Page: React.FC<WithCommonLocaleProps> = (props) => {
  return (
    <${name}Locale.I18nProvider locale={props.otherLocale}>        
      <${name}Feature />
    </${name}Locale.I18nProvider>
  );
};
  
export const getStaticProps = withCommonLocale(${name}Locale);
  
export default ${name}Page;
`,
  extension: `index.tsx`,
});
