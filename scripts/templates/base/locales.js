module.exports = (_, name) => ({
  type: "locales",
  folder: "locales",
  content: `import { createI18n } from "next-international";

export const ${name}Locale = createI18n({
  id: () => import("./id"),
  en: () => import("./en"),
});  
`,
  extension: `index.ts`,
});
