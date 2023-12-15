module.exports = (_type, name) => ({
  type: "hooks",
  folder: "hooks",
  content: `export const use${name} = () => {
  const defaultValue = null;

  return { defaultValue };
};
`,
  extension: `index.ts`,
});
