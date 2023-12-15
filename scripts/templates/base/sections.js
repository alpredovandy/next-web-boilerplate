module.exports = () => ({
  type: "sections",
  folder: "sections",
  content: `import dynamic from "next/dynamic";

/** Static */
// export { default as StaticSection } from "./StaticSection";
  
/** Dynamic */
// export const DynamicSection = dynamic(() => import("./DynamicSection"));
`,
  extension: `index.ts`,
});
