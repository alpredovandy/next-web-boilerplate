module.exports = () => ({
  type: "styles",
  content: `import type { SxProps, Theme } from "@mui/material";

export const defaultStyle = {
  color: "primary",
} as SxProps<Theme>;
`,
  extension: `styles.ts`,
});
