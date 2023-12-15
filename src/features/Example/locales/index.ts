/** TODO: Remove this file after use this example */
import { createI18n } from "next-international";

export const ExampleLocale = createI18n({
  id: () => import("./id"),
  en: () => import("./en"),
});
